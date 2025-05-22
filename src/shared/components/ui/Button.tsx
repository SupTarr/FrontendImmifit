type PropsType = {
  name: string;
  isLoading: boolean;
};

const Button = ({ name, isLoading }: PropsType) => {
  return (
    <>
      {!isLoading && (
        <button className="btn btn-neutral mt-4" type="submit">
          {name}
        </button>
      )}
      {isLoading && (
        <div className="mt-4 flex items-center justify-center">
          <span className="loading loading-spinner"></span>
        </div>
      )}
    </>
  );
};

export default Button;
