export const SITE = {
  name: "Pai Kane Transformers LLP",
  email: "sales@paikane.com",
  url: "https://paikanetransformers.com",
  gtmId: "GTM-W7GLSFBG",
  gaId: "G-VGHZQP24N7",
  groupUrl: "https://paikane.com",
  linkedin: "https://www.linkedin.com/company/pai-kane-transformers-llp/",
  phone: "+91-83298 68939",
  phoneHref: "+918329868939",
  serviceEmail: "productsupport@paikane.com",
  servicePhone: "+91-93250 05811",
  servicePhoneHref: "+919325005811",
  gstin: "30ABGFP2254A1ZY",
  mapsLink: "https://maps.app.goo.gl/mDHgq9Gd6Q2ExF3w9",
  mapsLatLng: "15.6841002,73.7961532",
  address: "58A, Tuem Industrial Estate, Tuem, Pernem, North Goa - 403512",
};

export type Product = {
  slug: string;
  name: string;
  tileSpec: string;
  heroTitle: string;
  heroText: string;
  photo: string;
  tone: "" | "b" | "c" | "d";
  glance: [string, string][];
  uses?: [string, string][];
  /** Optional banner text shown along the bottom of a carousel photo, keyed by filename. */
  captions?: Record<string, string>;
};

export const PRODUCTS: Product[] = [
  {
    slug: "transformers",
    name: "Transformers",
    tileSpec: "Oil cooled, up to 20 MVA and 33 kV, for renewables and distribution",
    heroTitle: "Transformers for renewables and distribution.",
    heroText: "Oil cooled, up to 20 MVA and 33 kV, engineered to your specification.",
    photo: "Photo: oil cooled transformer, solar plant",
    tone: "",
    captions: { "1.jpg": "2.7MVA BESS", "2.jpg": "1MVA IDT ECO TIER2 LOSSES", "3.jpg": "Factory Shopfloor" },
    glance: [
      ["Rating", "Up to 20 MVA"],
      ["Voltage class", "Up to 33 kV"],
      ["Cooling", "Oil cooled"],
      ["Applications", "Solar plants, wind farms, battery energy storage, distribution networks"],
      ["Certifications", "CE certified for Europe. Approved in Indian bodies as well."],
      ["Approach", "Made to your spec"],
      ["Expertise", "We specialize in IDT transformers for renewables & distribution transformers, with a focus on export geographies. We also contract manufacture to your brand"],
    ],
    uses: [
      ["Solar", "Step-up transformers for inverter output."],
      ["Wind", "Transformers for wind farm collection."],
      ["Battery storage", "Transformers for BESS connection."],
      ["Distribution", "Network and industrial supply."],
    ],
  },
  {
    slug: "compact-substations",
    name: "Compact Substations",
    tileSpec: "LV, MV and HV in one packaged unit",
    heroTitle: "Complete packaged substations.",
    heroText: "LV panel, MV with transformer, HV with RMU or VCB, in one unit.",
    photo: "Photo: compact substation",
    tone: "b",
    glance: [
      ["Sections", "LV panel, MV with transformer, HV with RMU or VCB"],
      ["Uses", "Renewable projects, industry, infrastructure"],
      ["Certifications", "CE certified for Europe. Approved in Indian bodies as well."],
      ["Approach", "Made to your spec"],
    ],
  },
  {
    slug: "lv-switchboards",
    name: "LV Switchboards",
    tileSpec: "ABB ArTu K, up to 6,300 A, internal arc and seismic compliant",
    heroTitle: "LV switchboards built on ABB ArTu K.",
    heroText: "Up to 6,300 A. IEC 61439, including internal arc and seismic compliance.",
    photo: "Photo: switchboard line-up",
    tone: "c",
    // TODO(client): confirm ABB wording and test certificates before launch.
    glance: [
      ["Current", "Up to 6,300 A"],
      ["System", "ABB ArTu K"],
      ["Safety", "IEC 61439, including internal arc and seismic compliance"],
      ["Uses", "MCC, PCC, DG Sync, PLC, VFD & many other types of switchboards"],
      ["Expertise", "7 years as ABB ArTuK OEM with solutions delivered across multiple countries using ABB Switchgear"],
    ],
  },
  {
    slug: "avrs",
    name: "Voltage Regulators",
    tileSpec: "Dry and oil cooled, up to 1,000 kVA",
    heroTitle: "Automatic voltage regulators.",
    heroText: "Dry and oil cooled, up to 1,000 kVA.",
    photo: "Photo: AVR",
    tone: "d",
    glance: [
      ["Rating", "Up to 1,000 kVA"],
      ["Cooling", "Dry and oil cooled"],
      ["Uses", "Industry, utilities, remote sites"],
    ],
  },
];

/** "What is this about?" choices on the Contacts form. The email shows the one picked. */
export const TOPICS = ["Product enquiry", "Request a quote", "Service & support", "Partnership / contract manufacturing", "Other"] as const;
