import "./App.css";
import CardLogo from "./images/card-logo.svg";
import Confirmed from "./images/icon-complete.svg";
import { useState } from "react";

export default function App() {
  return (
    <div className="container">
      <CardContainer />
    </div>
  );
}

function CardContainer() {
  const [cardUser, setCardUser] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  function handleNumberChange() {
    const numberArr = [...cardNumber.split(" ").join("")];
    const creditCard = [];
    numberArr.forEach((n, i) => {
      creditCard.push(n);
      if ((i + 1) % 4 === 0) {
        creditCard.push(" ");
      }
    });
    return creditCard.join("");
  }

  function resetFrom() {
    setCardUser("");
    setCardNumber("");
    setCardMonth("");
    setCardYear("");
    setCardCvc("");
  }

  return (
    <div className="cardContainer">
      <Cards
        cardUser={cardUser}
        cardNumber={cardNumber}
        cardMonth={cardMonth}
        cardYear={cardYear}
        cardCvc={cardCvc}
        onHandleCardNumberChange={handleNumberChange}
      />
      <CardDetails
        cardUser={cardUser}
        setCardUser={setCardUser}
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        cardMonth={cardMonth}
        setCardMonth={setCardMonth}
        cardYear={cardYear}
        setCardYear={setCardYear}
        cardCvc={cardCvc}
        setCardCvc={setCardCvc}
        onHandleCardNumberChange={handleNumberChange}
        onReset={resetFrom}
      />
    </div>
  );
}

function Cards({ cardUser, cardNumber, cardMonth, cardYear, cardCvc }) {
  return (
    <div className="cardscontainer">
      <div className="cardFront">
        <div className="cardFront__box">
          <img src={CardLogo} alt="card-logo" />
          <h2>{cardNumber || "0000 0000 0000 0000"}</h2>
          <div className="cardFront__box--user">
            <h3>{cardUser || "Jane Appleseed"}</h3>
            <h3>
              {cardMonth || "MM"}/{cardYear || "YY"}
            </h3>
          </div>
        </div>
      </div>
      <div className="cardBack">
        <h3>{cardCvc || "000"}</h3>
      </div>
    </div>
  );
}

function CardDetails({
  cardUser,
  cardNumber,
  cardMonth,
  cardYear,
  cardCvc,
  setCardUser,
  setCardNumber,
  setCardMonth,
  setCardYear,
  setCardCvc,
  onHandleCardNumberChange,
  onReset,
}) {
  const [isSubmitted, setIsSubmitted] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!cardUser || !cardMonth || !cardYear || !cardCvc) {
      alert("Please fill all the fields");
      setIsSubmitted(false);
    } else {
      setIsSubmitted(true);
    }
  }

  function checkErrorName() {
    return isSubmitted === false && !cardUser ? true : false;
  }

  function checkErrorNumber() {
    return (isSubmitted === false && cardNumber.toString() === "") ||
      (isSubmitted === false && cardNumber.toString().match(/[^,\s,\d]/))
      ? true
      : false;
  }

  function checkErrorExpiry() {
    return (isSubmitted === false && !cardYear) ||
      (isSubmitted === false && !cardMonth) ||
      (isSubmitted === false &&
        [cardMonth, cardYear].toString().match(/[^,\s,\d]/))
      ? true
      : false;
  }

  function checkErrorCvc() {
    return (isSubmitted === false && !cardCvc) ||
      (isSubmitted === false && cardCvc.match(/[^,\s,\d]/))
      ? true
      : false;
  }

  return (
    <form className="form">
      <div className={isSubmitted ? "cardDetails hide" : "cardDetails show"}>
        <div>
          <h3>Cardholder Name</h3>
          <input
            type="text"
            placeholder="e.g. Jane Appleseed"
            value={cardUser}
            onChange={(e) => setCardUser(e.target.value)}
          />
          <p className={checkErrorName() ? "error show" : "error"}>
            Field cannot be empty
          </p>
        </div>

        <div>
          <h3>Card Number</h3>
          <input
            type="text"
            placeholder="e.g. 1234 5678 9123 0000"
            onChange={(e) => {
              setCardNumber(e.target.value);
            }}
            value={onHandleCardNumberChange()}
            maxLength={19}
          />
          <p className={checkErrorNumber() ? "error show" : "error "}>
            Please enter a valid card number
          </p>
        </div>

        <div className="cardDetails__box">
          <div className="cardDetails__box--1">
            <h3>exp, date (mm/yy)</h3>
            <div className="cardDetails__box--exp">
              <input
                type="number"
                placeholder="MM"
                value={cardMonth}
                maxLength={2}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    value.length <= 2 &&
                    (value === "" ||
                      (parseInt(value) >= 1 && parseInt(value) <= 12))
                  ) {
                    setCardMonth(value);
                  }
                }}
              />
              <p className={checkErrorExpiry() ? "error show" : "error"}>
                Can't be empty
              </p>
              <input
                type="number"
                placeholder="YY"
                value={cardYear}
                maxLength={2}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    value.length <= 2 &&
                    (value === "" ||
                      (parseInt(value) >= 0 && parseInt(value) <= 99))
                  ) {
                    setCardYear(value);
                  }
                }}
              />{" "}
              <p className={checkErrorExpiry() ? "error show" : "error"}>
                Can't be empty
              </p>
            </div>
          </div>
          <div className="cardDetails__box--1">
            <h3>CVC</h3>
            <input
              type="number"
              maxLength={3}
              placeholder="e.g. 123"
              value={cardCvc}
              onChange={(e) => {
                const value = e.target.value;
                if (
                  value.length <= 3 &&
                  (value === "" ||
                    (parseInt(value) >= 0 && parseInt(value) <= 999))
                ) {
                  setCardCvc(value);
                }
              }}
            />{" "}
            <p className={checkErrorCvc() ? "error show" : "error"}>
              Can't be empty
            </p>
          </div>
        </div>

        <div className="cardDetails__box--2">
          <button onClick={handleSubmit}>Confirm</button>
        </div>
      </div>

      <div className={isSubmitted ? "confirmation show" : "confirmation hide"}>
        <img src={Confirmed} alt="confirmed" />
        <h1>Thank you!</h1>
        <p>We've added your card details</p>
        <button onClick={onReset}>Confirm</button>
      </div>
    </form>
  );
}
