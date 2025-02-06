// unicafe/src/App.jsx
import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Functions to handle button clicks
  const handleGoodClick = () => {
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => {
    setBad(bad + 1);
  }

    // Calculating total feedback
    const totalFeedback = good + neutral + bad;

    // Calculating average score
    const averageScore = totalFeedback ? (good - bad) / totalFeedback : 0;
  
    // Calculating percentage of positive feedback
    const positivePercentage = totalFeedback ? (good / totalFeedback) * 100 : 0;

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>

      <h2>Statistics</h2>
      <div>Good: {good}</div>
      <div>Neutral: {neutral}</div>
      <div>Bad: {bad}</div>
      <div>Total Feedback: {totalFeedback}</div>
      <div>Average Score: {averageScore.toFixed(2)}</div>
      <div>Positive Feedback: {positivePercentage.toFixed(2)}%</div>
    </div>
  )
}

export default App;