import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadFireflyPreset } from "@tsparticles/preset-firefly";

export default function ElectricParticles() {
  const init = useCallback(async (engine: any) => {
    await loadFireflyPreset(engine);
  }, []);

  return (
    <Particles
      id="electric-particles"
      init={init}
      options={{
        preset: "firefly",
        background: { color: "transparent" },
        fullScreen: { enable: false },
        style: {
          position: "absolute",
          zIndex: 0,
        },
      }}
    />
  );
}
