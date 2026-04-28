import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, type Transition } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition: Transition = { duration: 0.22, ease: "easeOut" };

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <ScrollToTop />
      <Navbar />
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;
