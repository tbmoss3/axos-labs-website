export const dynamic = "force-dynamic";

import { insertBrainIntake, upsertSoftwareSuggestion, initDB } from "@/lib/db";

interface BrainIntakePayload {
  companyName: string;
  industry: string;
  industryOther: string;
  companyDescription: string;
  companySize: string;
  yearsInBusiness: string;
  businessModel: string;
  uniqueValueProp: string;
  employeeCount: string;
  pctSalaried: string;
  pctOffice: string;
  techLiteracyLeadership: number;
  techLiteracyOperations: number;
  techLiteracyField: number;
  itStaff: string;
  peoplePainPoint: string;
  criticalFunctions: string[];
  workflows: { id: string; name: string; hoursPerWeek: string; painLevel: number; owner: string }[];
  bottleneckDescription: string;
  decisionSpeed: string;
  processManagement: string;
  selectedSoftware: { name: string; category: string; usageDepth: string }[];
  customSoftware: { name: string; category: string; purpose: string }[];
  dataTypesHandled: string;
  integrationNeeds: string;
  softwareSatisfaction: number;
  softwareWishlist: string;
  infraPreference: string;
  currentAIUsage: string[];
  aiSuccesses: string;
  aiFailures: string;
  complianceReqs: string[];
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
  preferredContact: string;
  urgency: string;
  referralSource: string;
  referralOther: string;
  techFrustration: string;
  freeformNotes: string;
  consentGiven: boolean;
}

function computeRecommendation(data: BrainIntakePayload): string {
  const softwareCount = data.selectedSoftware.length + data.customSoftware.filter((s) => s.name.trim()).length;
  const mgmt = data.processManagement;
  const sat = data.softwareSatisfaction;

  if (softwareCount >= 3 && mgmt === "existing-software-clunky" && sat <= 2) {
    return "Brain Architecture";
  }
  if (softwareCount < 2 && mgmt === "spreadsheets-paper") {
    return "Custom Software";
  }
  if (softwareCount >= 2 && softwareCount <= 4 && (mgmt === "mix-both" || sat <= 3)) {
    return "Blend — Brain + Custom Software";
  }
  if (sat >= 4 && softwareCount >= 3) {
    return "Brain Architecture (automation layer on strong base)";
  }
  if (data.softwareWishlist.trim().length > 100) {
    return "Blend — Brain + Custom Software";
  }
  return "Needs Discovery Call";
}

