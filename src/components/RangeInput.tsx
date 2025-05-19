type PropsType = {
  name: string;
  value: string;
  min?: string;
  max?: string;
  step?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

const RangeInput = ({
  name,
  value,
  min,
  max,
  step = "1",
  disabled,
  onChange,
}: PropsType) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{name}</legend>
      <input
        className="range range-xs w-full"
        id="scale-input"
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
    </fieldset>
  );
};

export default RangeInput;
