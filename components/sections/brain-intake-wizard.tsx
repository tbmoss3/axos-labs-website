"use client";

import { useState, useReducer, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Users,
  Workflow,
  Layers,
  Brain,
  Send,
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  AlertCircle,
  Search,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { AnimatedSection } from "@/components/animations/animated-section";

// ── Types ──────────────────────────────────────────────────────────────────

interface WorkflowItem {
  id: string;
  name: string;
  hoursPerWeek: string;
  painLevel: number;
  owner: string;
}

interface SoftwareItem {
  name: string;
  category: string;
  usageDepth: "light" | "moderate" | "core";
}

interface BrainIntakeForm {
  // Step 1
  companyName: string;
  industry: string;
  industryOther: string;
  companyDescription: string;
  companySize: string;
  yearsInBusiness: string;
  businessModel: string;
  // Step 2
  employeeCount: string;
  pctSalaried: string;
  pctOffice: string;
  techLiteracyLeadership: number;
  techLiteracyOperations: number;
  techLiteracyField: number;
  itStaff: string;
  peoplePainPoint: string;
  // Step 3
  criticalFunctions: string[];
  workflows: WorkflowItem[];
  bottleneckDescription: string;
  decisionSpeed: string;
  // Step 4
  selectedSoftware: SoftwareItem[];
  customSoftware: { name: string; category: string; purpose: string }[];
  integrationNeeds: string;
  dataVolume: string;
  infraPreference: string;
  // Step 5
  currentAIUsage: string[];
  aiSuccesses: string;
  aiFailures: string;
  desiredPersonality: string;
  complianceReqs: string[];
  budgetMindset: string;
  // Step 6
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
  preferredContact: string;
  urgency: string;
  referralSource: string;
  referralOther: string;
  freeformNotes: string;
  consentGiven: boolean;
}

const STORAGE_KEY = "axos-brain-intake-draft";

const initialForm: BrainIntakeForm = {
  companyName: "",
  industry: "",
  industryOther: "",
  companyDescription: "",
  companySize: "",
  yearsInBusiness: "",
  businessModel: "",
  employeeCount: "",
  pctSalaried: "50",
  pctOffice: "50",
  techLiteracyLeadership: 3,
  techLiteracyOperations: 3,
  techLiteracyField: 2,
  itStaff: "",
  peoplePainPoint: "",
  criticalFunctions: [],
  workflows: [{ id: "1", name: "", hoursPerWeek: "", painLevel: 3, owner: "" }],
  bottleneckDescription: "",
  decisionSpeed: "",
  selectedSoftware: [],
  customSoftware: [],
  integrationNeeds: "",
  dataVolume: "",
  infraPreference: "",
  currentAIUsage: [],
  aiSuccesses: "",
  aiFailures: "",
  desiredPersonality: "",
  complianceReqs: [],
  budgetMindset: "",
  contactName: "",
  contactRole: "",
  contactEmail: "",
  contactPhone: "",
  preferredContact: "",
  urgency: "",
  referralSource: "",
  referralOther: "",
  freeformNotes: "",
  consentGiven: false,
};

type FormAction =
  | { type: "SET_FIELD"; field: keyof BrainIntakeForm; value: unknown }
  | { type: "ADD_WORKFLOW" }
  | { type: "REMOVE_WORKFLOW"; index: number }
  | { type: "UPDATE_WORKFLOW"; index: number; field: keyof WorkflowItem; value: unknown }
  | { type: "TOGGLE_FUNCTION"; value: string }
  | { type: "TOGGLE_AI_USAGE"; value: string }
  | { type: "TOGGLE_COMPLIANCE"; value: string }
  | { type: "ADD_SOFTWARE"; item: SoftwareItem }
  | { type: "REMOVE_SOFTWARE"; name: string }
  | { type: "UPDATE_SOFTWARE_DEPTH"; name: string; depth: SoftwareItem["usageDepth"] }
  | { type: "ADD_CUSTOM_SOFTWARE" }
  | { type: "REMOVE_CUSTOM_SOFTWARE"; index: number }
  | { type: "UPDATE_CUSTOM_SOFTWARE"; index: number; field: string; value: string }
  | { type: "LOAD_DRAFT"; draft: Partial<BrainIntakeForm> }
  | { type: "RESET" };

function formReducer(state: BrainIntakeForm, action: FormAction): BrainIntakeForm {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "ADD_WORKFLOW":
      return {
        ...state,
        workflows: [
          ...state.workflows,
          { id: String(Date.now()), name: "", hoursPerWeek: "", painLevel: 3, owner: "" },
        ],
      };
    case "REMOVE_WORKFLOW":
      return { ...state, workflows: state.workflows.filter((_, i) => i !== action.index) };
    case "UPDATE_WORKFLOW": {
      const workflows = [...state.workflows];
      workflows[action.index] = { ...workflows[action.index], [action.field]: action.value };
      return { ...state, workflows };
    }
    case "TOGGLE_FUNCTION":
      return {
        ...state,
        criticalFunctions: state.criticalFunctions.includes(action.value)
          ? state.criticalFunctions.filter((f) => f !== action.value)
          : [...state.criticalFunctions, action.value],
      };
    case "TOGGLE_AI_USAGE":
      return {
        ...state,
        currentAIUsage: state.currentAIUsage.includes(action.value)
          ? state.currentAIUsage.filter((f) => f !== action.value)
          : [...state.currentAIUsage, action.value],
      };
    case "TOGGLE_COMPLIANCE":
      return {
        ...state,
        complianceReqs: state.complianceReqs.includes(action.value)
          ? state.complianceReqs.filter((f) => f !== action.value)
          : [...state.complianceReqs, action.value],
      };
    case "ADD_SOFTWARE":
      if (state.selectedSoftware.find((s) => s.name === action.item.name)) return state;
      return { ...state, selectedSoftware: [...state.selectedSoftware, action.item] };
    case "REMOVE_SOFTWARE":
      return { ...state, selectedSoftware: state.selectedSoftware.filter((s) => s.name !== action.name) };
    case "UPDATE_SOFTWARE_DEPTH":
      return {
        ...state,
        selectedSoftware: state.selectedSoftware.map((s) =>
          s.name === action.name ? { ...s, usageDepth: action.depth } : s
        ),
      };
    case "ADD_CUSTOM_SOFTWARE":
      return {
        ...state,
        customSoftware: [...state.customSoftware, { name: "", category: "", purpose: "" }],
      };
    case "REMOVE_CUSTOM_SOFTWARE":
      return { ...state, customSoftware: state.customSoftware.filter((_, i) => i !== action.index) };
    case "UPDATE_CUSTOM_SOFTWARE": {
      const custom = [...state.customSoftware];
      custom[action.index] = { ...custom[action.index], [action.field]: action.value };
      return { ...state, customSoftware: custom };
    }
    case "LOAD_DRAFT":
      return { ...initialForm, ...action.draft };
    case "RESET":
      return initialForm;
    default:
      return state;
  }
}

