import React, { useEffect, useRef, useState } from 'react';
import './WarpAnimation.css';

const WarpAnimation = ({ isActive = true, onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const colors = ['#050505', '#1a1a1a', '#1a0b2e', '#000000'];
    
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    let currentColorIndex = 0;
    let nextColorIndex = 1;
    let currentRgb = hexToRgb(colors[currentColorIndex]);
    let targetRgb = hexToRgb(colors[nextColorIndex]);

    const colorTransitionSpeed = 0.002; 

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars = [];
    const numStars = 800;
    const speed = 4; 

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
      });
    }

    const animate = () => {
      const rDiff = targetRgb.r - currentRgb.r;
      const gDiff = targetRgb.g - currentRgb.g;
      const bDiff = targetRgb.b - currentRgb.b;

      if (Math.abs(rDiff) < 0.5 && Math.abs(gDiff) < 0.5 && Math.abs(bDiff) < 0.5) {
        currentColorIndex = nextColorIndex;
        nextColorIndex = (nextColorIndex + 1) % colors.length;
        targetRgb = hexToRgb(colors[nextColorIndex]);
      } else {
        currentRgb.r += rDiff * colorTransitionSpeed;
        currentRgb.g += gDiff * colorTransitionSpeed;
        currentRgb.b += bDiff * colorTransitionSpeed;
      }

      const bgColorString = `rgb(${Math.round(currentRgb.r)}, ${Math.round(currentRgb.g)}, ${Math.round(currentRgb.b)})`;
      ctx.fillStyle = bgColorString;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ffffff";

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      stars.forEach(star => {
        star.z -= speed;

        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        }

        const k = 128.0 / star.z;
        const px = (star.x - cx) * k + cx;
        const py = (star.y - cy) * k + cy;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size = (1 - star.z / canvas.width) * 2.5;
          const shade = parseInt((1 - star.z / canvas.width) * 255);
          ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isActive]);

  const handleEnter = () => {
    if (onClose) onClose();
  };

  if (!isActive) return null;

  return (
    <div className="warp-overlay">
      <canvas ref={canvasRef} className="warp-canvas" />
      <div className="warp-content">
        <button className="warp-btn" onClick={handleEnter}>
          ENTER UNIVERSE
        </button>
      </div>
    </div>
  );
};

export default WarpAnimation;