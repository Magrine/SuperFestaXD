import "./AppButton.scss";

const AppButton = (Props) => {
  return (
    <>
      <button
        style={{
          background: `linear-gradient(${Props.firstColor}, ${Props.secondColor})`,
          minWidth: `${Props.min}`,
        }}
        onClick={Props.function}
      >
        {Props.title}
      </button>
    </>
  );
};

export default AppButton;
