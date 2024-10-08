import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-lg font-semibold text-foreground">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="
          w-full
          px-4
          py-2
          bg-background
          border
          border-gray-300
          rounded-md
          text-base
          font-medium
          text-foreground
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-primary
          focus:border-primary
          transition-all
          duration-300
          cursor-pointer
        "
      >

        <option
          value=""
          disabled
          >Selecione:</option>
        

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;