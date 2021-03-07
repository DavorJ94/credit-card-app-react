import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./styles/CreateCreditCard.css";
import { dateParser, reverseDateParser } from "./dateParser";
import visa from "./images/visa.png";
import masterCard from "./images/MasterCard.png";
import discover from "./images/Discover.png";
import placeholder from "./images/placeholder.png";
import chip from "./images/chip.png";
import DisableButtonToggle from "./disableButtonToggle";
import IdGenerator from "./idGenerator";
import getIdFromLink from "./getIdFromLink";
import {
  DateValidation,
  CardNumberValidation,
  UsernameValidation,
} from "./dataValidation";

function CreateCreditCard({ elements, showHide }) {
  /* HOOKS */
  const history = useHistory();
  if (getIdFromLink()) {
    const items = Object.values({ ...localStorage });
    const thisCard = items.find((item) => {
      let element = JSON.parse(item);
      return element.id === getIdFromLink();
    });
    elements = JSON.parse(thisCard);
  }
  /* All refs for element focus */
  const inputOne = useRef(null);
  const inputTwo = useRef(null);
  const inputThree = useRef(null);
  const inputFour = useRef(null);
  const usernameRef = useRef(null);
  const expDateRef = useRef(null);
  /* All refs for element focus */

  /* All states */
  const [state, setState] = useState(elements);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [backgroundState, setBackgroundState] = useState({
    background: "",
  });
  const [logoState, setLogoState] = useState(placeholder);
  /* All states */

  /* use effect for logo display */
  useEffect(() => {
    if (state.inputOne[0] === "4") {
      setBackgroundState({
        backgroundImage: "linear-gradient(to right, #F9D976, #F5D020)",
      });
      setLogoState(visa);
      return;
    }

    if (state.inputOne[0] === "5") {
      setBackgroundState({
        backgroundImage: "linear-gradient(to right, #0BAB64, #3BB78F)",
      });
      setLogoState(masterCard);
      return;
    }

    if (state.inputOne[0] === "6") {
      setBackgroundState({
        backgroundImage: "linear-gradient(to right, #F53803, #EFECAA)",
      });
      setLogoState(discover);

      return;
    }
    setBackgroundState({
      backgroundImage:
        "linear-gradient(90deg,rgba(118, 128, 168, 1) 0%,rgba(167, 175, 194, 1) 50%,rgba(203, 209, 219, 1) 100%)",
    });
    setLogoState(placeholder);
  }, [state.inputOne]);
  /* use effect for logo display */
  useEffect(() => {
    IdGenerator(state);
    if (DisableButtonToggle(state)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [state]);

  useEffect(() => {
    setState({
      ...state,
      id: IdGenerator(state),
    });
    usernameRef.current.focus();
    // eslint-disable-next-line
  }, []);

  /* Current year and current month for expiration date*/
  let currentYear = new Date().getFullYear();
  let monthDate = "0" + new Date().getMonth();
  let currentMonth = monthDate.substring(monthDate.length - 2);
  /* Current year and current month for expiration date*/

  /* Handling input change */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "expDate") {
      setState({
        ...state,
        [name]: dateParser(value),
      });
      return;
    }
    if (name === "username" && /\d/.test(value)) {
      alert("Digits are not allowed for user name.");
      return;
    }
    if (
      name === "inputOne" ||
      name === "inputTwo" ||
      name === "inputThree" ||
      name === "inputFour"
    ) {
      if (!/^\d+$/.test(value) && value !== "") {
        alert("Only digits are allowed for card number.");
        return;
      }
    }

    setState({
      ...state,
      [name]: value,
    });
  };
  /* Handling input change */

  /* Handling data submission */
  const handleSubmit = (e) => {
    const [dateValidated, dateMessage] = DateValidation(state);
    const [usernameValidated, usernameMessage] = UsernameValidation(state);
    const [cardNumValidated, cardNumMessage] = CardNumberValidation(state);
    if (dateValidated && usernameValidated && cardNumValidated) {
      localStorage.setItem(IdGenerator(state), JSON.stringify(state));
      let path = `/cards`;
      history.push(path);
    } else {
      alert(
        `${usernameMessage !== "" ? usernameMessage : "User name is VALID."}\n${
          cardNumMessage !== "" ? cardNumMessage : "Card number is VALID."
        }\n${dateMessage !== "" ? dateMessage : "Date is VALID."}`
      );
    }
  };
  /* Handling data submission */
  return (
    <div>
      {/*All graphical card content*/}
      <div className="card-content" style={backgroundState}>
        <img
          className="card-content__logo"
          src={logoState}
          alt="credit card logo"
        />
        <img className="card-content__chip" src={chip} alt="credit card chip" />
        <div className="card-content__number">
          <h3 onClick={() => inputOne.current.focus()} name="inputOne">
            {state.inputOne === ""
              ? "0000"
              : (state.inputOne + "0000").substr(0, 4)}
          </h3>
          <h3 onClick={() => inputTwo.current.focus()} name="inputTwo">
            {state.inputTwo === ""
              ? "0000"
              : (state.inputTwo + "0000").substr(0, 4)}
          </h3>
          <h3 onClick={() => inputThree.current.focus()} name="inputThree">
            {state.inputThree === ""
              ? "0000"
              : (state.inputThree + "0000").substr(0, 4)}
          </h3>
          <h3 onClick={() => inputFour.current.focus()} name="inputFour">
            {state.inputFour === ""
              ? "0000"
              : (state.inputFour + "0000").substr(0, 4)}
          </h3>
        </div>
        <div className="card-content__username-expdate">
          <h3 onClick={() => usernameRef.current.focus()}>
            {state.username === "" ? "User name" : state.username}
          </h3>
          <h3 onClick={() => expDateRef.current.focus()}>
            {state.expDate === "" ? "00/00" : state.expDate}
          </h3>
        </div>
      </div>
      {/*All form elements*/}
      <form
        className="form-elements"
        style={{ display: showHide ? "flex" : "none" }}
      >
        <label forhtml="username">Name</label>
        <input
          name="username"
          ref={usernameRef}
          value={state.username}
          type="text"
          maxLength="30"
          onChange={handleInputChange}
          required
        />
        <label>Card number</label>
        <div className="card-number">
          <input
            ref={inputOne}
            name="inputOne"
            value={state.inputOne}
            onChange={handleInputChange}
            type="text"
            maxLength="4"
            required
          />
          <input
            ref={inputTwo}
            name="inputTwo"
            value={state.inputTwo}
            onChange={handleInputChange}
            type="text"
            maxLength="4"
            required
          />
          <input
            ref={inputThree}
            name="inputThree"
            value={state.inputThree}
            onChange={handleInputChange}
            type="text"
            maxLength="4"
            required
          />
          <input
            ref={inputFour}
            name="inputFour"
            value={state.inputFour}
            onChange={handleInputChange}
            type="text"
            maxLength="4"
            required
          />
        </div>
        <label forhtml="expDate">Expires on</label>
        <input
          name="expDate"
          min={`${currentYear}-${currentMonth}`}
          type="month"
          value={reverseDateParser(state.expDate)}
          className="exp-date"
          ref={expDateRef}
          onChange={handleInputChange}
          required
        />
        <button
          type="submit"
          className="buttonSave"
          onClick={handleSubmit}
          disabled={buttonDisabled}
        >
          Save
        </button>
      </form>
    </div>
  );
}
CreateCreditCard.defaultProps = {
  elements: {
    username: "",
    inputOne: "",
    inputTwo: "",
    inputThree: "",
    inputFour: "",
    expDate: "",
    id: "",
  },
  showHide: true,
};
export default CreateCreditCard;
