import React, {ReactNode} from "react";
import "./StarryBackground.css";

const generateStars = (numStars: number ) => {
    const stars = [];
    for (let i = 0; i < numStars; i++) {
        const size = Math.random() * 3 + "px";
        stars.push(
            <span
                key={i}
                style={{
                    width: size,
                    height: size,
                    top: Math.random() * 100 + "vh",
                    left: Math.random() * 100 + "vw",
                    animationDelay: Math.random() * 5 + "s",
                }}
            />
        );
    }
    return stars;
};

const generateGlowingCircles = (numCircles: number) => {
    const circles = [];
    for (let i = 0; i < numCircles; i++) {
        const size = Math.random() * 200 + 50 + "px"; // Large glow effect
        circles.push(
            <div
                key={i}
                style={{
                    width: size,
                    height: size,
                    top: Math.random() * 100 + "vh",
                    left: Math.random() * 100 + "vw",
                    animationDelay: Math.random() * 5 + "s",
                }}
            />
        );
    }
    return circles;
};

interface StarryBackgroundProps {
    children?: ReactNode; // Explicitly type children as ReactNode
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({ children }) => {
    return (
        <div className="starry-background">
            <div className="stars">{generateStars(100)}</div>
            <div className="glowing-circles">{generateGlowingCircles(8)}</div>
            {children}
        </div>
    );
};

export default StarryBackground;