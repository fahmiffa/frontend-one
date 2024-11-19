import React, { useState} from 'react';

const RandomNumberGenerator: React.FC = () => {
  const [number, setNumber] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generateRandomNumber = () => {
    setIsGenerating(true);
    const interval = setInterval(() => {
      setNumber(Math.floor(Math.random() * 100)); // Angka acak antara 0 dan 99
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      setNumber(Math.floor(Math.random() * 100)); // Set angka acak terakhir setelah timeout
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{number}</h1>
      <button onClick={generateRandomNumber} disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'Generate Random Number'}
      </button>
    </div>
  );
};

export default RandomNumberGenerator;
