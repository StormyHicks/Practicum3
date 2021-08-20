import React from "react";
import "../Quiz.css";
import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";
import UserStore, { userStore } from "../stores/UserStore";


const EndScreen = (props) => {
  const { score, setScore, setGameState, userName } = useContext(
    GameStateContext
  );
  var sub = false;
  const restartQuiz = () => {
    setScore(0);
    setGameState("menu");
  };

  const sendScore = () => {
    if (sub) {
      alert("Score already submitted. ");
    }
    else if (userStore.isLoggedIn) {
      const myScore = {"categoryId": props.category, "scoreNum": score, "scoreTotal": props.numquestions, "userId": userStore.userId};
      fetch('http://localhost:8080/api/score/create',
      {
        method: "POST",
        body: JSON.stringify(myScore),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      sub = true;
    }
    else {
      alert("You must be logged in to submit scores.");
    }
  }
  return (
    <div>
      <h1>Quiz Finished</h1>
    <div className="EndScreen">
      <h3>USER: {userName}</h3>
      <h1>
        {score} / {props.numquestions}
      </h1>
      <button onClick={restartQuiz}>Restart Quiz</button>
      <button onClick={sendScore}>Submit Score</button>
    </div>
    </div>
  );
};

export default EndScreen;
