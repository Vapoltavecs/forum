import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requests from "../../../api/requests";
import { Spinner } from "../../ui-components/Spinner/Spinner";
import classes from "./question.module.scss";
export const QuestionPage = () => {
  const id = useParams().id;
  const [questionData, setQuestionData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getQuestionData = async () => {
      try {
        const res = await requests.question.get(id);
        setQuestionData(res.data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    getQuestionData();
  }, [id]);
  console.log(questionData);
  return isLoading || !questionData ? (
    <Spinner />
  ) : (
    <div className={classes.post}>
      <div className={classes.post__title}>{questionData.title}</div>
      <div className={classes.post__content}>{questionData.content}</div>
      <div className={classes.post__tags}>
        {questionData.tags.map((el, i) => (
          <div className={classes.post__tag} key={i}>
            #{el}
          </div>
        ))}
      </div>
    </div>
  );
};
