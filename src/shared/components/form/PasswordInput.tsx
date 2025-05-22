type PropsType = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
};

const PasswordInput = ({ label, name, value, onChange }: PropsType) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <input
        name={name}
        className="input validator w-full rounded-sm"
        type="password"
        required
        minLength={8}
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
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
