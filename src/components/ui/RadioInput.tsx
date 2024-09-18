import React from "react";
import { useFormContext } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type RadioInputProps = {
  name: string;
  options: Option[];
};

export default function RadioInput({ name, options }: RadioInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <fieldset
      aria-invalid={errors.queryType ? "true" : "false"}
      className="grid gap-2"
    >
      <legend className="text-slate-700 pb-2 md:pb-3">Mortgage Type</legend>
      {options.map((option) => (
        <div
          key={option.value}
          className="flex items-center gap-4 pl-4 py-[0.6rem] md:py-[0.65rem] border border-slate-700 rounded hover:border-lime custom-focus custom-bg"
        >
          <input
            id={`${name}-${option.value}`}
            className="cursor-pointer"
            type="radio"
            value={option.value}
            {...register(name)}
          />
          <label
            htmlFor={`${name}-${option.value}`}
            className="font-bold text-lg text-slate-900"
          >
            {option.label}
          </label>
        </div>
      ))}
      {errors[name] && (
        <span className="text-red text-sm pt-1">This field is required</span>
      )}
    </fieldset>
  );
}
