import { useContext } from 'react'
import { decode } from 'html-entities'
import { AppContext } from '../context/AppContext'

export default function QuizItem() {
    const {
        quizData,
        checkAnswers,
        handleRadioChange,
        selectedAnswers,
        isAnswersMissing,
        correctAnswersCount,
        isQuizOver,
        startSameQuiz,
        renderQuizSettings
    } = useContext(AppContext)

    const quizItemEl = quizData.map(item => {
        const answerEl = item.shuffledAnswers.map(answer => {
            const isSelected = selectedAnswers.some(selected => {
                return selected.question === item.question && selected.answer === answer
            })
            const isCorrect = item.correct_answer === answer
            
            return (
                <div key={answer}>
                    <label className={
                        `radio-label 
                        ${isSelected && 'selected'}
                        ${isQuizOver && 'radio-disabled'}
                        ${isCorrect && isQuizOver && 'correct'}
                        ${isSelected && isCorrect && isQuizOver && 'selected--correct'}
                        ${isSelected && !isCorrect && isQuizOver && 'selected--incorrect'}
                        `}
                    >
                        <input
                            type="radio"
                            name={item.question}
                            value={answer}
                            onChange={handleRadioChange}
                        />
                        {decode(answer)}
                    </label>
                </div>
            )
        })

        return (
            <div key={item.question} className="quiz-item">
                <p className="semi-bold">{decode(item.question)}</p>
                <div className="answers-wrapper">{answerEl}</div>
            </div>
        )
    })

    const buttonEl = !isQuizOver ? (
      <div className='quiz-page__bottom'>
        {isAnswersMissing && <p className='semi-bold p--user-alert'>Please answer all questions</p>}
        <button
          onClick={checkAnswers}
          className="btn btn--medium"
        >
          Check answers
        </button>
      </div>
    ) : (
      <div className="quiz-page__bottom flex-gap">
        <p className="semi-bold">
          You scored {correctAnswersCount}/5 correct answers
        </p>
        <div className="quiz-page__button-wrapper">
          <button onClick={startSameQuiz} className="btn btn--medium">
            Play again with the same settings
          </button>
          <button
            onClick={renderQuizSettings}
            className="btn btn--medium"
          >
            Change quiz settings
          </button>
        </div>
      </div>
    )


    return (
        <div className='quiz-wrapper'>
            {quizItemEl.map((el, index) => (
                <div 
                    key={index} 
                    className={`quiz-item-wrapper ${index === quizItemEl.length - 1 && 'last-quiz-item'}`}>
                    {el}
                </div>
            ))}
            {buttonEl}
        </div>
    )
}