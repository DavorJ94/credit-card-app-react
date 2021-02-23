const DisableButtonToggle = (input) => {
  if (input.username.length === 0) return false;
  let sumOfCardNumInputs =
    input.inputOne.length +
    input.inputTwo.length +
    input.inputThree.length +
    input.inputFour.length;
  if (sumOfCardNumInputs < 16) return false;
  if (!input.expDate) return false;
  return true;
};

export default DisableButtonToggle;
