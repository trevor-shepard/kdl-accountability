import React from "react";

interface Props {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const Checkbox = ({ label, isSelected, onClick }: Props) => (
  <div className="form-check">
    <label>
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onClick}
        className="form-check-input"
      />
      {label}
    </label>
  </div>
);

export default Checkbox;
