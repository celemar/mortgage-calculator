import { useFormContext } from "react-hook-form";

type NumberInputProps = {
  name: string;
  label: string;
  unit?: string;
  formatWithCommas?: boolean;
};

export default function NumberInput({
  name,
  label,
  unit,
  formatWithCommas,
}: NumberInputProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  const customStyles = `
    ${
      error
        ? "border-red"
        : "border-slate-700 hover:border-slate-900 focus-within:hover:border-lime"
    } 
    ${unit === "£" ? "flex-row-reverse" : ""} 
    w-full flex items-center border focus-within:border-lime focus-within:span:bg-yellow-200 rounded z-2`;

  const unitStyles = `
    py-3 px-4 font-bold 
    ${
      unit === "£"
        ? "rounded-bl-[0.2em] rounded-tl-[0.2em]"
        : "rounded-br-[0.2em] rounded-tr-[0.2em] "
    } 
    ${error ? "bg-red text-white" : "bg-slate-100 text-slate-700"}`;

  const formatNumber = (value: string) => {

    // Only add commas if formatWithCommas is true
    return formatWithCommas
      ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : value;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Allow numbers and one decimal point
    value = value.replace(/[^\d.]/g, "");

    // Ensure only one decimal point
    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }

    const formattedValue = formatNumber(value);
    setValue(name, formattedValue, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col gap-2 md:gap-3">
      <label htmlFor={name} className="text-slate-700">
        {label}
      </label>
      <div className={`${customStyles} custom-focus `}>
        <input
          {...register(name, {
            onChange: handleInputChange,
            setValueAs: (v: string) => {
              // Convert to number for Zod validation
              const numValue = parseFloat(v.replace(/,/g, ""));
              return isNaN(numValue) ? "" : numValue;
            },
          })}
          inputMode="numeric"
          id={name}
          aria-invalid={error ? "true" : "false"}
          type="text"
          className={`w-full pl-4 py-3 font-bold bg-transparent text-slate-900 cursor-pointer outline-none border-none`}
        />
        {unit && (
          <span className={`${unitStyles} focus-within:span:bg-yellow-200`}>
            {unit}
          </span>
        )}
      </div>
      {error && (
        <span className="text-red text-sm">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
}
