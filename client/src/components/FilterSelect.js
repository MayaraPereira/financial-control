import React from 'react';

const options = ['Category'];

export default function FilterSelect({}) {
  const handleSelectChange = (event) => {};

  const { flexRowStyle, selectStyle } = styles;

  return (
    <div className="center" style={flexRowStyle}>
      <select
        className="browser-default"
        style={selectStyle}
        value={selectedPeriod.id}
        onChange={handleSelectChange}
      >
        {allPeriods.map((period) => {
          const { id, description } = period;

          return (
            <option key={id} value={id}>
              {description}
            </option>
          );
        })}
      </select>
    </div>
  );
}

const styles = {
  flexRowStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px',
  },

  selectStyle: {
    width: '150px',
    fontFamily: "'Fira Code Retina', Consolas, monospace, Arial",
  },
};
