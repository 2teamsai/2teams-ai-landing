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
    slogan: string;
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
    detail: string;
  };
  pillars: {
    kicker: string;
    h2: string;
    p: string;
    items: { h: string; p: string }[];
  };
  differentiators: {
    kicker: string;
    statement: string;
    points: string[];
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
    businessLabel: string;
    businessLead: string;
    industries: string[];
    peopleLabel: string;
    peopleLead: string;
    peopleTopics: string[];
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
  successCases: {
    kicker: string;
    h2: string;
    p: string;
    resultsLabel: string;
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
  chat: {
    title: string;
    greeting: string;
    placeholder: string;
    send: string;
    thinking: string;
    error: string;
    openLabel: string;
    closeLabel: string;
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
      slogan: "Soluciones Inteligentes",
      h1a: "IA que construye.",
      h1b: "Crecimiento que se acumula.",
      sub: "2Teams.AI une un equipo de ingeniería en IA con un equipo de growth marketing, bajo un mismo techo y un solo contrato.",
      ctaEnter: "Entrar",
      tag1: "Equipo IA",
      tag2: "Equipo Growth",
    },
    problem: {
      kicker: "Automatización inteligente",
      h2: "Software con IA integrada, no funciones agregadas.",
      p: "Automatizamos tu operación y aceleramos tu crecimiento — con IA integrada, no como función agregada. Rediseñamos tu negocio con IA en el centro para resolver problemas estratégicos: procesos, marketing y growth. Trabajamos con empresas que quieren escalar sin sumar carga operativa, y con personas que quieren aprender a usar la IA en su día a día.",
      detail: "Muchas empresas pierden una parte importante de sus ingresos por clientes potenciales no atendidos, seguimientos tardíos y tareas manuales repetitivas. Construimos sistemas con IA integrada que responden, gestionan llamadas y optimizan flujos de trabajo las 24 horas, para que tu negocio crezca sin aumentar tus costos operativos.",
    },
    pillars: {
      kicker: "Qué hacemos",
      h2: "Seis frentes, un solo sistema.",
      p: "Crecimiento + eficiencia — no elegís uno. Con IA integrada, escalamos tu negocio y optimizamos tu operación al mismo tiempo: menos personal, más clientes, mayor margen.",
      items: [
        {
          h: "Velocidad de respuesta",
          p: "De horas a segundos: agentes con IA integrada en WhatsApp, llamadas y chat web que capturan y califican leads en tiempo real — sin sumar personal al equipo.",
        },
        {
          h: "Software con IA integrada",
          p: "No agregamos una función de IA a tu sistema: lo rediseñamos con IA en el centro, para automatizar el proceso completo — no una tarea suelta.",
        },
        {
          h: "Growth Marketing Automatizado",
          p: "Campañas optimizadas 24/7 con IA que analiza datos en tiempo real — reducí tu costo de adquisición hasta un 30%, sin sumar freelancers.",
        },
        {
          h: "Estrategia de Contenido y Social Media",
          p: "Contenido generado y optimizado con IA, planificación automática y community management asistido — publicá 3 veces más sin triplicar el equipo.",
        },
        {
          h: "Escala sin overhead",
          p: "Procesá hasta 10 veces más consultas con IA integrada en tu operación — ahorrás el costo de contratar, capacitar y coordinar personal nuevo.",
        },
        {
          h: "Educación en IA para personas",
          p: "Asesoramiento y educación en IA — aprendé a integrar modelos como Gemini, ChatGPT y Claude en tu vida cotidiana: finanzas, email, agenda, productividad.",
        },
      ],
    },
    differentiators: {
      kicker: "Nuestro diferencial",
      statement: "No vendemos Inteligencia Artificial. Vendemos resultados.",
      points: [
        "Sistemas que trabajan 24/7 mientras descansás",
        "Escalás sin contratar más personal",
        "Resolvemos problemas grandes, no features",
        "Automatización de verdad, no simulación",
      ],
    },
    teams: {
      kicker: "Cómo trabajamos",
      h2: "Dos equipos, un solo entregable.",
      p: "No coordinás dos proveedores. Un equipo diseña la inteligencia, el otro la pone frente a tus clientes — y responden por el mismo resultado.",
      ai: {
        h3: "Ingeniería de IA",
        p: "Agentes y automatizaciones con IA integrada, conectados con lo que ya usás.",
        items: [
          "Automatizar procesos repetitivos",
          "Responder emails automáticamente",
          "Agendar citas sin intervención manual",
          "Generar reportes automáticos",
          "Alertas inteligentes para lo importante",
          "Procesar documentos sin intervención",
          "Análisis de datos en tiempo real",
        ],
      },
      growth: {
        h3: "Marketing & Growth",
        p: "Estrategia y ejecución para que ese producto llegue a más gente.",
        items: [
          "Crear contenido automáticamente",
          "Publicar en redes sin estar pendiente",
          "Saber qué vende y qué no",
          "Responder clientes automáticamente",
          "Campañas que se ajustan solas",
          "Encontrar tu cliente ideal automáticamente",
          "Mensajes personalizados sin escribirlos",
        ],
      },
    },
    audience: {
      kicker: "A quién ayudamos",
      h2: "Trabajamos con empresas y con personas.",
      p: "Trabajamos en cualquier industria. Lo que importa es que el problema sea estratégico y la solución requiera IA integrada — no una función suelta. En todos los rubros hay una rama de growth: más leads, más conversión, más contenido, con menos esfuerzo manual.",
      businessLabel: "Para empresas",
      businessLead:
        "Pensado para negocios con flujo constante de consultas que sienten que están perdiendo ventas por lentitud en el seguimiento o procesos manuales duplicados.",
      industries: [
        "Servicios profesionales",
        "Inmobiliarias",
        "Construcción y remodelación",
        "E-commerce",
        "Clínicas y servicios de salud",
        "Logística y distribución",
        "Finanzas y seguros",
        "Retail",
        "Agencias de marketing",
        "SaaS y startups",
      ],
      peopleLabel: "Para personas",
      peopleLead:
        "Asesoramiento y educación en IA para quienes quieren aprender a integrarla en su vida cotidiana — sin volverse técnicos, solo más eficientes.",
      peopleTopics: ["Finanzas personales", "Email y comunicación", "Agenda y productividad", "Aprendizaje continuo"],
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
          h: "Hablamos inglés",
          p: "De forma nativa, no traducido — hablamos con vos y con tus clientes en el idioma que necesiten.",
        },
        {
          h: "IA que optimiza campañas sin freelancers",
          p: "Ajustamos presupuesto, segmentación y creatividades en tiempo real — sin depender de un freelancer part-time.",
        },
        {
          h: "Análisis de datos en tiempo real",
          p: "Vemos qué funciona (y qué no) al instante, no en un reporte mensual armado a mano.",
        },
        {
          h: "Escalabilidad de contenido sin aumentar equipo",
          p: "Multiplicás tu producción de contenido sin multiplicar tu nómina.",
        },
      ],
    },
    origin: {
      kicker: "Nuestro origen",
      h2: "Tres países, un mismo equipo.",
      p: "Nacimos como un equipo repartido en tres países, uniendo ingeniería de IA y estrategia de marketing bajo una sola visión: que ninguna empresa tenga que elegir entre tecnología y crecimiento.",
    },
    successCases: {
      kicker: "Casos de éxito",
      h2: "Casos de Éxito",
      p: "Resultados reales de empresas que confiaron en 2Teams.AI.",
      resultsLabel: "Resultado clave",
    },
    contact: {
      kicker: "Empecemos",
      h2: "Contanos qué querés construir.",
      p: "Una llamada de 20 minutos para ver si encajamos.",
      email: "helloworld@2teams-ai.com",
      cta: "Hablemos",
    },
    footer: {
      locations: "USA · Argentina · Colombia",
    },
    chat: {
      title: "Teambot",
      greeting: "¡Hola! Soy Teambot, el asistente de 2Teams.AI 🧠 ¿Cuál es tu nombre? ¿En qué puedo ayudarte?",
      placeholder: "Escribí tu mensaje...",
      send: "Enviar",
      thinking: "Escribiendo...",
      error: "Uy, algo falló. Probá de nuevo en un momento.",
      openLabel: "Abrir chat",
      closeLabel: "Cerrar chat",
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
      slogan: "Intelligent Solutions",
      h1a: "AI that builds.",
      h1b: "Growth that compounds.",
      sub: "2Teams.AI pairs an AI engineering team with a growth marketing team, under one roof and one contract.",
      ctaEnter: "Enter",
      tag1: "AI Team",
      tag2: "Growth Team",
    },
    problem: {
      kicker: "Intelligent automation",
      h2: "Software with AI built in, not features bolted on.",
      p: "We automate your operations and accelerate your growth — with AI built in, not bolted on as a feature. We redesign your business with AI at the core to solve strategic problems: operations, marketing, and growth. We work with businesses that want to scale without adding operational overhead, and with people who want to learn to use AI in their everyday life.",
      detail:
        "Many businesses lose a significant share of their revenue to unattended leads, late follow-ups, and repetitive manual tasks. We build systems with AI built in that respond, handle calls, and optimize workflows around the clock — so your business grows without growing your operating costs.",
    },
    pillars: {
      kicker: "What we do",
      h2: "Six fronts, one system.",
      p: "Growth + efficiency — you don't have to pick one. With AI built in, we scale your business and optimize your operations at the same time: less headcount, more customers, higher margin.",
      items: [
        {
          h: "Response speed",
          p: "From hours to seconds: agents with AI built in on WhatsApp, calls, and web chat that capture and qualify leads in real time — without adding headcount.",
        },
        {
          h: "Software with AI built in",
          p: "We don't bolt an AI feature onto your system: we redesign it with AI at the core, to automate the entire process — not a single task.",
        },
        {
          h: "Automated growth marketing",
          p: "Campaigns that optimize themselves 24/7 with AI analyzing real-time data — cut your customer acquisition cost by up to 30%, without adding freelancers.",
        },
        {
          h: "Content strategy & social media",
          p: "AI-generated and AI-optimized content, automatic planning, and assisted community management — publish 3x more without tripling your team.",
        },
        {
          h: "Scale without overhead",
          p: "Handle up to 10x more inquiries with AI built into your operation — save the cost of hiring, training, and coordinating new staff.",
        },
        {
          h: "AI education for individuals",
          p: "Coaching and education in AI — learn to use models like Gemini, ChatGPT, and Claude in your everyday life: finances, email, calendar, productivity.",
        },
      ],
    },
    differentiators: {
      kicker: "Our difference",
      statement: "We don't sell Artificial Intelligence. We sell results.",
      points: [
        "Systems that work 24/7 while you rest",
        "You scale without hiring more people",
        "We solve big problems, not features",
        "Real automation, not a demo",
      ],
    },
    teams: {
      kicker: "How we work",
      h2: "Two teams, one deliverable.",
      p: "You don't coordinate two vendors. One team designs the intelligence, the other puts it in front of your customers — and both answer for the same result.",
      ai: {
        h3: "AI Engineering",
        p: "Agents and automations with AI built in, connected to what you already use.",
        items: [
          "Automate repetitive processes",
          "Reply to emails automatically",
          "Schedule appointments with no manual work",
          "Generate reports automatically",
          "Smart alerts for what matters",
          "Process documents with no manual work",
          "Real-time data analysis",
        ],
      },
      growth: {
        h3: "Marketing & Growth",
        p: "Strategy and execution so that product reaches more people.",
        items: [
          "Create content automatically",
          "Post on social without babysitting it",
          "Know what's selling and what's not",
          "Reply to customers automatically",
          "Campaigns that adjust themselves",
          "Find your ideal customer automatically",
          "Personalized messages without writing them",
        ],
      },
    },
    audience: {
      kicker: "Who we help",
      h2: "We work with businesses and with individuals.",
      p: "We work in any industry. What matters is that the problem is strategic and the solution requires AI built in — not a bolted-on feature. Every industry has a growth angle: more leads, more conversion, more content, with less manual effort.",
      businessLabel: "For businesses",
      businessLead:
        "Built for businesses with a steady flow of inquiries that feel they're losing sales to slow follow-up or duplicated manual work.",
      industries: [
        "Professional services",
        "Real estate",
        "Construction & remodeling",
        "E-commerce",
        "Clinics & healthcare services",
        "Logistics & distribution",
        "Finance & insurance",
        "Retail",
        "Marketing agencies",
        "SaaS & startups",
      ],
      peopleLabel: "For individuals",
      peopleLead:
        "Coaching and education in AI for people who want to weave it into their everyday life — not to become technical, just more efficient.",
      peopleTopics: ["Personal finances", "Email & communication", "Calendar & productivity", "Continuous learning"],
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
          h: "We speak English",
          p: "Natively, not translated — we talk to you and your customers in whichever language they need.",
        },
        {
          h: "AI that optimizes campaigns without freelancers",
          p: "We adjust budget, targeting, and creative in real time — no part-time freelancer required.",
        },
        {
          h: "Real-time data analysis",
          p: "We see what's working (and what isn't) instantly, not in a hand-built monthly report.",
        },
        {
          h: "Content scalability without growing your team",
          p: "Multiply your content output without multiplying headcount.",
        },
      ],
    },
    origin: {
      kicker: "Our origin",
      h2: "Three countries, one team.",
      p: "We started as a team spread across three countries, joining AI engineering and marketing strategy under one vision: no business should have to choose between technology and growth.",
    },
    successCases: {
      kicker: "Success cases",
      h2: "Success Cases",
      p: "Real results from companies that trusted 2Teams.AI.",
      resultsLabel: "Key results",
    },
    contact: {
      kicker: "Let's start",
      h2: "Tell us what you want to build.",
      p: "A 20-minute call to see if we're a fit.",
      email: "helloworld@2teams-ai.com",
      cta: "Let's talk",
    },
    footer: {
      locations: "USA · Argentina · Colombia",
    },
    chat: {
      title: "Teambot",
      greeting: "Hi! I'm Teambot, 2Teams.AI's assistant 🧠 What's your name? How can I help?",
      placeholder: "Type your message...",
      send: "Send",
      thinking: "Typing...",
      error: "Oops, something failed. Try again in a moment.",
      openLabel: "Open chat",
      closeLabel: "Close chat",
    },
  },
};
