import "./ServiceFlowDiagram.css";

// ─── Types ──────────────────────────────────────────────────
interface Step {
  icon: string;
  label: string;
  sub: string;
}

interface KPI {
  num: string;
  suf?: string;
  desc: string;
}

interface ServiceConfig {
  id: string;
  kind: string;
  layout: "linear" | "branch" | "circle" | "gate";
  steps: Step[];
  centerBig?: string;
  centerSmall?: string;
  value: string;
  capabilities: string[];
  kpis: KPI[];
}

interface ServiceFlowDiagramProps {
  serviceId: string;
}

// ─── Colors ─────────────────────────────────────────────────
const C = {
  primary: "#003865",
  accent: "#FF585D",
  ink: "#1a2942",
  ink2: "#4a5a76",
  ink3: "#5b6c87",
  bg: "#f1f5fa",
  line2: "#c8d1de",
} as const;

// ─── SVG Icon Paths ─────────────────────────────────────────
const ICON_PATHS: Record<string, string> = {
  database:
    "M4 6c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3z M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6 M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6",
  search: "m21 21-4.34-4.34 M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z",
  target:
    "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0 M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0 M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  cpu: "M4 4h16v16H4z M9 1v3 M15 1v3 M9 20v3 M15 20v3 M20 9h3 M20 14h3 M1 9h3 M1 14h3 M9 9h6v6H9z",
  zap: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  trending: "m22 7-8.5 8.5-5-5L2 17 M16 7h6v6",
  upload:
    "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  bars: "M3 3v18h18 M7 16V9 M12 16v-5 M17 16v-7",
  eye: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
  play: "m6 3 14 9-14 9V3z",
  message:
    "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  award:
    "M22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24l5.45 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24z",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8",
  package:
    "m7.5 4.27 9 5.15 M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z M3.27 6.96 12 12.01l8.73-5.05 M12 22.08V12",
  clock:
    "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0 M12 6v6l4 2",
  flask:
    "M14 2v6a2 2 0 0 0 .25.96l5.5 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.75-2.96l5.5-10.08A2 2 0 0 0 10 8V2 M6.45 15h11.1 M8.5 2h7",
  refresh:
    "M3 12a9 9 0 0 1 15-6.7L21 8 M21 3v5h-5 M21 12a9 9 0 0 1-15 6.7L3 16 M3 21v-5h5",
  sparkle:
    "M12 3 13.6 10.4 21 12 13.6 13.6 12 21 10.4 13.6 3 12 10.4 10.4 z M19 4 19.6 6.4 22 7 19.6 7.6 19 10 18.4 7.6 16 7 18.4 6.4 z",
  compass:
    "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0 M16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 z",
  atom: "M11 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0 M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z M3.8 20.2c2.03 2.04 7.36.02 11.9-4.5 4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9z",
  chatdots:
    "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z M8 12h.01 M12 12h.01 M16 12h.01",
};

// ─── ViewBox for positioned layouts ─────────────────────────
const VB_W = 1000;
const VB_H = 600;

