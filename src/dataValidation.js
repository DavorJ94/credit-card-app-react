/* Date */

const DateValidation = ({ expDate }) => {
  const inputMonth = parseInt(expDate.substring(0, 2));
  const inputYear = parseInt(expDate.substring(3));
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = parseInt(currentDate.getFullYear().toString().substr(-2));
  if (
    inputYear < currentYear ||
    (inputYear === currentYear && inputMonth < currentMonth) ||
    inputYear > 30
  )
    return [false, "Please, provide valid expiration date."];
  return [true, ""];
};

const CardNumberValidation = ({
  inputOne,
  inputTwo,
  inputThree,
  inputFour,
}) => {
  let sumOfCardNums =
    inputOne.length + inputTwo.length + inputThree.length + inputFour.length;
  if (sumOfCardNums < 16) {
    return [false, "Complete card number form."];
  } else if (
    inputOne[0] !== "4" &&
    inputOne[0] !== "5" &&
    inputOne[0] !== "6"
  ) {
    console.log(typeof inputOne[0]);
    return [false, "Card number must begin with digits 4, 5 or 6."];
  }
  return [true, ""];
};

const UsernameValidation = ({ username }) => {
  let usernameWords = username.split(" ");
  if (usernameWords.length < 2) return [false, "Please fill out full name."];
  return [true, ""];
};

export { DateValidation, CardNumberValidation, UsernameValidation };
