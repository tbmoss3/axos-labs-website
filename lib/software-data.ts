export const softwareCategories = [
  {
    name: "CRM & Sales",
    tools: [
      "Salesforce", "HubSpot CRM", "Pipedrive", "Zoho CRM", "Microsoft Dynamics",
      "Freshsales", "Close", "Copper", "Insightly", "Nimble", "Zendesk Sell",
      "Keap", "SugarCRM", "Act!", " amoCRM"
    ]
  },
  {
    name: "Accounting & Finance",
    tools: [
      "QuickBooks Online", "QuickBooks Desktop", "Xero", "FreshBooks", "Sage",
      "NetSuite ERP", "Wave", "Bill.com", "Stripe", "Square", "Expensify",
      "Bench", "Pilot", "Concur", "Gusto Payroll"
    ]
  },
  {
    name: "Operations & ERP",
    tools: [
      "SAP ERP", "Oracle NetSuite", "Odoo", "Fishbowl", "Katana",
      "JobBOSS", "Procore", "Buildertrend", "ServiceTitan", "Housecall Pro",
      "FieldPulse", "Jonas Premier", "COINS", "Viewpoint", "CMiC"
    ]
  },
  {
    name: "Property Management",
    tools: [
      "RentManager", "AppFolio", "Yardi Voyager", "MRI Software", "Buildium",
      "TurboTenant", "TenantCloud", "ResMan", "Entrata", "OnSite Property Manager"
    ]
  },
  {
    name: "HR & People",
    tools: [
      "Gusto", "BambooHR", "Workday", "ADP", "Paylocity",
      "Rippling", "Deel", "15Five", "Lattice", "Greenhouse",
      "Lever", "Zenefits", "TriNet", "Justworks", "Namely"
    ]
  },
  {
    name: "Communication",
    tools: [
      "Slack", "Microsoft Teams", "Discord", "Zoom", "Google Meet",
      "Loom", "Twist", "Webex", "RingCentral", "Mattermost",
      "Telegram", "Signal", "WhatsApp Business"
    ]
  },
  {
    name: "Project Management",
    tools: [
      "Asana", "Monday.com", "ClickUp", "Notion", "Trello",
      "Basecamp", "Wrike", "Smartsheet", "Jira", "Linear",
      "Teamwork", "Podio", "Airtable", "Miro", "Confluence"
    ]
  },
  {
    name: "Marketing",
    tools: [
      "HubSpot Marketing", "Mailchimp", "Klaviyo", "ActiveCampaign", "Marketo",
      "SEMrush", "Ahrefs", "Hootsuite", "Buffer", "Canva",
      "Sprout Social", "CoSchedule", "Iterable", "Braze", "Customer.io"
    ]
  },
  {
    name: "Data & BI",
    tools: [
      "Tableau", "Power BI", "Looker", "Metabase", "Mode",
      "Snowflake", "BigQuery", "Redshift", "Databricks", "Segment",
      "Mixpanel", "Amplitude", "Fivetran", "dbt", "Apache Superset"
    ]
  },
  {
    name: "Infrastructure & Dev",
    tools: [
      "AWS", "Azure", "GCP", "Vercel", "Railway",
      "DigitalOcean", "Linode", "Cloudflare", "Docker", "Kubernetes",
      "Terraform", "GitHub", "GitLab", "Bitbucket", "Heroku"
    ]
  },
  {
    name: "Legal & Compliance",
    tools: [
      "DocuSign", "Clio", "MyCase", "PracticePanther", "LawPay",
      "Ironclad", "ContractWorks", "NetDocuments", "iManage", "LEAP",
      "Smokeball", "Filevine", "Actionstep", "CosmoLex", "TimeSolv"
    ]
  },
  {
    name: "E-commerce",
    tools: [
      "Shopify", "WooCommerce", "BigCommerce", "Magento", "Squarespace Commerce",
      "Wix eCommerce", "Stripe", "Klaviyo", "ShipStation", "ShipBob",
      "Ordoro", "EasyPost", "ReCharge", "Yotpo", "Loox"
    ]
  },
  {
    name: "Customer Support",
    tools: [
      "Zendesk", "Freshdesk", "Intercom", "Help Scout", "Crisp",
      "LiveChat", "Drift", "HubSpot Service Hub", "Salesforce Service Cloud", "Kustomer",
      "Gladly", "Front", "Olark", "Tidio", "Chatwoot"
    ]
  },
  {
    name: "Design & Creative",
    tools: [
      "Figma", "Adobe Creative Cloud", "Sketch", "InVision", "Canva",
      "Framer", "Webflow", "Blender", "AutoCAD", "SolidWorks",
      "Revit", "Archicad", "Lumion", "Cinema 4D", "Rhino"
    ]
  },
  {
    name: "Security & IT",
    tools: [
      "CrowdStrike", "SentinelOne", "1Password", "LastPass", "Okta",
      "Duo", "JumpCloud", "NinjaOne", "Datto", "ConnectWise",
      "Kaseya", "Atera", "N-able", "Huntress", "ThreatLocker"
    ]
  },
  {
    name: "Email & Calendar",
    tools: [
      "Gmail/Google Workspace", "Microsoft Outlook/365", "ProtonMail", "Superhuman",
      "Front", "Mailbird", "Spark", "Thunderbird", "Calendly", "SavvyCal",
      " Chili Piper", "Reclaim.ai", "Clockwise", "Motion"
    ]
  },
  {
    name: "Document & Knowledge",
    tools: [
      "Google Docs/Drive", "Microsoft SharePoint", "Notion", "Confluence",
      "Dropbox", "Box", "OneDrive", "Evernote", "Obsidian", "Roam Research",
      "Quip", "Coda", "Slite", "Tettra", "Document360"
    ]
  },
  {
    name: "Custom / In-House",
    tools: [
      "Custom-built software", "Excel spreadsheets", "Access database",
      "Google Sheets workflows", "Paper-based processes", "Whiteboard/Kanban wall",
      "Email-based workflows"
    ]
  }
] as const;

export type SoftwareCategory = typeof softwareCategories[number]["name"];
export type SoftwareTool = typeof softwareCategories[number]["tools"][number];

/** Flatten all tools for search */
export const allSoftwareTools = softwareCategories.flatMap((cat) =>
  cat.tools.map((tool) => ({
    name: tool,
    category: cat.name,
  }))
);

/** Search tools by query string (case-insensitive) */
export function searchSoftware(query: string, limit = 20) {
  const q = query.toLowerCase().trim();
  if (!q) return allSoftwareTools.slice(0, limit);
  return allSoftwareTools
    .filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    )
    .slice(0, limit);
}