// ─── Service Data ───────────────────────────────────────────
const SERVICES: Record<string, ServiceConfig> = {
  "analisis-datos": {
    id: "analisis-datos",
    kind: "Flujo lineal · 4 etapas",
    layout: "linear",
    steps: [
      { icon: "database", label: "Datos actuales", sub: "ERP, CRM, planillas" },
      { icon: "search", label: "Análisis", sub: "Patrones y outliers" },
      { icon: "sparkle", label: "Insights", sub: "Hallazgos accionables" },
      { icon: "target", label: "Decisión", sub: "Estrategia con evidencia" },
    ],
    value: "Convertimos datos dispersos en decisiones ejecutivas accionables.",
    capabilities: [
      "Integración y limpieza de fuentes heterogéneas (ERP, CRM, planillas, APIs)",
      "Análisis exploratorio y estadístico",
      "Detección de patrones, correlaciones y anomalías",
      "Segmentación de clientes, productos y operaciones",
    ],
    kpis: [
      { num: "60", suf: "–80%", desc: "menos tiempo en generación de reportes" },
      { num: "15", suf: "–25%", desc: "más precisión en pronósticos" },
      { num: "USD", desc: "ahorros e ingresos identificados y medibles" },
    ],
  },
  "machine-learning": {
    id: "machine-learning",
    kind: "Modelo predictivo · 5 etapas",
    layout: "branch",
    steps: [
      { icon: "users", label: "Datos históricos", sub: "Etiquetados" },
      { icon: "cpu", label: "Entrenamiento", sub: "Modelo a medida" },
      { icon: "target", label: "Predicción", sub: "Demanda · riesgo" },
      { icon: "zap", label: "Automatización", sub: "Acciones por reglas" },
      { icon: "trending", label: "Resultados", sub: "Medibles y auditables" },
    ],
    value: "Modelos predictivos que anticipan el comportamiento de tu negocio antes que ocurra.",
    capabilities: [
      "Modelos predictivos (demanda, churn, default, mantención)",
      "Clasificación y scoring",
      "Sistemas de recomendación",
      "Detección de fraude y anomalías",
    ],
    kpis: [
      { num: "70", suf: "–95%", desc: "precisión predictiva sobre línea base" },
      { num: "20", suf: "–40%", desc: "reducción de costos operativos" },
      { num: "6", suf: "–12 meses", desc: "ROI típico" },
    ],
  },
  "business-intelligence": {
    id: "business-intelligence",
    kind: "Ciclo continuo · 5 etapas",
    layout: "circle",
    centerBig: "MEJORA",
    centerSmall: "continua",
    steps: [
      { icon: "upload", label: "Conectar", sub: "Fuentes de datos" },
      { icon: "bars", label: "Visualizar", sub: "Dashboards" },
      { icon: "eye", label: "Monitorear", sub: "KPIs en tiempo real" },
      { icon: "compass", label: "Identificar", sub: "Oportunidades" },
      { icon: "play", label: "Actuar", sub: "De inmediato" },
    ],
    value: "Una sola fuente de verdad para que cada nivel de la organización tome decisiones con los mismos datos.",
    capabilities: [
      "Diseño de data warehouse y modelos dimensionales",
      "KPIs corporativos alineados a estrategia",
      "Dashboards por rol (CEO, CFO, COO, gerencias operativas)",
      "Alertas inteligentes sobre desviaciones",
    ],
    kpis: [
      { num: "70", suf: "%", desc: "menos tiempo preparando reuniones ejecutivas" },
      { num: "3", suf: "–5×", desc: "más uso de datos por gerencias" },
      { num: "100", suf: "%", desc: "alineamiento en KPIs críticos" },
    ],
  },
  nlp: {
    id: "nlp",
    kind: "Pipeline de texto · 4 etapas",
    layout: "linear",
    steps: [
      { icon: "message", label: "Entrada", sub: "Texto o voz del usuario" },
      { icon: "search", label: "Tokenizar", sub: "Análisis sintáctico" },
      { icon: "chatdots", label: "Comprensión", sub: "Intención · contexto · tono" },
      { icon: "award", label: "Respuesta", sub: "Acción inteligente" },
    ],
    value: "Transformamos texto, voz y documentos en información estructurada y decisiones automatizadas.",
    capabilities: [
      "Extracción de información desde contratos y documentos",
      "Análisis de sentimiento y voz del cliente",
      "Clasificación automática de tickets y correos",
      "Resumen ejecutivo de documentos extensos",
    ],
    kpis: [
      { num: "80", suf: "–95%", desc: "menos tiempo en revisión documental" },
      { num: "40", suf: "–60%", desc: "aumento en NPS por respuesta más rápida" },
      { num: "30", suf: "–50%", desc: "ahorro en atención de primer nivel" },
    ],
  },
  "computer-vision": {
    id: "computer-vision",
    kind: "Decisión visual · 5 etapas",
    layout: "gate",
    steps: [
      { icon: "upload", label: "Captura", sub: "Imagen o video" },
      { icon: "eye", label: "Análisis", sub: "Inspección visual" },
      { icon: "award", label: "Aprobado", sub: "Cumple estándares" },
      { icon: "flask", label: "Defecto", sub: "Detectado" },
      { icon: "target", label: "Decisión", sub: "Auditable" },
    ],
    value: "Convertimos imágenes y video en datos operativos en tiempo real.",
    capabilities: [
      "Detección y clasificación de objetos",
      "Control de calidad automatizado en líneas de producción",
      "Reconocimiento facial y de acciones (FACS y derivados)",
      "Análisis de tráfico y comportamiento en retail",
    ],
    kpis: [
      { num: "90", suf: "%", desc: "menos defectos no detectados" },
      { num: "40", suf: "–70%", desc: "ahorro en costos de inspección" },
      { num: "9", suf: "–15 meses", desc: "ROI estimado" },
    ],
  },
  automatizaciones: {
    id: "automatizaciones",
    kind: "Flujo ramificado · 5 etapas",
    layout: "branch",
    steps: [
      { icon: "file", label: "Tarea manual", sub: "Repetitiva" },
      { icon: "zap", label: "Automatización", sub: "Inteligente" },
      { icon: "package", label: "Procesa", sub: "Documentos" },
      { icon: "message", label: "Responde", sub: "Solicitudes" },
      { icon: "clock", label: "Ahorro", sub: "De tiempo medible" },
    ],
    value: "Agentes de IA que ejecutan procesos completos de principio a fin, no solo responden preguntas.",
    capabilities: [
      "Agentes que orquestan múltiples sistemas (ERP, CRM, correo, documentos)",
      "Automatización de procesos de back-office",
      "Agentes de ventas, soporte y operaciones",
      "Flujos de aprobación y validación inteligentes",
    ],
    kpis: [
      { num: "60", suf: "–90%", desc: "menos tiempo de ciclo en procesos automatizados" },
      { num: "2", suf: "–10 FTE", desc: "ahorro equivalente según alcance" },
      { num: "24/7", desc: "disponibilidad operativa" },
    ],
  },
  "data-science": {
    id: "data-science",
    kind: "Ciclo experimental · 5 etapas",
    layout: "circle",
    centerBig: "CICLO",
    centerSmall: "Data Science",
    steps: [
      { icon: "atom", label: "Hipótesis", sub: "De negocio" },
      { icon: "cpu", label: "Diseño", sub: "Experimental" },
      { icon: "play", label: "Ejecución", sub: "Controlada" },
      { icon: "bars", label: "Análisis", sub: "De resultados" },
      { icon: "refresh", label: "Validación", sub: "Y siguiente iteración" },
    ],
    value: "Investigación aplicada que resuelve problemas estratégicos donde no existe una respuesta estándar.",
    capabilities: [
      "Diseño y ejecución de experimentos (A/B, causales)",
      "Modelado estadístico avanzado y simulación",
      "Optimización matemática (precios, rutas, asignación de recursos)",
      "Investigación aplicada en colaboración con áreas de negocio",
    ],
    kpis: [
      { num: "10", suf: "–30%", desc: "mejora en métricas optimizadas (margen, conversión, costo)" },
      { num: "100", suf: "%", desc: "decisiones respaldadas por evidencia cuantitativa" },
      { num: "+", desc: "construcción de capacidad analítica interna" },
    ],
  },
};

