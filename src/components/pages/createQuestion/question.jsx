import { useForm } from "react-hook-form";
import classes from "./question.module.scss";

import React, { useState } from "react";

import requests from "../../../api/requests";
import M from "materialize-css";
import { useSelector } from "react-redux";
import MyEditor from "./editor/editor";

export const CreateQuestion = () => {
  const { register, handleSubmit } = useForm();
  const [content, setContent] = useState();
  const token = useSelector((token) => token.authReducer.token);

  const onSubmit = async (data) => {
    try {
      console.log(content);
      await requests.questions.create({
        ...data,
        content,
        tags: data.tags.replace(/,/g, "").split(" "),
      });
      M.toast({ html: "Пост успешно создан", classes: "succes" });
    } catch (e) {
      M.toast({ html: e.response.data, classes: "error" });
    }
  };
  const handleChange = (data) => {
    setContent(data);
  };

  return token ? (
    <div className={classes.page}>
      <div className={classes.form__wrapper}>
        <form
          action=""
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={classes.form__title}></div>
          <div className={classes.form__group}>
            <input
              className={classes.form__input}
              required
              {...register("title")}
            />
            <span className={classes.form__bar}></span>
            <label>
              Задайте вопрос(постарайтесь передать суть вопроса кратко)
            </label>
          </div>

          <MyEditor handleChange={handleChange} />

          <div className={classes.form__group}>
            <input
              className={classes.form__input}
              required
              type="text"
              {...register("tags")}
            />
            <span className={classes.form__bar}></span>
            <label>Тэги (через запятую)</label>
          </div>
          <button className={classes.form__button}>Задать вопрос</button>
        </form>
      </div>
    </div>
  ) : (
    "Авторизуйтесь"
  );
};