function generateMarkdownFile(data: BrainIntakePayload, intakeId: string, recommendation: string): string {
  const now = new Date().toISOString();

  const workflowsStr = data.workflows
    .filter((w) => w.name.trim())
    .map(
      (w, i) =>
        `${i + 1}. **${w.name}** — ${w.hoursPerWeek} hrs/week, pain ${w.painLevel}/5, owner: ${w.owner || "unspecified"}`
    )
    .join("\n") || "None provided";

  const softwareStr =
    data.selectedSoftware
      .map((s) => `- **${s.name}** (${s.category}) — usage: ${s.usageDepth}`)
      .join("\n") || "None selected";

  const customSoftwareStr =
    data.customSoftware
      .filter((s) => s.name.trim())
      .map((s) => `- **${s.name}** (${s.category}) — ${s.purpose}`)
      .join("\n") || "None";

  return `---
intake_id: ${intakeId}
company: ${data.companyName}
industry: ${data.industry}${data.industry === "Other" ? ` (${data.industryOther})` : ""}
size_band: ${data.companySize}
employees: ${data.employeeCount}
contact: ${data.contactEmail}
submitted: ${now}
infra_preference: ${data.infraPreference}
urgency: ${data.urgency || "not specified"}
---

# ${data.companyName} — Brain Architecture Intake

## Business Identity
${data.companyDescription}

**Years in business:** ${data.yearsInBusiness || "Not specified"}  
**Business model:** ${data.businessModel || "Not specified"}

**What makes the business unique:** ${data.uniqueValueProp || "Not specified"}

## People & Technical Posture
- **Total employees:** ${data.employeeCount}
- **Salaried/Hourly mix:** ${data.pctSalaried || 50}% / ${100 - (parseInt(data.pctSalaried) || 50)}%
- **Office/Field mix:** ${data.pctOffice || 50}% / ${100 - (parseInt(data.pctOffice) || 50)}%
- **Technical literacy (leadership/ops/field):** ${data.techLiteracyLeadership}/${data.techLiteracyOperations}/${data.techLiteracyField}
- **IT staff:** ${data.itStaff || "Not specified"}
- **Critical people & roles:** ${data.peoplePainPoint || "None provided"}

## Critical Functions
${data.criticalFunctions.map((f) => `- ${f}`).join("\n") || "None selected"}

## Top Processes to Automate
${workflowsStr}

## Bottleneck Description
${data.bottleneckDescription || "None provided"}

## Decision Speed
${data.decisionSpeed || "Not specified"}

## Process Management
${data.processManagement || "Not specified"}

## Software Stack
### Known Tools
${softwareStr}

### Custom / Missing Tools
${customSoftwareStr}

## Data & Documents
${data.dataTypesHandled || "Not specified"}

## Integration Vision
${data.integrationNeeds || "None provided"}

## Software Satisfaction
${"⭐".repeat(data.softwareSatisfaction)} (${data.softwareSatisfaction}/5)

## Software Wishlist
${data.softwareWishlist || "None provided"}

## AI Posture
- **Current usage:** ${data.currentAIUsage.join(", ") || "None"}
- **Successes:** ${data.aiSuccesses || "None provided"}
- **Failures/Concerns:** ${data.aiFailures || "None provided"}
- **Compliance requirements:** ${data.complianceReqs.join(", ") || "None"}

## Contact
- **Name:** ${data.contactName} (${data.contactRole})
- **Email:** ${data.contactEmail}
- **Phone:** ${data.contactPhone || "Not provided"}
- **Preferred contact:** ${data.preferredContact || "Not specified"}
- **Urgency:** ${data.urgency || "Not specified"}
- **Referral source:** ${data.referralSource || "Not specified"}${data.referralSource === "other" ? ` (${data.referralOther})` : ""}

## Tech Frustration
${data.techFrustration || "None provided"}

## Freeform Notes
${data.freeformNotes || "None"}

## Q Assessment
**Recommendation:** ${recommendation}

---
*Axos Labs Brain Architecture Intake — ${now}*
`;
}

