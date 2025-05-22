type PropsType = {
  label: string;
  name: string;
  min: string;
  max: string;
  step?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
};

const NumberInput = ({
  label,
  name,
  min,
  max,
  step,
  required,
  value,
  onChange,
}: PropsType) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <input
        name={name}
        type="number"
        min={min}
        max={max}
        step={step ?? "1"}
        required={required}
        className="input w-full rounded-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </fieldset>
  );
};

export default NumberInput;
