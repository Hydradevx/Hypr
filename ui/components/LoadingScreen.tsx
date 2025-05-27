import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-blue-400 z-50">
      <motion.img
        src="/hydrion.jpg"
        alt="Hydrion Logo"
        className="w-80 h-80 mb-20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
      <motion.div
        className="text-2xl font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
      >
        Loading Hydrion WEB UI...
      </motion.div>
    </div>
  );
}
