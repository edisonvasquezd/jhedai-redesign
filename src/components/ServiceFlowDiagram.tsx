import { motion } from 'framer-motion';
import {
    BarChart3,
    TrendingUp,
    DollarSign,
    Users,
    Target,
    Zap,
    Shield,
    Clock,
    Lightbulb,
    ThumbsUp,
    Award,
    Rocket,
    Eye,
    ShoppingCart,
    MessageSquare,
    FileSearch,
    AlertTriangle,
    CheckCircle2,
    Factory,
    Phone,
    Mail,
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

    // Análisis de Datos - Flujo lineal de valor
    const DataAnalysisFlow = () => (
        <div className="flex items-center justify-center gap-3 px-4">
            {[
                { icon: <BarChart3 size={24} />, label: 'Datos dispersos' },
                { icon: <Lightbulb size={24} />, label: 'Insights claros' },
                { icon: <Target size={24} />, label: 'Decisiones acertadas' },
                { icon: <TrendingUp size={24} />, label: 'Mejores resultados' },
                { icon: <DollarSign size={24} />, label: 'Mayor rentabilidad' },
            ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
                        className="relative group"
                    >
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            {step.icon}
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-jhedai-primary/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-center w-24">
                            {step.label}
                        </div>
                    </motion.div>
                    {i < 4 && (
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: i * 0.15 + 0.1, duration: 0.3 }}
                            className={`h-0.5 w-8 bg-gradient-to-r ${gradientColor} origin-left`}
                        >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradientColor} absolute right-0 top-1/2 -translate-y-1/2`} />
                        </motion.div>
                    )}
                </div>
            ))}
        </div>
    );

    // Machine Learning - Predicción y automatización
    const MachineLearningFlow = () => (
        <div className="relative w-full h-64 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                <defs>
                    <linearGradient id="mlGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" className="text-purple-500" style={{ stopColor: 'currentColor' }} />
                        <stop offset="100%" className="text-pink-500" style={{ stopColor: 'currentColor' }} />
                    </linearGradient>
                </defs>
                <motion.path d="M 100 130 L 200 130" stroke="url(#mlGrad)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2 }} />
                <motion.path d="M 200 130 L 300 70" stroke="url(#mlGrad)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
                <motion.path d="M 200 130 L 300 190" stroke="url(#mlGrad)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
                <motion.path d="M 300 70 L 400 130" stroke="url(#mlGrad)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.6 }} />
                <motion.path d="M 300 190 L 400 130" stroke="url(#mlGrad)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.6 }} />
            </svg>

            {[
                { icon: <Users size={20} />, x: 100, y: 130, label: 'Comportamiento de clientes' },
                { icon: <Target size={20} />, x: 200, y: 130, label: 'Predicción inteligente' },
                { icon: <ShoppingCart size={20} />, x: 300, y: 70, label: 'Recomendaciones personalizadas' },
                { icon: <AlertTriangle size={20} />, x: 300, y: 190, label: 'Detección temprana de riesgos' },
                { icon: <TrendingUp size={20} />, x: 400, y: 130, label: 'Aumento de ventas' },
            ].map((node, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
                    className="absolute group"
                    style={{ left: node.x - 28, top: node.y - 28 }}
                >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                        {node.icon}
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-jhedai-primary/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity w-32 text-center">
                        {node.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );

    // Business Intelligence - Ciclo de mejora continua
    const BusinessIntelligenceFlow = () => {
        const radius = 80;
        const centerX = 150;
        const centerY = 130;
        const icons = [
            { icon: <BarChart3 size={20} />, label: 'Reportes automáticos' },
            { icon: <Eye size={20} />, label: 'Visibilidad total' },
            { icon: <Lightbulb size={20} />, label: 'Identificar oportunidades' },
            { icon: <Rocket size={20} />, label: 'Acciones rápidas' },
            { icon: <Award size={20} />, label: 'Resultados medibles' },
        ];

        return (
            <div className="relative w-full h-64 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full">
                    <defs>
                        <linearGradient id="biGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" className="text-green-500" style={{ stopColor: 'currentColor' }} />
                            <stop offset="100%" className="text-emerald-500" style={{ stopColor: 'currentColor' }} />
                        </linearGradient>
                    </defs>
                    <motion.circle cx={centerX} cy={centerY} r={radius} stroke="url(#biGrad)" strokeWidth="2" fill="none" strokeDasharray="5,5" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, ease: 'easeInOut' }} />
                </svg>

                {icons.map((item, i) => {
                    const angle = (i / icons.length) * 2 * Math.PI - Math.PI / 2;
                    const x = centerX + radius * Math.cos(angle);
                    const y = centerY + radius * Math.sin(angle);

                    return (
                        <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }} className="absolute group" style={{ left: x - 28, top: y - 28 }}>
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                                {item.icon}
                            </div>
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-jhedai-primary/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity w-28 text-center">
                                {item.label}
                            </div>
                        </motion.div>
                    );
                })}

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, type: 'spring', stiffness: 150 }} className="absolute z-20" style={{ left: centerX - 20, top: centerY - 20 }}>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-lg`}>
                        <TrendingUp size={18} />
                    </div>
                </motion.div>
            </div>
        );
    };

    // NLP - Comunicación inteligente
    const NLPFlow = () => (
        <div className="flex items-center justify-center gap-3 px-4">
            {[
                { icon: <MessageSquare size={24} />, label: 'Atención 24/7' },
                { icon: <Users size={24} />, label: 'Respuestas instantáneas' },
                { icon: <ThumbsUp size={24} />, label: 'Clientes satisfechos' },
                { icon: <Clock size={24} />, label: 'Ahorro de tiempo' },
                { icon: <DollarSign size={24} />, label: 'Reducción de costos' },
            ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }} className="relative group">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            {step.icon}
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-jhedai-primary/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-center w-24">
                            {step.label}
                        </div>
                    </motion.div>
                    {i < 4 && (
                        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: i * 0.15 + 0.1, duration: 0.3 }} className={`h-0.5 w-8 bg-gradient-to-r ${gradientColor} origin-left`}>
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradientColor} absolute right-0 top-1/2 -translate-y-1/2`} />
                        </motion.div>
                    )}
                </div>
            ))}
        </div>
    );

    // Computer Vision - Inspección y control
    const ComputerVisionFlow = () => (
        <div className="relative w-full h-64 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full">
                <defs>
                    <linearGradient id="cvGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" className="text-indigo-500" style={{ stopColor: 'currentColor' }} />
                        <stop offset="100%" className="text-purple-500" style={{ stopColor: 'currentColor' }} />
                    </linearGradient>
                </defs>
                <motion.line x1="200" y1="50" x2="200" y2="100" stroke="url(#cvGrad)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />
                <motion.line x1="200" y1="100" x2="120" y2="150" stroke="url(#cvGrad)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.2 }} />
                <motion.line x1="200" y1="100" x2="280" y2="150" stroke="url(#cvGrad)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.2 }} />
                <motion.line x1="120" y1="150" x2="200" y2="200" stroke="url(#cvGrad)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.4 }} />
                <motion.line x1="280" y1="150" x2="200" y2="200" stroke="url(#cvGrad)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.4 }} />
            </svg>

            {[
                { icon: <Factory size={20} />, x: 200, y: 50, label: 'Producción continua' },
                { icon: <Eye size={20} />, x: 200, y: 100, label: 'Inspección automática' },
                { icon: <CheckCircle2 size={20} />, x: 120, y: 150, label: 'Control de calidad' },
                { icon: <AlertTriangle size={20} />, x: 280, y: 150, label: 'Detección de defectos' },
                { icon: <Shield size={20} />, x: 200, y: 200, label: 'Cero errores' },
            ].map((node, i) => (
                <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }} className="absolute group" style={{ left: node.x - 28, top: node.y - 28 }}>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                        {node.icon}
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-jhedai-primary/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity w-28 text-center">
                        {node.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );

    // Automatizaciones - Eficiencia operacional
    const AutomationFlow = () => (
        <div className="relative w-full h-64 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                <defs>
                    <linearGradient id="autoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" className="text-cyan-500" style={{ stopColor: 'currentColor' }} />
                        <stop offset="100%" className="text-blue-500" style={{ stopColor: 'currentColor' }} />
                    </linearGradient>
                </defs>
                <motion.path d="M 100 130 L 200 130" stroke="url(#autoGrad)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2 }} />
                <motion.path d="M 200 130 L 300 70" stroke="url(#autoGrad)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
                <motion.path d="M 200 130 L 300 190" stroke="url(#autoGrad)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
                <motion.path d="M 300 70 L 400 130" stroke="url(#autoGrad)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.6 }} />
                <motion.path d="M 300 190 L 400 130" stroke="url(#autoGrad)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.6 }} />
            </svg>

            {[
                { icon: <FileSearch size={20} />, x: 100, y: 130, label: 'Tareas repetitivas' },
                { icon: <Zap size={20} />, x: 200, y: 130, label: 'Automatización' },
                { icon: <Mail size={20} />, x: 300, y: 70, label: 'Procesamiento de documentos' },
                { icon: <Phone size={20} />, x: 300, y: 190, label: 'Gestión de solicitudes' },
                { icon: <Clock size={20} />, x: 400, y: 130, label: 'Más tiempo para estrategia' },
            ].map((node, i) => (
                <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }} className="absolute group" style={{ left: node.x - 28, top: node.y - 28 }}>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                        {node.icon}
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-jhedai-primary/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity w-32 text-center">
                        {node.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );

    // Data Science - Experimentación y mejora
    const DataScienceFlow = () => {
        const radius = 80;
        const centerX = 150;
        const centerY = 130;
        const icons = [
            { icon: <Lightbulb size={20} />, label: 'Ideas de negocio' },
            { icon: <Target size={20} />, label: 'Pruebas controladas' },
            { icon: <BarChart3 size={20} />, label: 'Análisis de resultados' },
            { icon: <CheckCircle2 size={20} />, label: 'Validación científica' },
            { icon: <Rocket size={20} />, label: 'Implementación segura' },
        ];

        return (
            <div className="relative w-full h-64 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full">
                    <defs>
                        <linearGradient id="dsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" className="text-rose-500" style={{ stopColor: 'currentColor' }} />
                            <stop offset="100%" className="text-red-500" style={{ stopColor: 'currentColor' }} />
                        </linearGradient>
                    </defs>
                    <motion.circle cx={centerX} cy={centerY} r={radius} stroke="url(#dsGrad)" strokeWidth="2" fill="none" strokeDasharray="5,5" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, ease: 'easeInOut' }} />
                </svg>

                {icons.map((item, i) => {
                    const angle = (i / icons.length) * 2 * Math.PI - Math.PI / 2;
                    const x = centerX + radius * Math.cos(angle);
                    const y = centerY + radius * Math.sin(angle);

                    return (
                        <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }} className="absolute group" style={{ left: x - 28, top: y - 28 }}>
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                                {item.icon}
                            </div>
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-jhedai-primary/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity w-28 text-center">
                                {item.label}
                            </div>
                        </motion.div>
                    );
                })}

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, type: 'spring', stiffness: 150 }} className="absolute z-20" style={{ left: centerX - 20, top: centerY - 20 }}>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-lg`}>
                        <Award size={18} />
                    </div>
                </motion.div>
            </div>
        );
    };

    return (
        <div className="w-full h-[300px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50/20 flex items-center justify-center p-6">
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
