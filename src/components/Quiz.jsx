import { useContext } from 'react'
import QuizItem from './QuizItem'
import Error from './Error'
import { AppContext } from '../context/AppContext'
import quizSettingsData from '../data/quizSettingsData'

export default function Quiz() {
    const { quizData, selectedCategory } = useContext(AppContext)

    function getQuizHeading() {
        const quizHeading = selectedCategory && quizSettingsData.category.filter(item => {
            return item.id === selectedCategory
        })[0].name

        return quizHeading
    }
    
    const quizPageEl = quizData.length ? 
        <>
            <h1 className="heading--medium">
                {selectedCategory ? getQuizHeading() : 'Random categories'}
            </h1>
            <QuizItem />
        </> :
        <Error />

    return (
        <div className="container quiz-container">
            {quizPageEl}
        </div>
    )
}