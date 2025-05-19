type PropsType = {
  name: string;
  min: string;
  max: string;
  step?: string;
  value: string;
  onChange: (value: string) => void;
};

const NumberInput = ({ name, min, max, step, value, onChange }: PropsType) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{name}</legend>
      <input
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
