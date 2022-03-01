import { useEffect, useState } from "react";
import requests from "../../../api/requests";
import M from "materialize-css";
import classes from "./profile.module.scss";
import { Spinner } from "../../ui-components/Spinner/Spinner";
import { Achivment } from "../../ui-components/achivement/Achivement";
import { Question } from "../../ui-components/question/question";

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "",
    status: "",
    id: null,
    avatar: "",
    description:"",
    achievements: [],
    questions: [],
  });
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const res = await requests.user.get();
        setUserData({ ...userData, ...res.data });
      } catch (e) {
        M.toast({ html: e.response.data, classes: "error" });
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, []);
  return isLoading ? (
    <Spinner />
  ) : (
    <div className={classes.user}>
      <div className={classes.user__profile}>
        <img
          className={classes.user__avatar}
          src={userData.avatar}
          alt="avatar"
        />
        <div className={classes.user__text}>
          <div className={classes.user__text_name}>{userData.username}</div>
          <div className={classes.user__text_status}>{userData.status}</div>
          <div className={classes.user__text_description}>
            {userData.description}
          </div>
        </div>
      </div>
      <div className={classes.achievements__title}>Мои достижения:</div>
      <div className={classes.achivments}>
        {userData.achievements.map((el) => (
          <Achivment {...el} key={el.id} />
        ))}
      </div>
      <div className={classes.questions}>
        <div className={classes.questions__title}>Мои вопросы:</div>
        {userData.questions.map((el) => (
          <Question {...el} key={el.id} />
        ))}
      </div>
    </div>
  );
};

export { Profile };
