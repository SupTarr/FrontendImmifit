type PropsType = {
  label: string;
  name: string;
  min: string;
  max: string;
  step?: string;
  value: string;
  onChange: (value: string) => void;
};

const NumberInput = ({
  label,
  name,
  min,
  max,
  step,
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
        className="input w-full rounded-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </fieldset>
  );
};

export default NumberInput;
