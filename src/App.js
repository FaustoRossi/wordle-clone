import { useEffect, useState } from "react";

import { wordList } from "./constants/constant";

function App() {
	const [guessHistory, setGuessHistory] = useState([]);
	const [currentGuess, setCurrentGuess] = useState("");

	function KeyList(props) {
		return (
			<div id="key-list">
				{props.keyList.map((key) => {
					return (
						<button onClick={() => props.handleKeyboard(key)}>{key}</button>
					);
				})}
			</div>
		);
	}

	function KeyBoard(props) {
		const { on, handleKeyboard } = props;
		const keys = [
			["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
			["a", "s", "d", "f", "g", "h", "j", "k", "l"],
			["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
		];
		return (
			<div id="keyboard">
				{keys.map((keyList) => {
					return (
						<KeyList keyList={keyList} handleKeyboard={props.handleKeyboard} />
					);
				})}
			</div>
		);
	}
	const secret = "bliss";

	// 1. Se encarga de caracter
	const handleChar = (char) => {
		if (currentGuess.length < 5) {
			setCurrentGuess(`${currentGuess}${char}`.toUpperCase());
		}
		return;
	};
	//2.  Se encarga del eliminar el caracter
	const handleDelete = () => {
		setCurrentGuess(currentGuess.slice(0, -1));
	};

	//3. Se encarga del submit
	const handleEnter = () => {
		//cheuqea si currentGuess tiene 5 caracteres
		if (currentGuess.length < 5) {
			alert("Not enough letters");
		} else if (secret === currentGuess) {
			alert("You Win");
		} else if (guessHistory.length === 5) {
			alert("You lose");
		} else if (!wordList.includes(currentGuess)) {
			alert("Word not in list");
		} else {
			//añade la currentGuess al historial,
			//resetea el currentGuess
			setGuessHistory(guessHistory.concat(currentGuess));
			setCurrentGuess("");
		}
	};

	const handleKeyboard = (value) => {
		if (value === "Backspace") {
			handleDelete();
		} else if (value === "Enter") {
			handleEnter();

			// este regex se asegura que solo tome letras  y no teclas como SHIFT, o BACKSPACE
		} else if (/^[A-Za-z]$/.test(value)) {
			handleChar(value);
		}
	};
	const handleKeyUp = (event) => {
		handleKeyboard(event.key);
	};

	useEffect(() => {
		window.addEventListener("keyup", handleKeyUp);
		return () => {
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [handleChar, handleDelete, handleEnter]);

	return (
		<div className="App" onKeyUp={handleKeyUp}>
			<h1>Wordle </h1>

			<main>
				<div>
					{guessHistory.map((guess, idx) => {
						return <div key={`${guess}--${idx}`}>{guess}</div>;
					})}
				</div>
				<div>{currentGuess}</div>
			</main>
			<KeyBoard handleKeyboard={handleKeyboard} />
		</div>
	);
}

export default App;
