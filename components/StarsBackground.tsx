"use client";
import React, { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Engine } from "tsparticles-engine";

const StarsBackground = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    if (!isClient) return null;

    return (
        <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden pointer-events-none">
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    fullScreen: { enable: false }, // Disable full screen to control height
                    background: { color: "transparent" }, // Keep background transparent
                    particles: {
                        number: { value: 70, density: { enable: true, area: 1000 } },
                        shape: { type: ["circle", "star"] },
                        opacity: {
                            value: 1,
                            random: true,
                            animation: { enable: true, speed: 0.5, minimumValue: 0.3, sync: false },
                        },
                        size: {
                            value: { min: 1, max: 6 },
                            random: true,
                            animation: { enable: true, speed: 3, minimumValue: 0.5, sync: false },
                        },
                        move: {
                            enable: true,
                            speed: 0.2,
                            direction: "none",
                            outModes: "out",
                            random: true,
                        },
                        links: {
                            enable: true,
                            distance: 120,
                            color: "#ffffff",
                            opacity: 0.2,
                            width: 1,
                        },
                    },
                    interactivity: {
                        events: { onHover: { enable: true, mode: "bubble" } },
                        modes: { bubble: { distance: 100, size: 10 } },
                    },
                }}
                className="w-full h-full"
            />
        </div>
    );
};

export default StarsBackground;