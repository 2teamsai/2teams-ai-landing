export interface SuccessCase {
  id: number;
  company: string;
  industry: string;
  problem: string;
  solution: string;
  results: string[];
  testimonial: string;
  contactName: string;
  contactRole: string;
  accent: "orange" | "violet" | "blue";
}

export const successCases: SuccessCase[] = [
  {
    id: 1,
    company: "TechStore",
    industry: "E-commerce",
    problem: "100+ órdenes diarias, proceso manual, errores constantes.",
    solution: "Sistema de automatización de pedidos con IA.",
    results: [
      "30% reducción en tiempo de procesamiento",
      "2 personas reasignadas a atención al cliente",
      "Tasa de errores: 98% → 0%",
    ],
    testimonial: "En 2 semanas teníamos un sistema que procesaba automáticamente. Increíble.",
    contactName: "Juan Pérez",
    contactRole: "Gerente de Operaciones",
    accent: "orange",
  },
  {
    id: 2,
    company: "Legal Partners",
    industry: "Servicios Profesionales",
    problem: "Abogados gastando 20h/semana en tareas administrativas.",
    solution: "Automatización de trámites y generación de documentos con IA.",
    results: [
      "50% menos tiempo en tareas administrativas",
      "1 persona de soporte reasignada",
      "Más tiempo para casos complejos (ROI real)",
    ],
    testimonial: "Nuestros abogados recuperaron 2 días de la semana. Dinero puro.",
    contactName: "María Gómez",
    contactRole: "Socia Fundadora",
    accent: "violet",
  },
  {
    id: 3,
    company: "Propiedades Plus",
    industry: "Inmobiliario",
    problem: "Procesamiento manual de leads, muchos caen en el camino.",
    solution: "Chatbot + sistema de calificación de leads con IA.",
    results: [
      "60% más leads procesados",
      "Conversión: 15% → 35%",
      "Equipo de ventas 40% más productivo",
    ],
    testimonial: "El chatbot hace el 80% del trabajo que antes hacían 2 personas.",
    contactName: "Carlos Ruiz",
    contactRole: "Director Comercial",
    accent: "blue",
  },
];
