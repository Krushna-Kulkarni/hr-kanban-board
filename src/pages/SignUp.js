import React from "react";
import { useNavigate } from "react-router-dom";
import { data } from "../data/kanabanDatabase";

const SignUp = () => {
  const Navigate = useNavigate();

  const clickHandler = () => {
    const storedData = JSON.parse(localStorage.getItem("kanbanDataBase"));
    if (!storedData) {
      const kanbanDataBase = data;
      localStorage.setItem("kanbanDataBase", JSON.stringify(kanbanDataBase));
    }
    Navigate("/home");
  };

  return (
    <div className="header">
      <div className="header__title">
        <h1>HR Kanban Board</h1>
      </div>
      <div className="header__btn__container">
        <button className="login__btn" onClick={clickHandler}>
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUp;
