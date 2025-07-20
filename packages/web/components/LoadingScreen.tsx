import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-blue-950 to-blue-900 flex flex-col items-center justify-center z-50">
      <motion.div
        className="relative mb-20"
        initial={{ scale: 0.8, opacity: 0.7 }}
        animate={{
          scale: [0.8, 1.05, 0.95, 1],
          opacity: [0.7, 1, 0.95, 1],
          filter: [
            "drop-shadow(0 0 40px #38bdf8)",
            "drop-shadow(0 0 80px #0ea5e9)",
            "drop-shadow(0 0 60px #38bdf8)",
            "drop-shadow(0 0 40px #38bdf8)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <motion.img
          src="/hydrion.jpg"
          alt="Hydrion Logo"
          className="w-80 h-80 rounded-full border-4 border-blue-400 shadow-2xl"
          animate={{
            rotate: 360,
            boxShadow: [
              "0 0 40px #38bdf8, 0 0 80px #0ea5e9",
              "0 0 80px #38bdf8, 0 0 120px #0ea5e9",
              "0 0 40px #38bdf8, 0 0 80px #0ea5e9",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "linear",
          }}
        />
        {/* Glowing ring */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: "0 0 80px 20px #38bdf8, 0 0 120px 40px #0ea5e9",
            zIndex: -1,
          }}
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </motion.div>
      <motion.div
        className="text-3xl font-extrabold text-blue-300 drop-shadow-[0_0_16px_#38bdf8] tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: [0, 1, 0.8, 1],
          y: [20, 0, 10, 0],
          textShadow: [
            "0 0 16px #38bdf8, 0 0 32px #0ea5e9",
            "0 0 32px #38bdf8, 0 0 64px #0ea5e9",
            "0 0 16px #38bdf8, 0 0 32px #0ea5e9",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        Loading Hydrion WEB UI...
      </motion.div>
    </div>
  );
}
