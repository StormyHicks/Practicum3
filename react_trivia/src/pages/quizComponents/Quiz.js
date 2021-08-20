import "../Quiz.css";

import { useState } from "react";

import { useContext, useEffect } from "react";
import { GameStateContext } from "../helpers/Contexts";
import Button from "@material-ui/core/Button";
import { ThemeProvider, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const blueTheme = createMuiTheme({ palette: { primary: {main: 'rgb(65, 105, 225)'}, secondary: {main:'rgb(70, 181, 255)'}} });




function Quiz(props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");
  const { score, setScore, gameState, setGameState } = useContext(
    GameStateContext
  );
  const [Questions, setQuestions] = useState([]);
  var [optionList, setOptionList]  = useState([]);
  var [answerList, setAnswerList]  = useState([]);
  const [stateCategory] = useState(props.category);
  const [stateNumber] = useState(props.numquestions);


  function AnswerButton(props)
  {
    return (
    <MuiThemeProvider theme={blueTheme}>
    <Button
      variant="contained" 
      color={props.currColor}
      onClick={() => {
        setOptionChosen(props.option);
    }}
  >
    {props.textValue}
  </Button>
  </MuiThemeProvider>
    )
  }

  useEffect(() => {
    async function fetchQuestions(categoryID, numQuestions) {
      const response = await fetch('http://localhost:8080/api/question/get_random', {
          method: 'POST',
          body: 'categoryId=' + categoryID + "&numberOfQuestions=" + numQuestions,
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
          },
        });
      const fetchedQuestions = await response.json(response);
      setQuestions(fetchedQuestions);}
    if (stateCategory !== undefined) 
      {fetchQuestions(stateCategory, stateNumber);}
  }, [stateCategory, stateNumber]);

  useEffect(() => {
    if (Questions[currentQuestion] !== undefined)
      {
      setOptionList([Questions[currentQuestion].answers[0].answerText, Questions[currentQuestion].answers[1].answerText, 
        Questions[currentQuestion].answers[2].answerText, Questions[currentQuestion].answers[3].answerText]);
        setAnswerList(Questions[currentQuestion].answers); 
      }
    }, [currentQuestion, Questions]);

  const nextQuestion = () => {
    if (Questions[currentQuestion].correctAnswer === optionChosen) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
    setOptionChosen("");
  };

  const finishQuiz = () => {
    if (Questions[currentQuestion].correctAnswer === optionChosen) {
      setScore(score + 1);
    }
    setGameState("finished");
  };

  return (
    <div>
    <div>
      <h1>{Questions[currentQuestion]? Questions[currentQuestion].question.questionText: "Loading"}</h1>
    </div>
    <div className="Quiz">
      
      <div className="Questions">
       {answerList.map((currOption, index) => (
        <AnswerButton 
          currColor = {currOption.answerId === optionChosen ? "secondary" : "primary"}
          option = {currOption.answerId}
          textValue = {optionList[index]}
          />
       ))}
      </div>

      {currentQuestion === Questions.length - 1 ? (
        <button onClick={finishQuiz} id="nextQuestion">
          Finish Quiz
        </button>
      ) : (
        <button onClick={nextQuestion} id="nextQuestion">
          Next Question
        </button>
      )}

      <p style={{color:'black'}}>Current Score: {score}</p>

    </div>
    </div>
  );
}

export default Quiz;