// src/common/EditableChips.jsx

import { useState } from "react";
import "./EditableChips.css";

export function EditableChips({
  label,
  options = [],
  value = [],
  onChange,
  error,
}) {
  const [customOptions, setCustomOptions] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newValue, setNewValue] = useState("");

  const allOptions = [...options, ...customOptions];

  /* Toggle chip */
  const toggleChip = (val) => {
    let updated;

    if (value.includes(val)) {
      updated = value.filter((v) => v !== val);
    } else {
      updated = [...value, val];
    }

    onChange(updated);
  };

  /* Add new chip */
  const handleAdd = () => {
    if (!newValue.trim()) return;

    const val = newValue.toLowerCase().replace(/\s+/g, "-");

    if (allOptions.some((o) => o.value === val)) return;

    const newOption = {
      value: val,
      label: newValue,
    };

    setCustomOptions((prev) => [...prev, newOption]);

    onChange([...value, val]);

    setNewValue("");
    setShowInput(false);
  };

  /* Delete custom chip */
  const deleteChip = (val) => {
    setCustomOptions((prev) =>
      prev.filter((opt) => opt.value !== val)
    );

    onChange(value.filter((v) => v !== val));
  };

  return (
    <div className="editable-chips">

      {label && <label className="chips-label">{label}</label>}

      <div className="chips-container">

        {allOptions.map((opt) => {
          const active = value.includes(opt.value);
          const isDefault = options.some(
            (o) => o.value === opt.value
          );

          return (
            <div key={opt.value} className="chip-wrapper">

              <button
                type="button"
                onClick={() => toggleChip(opt.value)}
                className={`chip-btn ${active ? "active" : ""}`}
              >
                {active && <span className="chip-check">✓</span>}
                {opt.label}
              </button>

              {!isDefault && (
                <span
                  onClick={() => deleteChip(opt.value)}
                  className="chip-delete"
                >
                  ✕
                </span>
              )}

            </div>
          );
        })}

        {/* Add button */}
        {!showInput && (
          <button
            type="button"
            onClick={() => setShowInput(true)}
            className="chip-add-btn"
          >
            + Add
          </button>
        )}

        {/* Input box */}
        {showInput && (
          <div className="chip-input-box">

            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder={`New ${label}`}
              autoFocus
              className="chip-input"
            />

            <button
              type="button"
              onClick={handleAdd}
              className="chip-save-btn"
            >
              Add
            </button>

            <button
              type="button"
              onClick={() => setShowInput(false)}
              className="chip-cancel-btn"
            >
              ✕
            </button>

          </div>
        )}

      </div>

      {error && (
        <p className="chips-error">{error.message}</p>
      )}

    </div>
  );
}
