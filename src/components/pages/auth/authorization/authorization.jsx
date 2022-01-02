import { useDispatch } from "react-redux";
import React from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import requests from "../../../../api/requests";
import actions from "../../../../redux/actions";
import classes from "./authorization.module.scss";
import axios from "axios";
import M from "materialize-css";
export const AuthorizationPage = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const validationForm = (elements) => {
    const res = [];
    elements[0].value.match(
      /([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/
    )
      ? res.push(elements[0].value)
      : (elements[0].style.borderBottom = "1px solid red");

    elements[1].value.length > 6
      ? res.push(elements[1].value)
      : (elements[1].style.borderBottom = "1px solid red");

    return res;
  };

  const formHandler = async (e) => {
    e.preventDefault();

    const inputs = e.target.querySelectorAll("input");
    const [email, password] = validationForm(inputs);

    if (email && password) {
      try {
        const token = (await requests.auth.create(email, password)).data.token;
        cookies.set("token", token, { path: "/" });
        axios.defaults.headers.authorization = `Bearer ${token}`;
        dispatch(actions.auth(token));
        M.toast({ html: "auth succes", classes: "succes" });
        navigate("/");
      } catch (e) {
        M.toast({ html: e, classes: "error" });
      }
    }
  };

  const cleanInputs = (e) => {
    if (e.target.classList.contains(classes.form__input))
      e.target.style.borderBottom = " 1px solid #ccc";
  };
  return (
    <div className={classes.form__wrapper}>
      <form
        action=""
        className={classes.form}
        onSubmit={formHandler}
        onInput={cleanInputs}
      >
        <div className={classes.form__title}></div>
        <div className={classes.form__group}>
          <input className={classes.form__input} required />
          <span className={classes.form__bar}></span>
          <label>E-mail</label>
        </div>
        <div className={classes.form__group}>
          <input className={classes.form__input} required type="password" />
          <span className={classes.form__bar}></span>
          <label>Password</label>
        </div>
        <button className={classes.form__button}>Авторизоваться</button>
      </form>
    </div>
  );
};