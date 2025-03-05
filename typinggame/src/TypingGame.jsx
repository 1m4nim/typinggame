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
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
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
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value === word) {
      setScore(score + 1);
      setWord(words[Math.floor(Math.random() * words.length)]);
      setInput("");
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h1>タイピングゲーム</h1>
      {isPlaying ? (
        <>
          <h2>{word}</h2>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            autoFocus
          />
          <p>スコア: {score}</p>
          <p>残り時間: {time} 秒</p>
        </>
      ) : (
        <h2>ゲーム終了！スコア: {score}</h2>
      )}
    </div>
  );
}
