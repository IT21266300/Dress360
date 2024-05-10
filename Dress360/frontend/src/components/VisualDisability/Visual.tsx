// Visual.tsx
import React, { useRef } from 'react';
import './Visual.css';

const Visual = ({ handleClose }: { handleClose: () => void }) => {
  const textRef = useRef<HTMLParagraphElement>(null);

  const speakText = () => {
    if (textRef.current) {
      const speech = new SpeechSynthesisUtterance(textRef.current.innerText);
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <div className="visual-popup">
      <h2>Visual Disability Assistance</h2>
      <p ref={textRef}>
      The color of the item of clothing you have chosen is blue and the entire dress is dark blue. Also, this dress has light blue stripes like the sky.
      </p>
      <button onClick={speakText}>Read Aloud</button>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default Visual;
