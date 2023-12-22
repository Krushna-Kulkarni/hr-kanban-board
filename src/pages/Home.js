import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const Navigate = useNavigate();
  const clickHandler = (id) => {
    Navigate(`/board/${id}`);
  };

  const storedData = JSON.parse(localStorage.getItem("kanbanDataBase"));

  const logoutHandler = () => {
    localStorage.removeItem("kanbanDataBase");
    Navigate("/");
  };

  !storedData && Navigate("/");

  return (
    <>
      <div className="header">
        <div className="header__title">
          <h1>HR Kanban Board</h1>
        </div>
        <div className="header__btn__container">
          <button onClick={logoutHandler} type="button" className="logout__btn">
            Logout
          </button>
        </div>
      </div>
      <div className="boards__container">
        {storedData?.map((board) => (
          <div
            onClick={() => clickHandler(board.id)}
            key={board.id}
            className="board__card"
          >
            <div className="board__card__title">{board.name}</div>
            <div className="chips">
              <span className="chip">{board.minimumYoeRequired}+ YOE</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
