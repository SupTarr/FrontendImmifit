type PropsType = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
};

const TextInput = ({ label, name, value, onChange }: PropsType) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <input
        name={name}
        type="text"
        className="input w-full rounded-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </fieldset>
  );
};

export default TextInput;
