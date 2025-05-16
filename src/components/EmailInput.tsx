type PropsType = {
  name: string;
  onChange: (value: string) => void;
};

 const emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

const EmailInput = ({ name, onChange }: PropsType) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{name}</legend>
      <label className="input validator w-full">
        <input
          type="email"
          required
          pattern={emailPattern}
          title="Please enter a valid email address (e.g., user@example.com)"
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
      <p className="validator-hint hidden"> {/* Styled hint */}
        Please enter a valid email address.
        <br />
        Example: user@example.com
      </p>
    </fieldset>
  );
};

export default EmailInput;
