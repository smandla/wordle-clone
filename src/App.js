import logo from "./logo.svg";
import "./App.css";
import Board from "./components/Board/Board";
import Keyboard from "./components/Keyboard/Keyboard";
function App() {
  const keyboard = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
  ];
  const allkeys = keyboard.flat();
  return (
    <div className="App">
      <Board allkeys={allkeys} />
    </div>
  );
}

export default App;
