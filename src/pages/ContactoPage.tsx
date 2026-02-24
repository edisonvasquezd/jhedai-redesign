import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, Clock, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { submitContactForm } from '../lib/apiClient';

const servicios = [
    'Consultoría Estratégica',
    'Implementación Técnica',
    'Formación y Capacitación',
    'DeepLab',
    'Otro',
];

const contactInfo = [
    { icon: <Mail size={18} />, label: 'contacto@jhedai.com', href: 'mailto:contacto@jhedai.com' },
    { icon: <MapPin size={18} />, label: 'Santiago, Chile', href: undefined },
    { icon: <Linkedin size={18} />, label: 'LinkedIn', href: 'https://www.linkedin.com/company/jhedai/' },
    { icon: <Clock size={18} />, label: 'Lunes a Viernes, 9:00 - 18:00', href: undefined },
];

const ContactoPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            nombre: formData.get('nombre') as string,
            email: formData.get('email') as string,
            empresa: formData.get('empresa') as string,
            telefono: formData.get('telefono') as string,
            servicio: formData.get('servicio') as string,
            mensaje: formData.get('mensaje') as string,
        };

        try {
            const response = await submitContactForm(data);

            if (response.success) {
                setSubmitted(true);
            } else {
                setError(response.error || 'Error al enviar el mensaje. Por favor intenta nuevamente.');
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            setError(
                err instanceof Error
                    ? err.message
                    : 'Error al enviar el mensaje. Por favor intenta nuevamente.'
            );
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full bg-white border border-jhedai-neutral/30 rounded-xl px-4 py-3 text-[15px] text-jhedai-primary placeholder:text-jhedai-primary/30 focus:border-jhedai-secondary focus:ring-2 focus:ring-jhedai-secondary/20 outline-none transition-all";

    return (
        <>
            <SEOHead
                title="Contacto"
                description="Agenda una consulta con el equipo de JhedAi. Diagnóstico, implementación y capacitación en inteligencia artificial para tu empresa."
                canonical="/contacto"
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "name": "Contacto JhedAi",
                    "url": "https://jhedai.com/contacto",
                    "mainEntity": {
                        "@type": "Organization",
                        "name": "JhedAi",
                        "email": "contacto@jhedai.com",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Santiago",
                            "addressCountry": "CL"
                        }
                    }
                }}
            />

            <div className="pt-28 pb-24 bg-white">
                <div className="container">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">CONTACTO</p>
                        <h1 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-4">
                            Conversemos sobre tu proyecto
                        </h1>
                        <p className="text-jhedai-primary/60 text-[16px] max-w-2xl mx-auto leading-relaxed">
                            Agenda una consulta con nuestro equipo de expertos en inteligencia artificial.
                        </p>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                        {/* Left — Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:w-1/3 space-y-4 lg:sticky lg:top-32 lg:self-start"
                        >
                            {contactInfo.map((item, i) => (
                                <div key={i} className="glass-card p-5 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-jhedai-secondary/10 flex items-center justify-center text-jhedai-secondary shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                target={item.href.startsWith('http') ? '_blank' : undefined}
                                                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                className="text-[15px] text-jhedai-primary font-medium hover:text-jhedai-secondary transition-colors"
                                            >
                                                {item.label}
                                            </a>
                                        ) : (
                                            <span className="text-[15px] text-jhedai-primary font-medium">{item.label}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Right — Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="lg:w-2/3"
                        >
                            <div className="glass-card p-8 lg:p-10">
                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                                            <Check size={32} className="text-emerald-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-jhedai-primary mb-3">Mensaje enviado</h3>
                                        <p className="text-jhedai-primary/60 text-[16px] mb-6">
                                            Nos pondremos en contacto contigo a la brevedad.
                                        </p>
                                        <Link to="/" className="boton-secundario inline-flex items-center gap-2">
                                            Volver al inicio
                                        </Link>
                                    </motion.div>
                                ) : (
                                    <>
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl"
                                            >
                                                <p className="text-sm text-red-600">{error}</p>
                                            </motion.div>
                                        )}
                                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                            <label className="text-[14px] font-medium text-jhedai-primary mb-1.5 block">
                                                Nombre <span className="text-jhedai-accent">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="nombre"
                                                required
                                                placeholder="Tu nombre"
                                                className={inputClasses}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[14px] font-medium text-jhedai-primary mb-1.5 block">Empresa</label>
                                            <input
                                                type="text"
                                                name="empresa"
                                                placeholder="Nombre de tu empresa"
                                                className={inputClasses}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[14px] font-medium text-jhedai-primary mb-1.5 block">
                                                Email <span className="text-jhedai-accent">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="tu@email.com"
                                                className={inputClasses}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[14px] font-medium text-jhedai-primary mb-1.5 block">Teléfono</label>
                                            <input
                                                type="tel"
                                                name="telefono"
                                                placeholder="+56 9 1234 5678"
                                                className={inputClasses}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-[14px] font-medium text-jhedai-primary mb-1.5 block">Servicio de interés</label>
                                            <select name="servicio" className={inputClasses}>
                                                <option value="">Selecciona un servicio</option>
                                                {servicios.map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-[14px] font-medium text-jhedai-primary mb-1.5 block">
                                                Mensaje <span className="text-jhedai-accent">*</span>
                                            </label>
                                            <textarea
                                                name="mensaje"
                                                required
                                                rows={5}
                                                placeholder="Cuéntanos sobre tu proyecto o necesidad..."
                                                className={`${inputClasses} resize-none`}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="boton-principal w-full py-3.5 inline-flex items-center justify-center gap-2 text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loading ? 'Enviando...' : 'Enviar mensaje'}{' '}
                                                {!loading && <ArrowRight size={18} />}
                                            </button>
                                        </div>
                                    </form>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactoPage;
