import { useState, useEffect } from "react";

const words = [
  "apple",
  "banana",
  "cherry",
  "dog",
  "elephant",
  "flower",
  "grape",
  "happy",
  "internet",
  "jungle",
];

export default function TypingGame() {
  const [word, setWord] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false); // ゲーム開始前は false
  const [gameStarted, setGameStarted] = useState(false); // ゲームが始まったかどうか

  useEffect(() => {
    if (gameStarted) {
      setWord(words[Math.floor(Math.random() * words.length)]);
      const timer = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value === word) {
      setScore(score + 1);
      setWord(words[Math.floor(Math.random() * words.length)]);
      setInput("");
    }
  };

  const handleStartClick = () => {
    setGameStarted(true);
    setIsPlaying(true); // ゲームが開始したことをセット
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h1>タイピングゲーム</h1>

      {!gameStarted ? (
        <button
          onClick={handleStartClick}
          style={{ fontSize: "20px", padding: "10px 20px" }}
        >
          ゲーム開始
        </button>
      ) : isPlaying ? (
        <>
          <h2>{word}</h2>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            autoFocus
            style={{ fontSize: "20px", padding: "10px", margin: "10px 0" }}
          />
          <p>スコア: {score}</p>
          <p>残り時間: {time}秒</p>
        </>
      ) : (
        <h2>ゲーム終了！スコア: {score}</h2>
      )}
    </div>
  );
}
