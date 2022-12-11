import { useState } from 'react'
import './App.css'
import Board from "./component/Board";



function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="game">
          <div className="game-board">
              <Board />
          </div>
          <div className="game-info">
              <div>status</div>
              <ol>234</ol>
          </div>
      </div>
  )
}

export default App