// ── Configuration ──────────────────────────────────────────────────────────

const steps = [
  { id: 1, label: "Business", icon: Building2 },
  { id: 2, label: "People", icon: Users },
  { id: 3, label: "Workflows", icon: Workflow },
  { id: 4, label: "Software", icon: Layers },
  { id: 5, label: "AI Posture", icon: Brain },
  { id: 6, label: "Submit", icon: Send },
];

const industries = [
  "Construction",
  "Real Estate",
  "Logistics & Transportation",
  "Healthcare",
  "Manufacturing",
  "Legal",
  "Financial Services",
  "SaaS / Technology",
  "E-commerce",
  "Professional Services",
  "Education",
  "Nonprofit",
  "Agriculture",
  "Energy",
  "Hospitality",
  "Other",
];

const companySizes = ["1-10", "11-50", "51-100", "101-250", "251-500", "500+"];

const yearsOptions = ["< 1 year", "1-3 years", "3-5 years", "5-10 years", "10+ years"];

const businessModels = [
  "B2B",
  "B2C",
  "B2B2C",
  "D2C",
  "Marketplace",
  "Franchise",
  "Nonprofit",
  "Other",
];

const criticalFunctionsList = [
  "Sales / CRM",
  "Operations / Dispatch",
  "Accounting / Finance",
  "HR / People",
  "Customer Support",
  "Inventory / Warehouse",
  "Compliance / Legal",
  "Marketing",
  "Product / Development",
  "Data / Reporting",
  "IT / Infrastructure",
  "Executive / Strategy",
];

const aiUsageOptions = [
  "None — we're just exploring",
  "ChatGPT / Claude for drafting",
  "AI coding assistants",
  "Automated data processing",
  "Customer-facing AI (chatbots)",
  "AI analytics / BI",
  "Custom LLM pipelines",
  "Other",
];

const complianceOptions = [
  "HIPAA",
  "SOC 2",
  "GDPR",
  "CCPA",
  "ITAR",
  "FINRA",
  "State licensing requirements",
  "None",
  "Other",
];

