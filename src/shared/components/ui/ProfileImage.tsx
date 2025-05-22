type PropsType = {
  src?: string | null;
};

const ProfileImage = ({ src }: PropsType) => {
  return (
    <figure className="avatar">
      {src ? (
        <div className="mt-2 h-32 w-32 rounded-full">
          <img src={src} />
        </div>
      ) : (
        <div className="avatar avatar-placeholder flex justify-center">
          <div className="bg-neutral w-24 rounded-full">
            <span className="text-neutral-content text-3xl">?</span>
          </div>
        </div>
      )}
    </figure>
  );
};

export default ProfileImage;
