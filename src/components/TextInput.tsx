type PropsType = {
  name: string;
  value: string;
  onChange: (value: string) => void;
};

const Textbox = ({ name, value, onChange }: PropsType) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{name}</legend>
      <input
        type="text"
        className="input input-bordered w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </fieldset>
  );
};

export default Textbox ;
