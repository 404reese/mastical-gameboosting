import React, { useState } from 'react';

const rankOptions = [
  { rank: 100, price: 22.5 },
  { rank: 200, price: 27.5 },
];

export default function RankSelector({ onSelect }: { onSelect: (rank: number, price: number) => void }) {
  const [selectedRank, setSelectedRank] = useState<number | null>(null);

  const handleSelect = (rank: number, price: number) => {
    setSelectedRank(rank);
    onSelect(rank, price);
  };

  return (
    <div>
      <h3>Select Rank</h3>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {rankOptions.map(option => (
          <button
            key={option.rank}
            onClick={() => handleSelect(option.rank, option.price)}
            style={{
              padding: '1rem',
              border: selectedRank === option.rank ? '2px solid #0070f3' : '1px solid #ccc',
              background: selectedRank === option.rank ? '#e6f0ff' : '#fff',
              cursor: 'pointer',
            }}
          >
            Rank {option.rank} (${option.price.toFixed(2)})
          </button>
        ))}
      </div>
    </div>
  );
}
