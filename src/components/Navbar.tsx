import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoJhedai from '../logo-jhedai.png';

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
                        <img src={logoJhedai} alt="JhedAi" className="h-36 w-auto" />
                    </a>

                    <div className="hidden md:flex items-center gap-6 text-[14px] font-medium text-jhedai-primary/70">
                        <Link to="/servicios" className="hover:text-jhedai-primary transition-colors">Servicios</Link>
                        <a href="#ecosistema" className="hover:text-jhedai-primary transition-colors">Ecosistema</a>
                        <a href="#methodology" className="hover:text-jhedai-primary transition-colors">Metodología</a>
                        <a href="#nosotros" className="hover:text-jhedai-primary transition-colors">Nosotros</a>
                        <Link to="/blog" className="hover:text-jhedai-primary transition-colors">Blog</Link>
                        <a href="#assessment" className="hover:text-jhedai-primary transition-colors">Assessment</a>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="text-[14px] font-medium text-jhedai-primary/60 hover:text-jhedai-primary transition-colors">
                        Log in
                    </button>
                    <Link to="/contacto" className="boton-principal inline-block">
                        Contactar
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
