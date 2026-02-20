import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 right-0 z-[100] border-b border-jhedai-primary/10 bg-white/80 backdrop-blur-xl"
        >
            <div className="container flex items-center justify-between h-16">
                <div className="flex items-center gap-8">
                    <a href="/" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-lg bg-jhedai-primary flex items-center justify-center group-hover:bg-jhedai-secondary transition-all">
                            <span className="text-white font-bold text-sm">J</span>
                        </div>
                        <span className="font-bold text-lg text-jhedai-primary">JhedAi</span>
                    </a>

                    <div className="hidden md:flex items-center gap-6 text-[14px] font-medium text-jhedai-primary/70">
                        <a href="#services" className="hover:text-jhedai-primary transition-colors">Servicios</a>
                        <a href="#marketplace" className="hover:text-jhedai-primary transition-colors">Marketplace</a>
                        <a href="#methodology" className="hover:text-jhedai-primary transition-colors">Metodología</a>
                        <a href="#assessment" className="hover:text-jhedai-primary transition-colors">Assessment</a>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="text-[14px] font-medium text-jhedai-primary/60 hover:text-jhedai-primary transition-colors">
                        Log in
                    </button>
                    <button className="boton-principal">
                        Contactar
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
