export const dynamic = "force-dynamic";

interface IntakePayload {
  type: "software" | "brain";
  companyName: string;
  industry: string;
  companySize: string;
  systems: string;
  problemDescription?: string;
  workflows?: string;
  hoursPerWeek?: string;
  deployment?: string;
  email: string;
  phone?: string;
}

export async function POST(request: Request) {
  try {
    const body: IntakePayload = await request.json();

    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!discordWebhookUrl) {
      return Response.json(
        { error: "DISCORD_WEBHOOK_URL not configured" },
        { status: 503 }
      );
    }

    const isBrain = body.type === "brain";
    const color = isBrain ? 0x7c3aed : 0x22c55e;
    const title = isBrain
      ? "🧠 New Brain Request"
      : "💻 New Software Request";

    const fields = [
      {
        name: "Company",
        value: body.companyName || "Not provided",
        inline: true,
      },
      {
        name: "Industry",
        value: body.industry || "Not provided",
        inline: true,
      },
      {
        name: "Size",
        value: body.companySize || "Not provided",
        inline: true,
      },
      {
        name: "Contact",
        value: `${body.email}${body.phone ? ` | ${body.phone}` : ""}`,
        inline: false,
      },
      {
        name: isBrain ? "Systems to Connect" : "Systems Used",
        value: body.systems || "Not provided",
        inline: false,
      },
    ];

    if (isBrain) {
      fields.push(
        {
          name: "Workflows",
          value: body.workflows || "Not provided",
          inline: false,
        },
        {
          name: "Repetitive Hours/Week",
          value: body.hoursPerWeek || "Not provided",
          inline: true,
        },
        {
          name: "Deployment",
          value: body.deployment || "Not provided",
          inline: true,
        }
      );
    } else {
      fields.push({
        name: "Problem Description",
        value: body.problemDescription || "Not provided",
        inline: false,
      });
    }

    const embed = {
      title,
      color,
      fields,
      timestamp: new Date().toISOString(),
      footer: {
        text: "Axos Labs Intake",
      },
    };

    const discordPayload = {
      content: `New ${isBrain ? "Brain" : "Software"} inquiry received!`,
      embeds: [embed],
    };

    const res = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    if (!res.ok) {
      const text = await res.text();
      return Response.json(
        { error: "Discord webhook failed", details: text },
        { status: 502 }
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
