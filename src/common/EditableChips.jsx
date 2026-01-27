import { useState } from "react";
import { useWatch } from "react-hook-form";
import "./EditableChips.css";

export function EditableChips({
  name,
  label,
  options = [],
  register,
  setValue,
  control,
  error,
}) {

  const selected = useWatch({
    control,
    name,
    defaultValue: [],
  });

  const [customOptions, setCustomOptions] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newValue, setNewValue] = useState("");

  const allOptions = [...options, ...customOptions];

  // Toggle
  const toggleChip = (value) => {
    let updated;

    if (selected.includes(value)) {
      updated = selected.filter((v) => v !== value);
    } else {
      updated = [...selected, value];
    }

    setValue(name, updated, { shouldValidate: true });
  };

  // Add new
  const handleAdd = () => {
    if (!newValue.trim()) return;

    const value = newValue.toLowerCase().replace(/\s+/g, "-");

    if (allOptions.some((o) => o.value === value)) return;

    const newOption = {
      value,
      label: newValue,
    };

    setCustomOptions((prev) => [...prev, newOption]);

    const updated = [...selected, value];

    setValue(name, updated, { shouldValidate: true });

    setNewValue("");
    setShowInput(false);
  };

  // Delete
  const deleteChip = (value) => {
    setCustomOptions((prev) =>
      prev.filter((opt) => opt.value !== value)
    );

    const updated = selected.filter((v) => v !== value);

    setValue(name, updated, { shouldValidate: true });
  };

  return (
    <div className="editable-chips">

      {label && <label className="chips-label">{label}</label>}

      <div className="chips-container">

        {allOptions.map((opt) => {
          const active = selected.includes(opt.value);
          const isDefault = options.some(o => o.value === opt.value);

          return (
            <div key={opt.value} className="chip-wrapper">

              <button
                type="button"
                onClick={() => toggleChip(opt.value)}
                className={`chip-btn ${active ? "active" : ""}`}
              >
                {active && "✓ "}
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

        {!showInput && (
          <button
            type="button"
            onClick={() => setShowInput(true)}
            className="chip-add-btn"
          >
            + Add
          </button>
        )}

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

      {/* Hidden input for RHF */}
      <input type="hidden" {...register(name)} />

      {error && (
        <p className="chips-error">{error.message}</p>
      )}

    </div>
  );
}
