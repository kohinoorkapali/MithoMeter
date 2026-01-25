import { useState } from "react";
import "./EditableChips.css";
 
export function EditableChips({
  name,
  label,
  options = [],
  register,
  setValue,
  error,
}) {
  const [selected, setSelected] = useState([]);
  const [customOptions, setCustomOptions] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newValue, setNewValue] = useState("");
 
  const allOptions = [...options, ...customOptions];
 
  // Select / Unselect
  const toggleChip = (value) => {
    let updated;
 
    if (selected.includes(value)) {
      updated = selected.filter((v) => v !== value);
    } else {
      updated = [...selected, value];
    }
 
    setSelected(updated);
    setValue(name, updated, { shouldValidate: true });
  };
 
  // Add new chip
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
    setSelected(updated);
 
    setValue(name, updated, { shouldValidate: true });
 
    setNewValue("");
    setShowInput(false);
  };
 
  // Delete chip
  const deleteChip = (value) => {
    setCustomOptions((prev) =>
      prev.filter((opt) => opt.value !== value)
    );
 
    const updated = selected.filter((v) => v !== value);
 
    setSelected(updated);
    setValue(name, updated, { shouldValidate: true });
  };
 
  return (
<div className="editable-chips">
 
      {/* Label */}
      {label && (
<label className="chips-label">
          {label}
</label>
      )}
 
      {/* Chips Area */}
<div className="chips-container">
 
        {allOptions.map((opt) => {
          const active = selected.includes(opt.value);
          const isDefault = options.some(o => o.value === opt.value);
 
          return (
<div
              key={opt.value}
              className="chip-wrapper"
>
 
              {/* Chip */}
<button
                type="button"
                onClick={() => toggleChip(opt.value)}
                className={`chip-btn ${active ? "active" : ""}`}
>
                {active && "✓ "}
                {opt.label}
</button>
 
              {/* Delete (Only custom) */}
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
 
        {/* Add Button */}
        {!showInput && (
<button
            type="button"
            onClick={() => setShowInput(true)}
            className="chip-add-btn"
>
            + Add
</button>
        )}
 
        {/* Input */}
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
 
      {/* Hidden input */}
<input type="hidden" {...register(name)} />
 
      {/* Error */}
      {error && (
<p className="chips-error">
          {error.message}
</p>
      )}
 
    </div>
  );
}