import { useContext } from 'react'
import Home from './Home'
import Settings from './Settings'
import Quiz from './Quiz'
import { AppContext } from '../context/AppContext'

export default function Main() {
    const { showQuiz, showSettings } = useContext(AppContext)
    
    const mainEl = showQuiz ? <Quiz /> : showSettings ? <Settings /> : <Home />

    return (
        <main>
            {mainEl}
        </main>
    )
    
}