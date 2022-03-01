import { useForm } from "react-hook-form";
import classes from "./question.module.scss";

import React, { useState } from "react";

import requests from "../../../api/requests";
import M from "materialize-css";
import { useSelector } from "react-redux";
import MyEditor from "./editor/editor";
import { useNavigate } from "react-router-dom";

export const CreateQuestion = () => {
  const { register, handleSubmit } = useForm();
  const [content, setContent] = useState();
  const token = useSelector((token) => token.authReducer.token);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const { id } = (
        await requests.questions.create({
          ...data,
          content,
          tags: data.tags.split(","),
        })
      ).data;
      M.toast({ html: "Пост успешно создан", classes: "succes" });
      navigate(`/question/${id}`);
    } catch (e) {
      for (let i in e.response.data) {
        M.toast({ html: e.response.data[i], classes: "error" });
      }
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
            <label>Задайте вопрос</label>
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
