type PropsType = {
  name: string;
  value: string;
  onChange: (value: string) => void;
};

const PasswordInput = ({ name, value, onChange }: PropsType) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{name}</legend>
      <label className="input validator w-full">
        <input
          type="password"
          required
          minLength={8}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
      <p className="validator-hint hidden">
        Must be more than 8 characters, including
        <br />
        At least one number <br />
        At least one lowercase letter <br />
        At least one uppercase letter
      </p>
    </fieldset>
  );
};

export default PasswordInput;
