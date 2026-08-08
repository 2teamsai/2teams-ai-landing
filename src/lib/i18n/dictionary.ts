export type Lang = "es" | "en";

export interface Copy {
  nav: {
    teams: string;
    process: string;
    why: string;
    contact: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    h1a: string;
    h1b: string;
    sub: string;
    ctaEnter: string;
    tag1: string;
    tag2: string;
  };
  problem: {
    kicker: string;
    h2: string;
    p: string;
  };
  pillars: {
    kicker: string;
    h2: string;
    items: { h: string; p: string }[];
  };
  teams: {
    kicker: string;
    h2: string;
    p: string;
    ai: { h3: string; p: string; items: string[] };
    growth: { h3: string; p: string; items: string[] };
  };
  audience: {
    kicker: string;
    h2: string;
    p: string;
    industries: string[];
  };
  process: {
    kicker: string;
    h2: string;
    p: string;
    steps: { h: string; p: string }[];
  };
  why: {
    kicker: string;
    h2: string;
    items: { h: string; p: string }[];
  };
  origin: {
    kicker: string;
    h2: string;
    p: string;
  };
  contact: {
    kicker: string;
    h2: string;
    p: string;
    email: string;
    cta: string;
  };
  footer: {
    locations: string;
  };
}

export const dictionary: Record<Lang, Copy> = {
  es: {
    nav: {
      teams: "Equipos",
      process: "Proceso",
      why: "Por qué",
      contact: "Contacto",
      cta: "Hablemos",
    },
    hero: {
      eyebrow: "Agencia de IA + Marketing — USA · Argentina · Colombia",
      h1a: "IA que construye.",
      h1b: "Crecimiento que se acumula.",
      sub: "2Teams.AI une un equipo de ingeniería en IA con un equipo de growth marketing, bajo un mismo techo y un solo contrato.",
      ctaEnter: "Entrar",
      tag1: "Equipo IA",
      tag2: "Equipo Growth",
    },
    problem: {
      kicker: "El costo de no responder a tiempo",
      h2: "Cada consulta sin responder es una venta que se enfría.",
      p: "Muchas empresas pierden una parte importante de sus ingresos por clientes potenciales no atendidos, seguimientos tardíos y tareas manuales repetitivas. Nosotros creamos sistemas de IA autónomos y a medida que responden, gestionan llamadas y optimizan flujos de trabajo las 24 horas, para que tu negocio crezca sin aumentar tus costos operativos.",
    },
    pillars: {
      kicker: "Qué hacemos",
      h2: "Tres frentes, un solo sistema.",
      items: [
        {
          h: "Velocidad de respuesta",
          p: "De horas a segundos: agentes multicanal en WhatsApp, llamadas y chat web que capturan y califican leads en tiempo real.",
        },
        {
          h: "Software a medida",
          p: "Automatización diseñada en función de tus procesos actuales, sin plantillas rígidas ni programas genéricos.",
        },
        {
          h: "Escala sin overhead",
          p: "Procesá hasta 10 veces más consultas sin necesidad de contratar más personal de forma inmediata.",
        },
      ],
    },
    teams: {
      kicker: "Cómo trabajamos",
      h2: "Dos equipos, un solo entregable.",
      p: "No coordinás dos proveedores. Un equipo diseña la inteligencia, el otro la pone frente a tus clientes — y responden por el mismo resultado.",
      ai: {
        h3: "Ingeniería de IA",
        p: "Agentes y automatizaciones a medida, integrados con lo que ya usás.",
        items: [
          "Chatbots multicanal — WhatsApp, web, voz",
          "Automatización de flujos con n8n",
          "Agentes IA a medida para tu operación",
          "Integración con tus sistemas actuales",
        ],
      },
      growth: {
        h3: "Marketing & Growth",
        p: "Estrategia y ejecución para que ese producto llegue a más gente.",
        items: [
          "Estrategia de contenido y marca",
          "Campañas pagas (Meta, Google)",
          "SEO y posicionamiento orgánico",
          "Gestión de redes y comunidad",
        ],
      },
    },
    audience: {
      kicker: "A quién ayudamos",
      h2: "Pensado para negocios con flujo constante de consultas.",
      p: "Trabajamos con pequeñas y medianas empresas que reciben consultas de forma constante y sienten que están perdiendo ventas por lentitud en el seguimiento o procesos manuales duplicados.",
      industries: [
        "Servicios profesionales",
        "Inmobiliarias",
        "Construcción y remodelación",
        "E-commerce",
        "Clínicas y servicios de salud",
      ],
    },
    process: {
      kicker: "Cómo empezamos",
      h2: "De la auditoría al sistema optimizado.",
      p: "Tres etapas, un solo equipo detrás de cada una.",
      steps: [
        {
          h: "Auditoría de automatización",
          p: "Mapeamos tu proceso actual de atención al cliente e identificamos dónde el trabajo manual está generando pérdidas.",
        },
        {
          h: "Desarrollo e integración",
          p: "Creamos los agentes de IA y flujos de trabajo, ajustados al tono de tu marca y a tus herramientas internas.",
        },
        {
          h: "Implementación y optimización",
          p: "Ponemos en marcha los sistemas con capacitación para tu equipo, y monitoreamos su rendimiento de forma constante.",
        },
      ],
    },
    why: {
      kicker: "Por qué 2Teams",
      h2: "Lo que cambia al tener un solo socio.",
      items: [
        {
          h: "Cobertura horaria extendida",
          p: "Equipo distribuido entre EE.UU., Argentina y Colombia — más horas cubiertas, sin fricción de husos horarios.",
        },
        {
          h: "Un solo punto de contacto",
          p: "No coordinás una agencia de marketing y otra de tecnología por separado. Un equipo, una responsabilidad.",
        },
        {
          h: "Bilingüe de origen",
          p: "Trabajamos en español e inglés de forma nativa — no como traducción, sino como parte del equipo.",
        },
      ],
    },
    origin: {
      kicker: "Nuestro origen",
      h2: "Tres países, un mismo equipo.",
      p: "Nacimos como un equipo repartido en tres países, uniendo ingeniería de IA y estrategia de marketing bajo una sola visión: que ninguna empresa tenga que elegir entre tecnología y crecimiento.",
    },
    contact: {
      kicker: "Empecemos",
      h2: "Contanos qué querés construir.",
      p: "Una llamada de 20 minutos para ver si encajamos.",
      email: "hello@2teams.ai",
      cta: "Hablemos",
    },
    footer: {
      locations: "USA · Argentina · Colombia",
    },
  },
  en: {
    nav: {
      teams: "Teams",
      process: "Process",
      why: "Why us",
      contact: "Contact",
      cta: "Let's talk",
    },
    hero: {
      eyebrow: "AI + Marketing agency — USA · Argentina · Colombia",
      h1a: "AI that builds.",
      h1b: "Growth that compounds.",
      sub: "2Teams.AI pairs an AI engineering team with a growth marketing team, under one roof and one contract.",
      ctaEnter: "Enter",
      tag1: "AI Team",
      tag2: "Growth Team",
    },
    problem: {
      kicker: "The cost of not responding in time",
      h2: "Every unanswered inquiry is a sale going cold.",
      p: "Many businesses lose a significant share of their revenue to unattended leads, late follow-ups, and repetitive manual tasks. We build autonomous, custom AI systems that respond, handle calls, and optimize workflows around the clock — so your business grows without growing your operating costs.",
    },
    pillars: {
      kicker: "What we do",
      h2: "Three fronts, one system.",
      items: [
        {
          h: "Response speed",
          p: "From hours to seconds: multichannel agents on WhatsApp, calls, and web chat that capture and qualify leads in real time.",
        },
        {
          h: "Custom-built software",
          p: "Automation designed around your existing processes — no rigid templates, no generic software.",
        },
        {
          h: "Scale without overhead",
          p: "Handle up to 10x more inquiries without needing to hire additional staff right away.",
        },
      ],
    },
    teams: {
      kicker: "How we work",
      h2: "Two teams, one deliverable.",
      p: "You don't coordinate two vendors. One team designs the intelligence, the other puts it in front of your customers — and both answer for the same result.",
      ai: {
        h3: "AI Engineering",
        p: "Custom agents and automations, integrated with what you already use.",
        items: [
          "Multichannel chatbots — WhatsApp, web, voice",
          "Workflow automation with n8n",
          "Custom AI agents for your operation",
          "Integration with your current systems",
        ],
      },
      growth: {
        h3: "Marketing & Growth",
        p: "Strategy and execution so that product reaches more people.",
        items: [
          "Content and brand strategy",
          "Paid campaigns (Meta, Google)",
          "SEO and organic positioning",
          "Social media and community management",
        ],
      },
    },
    audience: {
      kicker: "Who we help",
      h2: "Built for businesses with a steady flow of inquiries.",
      p: "We work with small and mid-sized businesses that receive a steady stream of inquiries and feel they're losing sales to slow follow-up or duplicated manual work.",
      industries: [
        "Professional services",
        "Real estate",
        "Construction & remodeling",
        "E-commerce",
        "Clinics & healthcare services",
      ],
    },
    process: {
      kicker: "How we start",
      h2: "From audit to optimized system.",
      p: "Three stages, the same team behind each one.",
      steps: [
        {
          h: "Automation audit",
          p: "We map your current customer-response process and identify where manual work is costing you.",
        },
        {
          h: "Development & integration",
          p: "We build the AI agents and workflows, tuned to your brand's voice and your internal tools.",
        },
        {
          h: "Rollout & optimization",
          p: "We roll out the systems with training for your team, then monitor performance on an ongoing basis.",
        },
      ],
    },
    why: {
      kicker: "Why 2Teams",
      h2: "What changes when you have one partner.",
      items: [
        {
          h: "Extended time-zone coverage",
          p: "Team spread across the US, Argentina and Colombia — more hours covered, no time-zone friction.",
        },
        {
          h: "One single point of contact",
          p: "You're not coordinating a marketing agency and a tech vendor separately. One team, one accountability.",
        },
        {
          h: "Bilingual by design",
          p: "We work natively in Spanish and English — not as a translation, but as part of the team.",
        },
      ],
    },
    origin: {
      kicker: "Our origin",
      h2: "Three countries, one team.",
      p: "We started as a team spread across three countries, joining AI engineering and marketing strategy under one vision: no business should have to choose between technology and growth.",
    },
    contact: {
      kicker: "Let's start",
      h2: "Tell us what you want to build.",
      p: "A 20-minute call to see if we're a fit.",
      email: "hello@2teams.ai",
      cta: "Let's talk",
    },
    footer: {
      locations: "USA · Argentina · Colombia",
    },
  },
};
