import React from 'react';
import { Select } from '@chakra-ui/react';

const Dropdown = () => {
  let option = [];

  for (let i = 0; i < 60; i++) {
    const op = document.createElement('option');
    op.text = i;
    op.text = op.text.padStart(2, '0');
    op.value = i;
    option.push(op);
  }

  return (
    <div>
      Dropdown
      <Select size="sm" width="50%" iconSize="0">
        {option.map((op) => (
          <option key={op.value} value={op.value}>
            {op.innerText}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default Dropdown;
