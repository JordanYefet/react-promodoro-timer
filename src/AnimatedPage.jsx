//import React from "react";
import { motion } from "framer-motion/dist/framer-motion";

const settings = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const timer = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

function AnimatedPage({ page, children }) {
  return (
    <motion.div
      variants={page === "settings" ? settings : timer}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedPage;
