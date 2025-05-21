type PropsType = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
};

const emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

const EmailInput = ({ label, name, value, onChange }: PropsType) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <input
        name={name}
        className="input validator w-full rounded-sm"
        type="email"
        required
        pattern={emailPattern}
        title="Please enter a valid email address (e.g., user@example.com)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="validator-hint hidden">
        Please enter a valid email address.
        <br />
        Example: user@example.com
      </p>
    </fieldset>
  );
};

export default EmailInput;