const personalityOptions = [
  { value: "silent", label: "Silent operator — works in the background" },
  { value: "collaborative", label: "Collaborative teammate — suggests, asks questions" },
  { value: "front-facing", label: "Front-facing agent — talks to customers directly" },
  { value: "executive", label: "Executive assistant — manages calendar, comms, tracking" },
  { value: "hybrid", label: "Hybrid — varies by workflow" },
];

const infraOptions = [
  { value: "cloud", label: "Full cloud — minimal local footprint" },
  { value: "mostly-cloud", label: "Mostly cloud + some on-premise systems" },
  { value: "hybrid", label: "True hybrid — sensitive data stays local" },
  { value: "onprem", label: "Full on-premise — we own the hardware" },
  { value: "undecided", label: "Undecided — we want guidance" },
];

// ── Validation ───────────────────────────────────────────────────────────────

function validateStep(step: number, form: BrainIntakeForm): string[] {
  const errors: string[] = [];
  switch (step) {
    case 1:
      if (!form.companyName.trim()) errors.push("Company name is required");
      if (!form.industry) errors.push("Industry is required");
      if (form.industry === "Other" && !form.industryOther.trim()) errors.push("Please specify your industry");
      if (!form.companyDescription.trim()) errors.push("Company description is required");
      if (!form.companySize) errors.push("Company size is required");
      break;
    case 2:
      if (!form.employeeCount.trim()) errors.push("Employee count is required");
      break;
    case 3:
      if (form.criticalFunctions.length === 0) errors.push("Select at least one critical function");
      if (form.workflows.length === 0 || !form.workflows.some((w) => w.name.trim())) {
        errors.push("Add at least one workflow");
      }
      break;
    case 4:
      // Optional step — software and integration vision
      break;
    case 5:
      // Optional step
      break;
    case 6:
      if (!form.contactName.trim()) errors.push("Contact name is required");
      if (!form.contactRole.trim()) errors.push("Contact role is required");
      if (!form.contactEmail.trim()) {
        errors.push("Email is required");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) {
        errors.push("Please enter a valid email");
      }
      if (!form.consentGiven) errors.push("You must agree to be contacted");
      break;
  }
  return errors;
}

// ── UI Helpers ─────────────────────────────────────────────────────────────

function inputClass(error?: boolean) {
  return `w-full rounded-lg border px-4 py-3 bg-axos-bg-elevated text-axos-text-primary placeholder:text-axos-text-muted focus:outline-none focus:ring-2 focus:ring-axos-accent/30 transition-colors ${
    error ? "border-red-400 focus:border-red-500" : "border-axos-border-standard focus:border-axos-accent"
  }`;
}

function selectClass(error?: boolean) {
  return `${inputClass(error)} appearance-none cursor-pointer`;
}

function labelClass(required?: boolean) {
  return `block text-sm font-medium text-axos-text-secondary mb-2 ${required ? "after:content-['*'] after:ml-0.5 after:text-red-400" : ""}`;
}

