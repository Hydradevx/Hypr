import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [sparks, setSparks] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparks((prev) => [
        ...prev.slice(-15),
        {
          id: Math.random(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
      ]);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#020024] via-[#090979] to-[#00d4ff] flex items-center justify-center z-50 overflow-hidden">
      <div className="relative w-[360px] h-[360px] flex items-center justify-center">
        <motion.div
          className="absolute w-full h-full rounded-full border border-cyan-400 opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.4,
            ease: "easeInOut",
          }}
        />

        <motion.img
          src="/hypr.jpg"
          alt="Hypr Logo"
          className="w-full h-full rounded-full border-4 border-cyan-400 shadow-2xl"
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: "0 0 120px 30px #0ff, 0 0 160px 60px #0ea5e9",
            zIndex: -1,
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="absolute bottom-32 text-3xl font-extrabold text-cyan-300 drop-shadow-[0_0_20px_#0ff] tracking-widest z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: [0, 1, 0.85, 1],
          y: [20, 0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        Loading Hypr Web UI...
      </motion.div>

      <div className="absolute inset-0 pointer-events-none z-10">
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            className="absolute w-[2px] h-[80px] bg-cyan-300 opacity-70 blur-sm rotate-45 origin-top"
            style={{
              top: spark.y,
              left: spark.x,
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        ))}
      </div>
    </div>
  );
}
