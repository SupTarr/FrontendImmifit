type PropsType = {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

const TextareaInput = ({
  label,
  name,
  placeholder,
  value,
  onChange,
}: PropsType) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <textarea
        name={name}
        className="textarea h-24 w-full rounded-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </fieldset>
  );
};

export default TextareaInput;
