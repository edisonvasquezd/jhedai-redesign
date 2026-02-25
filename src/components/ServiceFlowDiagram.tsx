import { motion } from 'framer-motion';
import {
    Database,
    Search,
    Lightbulb,
    CheckCircle,
    TrendingUp,
    Upload,
    Settings,
    Target,
    BarChart3,
    Users,
    MessageCircle,
    Zap,
    Eye,
    AlertCircle,
    Package,
    FileText,
    Clock,
    Award,
    Play,
    ArrowRight,
} from 'lucide-react';

interface ServiceFlowDiagramProps {
    type: 'linear' | 'branching' | 'circular' | 'hierarchical';
    gradient: string;
}

const ServiceFlowDiagram = ({ type, gradient }: ServiceFlowDiagramProps) => {
    const getGradientColor = (gradientClass: string) => {
        if (gradientClass.includes('blue')) return 'from-blue-500 to-cyan-500';
        if (gradientClass.includes('purple')) return 'from-purple-500 to-pink-500';
        if (gradientClass.includes('green')) return 'from-green-500 to-emerald-500';
        if (gradientClass.includes('orange')) return 'from-orange-500 to-amber-500';
        if (gradientClass.includes('indigo')) return 'from-indigo-500 to-purple-500';
        if (gradientClass.includes('cyan')) return 'from-cyan-500 to-blue-500';
        if (gradientClass.includes('rose')) return 'from-rose-500 to-red-500';
        return 'from-blue-500 to-cyan-500';
    };

    const gradientColor = getGradientColor(gradient);

    // Análisis de Datos: Cómo transformamos tus datos en decisiones
    const DataAnalysisFlow = () => (
        <div className="flex flex-col items-center justify-center gap-8 px-2 w-full">
            <div className="flex items-center gap-6 w-full">
                {[
                    { icon: <Database size={32} />, label: 'Tus datos actuales' },
                    { icon: <ArrowRight size={24} className="text-jhedai-primary/40" /> },
                    { icon: <Search size={32} />, label: 'Analizamos patrones' },
                    { icon: <ArrowRight size={24} className="text-jhedai-primary/40" /> },
                    { icon: <Lightbulb size={32} />, label: 'Descubrimos insights' },
                    { icon: <ArrowRight size={24} className="text-jhedai-primary/40" /> },
                    { icon: <Target size={32} />, label: 'Tomas decisiones informadas' },
                ].map((step, i) => (
                    step.icon.type === ArrowRight ? (
                        <div key={i} className="shrink-0">{step.icon}</div>
                    ) : (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.12, type: 'spring', stiffness: 200 }}
                            className="relative group flex-1"
                        >
                            <div className={`w-full aspect-square max-w-[100px] mx-auto rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                                {step.icon}
                            </div>
                            <p className="text-[12px] font-semibold text-jhedai-primary/80 text-center mt-4 leading-tight px-1">
                                {step.label}
                            </p>
                        </motion.div>
                    )
                ))}
            </div>
        </div>
    );

    // Machine Learning: El ciclo de aprendizaje automático
    const MachineLearningFlow = () => (
        <div className="relative w-full h-80 flex items-center justify-center px-4">
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                <defs>
                    <linearGradient id="mlGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" className="text-purple-500" style={{ stopColor: 'currentColor' }} />
                        <stop offset="100%" className="text-pink-500" style={{ stopColor: 'currentColor' }} />
                    </linearGradient>
                </defs>
                {/* Main path - Ajustado para más espacio */}
                <motion.path d="M 100 160 L 240 160" stroke="url(#mlGrad)" strokeWidth="4" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.2 }} />
                <motion.path d="M 240 160 L 380 90" stroke="url(#mlGrad)" strokeWidth="4" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.5 }} />
                <motion.path d="M 240 160 L 380 230" stroke="url(#mlGrad)" strokeWidth="4" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.5 }} />
                <motion.path d="M 380 90 L 520 160" stroke="url(#mlGrad)" strokeWidth="4" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.8 }} />
                <motion.path d="M 380 230 L 520 160" stroke="url(#mlGrad)" strokeWidth="4" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.8 }} />
            </svg>

            {[
                { icon: <Users size={28} />, x: 100, y: 160, label: 'Datos históricos', sublabel: 'de tu negocio' },
                { icon: <Settings size={28} />, x: 240, y: 160, label: 'Entrenamiento', sublabel: 'del modelo' },
                { icon: <Target size={28} />, x: 380, y: 90, label: 'Predicciones', sublabel: 'precisas' },
                { icon: <Zap size={28} />, x: 380, y: 230, label: 'Automatización', sublabel: 'de procesos' },
                { icon: <TrendingUp size={28} />, x: 520, y: 160, label: 'Resultados', sublabel: 'medibles' },
            ].map((node, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }}
                    className="absolute group"
                    style={{ left: node.x - 45, top: node.y - 45 }}
                >
                    <div className={`w-[90px] h-[90px] rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                        {node.icon}
                    </div>
                    <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-center w-28">
                        <p className="text-[12px] font-bold text-jhedai-primary leading-tight">{node.label}</p>
                        <p className="text-[11px] text-jhedai-primary/60 mt-0.5">{node.sublabel}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    // Business Intelligence: Ciclo continuo de mejora
    const BusinessIntelligenceFlow = () => {
        const radius = 110;
        const centerX = 220;
        const centerY = 160;
        const icons = [
            { icon: <Upload size={24} />, label: 'Conectas', sublabel: 'tus fuentes de datos' },
            { icon: <BarChart3 size={24} />, label: 'Visualizas', sublabel: 'en dashboards' },
            { icon: <Eye size={24} />, label: 'Monitoreas', sublabel: 'KPIs en tiempo real' },
            { icon: <Lightbulb size={24} />, label: 'Identificas', sublabel: 'oportunidades' },
            { icon: <Play size={24} />, label: 'Actúas', sublabel: 'de inmediato' },
        ];

        return (
            <div className="relative w-full h-80 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full">
                    <defs>
                        <linearGradient id="biGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" className="text-green-500" style={{ stopColor: 'currentColor' }} />
                            <stop offset="100%" className="text-emerald-500" style={{ stopColor: 'currentColor' }} />
                        </linearGradient>
                    </defs>
                    <motion.circle cx={centerX} cy={centerY} r={radius} stroke="url(#biGrad)" strokeWidth="4" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2, ease: 'easeInOut' }} />
                    {/* Arrows */}
                    {icons.map((_, i) => {
                        const angle = (i / icons.length) * 2 * Math.PI - Math.PI / 2;
                        const nextAngle = ((i + 1) / icons.length) * 2 * Math.PI - Math.PI / 2;
                        return (
                            <motion.path
                                key={i}
                                d={`M ${centerX + (radius - 10) * Math.cos(angle + 0.3)} ${centerY + (radius - 10) * Math.sin(angle + 0.3)} L ${centerX + (radius - 5) * Math.cos((angle + nextAngle) / 2)} ${centerY + (radius - 5) * Math.sin((angle + nextAngle) / 2)}`}
                                stroke="url(#biGrad)"
                                strokeWidth="2"
                                fill="none"
                                markerEnd="url(#arrow)"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.3 + 1 }}
                            />
                        );
                    })}
                </svg>

                {icons.map((item, i) => {
                    const angle = (i / icons.length) * 2 * Math.PI - Math.PI / 2;
                    const x = centerX + radius * Math.cos(angle);
                    const y = centerY + radius * Math.sin(angle);

                    return (
                        <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.25, type: 'spring', stiffness: 200 }} className="absolute group" style={{ left: x - 45, top: y - 45 }}>
                            <div className={`w-[90px] h-[90px] rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                                {item.icon}
                            </div>
                            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-center w-28">
                                <p className="text-[12px] font-bold text-jhedai-primary leading-tight">{item.label}</p>
                                <p className="text-[11px] text-jhedai-primary/60 mt-0.5">{item.sublabel}</p>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Center text */}
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: 'spring' }} className="absolute z-20 text-center" style={{ left: centerX - 45, top: centerY - 18 }}>
                    <p className="text-base font-bold text-jhedai-primary">Mejora</p>
                    <p className="text-sm text-jhedai-secondary">continua</p>
                </motion.div>
            </div>
        );
    };

    // NLP: Flujo de conversación inteligente
    const NLPFlow = () => (
        <div className="flex flex-col items-center justify-center gap-8 px-2 w-full">
            <div className="flex items-center gap-6 w-full">
                {[
                    { icon: <MessageCircle size={32} />, label: 'Cliente pregunta' },
                    { icon: <ArrowRight size={24} className="text-jhedai-primary/40" /> },
                    { icon: <Search size={32} />, label: 'IA comprende intención' },
                    { icon: <ArrowRight size={24} className="text-jhedai-primary/40" /> },
                    { icon: <Lightbulb size={32} />, label: 'Procesa contexto' },
                    { icon: <ArrowRight size={24} className="text-jhedai-primary/40" /> },
                    { icon: <CheckCircle size={32} />, label: 'Responde con precisión' },
                ].map((step, i) => (
                    step.icon.type === ArrowRight ? (
                        <div key={i} className="shrink-0">{step.icon}</div>
                    ) : (
                        <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.12, type: 'spring', stiffness: 200 }} className="relative group flex-1">
                            <div className={`w-full aspect-square max-w-[100px] mx-auto rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                                {step.icon}
                            </div>
                            <p className="text-[12px] font-semibold text-jhedai-primary/80 text-center mt-4 leading-tight px-1">
                                {step.label}
                            </p>
                        </motion.div>
                    )
                ))}
            </div>
        </div>
    );

    // Computer Vision: Sistema de inspección visual
    const ComputerVisionFlow = () => (
        <div className="relative w-full h-80 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full">
                <defs>
                    <linearGradient id="cvGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" className="text-indigo-500" style={{ stopColor: 'currentColor' }} />
                        <stop offset="100%" className="text-purple-500" style={{ stopColor: 'currentColor' }} />
                    </linearGradient>
                </defs>
                <motion.line x1="280" y1="60" x2="280" y2="130" stroke="url(#cvGrad)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
                <motion.line x1="280" y1="130" x2="150" y2="210" stroke="url(#cvGrad)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.3 }} />
                <motion.line x1="280" y1="130" x2="410" y2="210" stroke="url(#cvGrad)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.3 }} />
                <motion.line x1="150" y1="210" x2="280" y2="290" stroke="url(#cvGrad)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
                <motion.line x1="410" y1="210" x2="280" y2="290" stroke="url(#cvGrad)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
            </svg>

            {[
                { icon: <Upload size={28} />, x: 280, y: 60, label: 'Captura', sublabel: 'de imagen/video' },
                { icon: <Eye size={28} />, x: 280, y: 130, label: 'Análisis', sublabel: 'visual automático' },
                { icon: <CheckCircle size={28} />, x: 150, y: 210, label: 'Aprobado', sublabel: 'cumple estándares' },
                { icon: <AlertCircle size={28} />, x: 410, y: 210, label: 'Defecto', sublabel: 'detectado' },
                { icon: <Award size={28} />, x: 280, y: 290, label: 'Decisión', sublabel: 'instantánea' },
            ].map((node, i) => (
                <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }} className="absolute group" style={{ left: node.x - 45, top: node.y - 45 }}>
                    <div className={`w-[90px] h-[90px] rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                        {node.icon}
                    </div>
                    <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-center w-28">
                        <p className="text-[12px] font-bold text-jhedai-primary leading-tight">{node.label}</p>
                        <p className="text-[11px] text-jhedai-primary/60 mt-0.5">{node.sublabel}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    // Automatizaciones: Flujo de trabajo automatizado
    const AutomationFlow = () => (
        <div className="relative w-full h-80 flex items-center justify-center px-4">
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                <defs>
                    <linearGradient id="autoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" className="text-cyan-500" style={{ stopColor: 'currentColor' }} />
                        <stop offset="100%" className="text-blue-500" style={{ stopColor: 'currentColor' }} />
                    </linearGradient>
                </defs>
                <motion.path d="M 100 160 L 240 160" stroke="url(#autoGrad)" strokeWidth="4" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.2 }} />
                <motion.path d="M 240 160 L 380 90" stroke="url(#autoGrad)" strokeWidth="4" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.5 }} />
                <motion.path d="M 240 160 L 380 230" stroke="url(#autoGrad)" strokeWidth="4" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.5 }} />
                <motion.path d="M 380 90 L 520 160" stroke="url(#autoGrad)" strokeWidth="4" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.8 }} />
                <motion.path d="M 380 230 L 520 160" stroke="url(#autoGrad)" strokeWidth="4" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.8 }} />
            </svg>

            {[
                { icon: <FileText size={28} />, x: 100, y: 160, label: 'Tarea', sublabel: 'manual repetitiva' },
                { icon: <Zap size={28} />, x: 240, y: 160, label: 'Automatización', sublabel: 'inteligente' },
                { icon: <Package size={28} />, x: 380, y: 90, label: 'Procesa', sublabel: 'documentos' },
                { icon: <MessageCircle size={28} />, x: 380, y: 230, label: 'Responde', sublabel: 'solicitudes' },
                { icon: <Clock size={28} />, x: 520, y: 160, label: 'Ahorro', sublabel: 'de tiempo' },
            ].map((node, i) => (
                <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }} className="absolute group" style={{ left: node.x - 45, top: node.y - 45 }}>
                    <div className={`w-[90px] h-[90px] rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                        {node.icon}
                    </div>
                    <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-center w-28">
                        <p className="text-[12px] font-bold text-jhedai-primary leading-tight">{node.label}</p>
                        <p className="text-[11px] text-jhedai-primary/60 mt-0.5">{node.sublabel}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    // Data Science: Ciclo de experimentación
    const DataScienceFlow = () => {
        const radius = 110;
        const centerX = 220;
        const centerY = 160;
        const icons = [
            { icon: <Lightbulb size={24} />, label: 'Hipótesis', sublabel: 'de negocio' },
            { icon: <Settings size={24} />, label: 'Diseño', sublabel: 'de experimento' },
            { icon: <Play size={24} />, label: 'Ejecución', sublabel: 'controlada' },
            { icon: <BarChart3 size={24} />, label: 'Análisis', sublabel: 'de resultados' },
            { icon: <CheckCircle size={24} />, label: 'Validación', sublabel: 'estadística' },
        ];

        return (
            <div className="relative w-full h-80 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full">
                    <defs>
                        <linearGradient id="dsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" className="text-rose-500" style={{ stopColor: 'currentColor' }} />
                            <stop offset="100%" className="text-red-500" style={{ stopColor: 'currentColor' }} />
                        </linearGradient>
                    </defs>
                    <motion.circle cx={centerX} cy={centerY} r={radius} stroke="url(#dsGrad)" strokeWidth="4" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2, ease: 'easeInOut' }} />
                </svg>

                {icons.map((item, i) => {
                    const angle = (i / icons.length) * 2 * Math.PI - Math.PI / 2;
                    const x = centerX + radius * Math.cos(angle);
                    const y = centerY + radius * Math.sin(angle);

                    return (
                        <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.25, type: 'spring', stiffness: 200 }} className="absolute group" style={{ left: x - 45, top: y - 45 }}>
                            <div className={`w-[90px] h-[90px] rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                                {item.icon}
                            </div>
                            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-center w-28">
                                <p className="text-[12px] font-bold text-jhedai-primary leading-tight">{item.label}</p>
                                <p className="text-[11px] text-jhedai-primary/60 mt-0.5">{item.sublabel}</p>
                            </div>
                        </motion.div>
                    );
                })}

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: 'spring' }} className="absolute z-20 text-center" style={{ left: centerX - 45, top: centerY - 18 }}>
                    <p className="text-base font-bold text-jhedai-primary">Método</p>
                    <p className="text-sm text-jhedai-secondary">científico</p>
                </motion.div>
            </div>
        );
    };

    return (
        <div className="w-full min-h-[350px] rounded-xl overflow-visible bg-gradient-to-br from-gray-50 to-blue-50/20 flex items-center justify-center p-8 lg:p-10">
            {type === 'linear' && gradient.includes('blue') && <DataAnalysisFlow />}
            {type === 'branching' && gradient.includes('purple') && <MachineLearningFlow />}
            {type === 'circular' && gradient.includes('green') && <BusinessIntelligenceFlow />}
            {type === 'linear' && gradient.includes('orange') && <NLPFlow />}
            {type === 'hierarchical' && gradient.includes('indigo') && <ComputerVisionFlow />}
            {type === 'branching' && gradient.includes('cyan') && <AutomationFlow />}
            {type === 'circular' && gradient.includes('rose') && <DataScienceFlow />}
        </div>
    );
};

export default ServiceFlowDiagram;
