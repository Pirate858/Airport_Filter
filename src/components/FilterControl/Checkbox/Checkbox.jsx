import React from 'react';
import './Checkbox.scss';

const Checkbox = ({ name, onChange, checked }) => {
  return (
    <label className="checkbox-label">
      <input type="checkbox" name={name} onChange={(e) => onChange(e)} checked={checked} />
      <span className="checkmark"></span>
      {name}
    </label>
  );
};

export default Checkbox;