// ─── Icon Component ─────────────────────────────────────────
const Icon = ({ name, size = 24 }: { name: string; size?: number }) => {
  const d = ICON_PATHS[name] || "";
  const parts = d.split(/\s(?=M|m)/).filter(Boolean);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {parts.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
};

// ─── Diagram Node ───────────────────────────────────────────
const DiagramNode = ({
  step,
  index,
  outcome = false,
  absolute = false,
  style,
}: {
  step: Step;
  index: number;
  outcome?: boolean;
  absolute?: boolean;
  style?: React.CSSProperties;
}) => (
  <div
    className={`sfd-node ${absolute ? "sfd-node-abs" : ""} ${outcome ? "sfd-outcome" : ""}`}
    data-step={index + 1}
    style={style}
  >
    <div className="sfd-glyph">
      <Icon name={step.icon} size={24} />
    </div>
    <div className="sfd-label">{step.label}</div>
    {step.sub && <div className="sfd-sub">{step.sub}</div>}
  </div>
);

// ─── Arrow (linear layout connector) ────────────────────────
const Arrow = ({ index }: { index: number }) => {
  const delay = `${index * 0.6 + 0.3}s`;
  return (
    <div className="sfd-arrow">
      <svg width="40" height="14" viewBox="0 0 48 14" fill="none">
        <line
          x1="2" y1="7" x2="38" y2="7"
          stroke={C.ink3} strokeWidth="1.75" strokeLinecap="round"
          style={{ animationDelay: delay }}
        />
        <path
          d="M34 2 42 7l-8 5"
          stroke={C.ink3} strokeWidth="1.75"
          strokeLinecap="round" strokeLinejoin="round" fill="none"
          style={{ animationDelay: `${index * 0.6 + 0.35}s` }}
        />
      </svg>
    </div>
  );
};

// ─── Arrowhead Marker Defs ──────────────────────────────────
const ArrowDefs = ({ id }: { id: string }) => (
  <defs>
    <marker
      id={`ah-${id}`}
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerWidth="7"
      markerHeight="7"
      orient="auto-start-reverse"
      markerUnits="userSpaceOnUse"
    >
      <path d="M 0 0 L 10 5 L 0 10 z" fill={C.ink3} />
    </marker>
  </defs>
);

// ─── Helper: shorten line endpoints ─────────────────────────
const shorten = (
  x1: number, y1: number, x2: number, y2: number,
  padStart = 70, padEnd = 70,
) => {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  return {
    x1: x1 + ux * padStart, y1: y1 + uy * padStart,
    x2: x2 - ux * padEnd, y2: y2 - uy * padEnd,
  };
};

// Percentage helper for node positioning
const pct = (v: number, total: number) => `${(v / total) * 100}%`;

// ═══════════════════════════════════════════════════════════
// LAYOUT: LINEAR
// ═══════════════════════════════════════════════════════════
const FlowLinear = ({ steps }: { steps: Step[] }) => (
  <div className="sfd-linear">
    {steps.map((s, i) => (
      <div key={i} className="contents">
        <DiagramNode step={s} index={i} outcome={i === steps.length - 1} />
        {i < steps.length - 1 && <Arrow index={i} />}
      </div>
    ))}
  </div>
);

// ═══════════════════════════════════════════════════════════
// LAYOUT: BRANCH (input → hub → A/B → outcome)
// ═══════════════════════════════════════════════════════════
const FlowBranch = ({ steps, id }: { steps: Step[]; id: string }) => {
  const pts = [
    { x: 100, y: 300 },
    { x: 320, y: 300 },
    { x: 570, y: 130 },
    { x: 570, y: 470 },
    { x: 860, y: 300 },
  ];
  const lines: [number, number][] = [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4]];
  const markerId = `ah-${id}`;

  return (
    <div className="sfd-positioned" style={{ aspectRatio: `${VB_W}/${VB_H}` }}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
      >
        <ArrowDefs id={id} />
        {lines.map(([a, b], i) => {
          const s = shorten(pts[a].x, pts[a].y, pts[b].x, pts[b].y);
          return (
            <line
              key={i}
              className="sfd-connector"
              x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
              stroke={C.ink3} strokeWidth="1.75" strokeLinecap="round"
              markerEnd={`url(#${markerId})`}
              style={{ animationDelay: `${0.4 + i * 0.6}s` }}
            />
          );
        })}
      </svg>
      {steps.map((s, i) => (
        <DiagramNode
          key={i}
          step={s}
          index={i}
          outcome={i === 4}
          absolute
          style={{ left: pct(pts[i].x, VB_W), top: pct(pts[i].y, VB_H) }}
        />
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// LAYOUT: CIRCLE (nodes around a ring with arcs)
// ═══════════════════════════════════════════════════════════
const FlowCircle = ({
  steps,
  id,
  centerBig,
  centerSmall,
}: {
  steps: Step[];
  id: string;
  centerBig?: string;
  centerSmall?: string;
}) => {
  const cx = 500, cy = 300, r = 200;
  const N = steps.length;
  const markerId = `ah-${id}`;

  const nodePositions = Array.from({ length: N }, (_, i) => {
    const angle = (i / N) * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  });

  const arcs = Array.from({ length: N }, (_, i) => {
    const a1 = (i / N) * 2 * Math.PI - Math.PI / 2;
    const a2 = ((i + 1) / N) * 2 * Math.PI - Math.PI / 2;
    const padAngle = 0.38;
    return {
      x1: cx + r * Math.cos(a1 + padAngle),
      y1: cy + r * Math.sin(a1 + padAngle),
      x2: cx + r * Math.cos(a2 - padAngle),
      y2: cy + r * Math.sin(a2 - padAngle),
    };
  });

  return (
    <div className="sfd-positioned" style={{ aspectRatio: `${VB_W}/${VB_H}` }}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
      >
        <ArrowDefs id={id} />
        <circle
          cx={cx} cy={cy} r={r}
          fill="none" stroke="#eaeef3" strokeWidth="1" strokeDasharray="3 4"
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            animation: "sfd-spin 24s linear infinite",
          }}
        />
        {arcs.map((a, i) => (
          <path
            key={i}
            className="sfd-connector"
            d={`M ${a.x1} ${a.y1} A ${r} ${r} 0 0 1 ${a.x2} ${a.y2}`}
            fill="none" stroke={C.ink3} strokeWidth="1.75" strokeLinecap="round"
            markerEnd={`url(#${markerId})`}
            style={{ animationDelay: `${0.4 + i * 0.6}s` }}
          />
        ))}
      </svg>
      {nodePositions.map((pos, i) => (
        <DiagramNode
          key={i}
          step={steps[i]}
          index={i}
          absolute
          style={{ left: pct(pos.x, VB_W), top: pct(pos.y, VB_H) }}
        />
      ))}
      {(centerBig || centerSmall) && (
        <div className="sfd-center">
          {centerBig && <div className="sfd-center-big">{centerBig}</div>}
          {centerSmall && <div className="sfd-center-small">{centerSmall}</div>}
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// LAYOUT: GATE (input → decision → SÍ/NO → outcome)
// ═══════════════════════════════════════════════════════════
const FlowGate = ({ steps, id }: { steps: Step[]; id: string }) => {
  const pts = [
    { x: 100, y: 300 },
    { x: 320, y: 300 },
    { x: 570, y: 140 },
    { x: 570, y: 460 },
    { x: 860, y: 300 },
  ];
  const lines: [number, number][] = [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4]];
  const markerId = `ah-${id}`;

  return (
    <div className="sfd-positioned" style={{ aspectRatio: `${VB_W}/${VB_H}` }}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
      >
        <ArrowDefs id={id} />
        {lines.map(([a, b], i) => {
          const s = shorten(pts[a].x, pts[a].y, pts[b].x, pts[b].y);
          return (
            <line
              key={i}
              className="sfd-connector"
              x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
              stroke={C.ink3} strokeWidth="1.75" strokeLinecap="round"
              markerEnd={`url(#${markerId})`}
              style={{ animationDelay: `${0.4 + i * 0.6}s` }}
            />
          );
        })}
        <text
          x="440" y="210"
          fill={C.primary} fontSize="12" fontWeight="700"
          textAnchor="middle" fontFamily="system-ui, sans-serif"
          letterSpacing="0.1em"
        >
          SÍ
        </text>
        <text
          x="440" y="400"
          fill={C.accent} fontSize="12" fontWeight="700"
          textAnchor="middle" fontFamily="system-ui, sans-serif"
          letterSpacing="0.1em"
        >
          NO
        </text>
      </svg>
      {steps.map((s, i) => (
        <DiagramNode
          key={i}
          step={s}
          index={i}
          outcome={i === 4}
          absolute
          style={{ left: pct(pts[i].x, VB_W), top: pct(pts[i].y, VB_H) }}
        />
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// FOOTER: Value + KPIs + Capabilities
// ═══════════════════════════════════════════════════════════
const DiagramFooter = ({ service }: { service: ServiceConfig }) => (
  <div
    className="pt-5 mt-6"
    style={{ borderTop: `1px solid ${C.line2}` }}
  >
    <div>
      <div
        className="mb-2"
        style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
          color: C.ink3, textTransform: "uppercase",
        }}
      >
        Resultados
      </div>
      <div className="grid grid-cols-3 gap-2">
        {service.kpis.map((k, i) => (
          <div
            key={i}
            className="flex flex-col gap-1"
            style={{
              padding: "10px 12px", background: C.bg,
              borderRadius: 8, borderLeft: `3px solid ${C.accent}`,
            }}
          >
            <div
              className="flex items-baseline gap-px"
              style={{
                fontSize: 18, fontWeight: 700, color: C.primary,
                letterSpacing: "-0.02em", lineHeight: 1,
              }}
            >
              {k.num}
              {k.suf && <span>{k.suf}</span>}
            </div>
            <div style={{ fontSize: 10, lineHeight: 1.35, color: C.ink2 }}>
              {k.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
const ServiceFlowDiagram = ({ serviceId }: ServiceFlowDiagramProps) => {
  const service = SERVICES[serviceId];
  if (!service) return null;

  const renderDiagram = () => {
    switch (service.layout) {
      case "linear":
        return <FlowLinear steps={service.steps} />;
      case "branch":
        return <FlowBranch steps={service.steps} id={service.id} />;
      case "circle":
        return (
          <FlowCircle
            steps={service.steps}
            id={service.id}
            centerBig={service.centerBig}
            centerSmall={service.centerSmall}
          />
        );
      case "gate":
        return <FlowGate steps={service.steps} id={service.id} />;
    }
  };

  return (
    <div className="w-full">
      {/* Diagram */}
      <div className="w-full flex items-center justify-center">
        {renderDiagram()}
      </div>

      {/* Footer */}
      <DiagramFooter service={service} />
    </div>
  );
};

export default ServiceFlowDiagram;
