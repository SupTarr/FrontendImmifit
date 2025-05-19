type PropsType = {
  name: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

const TextareaInput = ({ name, placeholder, value, onChange }: PropsType) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{name}</legend>
      <textarea
        className="textarea h-24 w-full rounded-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </fieldset>
  );
};

export default TextareaInput;
