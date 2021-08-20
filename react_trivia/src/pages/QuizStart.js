import "./Quiz.css";
import Menu from "./quizComponents/Menu";
import Quiz from "./quizComponents/Quiz";
import EndScreen from "./quizComponents/EndScreen";
import { useState } from "react";
import { GameStateContext } from "./helpers/Contexts";
import { useParams } from 'react-router-dom';
import UserStore, { userStore } from './stores/UserStore';
import { Typography } from "@material-ui/core";


// ['menu', 'playing', 'finished']
function QuizStart() {
  const [gameState, setGameState] = useState("menu");
  const [userName, setUserName] = useState(userStore.username);
  const [score, setScore] = useState(0);
  let { currCategory, numQuestions } = useParams();

  const getCat = () => {
    fetch('http://localhost:8080/api/category/get_category?categoryId=' + currCategory)
    .then(response => response.json())
    .then(data => setCategories(data.categoryName));
  }
  var [category, setCategories] = useState(getCat);

  console.log(userStore.isLoggedIn);
  return (
    
    <div className="QuizStart">
      <br/> <br/>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        {category}
      </Typography>
      <GameStateContext.Provider
        value={{
          gameState,
          setGameState,
          userName,
          setUserName,
          score,
          setScore,
        }}
      >
        {gameState === "menu" && <Menu category={currCategory} />}
        {gameState === "playing" && <Quiz category={currCategory} numquestions={numQuestions} />}
        {gameState === "finished" && <EndScreen numquestions={numQuestions} category={currCategory}/>}
      </GameStateContext.Provider>
    </div>
  );
}

export default QuizStart;
