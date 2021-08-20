import "../Quiz.css";
import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";

function Menu(props) {
  const { gameState, setGameState, userName, setUserName } = useContext(
    GameStateContext
  );
  
  return (
    <div>
      <h1>Are you ready for the Quiz?</h1>
    <div className="Menu">
      <button
        onClick={() => {
          setGameState("playing");
        }}
      >
        Start Quiz
      </button>
    </div>
    </div>
  );
}

export default Menu;
