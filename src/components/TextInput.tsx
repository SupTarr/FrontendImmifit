type PropsType = {
  name: string;
  onChange: (value: string) => void;
};

const Textbox = ({ name, onChange }: PropsType) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{name}</legend>
      <input
        type="text"
        className="input input-bordered w-full"
        onChange={(e) => onChange(e.target.value)}
      />
    </fieldset>
  );
};

export default Textbox ;
