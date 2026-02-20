const Footer = () => {
    return (
        <footer className="bg-jhedai-primary text-white border-t border-white/5">
            <div className="container py-20">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div>
                        <div className="flex items-center gap-2.5 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                <span className="text-jhedai-primary font-bold text-sm">J</span>
                            </div>
                            <span className="font-bold text-xl text-white">JhedAi</span>
                        </div>
                        <p className="text-[14px] text-white/50 leading-relaxed max-w-xs">
                            Inteligencia artificial industrial con precisión técnica y rigor consultivo.
                            Transformando la operación con tecnología de vanguardia.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-[14px] font-bold text-jhedai-secondary mb-6 uppercase tracking-wider">Soluciones</h4>
                        <ul className="space-y-4 text-[14px] text-white/60">
                            <li><a href="#" className="hover:text-jhedai-secondary transition-colors">Agentes de IA</a></li>
                            <li><a href="#" className="hover:text-jhedai-secondary transition-colors">Modelos CV</a></li>
                            <li><a href="#" className="hover:text-jhedai-secondary transition-colors">Academy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[14px] font-bold text-jhedai-secondary mb-6 uppercase tracking-wider">Compañía</h4>
                        <ul className="space-y-4 text-[14px] text-white/60">
                            <li><a href="#" className="hover:text-jhedai-secondary transition-colors">Metodología</a></li>
                            <li><a href="#" className="hover:text-jhedai-secondary transition-colors">Servicios</a></li>
                            <li><a href="#" className="hover:text-jhedai-secondary transition-colors">Assessment</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[14px] font-bold text-jhedai-secondary mb-6 uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-4 text-[14px] text-white/60">
                            <li><a href="#" className="hover:text-jhedai-secondary transition-colors">Privacidad</a></li>
                            <li><a href="#" className="hover:text-jhedai-secondary transition-colors">Términos</a></li>
                            <li><a href="#" className="hover:text-jhedai-secondary transition-colors">Contacto</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-white/40">
                    <p>© {new Date().getFullYear()} JhedAi. Todos los derechos reservados.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
