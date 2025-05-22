type PropsType = {
  label: string;
  name: string;
  options: string[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

const SelectInput = ({ label, name, options, value, onChange }: PropsType) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <select
        name={name}
        className="select w-full rounded-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </fieldset>
  );
};

export default SelectInput;
