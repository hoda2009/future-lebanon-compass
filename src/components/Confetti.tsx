import { useEffect, useState } from 'react';
import { ThemeCategory, themeConfigs } from '@/contexts/ThemeContext';

interface ConfettiProps {
  isActive: boolean;
  category: ThemeCategory;
}

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  color: string;
  rotation: number;
}

export function Confetti({ isActive, category }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const colors = Object.values(themeConfigs[category].colors);
      const newPieces: ConfettiPiece[] = [];
      
      for (let i = 0; i < 100; i++) {
        newPieces.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
        });
      }
      
      setPieces(newPieces);

      // Clear confetti after animation
      const timer = setTimeout(() => {
        setPieces([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isActive, category]);

  if (!isActive || pieces.length === 0) return null;

  return (
    <div className="confetti-container">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
    </div>
  );
}
