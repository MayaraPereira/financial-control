import React from 'react';

export default function Actions({
  filterText,
  filterCategory,
  onFilter,
  onFilterCategory,
  onNewTransaction,
}) {
  const handleChangeFilterText = (event) => {
    const userText = event.target.value;
    onFilter(userText);
  };

  const handleChangeFilterCategory = (event) => {
    const userText = event.target.value;
    onFilterCategory(userText);
  };

  const handleButtonClick = () => {
    onNewTransaction();
  };

  const { containerStyle, inputStyle, filterStyle } = styles;

  return (
    <div style={containerStyle}>
      <button
        className="waves-effect waves-light btn"
        disabled={filterText.trim() !== '' || filterCategory.trim() !== ''}
        onClick={handleButtonClick}
      >
        + New Transaction
      </button>

      <div className="input-field" style={inputStyle}>
        <input
          placeholder="Filter by Category"
          type="text"
          value={filterCategory}
          onChange={handleChangeFilterCategory}
          style={filterStyle}
        />
        <input
          placeholder="Filter by Description"
          type="text"
          value={filterText}
          onChange={handleChangeFilterText}
          style={filterStyle}
        />
      </div>
    </div>
  );
}

const styles = {
  containerStyle: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  inputStyle: {
    marginLeft: '10px',
    display: 'flex',
    flex: 1,
  },
  filterStyle: {
    width: '350px',
    marginLeft: '10px',
  },
};
