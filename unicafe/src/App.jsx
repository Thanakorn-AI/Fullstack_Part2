// unicafe/src/App.jsx
import { useState } from 'react'

// Button component for handling feedback submission
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
}

// StatisticLine component for displaying a single statistic
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

// Define Statistics component
const Statistics = ({ good, neutral, bad }) => {
  // Calculating total feedback
  const totalFeedback = good + neutral + bad;

  // Calculating average score
  const averageScore = totalFeedback ? (good - bad) / totalFeedback : 0;

  // Calculating percentage of positive feedback
  const positivePercentage = totalFeedback ? (good / totalFeedback) * 100 : 0;

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="Total Feedback" value={totalFeedback} />
      <StatisticLine text="Average Score" value={averageScore.toFixed(2)} />
      <StatisticLine text="Positive Feedback" value={positivePercentage.toFixed(2) + '%'} />
         </tbody>
      </table>
   
    </div>
  );
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Calculate total feedback to determine whether to show statistics or the no feedback message
  const totalFeedback = good + neutral + bad;


  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />

      {totalFeedback > 0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given by the user yet.</p>
      )}

    </div>
  );
}

export default App;