function ErrorList({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null;
  return (
    <div className="rounded-lg border border-red-200 bg-red-50/50 p-4 mb-6">
      <div className="flex items-center gap-2 text-red-600 text-sm font-medium mb-2">
        <AlertCircle size={16} />
        Please fix the following:
      </div>
      <ul className="text-sm text-red-600 space-y-1 ml-6 list-disc">
        {errors.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
    </div>
  );
}

// ── Step Components ────────────────────────────────────────────────────────

function Step1Business({ form, dispatch }: { form: BrainIntakeForm; dispatch: React.Dispatch<FormAction> }) {
  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass(true)}>Company Name</label>
        <input
          type="text"
          value={form.companyName}
          onChange={(e) => dispatch({ type: "SET_FIELD", field: "companyName", value: e.target.value })}
          placeholder="Acme Corp"
          className={inputClass()}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass(true)}>Industry</label>
          <select
            value={form.industry}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "industry", value: e.target.value })}
            className={selectClass()}
          >
            <option value="">Select industry</option>
            {industries.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass(true)}>Company Size</label>
          <select
            value={form.companySize}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "companySize", value: e.target.value })}
            className={selectClass()}
          >
            <option value="">Select size</option>
            {companySizes.map((s) => (
              <option key={s} value={s}>{s} employees</option>
            ))}
          </select>
        </div>
      </div>

      {form.industry === "Other" && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
          <label className={labelClass(true)}>Please specify your industry</label>
          <input
            type="text"
            value={form.industryOther}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "industryOther", value: e.target.value })}
            className={inputClass()}
          />
        </motion.div>
      )}

      <div>
        <label className={labelClass(true)}>Describe your business in 5 sentences or less</label>
        <textarea
          value={form.companyDescription}
          onChange={(e) => dispatch({ type: "SET_FIELD", field: "companyDescription", value: e.target.value })}
          placeholder="What do you do, who do you serve, and how do you make money?"
          rows={4}
          className={`${inputClass()} resize-none`}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass(false)}>Years in Business</label>
          <select
            value={form.yearsInBusiness}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "yearsInBusiness", value: e.target.value })}
            className={selectClass()}
          >
            <option value="">Select</option>
            {yearsOptions.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass(false)}>Business Model</label>
          <select
            value={form.businessModel}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "businessModel", value: e.target.value })}
            className={selectClass()}
          >
            <option value="">Select</option>
            {businessModels.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function Step2People({ form, dispatch }: { form: BrainIntakeForm; dispatch: React.Dispatch<FormAction> }) {
  const slider = (label: string, value: number, onChange: (v: number) => void) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-axos-text-secondary">{label}</span>
        <span className="text-sm font-medium text-axos-text-primary">{value}/5</span>
      </div>
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-axos-border-subtle rounded-lg appearance-none cursor-pointer accent-axos-accent"
      />
      <div className="flex justify-between text-xs text-axos-text-muted mt-1">
        <span>Zero literacy</span>
        <span>Full dev proficiency</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass(true)}>Total Employee Count</label>
          <input
            type="number"
            min="1"
            value={form.employeeCount}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "employeeCount", value: e.target.value })}
            placeholder="42"
            className={inputClass()}
          />
        </div>
        <div>
          <label className={labelClass(false)}>IT Staff</label>
          <select
            value={form.itStaff}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "itStaff", value: e.target.value })}
            className={selectClass()}
          >
            <option value="">Select</option>
            <option value="none">No dedicated IT</option>
            <option value="part-time">1 person part-time</option>
            <option value="full-time">1 person full-time</option>
            <option value="small-team">2-5 people</option>
            <option value="large-team">5+ people</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass(false)}>% Salaried vs Hourly</label>
          <input
            type="range"
            min="0"
            max="100"
            value={parseInt(form.pctSalaried) || 50}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "pctSalaried", value: e.target.value })}
            className="w-full h-2 bg-axos-border-subtle rounded-lg appearance-none cursor-pointer accent-axos-accent"
          />
          <div className="flex justify-between text-xs text-axos-text-muted mt-1">
            <span>{parseInt(form.pctSalaried) || 50}% Salaried</span>
            <span>{100 - (parseInt(form.pctSalaried) || 50)}% Hourly</span>
          </div>
        </div>
        <div>
          <label className={labelClass(false)}>% Office vs Field</label>
          <input
            type="range"
            min="0"
            max="100"
            value={parseInt(form.pctOffice) || 50}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "pctOffice", value: e.target.value })}
            className="w-full h-2 bg-axos-border-subtle rounded-lg appearance-none cursor-pointer accent-axos-accent"
          />
          <div className="flex justify-between text-xs text-axos-text-muted mt-1">
            <span>{parseInt(form.pctOffice) || 50}% Office</span>
            <span>{100 - (parseInt(form.pctOffice) || 50)}% Field</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-axos-border-subtle bg-axos-bg-elevated p-5">
        <h4 className="text-sm font-semibold text-axos-text-primary mb-4">Technical Literacy by Team Tier</h4>
        {slider("Leadership / Exec", form.techLiteracyLeadership, (v) =>
          dispatch({ type: "SET_FIELD", field: "techLiteracyLeadership", value: v })
        )}
        {slider("Operations / Admin", form.techLiteracyOperations, (v) =>
          dispatch({ type: "SET_FIELD", field: "techLiteracyOperations", value: v })
        )}
        {slider("Field / Frontline", form.techLiteracyField, (v) =>
          dispatch({ type: "SET_FIELD", field: "techLiteracyField", value: v })
        )}
      </div>

      <div>
        <label className={labelClass(false)}>Who are your most critical people and what are their roles?</label>
        <textarea
          value={form.peoplePainPoint}
          onChange={(e) => dispatch({ type: "SET_FIELD", field: "peoplePainPoint", value: e.target.value })}
          placeholder="e.g. Sarah — Office Manager, handles all vendor coordination and scheduling. Mike — Lead Foreman, makes all field decisions."
          rows={4}
          className={`${inputClass()} resize-none`}
        />
      </div>
    </div>
  );
}

