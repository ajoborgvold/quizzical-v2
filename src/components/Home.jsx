import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Home() {
    const { startDefaultQuiz, renderQuizSettings } = useContext(AppContext)
    
    return (
        <div className="container home-container">
            <h1 className="main-heading">Quizzical</h1>
            <div className="home__btn-wrapper">
                <p className="p--large">Jump straight into the unknown!</p>
                <button 
                    onClick={startDefaultQuiz} 
                    className='btn btn--large home__btn--top'
                >
                    Start quiz
                </button>
            </div>
            <div className="home__btn-wrapper">
                <p className="p--large">Or customize your quiz.</p>
                <button
                    onClick={renderQuizSettings}
                    className='btn btn--large home__btn--bottom'
                >
                    Change quiz settings
                </button>
            </div>
        </div>
    )
}