import { ChangeEventHandler } from "react"

interface InputInterface {
    label: string;
    name: string;
    placeholder?: string;
    value?: string;
    type?: string;
    setValue: ChangeEventHandler<HTMLInputElement>;
  }
  
  export default function Input({
    label,
    name,
    placeholder,
    value,
    type = "text", 
    setValue
  }: InputInterface) {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={name} className="text-lg font-semibold text-foreground">
          {label}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
          required
          onChange={setValue}
          className="
            w-full
            px-4
            py-2
            border
            border-gray-300
            rounded-md
            text-base
            font-medium
            text-foreground
            placeholder-gray-500
            shadow-sm
            focus:outline-none
            focus:ring-2
            focus:ring-primary
            focus:border-primary
            transition-all
            duration-300
          "
        />
      </div>
    );
  }