function Step3Workflows({ form, dispatch }: { form: BrainIntakeForm; dispatch: React.Dispatch<FormAction> }) {
  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass(true)}>Critical Business Functions</label>
        <p className="text-xs text-axos-text-muted mb-3">Select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {criticalFunctionsList.map((fn) => (
            <button
              key={fn}
              type="button"
              onClick={() => dispatch({ type: "TOGGLE_FUNCTION", value: fn })}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                form.criticalFunctions.includes(fn)
                  ? "bg-axos-accent text-white"
                  : "bg-axos-bg-elevated text-axos-text-secondary border border-axos-border-standard hover:border-axos-accent/30"
              }`}
            >
              {fn}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className={labelClass(true)}>Top Processes to Automate</label>
          <button
            type="button"
            onClick={() => dispatch({ type: "ADD_WORKFLOW" })}
            className="inline-flex items-center gap-1 text-sm text-axos-accent hover:text-axos-accent-hover transition-colors"
          >
            <Plus size={16} /> Add workflow
          </button>
        </div>
        <p className="text-xs text-axos-text-muted mb-3">Name, time spent, pain level, and who does it today</p>

        <div className="space-y-4">
          {form.workflows.map((wf, idx) => (
            <motion.div
              key={wf.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-axos-border-subtle bg-axos-bg-elevated p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-axos-accent">Workflow {idx + 1}</span>
                {form.workflows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "REMOVE_WORKFLOW", index: idx })}
                    className="text-axos-text-muted hover:text-red-400 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={wf.name}
                    onChange={(e) => dispatch({ type: "UPDATE_WORKFLOW", index: idx, field: "name", value: e.target.value })}
                    placeholder="Process work orders, dispatch vendors..."
                    className={inputClass()}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    min="0"
                    value={wf.hoursPerWeek}
                    onChange={(e) => dispatch({ type: "UPDATE_WORKFLOW", index: idx, field: "hoursPerWeek", value: e.target.value })}
                    placeholder="Hrs/week"
                    className={inputClass()}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-axos-text-secondary block mb-1">Pain level</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => dispatch({ type: "UPDATE_WORKFLOW", index: idx, field: "painLevel", value: n })}
                        className={`flex-1 h-8 rounded text-xs font-medium transition-colors ${
                          wf.painLevel >= n
                            ? "bg-axos-accent text-white"
                            : "bg-axos-bg-surface text-axos-text-muted border border-axos-border-subtle"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    value={wf.owner}
                    onChange={(e) => dispatch({ type: "UPDATE_WORKFLOW", index: idx, field: "owner", value: e.target.value })}
                    placeholder="Who does this? (role)"
                    className={inputClass()}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass(false)}>Biggest bottleneck</label>
        <textarea
          value={form.bottleneckDescription}
          onChange={(e) => dispatch({ type: "SET_FIELD", field: "bottleneckDescription", value: e.target.value })}
          placeholder="Where does work get stuck, duplicated, or dropped?"
          rows={3}
          className={`${inputClass()} resize-none`}
        />
      </div>

      <div>
        <label className={labelClass(false)}>How fast are decisions made?</label>
        <select
          value={form.decisionSpeed}
          onChange={(e) => dispatch({ type: "SET_FIELD", field: "decisionSpeed", value: e.target.value })}
          className={selectClass()}
        >
          <option value="">Select</option>
          <option value="real-time">Real-time</option>
          <option value="same-day">Same day</option>
          <option value="1-3-days">1-3 days</option>
          <option value="1-2-weeks">1-2 weeks</option>
          <option value="monthly">Monthly or longer</option>
        </select>
      </div>
    </div>
  );
}

