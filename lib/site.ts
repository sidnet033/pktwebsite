export const SITE = {
  name: "Pai Kane Transformers LLP",
  email: "sales@paikane.com",
  groupUrl: "https://paikane.com",
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
  sendTitle: string;
  send: string[];
  ctaTitle: string;
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
    glance: [
      ["Rating", "Up to 20 MVA"],
      ["Voltage class", "Up to 33 kV"],
      ["Cooling", "Oil cooled"],
      ["Applications", "Solar plants, wind farms, battery energy storage, distribution networks"],
      ["Approach", "Engineered to order. We design each unit around your specification."],
    ],
    uses: [
      ["Solar", "Step-up transformers for inverter output."],
      ["Wind", "Transformers for wind farm collection."],
      ["Battery storage", "Transformers for BESS connection."],
      ["Distribution", "Network and industrial supply."],
    ],
    sendTitle: "Send what you have. We will ask for the rest.",
    send: ["Rating (kVA or MVA)", "HV and LV voltage", "Vector group and impedance", "Tap changer needs", "Standard (IEC, IS or other)", "Site ambient and altitude", "Quantity and delivery location", "Any special accessories"],
    ctaTitle: "Need a transformer to spec?",
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
      ["Approach", "Engineered to order around your single line and site."],
    ],
    sendTitle: "Send the single line, or just the load.",
    send: ["Single line diagram (if available)", "HV and LV voltage", "Transformer rating", "HV switching: RMU or VCB", "LV outgoing feeders", "Fault level (kA)", "Site conditions and standards", "Quantity and delivery location"],
    ctaTitle: "Need a substation to spec?",
  },
  {
    slug: "lv-switchboards",
    name: "LV Switchboards",
    tileSpec: "ABB ArTu K, up to 6,300 A, internal arc and seismic compliant",
    heroTitle: "LV switchboards built on ABB ArTu K.",
    heroText: "Up to 6,300 A. Internal arc and seismic compliant.",
    photo: "Photo: switchboard line-up",
    tone: "c",
    // TODO(client): confirm ABB wording and test certificates before launch.
    glance: [
      ["Current", "Up to 6,300 A"],
      ["System", "ABB ArTu K"],
      ["Safety", "Internal arc and seismic compliant"],
      ["Uses", "Main distribution, power control centres, motor control, generator and transformer incomers"],
    ],
    sendTitle: "Single line diagram or just a load list.",
    send: ["Single line diagram (if available)", "Incomer and bus rating", "Fault level (kA)", "Outgoing feeders and motor loads", "Form of separation", "Site conditions and standards"],
    ctaTitle: "Send us your single line.",
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
    sendTitle: "Tell us the supply and the load.",
    send: ["Rating (kVA)", "Input voltage range", "Required output voltage", "Phase and frequency", "Dry or oil cooled", "Site conditions", "Quantity and delivery location"],
    ctaTitle: "Need a voltage regulator?",
  },
];
