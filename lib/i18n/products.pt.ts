import type { Product } from "@/lib/site";

/** Portuguese (Portugal) text for each product. The picture files, slugs and web addresses stay the same. */
type PtProduct = Pick<Product, "name" | "tileSpec" | "heroTitle" | "heroText" | "glance" | "uses" | "captions">;

export const PRODUCTS_PT: Record<string, PtProduct> = {
  transformers: {
    name: "Transformadores",
    tileSpec: "Em óleo, até 20 MVA e 33 kV, para renováveis e distribuição",
    heroTitle: "Transformadores para renováveis e distribuição.",
    heroText: "Em óleo, até 20 MVA e 33 kV, desenvolvidos de acordo com a sua especificação.",
    captions: { "1.jpg": "BESS de 2,7 MVA", "2.jpg": "IDT ECO TIER2 de 1 MVA (perdas reduzidas)", "3.jpg": "Nave de produção da fábrica" },
    glance: [
      ["Potência", "Até 20 MVA"],
      ["Classe de tensão", "Até 33 kV"],
      ["Arrefecimento", "Em óleo"],
      ["Aplicações", "Centrais solares, parques eólicos, armazenamento de energia em baterias, redes de distribuição"],
      ["Certificações", "Certificação CE para a Europa. Aprovado também por organismos indianos."],
      ["Abordagem", "Feito à medida da sua especificação"],
      ["Experiência", "Especializamo-nos em transformadores IDT para renováveis e transformadores de distribuição, com foco nos mercados de exportação. Também fabricamos por subcontratação, sob a sua marca."],
    ],
    uses: [
      ["Solar", "Transformadores elevadores para a saída dos inversores."],
      ["Eólica", "Transformadores para a recolha de energia em parques eólicos."],
      ["Armazenamento em baterias", "Transformadores para a ligação de sistemas BESS."],
      ["Distribuição", "Abastecimento de redes e de instalações industriais."],
    ],
  },
  "compact-substations": {
    name: "Postos de Transformação Compactos",
    tileSpec: "BT, MT e AT numa única unidade compacta",
    heroTitle: "Postos de transformação completos e compactos.",
    heroText: "Quadro de BT, MT com transformador e AT com RMU ou VCB, numa única unidade.",
    glance: [
      ["Secções", "Quadro de BT, MT com transformador, AT com RMU ou VCB"],
      ["Utilizações", "Projetos de energias renováveis, indústria, infraestruturas"],
      ["Certificações", "Certificação CE para a Europa. Aprovado também por organismos indianos."],
      ["Abordagem", "Feito à medida da sua especificação"],
    ],
  },
  "lv-switchboards": {
    name: "Quadros de Baixa Tensão",
    tileSpec: "ABB ArTu K, até 6300 A, com resistência a arco interno e sismos",
    heroTitle: "Quadros de baixa tensão construídos sobre ABB ArTu K.",
    heroText: "Até 6300 A. IEC 61439, incluindo conformidade com arco interno e sismos.",
    glance: [
      ["Corrente", "Até 6300 A"],
      ["Sistema", "ABB ArTu K"],
      ["Segurança", "IEC 61439, incluindo conformidade com arco interno e sismos"],
      ["Utilizações", "MCC, PCC, sincronização de geradores, PLC, VFD e muitos outros tipos de quadros"],
      ["Experiência", "7 anos como OEM da ABB ArTu K, com soluções entregues em vários países que utilizam aparelhagem ABB"],
    ],
  },
  avrs: {
    name: "Reguladores de Tensão",
    tileSpec: "Secos e em óleo, até 1000 kVA",
    heroTitle: "Reguladores automáticos de tensão.",
    heroText: "Secos e em óleo, até 1000 kVA.",
    glance: [
      ["Potência", "Até 1000 kVA"],
      ["Arrefecimento", "Secos e em óleo"],
      ["Utilizações", "Indústria, empresas de energia, locais remotos"],
    ],
  },
};