function Step4Software({ form, dispatch }: { form: BrainIntakeForm; dispatch: React.Dispatch<FormAction> }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<{ name: string; category: string }[]>([]);
  const [searching, setSearching] = useState(false);

  const debounceSearch = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return; }
    setSearching(true);
    try {
      const res = await fetch(`/api/software?q=${encodeURIComponent(q)}&limit=15`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results || []);
      }
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => debounceSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search, debounceSearch]);

  const addCustom = () => {
    dispatch({ type: "ADD_CUSTOM_SOFTWARE" });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass(false)}>What software do you currently use in your business?</label>
        <p className="text-xs text-axos-text-muted mb-2">Type to search our database. Click to add each tool.</p>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-axos-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search QuickBooks, Salesforce, Slack..."
            className={`${inputClass()} pl-10`}
          />
          {searching && <Loader2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-axos-text-muted" />}
        </div>

        {results.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 max-h-48 overflow-y-auto rounded-lg border border-axos-border-subtle bg-axos-bg-surface shadow-sm">
            {results.map((tool) => {
              const isSelected = form.selectedSoftware.some((s) => s.name === tool.name);
              return (
                <button
                  key={tool.name}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      dispatch({ type: "REMOVE_SOFTWARE", name: tool.name });
                    } else {
                      dispatch({ type: "ADD_SOFTWARE", item: { name: tool.name, category: tool.category, usageDepth: "moderate" } });
                    }
                    setSearch("");
                    setResults([]);
                  }}
                  className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors ${
                    isSelected ? "bg-axos-accent/10" : "hover:bg-axos-bg-elevated"
                  }`}
                >
                  <div>
                    <span className="text-sm text-axos-text-primary font-medium">{tool.name}</span>
                    <span className="text-xs text-axos-text-muted ml-2">{tool.category}</span>
                  </div>
                  {isSelected ? <Check size={16} className="text-axos-accent" /> : <Plus size={16} className="text-axos-text-muted" />}
                </button>
              );
            })}
          </motion.div>
        )}

        {search && !searching && results.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 p-3 rounded-lg border border-axos-border-subtle bg-axos-bg-elevated">
            <p className="text-sm text-axos-text-secondary">No results. You can add &quot;{search}&quot; as a custom software below.</p>
          </motion.div>
        )}
      </div>

      {form.selectedSoftware.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-axos-text-secondary">Selected Software</label>
          <div className="space-y-2">
            {form.selectedSoftware.map((sw) => (
              <div key={sw.name} className="flex items-center justify-between rounded-lg border border-axos-border-subtle bg-axos-bg-elevated px-4 py-3">
                <div>
                  <span className="text-sm font-medium text-axos-text-primary">{sw.name}</span>
                  <span className="text-xs text-axos-text-muted ml-2">{sw.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={sw.usageDepth}
                    onChange={(e) => dispatch({ type: "UPDATE_SOFTWARE_DEPTH", name: sw.name, depth: e.target.value as SoftwareItem["usageDepth"] })}
                    className="text-xs rounded border border-axos-border-subtle bg-axos-bg-surface px-2 py-1 text-axos-text-secondary focus:outline-none focus:border-axos-accent"
                  >
                    <option value="light">Light use</option>
                    <option value="moderate">Moderate</option>
                    <option value="core">Core system</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "REMOVE_SOFTWARE", name: sw.name })}
                    className="text-axos-text-muted hover:text-red-400 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom software */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className={labelClass(false)}>Custom / Missing Software</label>
          <button type="button" onClick={addCustom} className="inline-flex items-center gap-1 text-sm text-axos-accent hover:text-axos-accent-hover transition-colors">
            <Plus size={16} /> Add custom
          </button>
        </div>
        {form.customSoftware.length > 0 && (
          <div className="space-y-3">
            {form.customSoftware.map((cs, idx) => (
              <div key={idx} className="grid sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={cs.name}
                  onChange={(e) => dispatch({ type: "UPDATE_CUSTOM_SOFTWARE", index: idx, field: "name", value: e.target.value })}
                  placeholder="Software name"
                  className={inputClass()}
                />
                <input
                  type="text"
                  value={cs.category}
                  onChange={(e) => dispatch({ type: "UPDATE_CUSTOM_SOFTWARE", index: idx, field: "category", value: e.target.value })}
                  placeholder="Category (e.g., CRM)"
                  className={inputClass()}
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cs.purpose}
                    onChange={(e) => dispatch({ type: "UPDATE_CUSTOM_SOFTWARE", index: idx, field: "purpose", value: e.target.value })}
                    placeholder="What it does"
                    className={`${inputClass()} flex-1`}
                  />
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "REMOVE_CUSTOM_SOFTWARE", index: idx })}
                    className="text-axos-text-muted hover:text-red-400 transition-colors px-2"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className={labelClass(false)}>Describe, in a perfect world, how these softwares would work together for your business</label>
        <textarea
          value={form.integrationNeeds}
          onChange={(e) => dispatch({ type: "SET_FIELD", field: "integrationNeeds", value: e.target.value })}
          placeholder="e.g. When a customer signs a contract in DocuSign, it should automatically create a job in our project management tool, notify the team in Slack, and add the client to our CRM without anyone touching a spreadsheet..."
          rows={4}
          className={`${inputClass()} resize-none`}
        />
      </div>

      {/* Data volume and infrastructure removed per user request */}
    </div>
  );
}

function Step5AIPosture({ form, dispatch }: { form: BrainIntakeForm; dispatch: React.Dispatch<FormAction> }) {
  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass(false)}>Current AI Usage</label>
        <p className="text-xs text-axos-text-muted mb-3">Select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {aiUsageOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => dispatch({ type: "TOGGLE_AI_USAGE", value: opt })}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                form.currentAIUsage.includes(opt)
                  ? "bg-axos-accent text-white"
                  : "bg-axos-bg-elevated text-axos-text-secondary border border-axos-border-standard hover:border-axos-accent/30"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass(false)}>AI Successes</label>
          <textarea
            value={form.aiSuccesses}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "aiSuccesses", value: e.target.value })}
            placeholder="What has worked well with AI so far?"
            rows={3}
            className={`${inputClass()} resize-none`}
          />
        </div>
        <div>
          <label className={labelClass(false)}>AI Failures or Concerns</label>
          <textarea
            value={form.aiFailures}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "aiFailures", value: e.target.value })}
            placeholder="What has failed or what worries you about AI adoption?"
            rows={3}
            className={`${inputClass()} resize-none`}
          />
        </div>
      </div>

      {/* Desired brain personality and budget mindset removed — Q infers from industry + workflows */}

      <div>
        <label className={labelClass(false)}>Compliance Requirements</label>
        <p className="text-xs text-axos-text-muted mb-3">Select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {complianceOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => dispatch({ type: "TOGGLE_COMPLIANCE", value: opt })}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                form.complianceReqs.includes(opt)
                  ? "bg-axos-accent text-white"
                  : "bg-axos-bg-elevated text-axos-text-secondary border border-axos-border-standard hover:border-axos-accent/30"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Budget mindset removed — Q infers from workflows + critical functions */}
    </div>
  );
}

function Step6Contact({ form, dispatch }: { form: BrainIntakeForm; dispatch: React.Dispatch<FormAction> }) {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass(true)}>Your Name</label>
          <input
            type="text"
            value={form.contactName}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "contactName", value: e.target.value })}
            placeholder="Jane Smith"
            className={inputClass()}
          />
        </div>
        <div>
          <label className={labelClass(true)}>Your Role</label>
          <input
            type="text"
            value={form.contactRole}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "contactRole", value: e.target.value })}
            placeholder="COO, Founder, Operations Lead..."
            className={inputClass()}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass(true)}>Email</label>
          <input
            type="email"
            value={form.contactEmail}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "contactEmail", value: e.target.value })}
            placeholder="you@company.com"
            className={inputClass()}
          />
        </div>
        <div>
          <label className={labelClass(false)}>Phone</label>
          <input
            type="tel"
            value={form.contactPhone}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "contactPhone", value: e.target.value })}
            placeholder="(555) 123-4567"
            className={inputClass()}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass(false)}>Preferred Contact</label>
          <select
            value={form.preferredContact}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "preferredContact", value: e.target.value })}
            className={selectClass()}
          >
            <option value="">Select</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="video">Video call</option>
            <option value="async">Async chat (Discord/Slack)</option>
          </select>
        </div>
        <div>
          <label className={labelClass(false)}>Urgency</label>
          <select
            value={form.urgency}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "urgency", value: e.target.value })}
            className={selectClass()}
          >
            <option value="">Select</option>
            <option value="exploring">Just exploring</option>
            <option value="30-90">30-90 days</option>
            <option value="asap">ASAP</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass(false)}>How did you hear about us?</label>
        <select
          value={form.referralSource}
          onChange={(e) => dispatch({ type: "SET_FIELD", field: "referralSource", value: e.target.value })}
          className={selectClass()}
        >
          <option value="">Select</option>
          <option value="referral">Referral</option>
          <option value="linkedin">LinkedIn</option>
          <option value="search">Search engine</option>
          <option value="podcast">Podcast</option>
          <option value="event">Event / Conference</option>
          <option value="other">Other</option>
        </select>
        {form.referralSource === "other" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden mt-2">
            <input
              type="text"
              value={form.referralOther}
              onChange={(e) => dispatch({ type: "SET_FIELD", field: "referralOther", value: e.target.value })}
              placeholder="Please specify"
              className={inputClass()}
            />
          </motion.div>
        )}
      </div>

      <div>
        <label className={labelClass(false)}>Anything else we should know?</label>
        <textarea
          value={form.freeformNotes}
          onChange={(e) => dispatch({ type: "SET_FIELD", field: "freeformNotes", value: e.target.value })}
          placeholder="Freeform thoughts, concerns, or context..."
          rows={3}
          className={`${inputClass()} resize-none`}
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.consentGiven}
          onChange={(e) => dispatch({ type: "SET_FIELD", field: "consentGiven", value: e.target.checked })}
          className="mt-0.5 w-5 h-5 rounded border-axos-border-standard text-axos-accent focus:ring-axos-accent"
        />
        <span className="text-sm text-axos-text-secondary">
          I agree to be contacted about my brain architecture assessment. *
        </span>
      </label>
    </div>
  );
}

// ── Main Wizard Component ────────────────────────────────────────────────────

export function BrainIntakeWizard() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [form, dispatch] = useReducer(formReducer, initialForm);

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: "LOAD_DRAFT", draft: parsed });
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Auto-save to localStorage on every change
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [form]);

  const goNext = () => {
    const validationErrors = validateStep(step, form);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);
    if (step < 6) setStep(step + 1);
  };

  const goBack = () => {
    setErrors([]);
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    const validationErrors = validateStep(step, form);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setIsSuccess(true);
        localStorage.removeItem(STORAGE_KEY);
        dispatch({ type: "RESET" });
        setStep(1);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrors([data.error || "Submission failed. Please try again."]);
      }
    } catch (err) {
      setErrors(["Network error. Please check your connection and try again."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1Business form={form} dispatch={dispatch} />;
      case 2: return <Step2People form={form} dispatch={dispatch} />;
      case 3: return <Step3Workflows form={form} dispatch={dispatch} />;
      case 4: return <Step4Software form={form} dispatch={dispatch} />;
      case 5: return <Step5AIPosture form={form} dispatch={dispatch} />;
      case 6: return <Step6Contact form={form} dispatch={dispatch} />;
      default: return null;
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-[960px] mx-auto">
        {/* Header */}
        <AnimatedSection>
          <h2
            className="font-serif text-3xl sm:text-4xl text-axos-text-primary mb-3 text-center"
            style={{ letterSpacing: "-0.02em" }}
          >
            Brain Architecture Assessment
          </h2>
          <p className="text-axos-text-secondary text-center max-w-lg mx-auto mb-10 text-sm">
            Map your business so we can design the right AI architecture.
          </p>
        </AnimatedSection>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            {steps.map(({ id, label, icon: Icon }) => (
              <div key={id} className="flex flex-col items-center flex-1 relative">
                <button
                  type="button"
                  onClick={() => { if (id <= step) setStep(id); }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all mb-1 ${
                    id === step
                      ? "bg-axos-accent text-white shadow-lg shadow-axos-accent-glow"
                      : id < step
                        ? "bg-axos-accent/20 text-axos-accent"
                        : "bg-axos-bg-elevated text-axos-text-muted border border-axos-border-subtle"
                  }`}
                >
                  {id < step ? <Check size={18} /> : <Icon size={18} />}
                </button>
                <span className={`text-xs font-medium hidden sm:block ${
                  id === step ? "text-axos-accent" : id < step ? "text-axos-text-secondary" : "text-axos-text-muted"
                }`}>
                  {label}
                </span>
                {id < steps.length && (
                  <div className={`absolute top-5 left-[calc(50%+20px)] right-[calc(-50%+20px)] h-0.5 transition-colors ${
                    id < step ? "bg-axos-accent/30" : "bg-axos-border-subtle"
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-xs text-axos-text-muted mt-1 sm:hidden">
            Step {step} of 6: {steps[step - 1].label}
          </div>
        </div>

        {/* Form Card */}
        <AnimatedSection delay={0.1}>
          <div className="rounded-2xl border border-axos-border-subtle bg-axos-bg-surface shadow-sm p-6 sm:p-8">
            {/* Errors */}
            <AnimatePresence mode="wait">
              {errors.length > 0 && (
                <motion.div
                  key="errors"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <ErrorList errors={errors} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 rounded-xl border border-axos-success/30 bg-axos-success/10 p-5 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-axos-success/20 flex items-center justify-center shrink-0">
                    <Check size={20} className="text-axos-success" />
                  </div>
                  <div>
                    <p className="font-medium text-axos-text-primary">Submitted successfully!</p>
                    <p className="text-sm text-axos-text-secondary">We&apos;ll review your architecture needs and be in touch within 24 hours.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-axos-border-subtle">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1 || isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-axos-text-secondary hover:bg-axos-bg-elevated transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} /> Back
              </button>

              <div className="flex items-center gap-3">
                {step < 6 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-axos-accent text-white font-medium hover:bg-axos-accent-hover transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-axos-accent-glow/30"
                  >
                    Next <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-axos-accent text-white font-medium hover:bg-axos-accent-hover transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-axos-accent-glow/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        Submit Assessment <Send size={18} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Draft saved indicator */}
          <p className="text-center text-xs text-axos-text-muted mt-4">
            Draft auto-saved locally. You can close and return anytime.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
