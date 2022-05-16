import { useEffect, useState } from "react";

import { wordList } from "./constants/constant";

function App() {
	const [guessHistory, setGuessHistory] = useState([]);
	const [currentGuess, setCurrentGuess] = useState("");

	const validGuesses = [];
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

	const handleKeyUp = (e) => {
		if (e.key === "Backspace") {
			handleDelete();
		} else if (e.key === "Enter") {
			handleEnter();

			// este regex se asegura que solo tome letras  y no teclas como SHIFT, o BACKSPACE
		} else if (/^[A-Za-z]$/.test(e.key)) {
			handleChar(e.key);
		}

		console.log(e);
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
		</div>
	);
}

export default App;
