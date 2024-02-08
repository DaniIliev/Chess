import { useState } from 'react'
import Chessboard from './components/chessboard/Chessboard'
import './styles.css'

function App() {
  const [count, setCount] = useState(0)

  return (
<>
    <div className='app'>
        <Chessboard />   

    </div>


</>
  )
}

export default App
