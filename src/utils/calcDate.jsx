const calcDate = (date) => {
  return (
    72 -
    Math.floor(
      Math.abs(new Date(Date.now()) - new Date(date)) / (1000 * 60 * 60)
    )
  );
};

export default calcDate;
