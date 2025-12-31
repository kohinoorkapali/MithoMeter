import "./DropdownFilter.css";

import { useState } from "react";

export function DropdownFilter({ title, options, selectedValues, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(prev => !prev);
  }

  function handleOptionToggle(value) {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];

    onChange(updatedValues);
  }

  return (
    <div className={`dropdown ${isOpen ? "open" : ""}`}>
      <div className="dropdown-trigger" onClick={toggleDropdown}>
        {title}
        {selectedValues.length > 0 && (
          <span className="count">({selectedValues.length})</span>
        )}
      </div>

      <div className="dropdown-options">
        {options.map(option => (
          <label key={option.value}>
            <input
              type="checkbox"
              checked={selectedValues.includes(option.value)}
              onChange={() => handleOptionToggle(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
