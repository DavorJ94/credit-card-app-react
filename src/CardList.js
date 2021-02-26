import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import CreateCreditCard from "./CreateCreditCard";
import "./styles/CardList.css";
function CardList() {
  const [storage, setStorage] = useState(Object.values({ ...localStorage }));
  const history1 = useHistory();

  const removeCard = (e) => {
    localStorage.removeItem(e.target.id);
    setStorage(Object.values({ ...localStorage }));
  };

  useEffect(() => {
    console.log(typeof Object.keys({ ...localStorage }).length);
    if (Object.keys({ ...localStorage }).length === 0) {
      let path = `/cards/add`;
      history1.push(path);
    }
  }, [storage, history1]);

  const allCards = storage.map((item) => {
    let element = JSON.parse(item);
    return (
      <div className="card-and-btn-container" key={element.id}>
        <Link
          to={`/cards/${element.id}/edit`}
          className="links"
          key={element.id}
        >
          <CreateCreditCard
            elements={element}
            key={element.id}
            showHide={false}
          />
        </Link>
        <button className="btn" onClick={removeCard} id={element.id}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    );
  });
  return (
    <div>
      <div className="cards-container">
        {allCards}
        <Link to="/cards/add" className="links">
          <div className="add-card">
            <span>+</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CardList;
