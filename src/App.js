import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

function App() {
  // State for number of tasks, tasks, rewards, shuffled tasks, shuffled rewards, and grid visibility
  const [numTasks, setNumTasks] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [mixedTasks, setMixedTasks] = useState([]);
  const [mixedRewards, setMixedRewards] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
   // New state to track if the user has confirmed the number of tasks
   const [hasConfirmedTasks, setHasConfirmedTasks] = useState(false);

  // Handle the change in number of tasks input
  const handleNumTasksChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumTasks(value);
    setTasks(Array(value).fill(''));
    setRewards(Array(value).fill(''));
  };

  // Handle the change in task input
  const handleTaskChange = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  // Handle the change in reward input
  const handleRewardChange = (index, value) => {
    const newRewards = [...rewards];
    newRewards[index] = value;
    setRewards(newRewards);
  };

  // Utility function to shuffle an array
  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Start the game by shuffling tasks and rewards and showing the grid
  const startGame = () => {
    setMixedTasks(shuffleArray(tasks));
    setMixedRewards(shuffleArray(rewards));
    setShowGrid(true);
  };

  // Reveal either a task or a reward with a 60/40 chance when a grid item is clicked
  const revealItem = (index) => {
    const chance = Math.random();
    if (chance <= 0.6) {
      setMixedTasks((prev) => {
        const newTasks = [...prev];
        newTasks[index] = tasks[index];
        return newTasks;
      });
    } else {
      setMixedRewards((prev) => {
        const newRewards = [...prev];
        newRewards[index] = rewards[index];
        return newRewards;
      });
    }
  };

  // Function to handle the "Enter" button click
  const handleEnterClick = () => {
    setTasks(Array(numTasks).fill(''));
    setRewards(Array(numTasks).fill(''));
    setHasConfirmedTasks(true);  // Set the confirmation state to true
  };


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Task Roulette</h1>
      <h2 className="text-xl">Make getting tasks done more fun!</h2>

       {/* If number of tasks is not set, show input for number of tasks */}
       {!hasConfirmedTasks ? (
        <div className="flex items-center">
          <label className="mr-2">How many tasks do you have? </label>
          <input type="number" onChange={handleNumTasksChange} className="mr-2" />
          <button onClick={handleEnterClick}>Enter</button>
        </div>
      ) : (
        // Else, show inputs for tasks and rewards
        <div>
          {Array.from({ length: numTasks }).map((_, index) => (
            <div key={index} className="flex mb-2">
              <label className="mr-2">{index + 1}.</label>
              <input
                placeholder="Task"
                value={tasks[index]}
                onChange={(e) => handleTaskChange(index, e.target.value)}
                className="mr-2"
              />
              <input
                placeholder="Reward"
                value={rewards[index]}
                onChange={(e) => handleRewardChange(index, e.target.value)}
              />
              
            </div>
          ))}
          <button onClick={startGame} className="mt-4">Start Game</button>
        </div>
      )}

      {/* If grid is to be shown, display the grid */}
      {showGrid && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {Array.from({ length: numTasks }).map((_, index) => (
            <div
              key={index}
              onClick={() => revealItem(index)}
              className="border p-2"
            >
              <div>{index + 1}</div>
              <div>{mixedTasks[index]}</div>
              <div>{mixedRewards[index]}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