export async function POST(request: Request) {
  try {
    const body: BrainIntakePayload = await request.json();

    // Basic validation
    if (
      !body.companyName?.trim() ||
      !body.industry ||
      !body.companyDescription?.trim() ||
      !body.companySize ||
      !body.employeeCount?.trim() ||
      !body.contactName?.trim() ||
      !body.contactRole?.trim() ||
      !body.contactEmail?.trim() ||
      !body.consentGiven
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!discordWebhookUrl) {
      return Response.json(
        { error: "DISCORD_WEBHOOK_URL not configured" },
        { status: 503 }
      );
    }

    // Prepare for DB insert
    const dbPayload = {
      company_name: body.companyName,
      industry: body.industry,
      industry_other: body.industry === "Other" ? body.industryOther : null,
      company_description: body.companyDescription,
      company_size_band: body.companySize,
      years_in_business: body.yearsInBusiness || null,
      business_model: body.businessModel || null,
      unique_value_prop: body.uniqueValueProp || null,
      employee_count: parseInt(body.employeeCount) || null,
      pct_salaried: parseInt(body.pctSalaried) || 50,
      pct_office: parseInt(body.pctOffice) || 50,
      tech_literacy_leadership: body.techLiteracyLeadership,
      tech_literacy_operations: body.techLiteracyOperations,
      tech_literacy_field: body.techLiteracyField,
      it_staff: body.itStaff || null,
      people_pain_point: body.peoplePainPoint || null,
      critical_functions: body.criticalFunctions.length > 0 ? body.criticalFunctions : null,
      workflows_json: JSON.stringify(body.workflows),
      bottleneck_description: body.bottleneckDescription || null,
      decision_speed: body.decisionSpeed || null,
      process_management: body.processManagement || null,
      software_json: JSON.stringify(body.selectedSoftware),
      custom_software_json: JSON.stringify(body.customSoftware.filter((s) => s.name.trim())),
      data_types_handled: body.dataTypesHandled || null,
      integration_needs: body.integrationNeeds || null,
      software_satisfaction: body.softwareSatisfaction || null,
      software_wishlist: body.softwareWishlist || null,
      infra_preference: body.infraPreference || "undecided",
      current_ai_usage: body.currentAIUsage.length > 0 ? body.currentAIUsage : null,
      ai_successes: body.aiSuccesses || null,
      ai_failures: body.aiFailures || null,
      compliance_reqs: body.complianceReqs.length > 0 ? body.complianceReqs : null,
      contact_name: body.contactName,
      contact_role: body.contactRole,
      contact_email: body.contactEmail,
      contact_phone: body.contactPhone || null,
      preferred_contact: body.preferredContact || null,
      urgency: body.urgency || null,
      referral_source: body.referralSource || null,
      referral_other: body.referralSource === "other" ? body.referralOther : null,
      tech_frustration: body.techFrustration || null,
      freeform_notes: body.freeformNotes || null,
      consent_given: body.consentGiven,
      discord_thread_id: null,
      status: "new",
      estimated_tier: null,
    };

    // Insert into DB (ensure tables exist first, skip if no DATABASE_URL locally)
    let intakeId = crypto.randomUUID();
    if (process.env.DATABASE_URL) {
      await initDB(); // idempotent — creates brain_intakes + software_suggestions if needed
      intakeId = await insertBrainIntake(dbPayload);

      // Upsert custom software suggestions
      for (const sw of body.customSoftware) {
        if (sw.name.trim()) {
          await upsertSoftwareSuggestion(sw.name.trim(), sw.category || undefined, intakeId);
        }
      }
    } else {
      console.warn("DATABASE_URL not set — skipping DB insert (Discord only)");
    }

    // Compute recommendation
    const recommendation = computeRecommendation(body);

    // Build markdown file
    const markdown = generateMarkdownFile(body, intakeId, recommendation);
    const safeFilename = `${body.companyName.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}-intake.md`;

    // Discord embed + file attachment
    const embed = {
      title: `🧠 ${body.companyName} — Brain Architecture Intake`,
      color: 0x7c3aed,
      fields: [
        { name: "Industry", value: body.industry, inline: true },
        { name: "Size", value: body.companySize, inline: true },
        { name: "Employees", value: body.employeeCount, inline: true },
        { name: "Contact", value: `${body.contactName} — ${body.contactEmail}`, inline: false },
        { name: "Infra Preference", value: body.infraPreference || "undecided", inline: true },
        { name: "Recommendation", value: recommendation, inline: false },
        { name: "Urgency", value: body.urgency || "Not specified", inline: true },
        {
          name: "Workflows",
          value:
            body.workflows
              .filter((w) => w.name.trim())
              .map((w) => `• ${w.name} (${w.hoursPerWeek} hrs/wk)`)
              .join("\n") || "None",
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: { text: `Intake ID: ${intakeId}` },
    };

    // Discord accepts multipart/form-data with payload_json and file
    const discordPayload = {
      content: `New brain architecture intake received — ${body.companyName}`,
      embeds: [embed],
    };

    // Create multipart form
    const formData = new FormData();
    formData.append("payload_json", JSON.stringify(discordPayload));
    formData.append(
      "file",
      new Blob([markdown], { type: "text/markdown" }),
      safeFilename
    );

    const res = await fetch(discordWebhookUrl, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      // Log but don't fail — DB insert succeeded
      console.error("Discord webhook failed:", text);
    }

    return Response.json({ success: true, id: intakeId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Intake API error:", err);
    return Response.json({ error: message }, { status: 500 });
  }
}
