import React, { createContext, useState } from 'react'

const AppContext = createContext()

function AppContextProvider({ children }) {
    const [showQuiz, setShowQuiz] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [quizSettings, setQuizSettings] = useState({
        category: '',
        difficulty: '',
        type: ''
    })
    const [quizData, setQuizData] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedAnswers, setSelectedAnswers] = useState([])
    const [isAnswersMissing, setIsAnswersMissing] = useState(null)
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
    const [isQuizOver, setIsQuizOver] = useState(false)

    function renderHomePage() {
        setShowQuiz(false)
        setShowSettings(false)
    }

    async function startDefaultQuiz() {
        const baseUrl = 'https://opentdb.com/api.php?amount=5'
        await callApi(baseUrl)
        setIsQuizOver(false)
        setSelectedAnswers([])
        setShowQuiz(true)
    }

    function renderQuizSettings() {
        setShowSettings(true)
        setShowQuiz(false)
        window.scrollTo(0, 0)
    }

//--- Customize quiz settings ---//
    function handleSettingsChange(e) {
        const { name, value } = e.target
        setQuizSettings(prevQuizSettings => {
            return {...prevQuizSettings, [name]: value}
        })
    }

    function handleSubmitSettings(e) {
        e.preventDefault()
        saveSettingsToLocalStorage(quizSettings)
        setSelectedCategory(quizSettings.category)

        const category = quizSettings.category && quizSettings.category
        const difficulty = quizSettings.difficulty && quizSettings.difficulty
        const type = quizSettings.type && quizSettings.type

        getCustomizedQuizData(category, difficulty, type)
    }

    function saveSettingsToLocalStorage(settings) {
        localStorage.setItem('settings', JSON.stringify(quizSettings))
    }

    function startSameQuiz() {
        const settingsFromLocalStorage = JSON.parse(localStorage.getItem('settings'))

        if (!settingsFromLocalStorage) {
            startDefaultQuiz()
        } else {
            const { category, difficulty, type } = settingsFromLocalStorage
            getCustomizedQuizData(category, difficulty, type)
        }
    }

    async function getCustomizedQuizData(category, difficulty, type) {
        const baseUrl = 'https://opentdb.com/api.php?amount=5'

        const categoryParam = `&category=${category}`
        const difficultyParam = `&difficulty=${difficulty}`
        const typeParam = `&type=${type}`

        const customUrl = baseUrl + categoryParam + difficultyParam + typeParam

        await callApi(customUrl)
        setIsQuizOver(false)
        setSelectedAnswers([])
        setShowQuiz(true)
        window.scrollTo(0, 0)

        setQuizSettings({
            category: '',
            difficulty: '',
            type: ''
        })
    }

//--- Get quiz data from api ---//
    async function callApi(url) {
        try {            
            const response = await fetch(url)
            const data = await response.json()
            const dataWithAnswersArray = data.results.map(item => {
                const allAnswers = item.incorrect_answers.concat(item.correct_answer)
                const shuffledAnswers = shuffleArray(allAnswers)
                return {...item, shuffledAnswers}
            })
            setQuizData(dataWithAnswersArray)
        } catch(error) {
            console.error('Error fetching data:', error)
        }
    }

    function shuffleArray(array) {
        const shuffledArray = [...array]
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
        }
        return shuffledArray
    }
    
//--- Manage quiz; handle the user's answers ---//
    function handleRadioChange(e) {
        setIsAnswersMissing(false)

        const { name, value } = e.target
        const isAnswerCorrect = 
            value === quizData.find(item => item.question === name).correct_answer

        const answerObj = {
            question: name,
            answer: value,
            isAnswerCorrect
        }

        const existingIndex = selectedAnswers.findIndex(item => item.question === name)
        const updatedArray = [...selectedAnswers]

        if (existingIndex !== -1) {
            updatedArray[existingIndex] = answerObj
        } else {
            updatedArray.push(answerObj)
        }

        setSelectedAnswers(updatedArray)
    }

    function checkAnswers() {
        if (selectedAnswers.length < 5) {
            setIsAnswersMissing(true)
        } else {
            setIsAnswersMissing(false)
            setIsQuizOver(true)
            setCorrectAnswersCount(selectedAnswers.filter(item => item.isAnswerCorrect).length)
        }
    }

    return (
        <AppContext.Provider value={{
            showQuiz,
            showSettings,
            renderHomePage,
            renderQuizSettings,
            startDefaultQuiz,
            startSameQuiz,
            handleSettingsChange,
            handleSubmitSettings,
            quizData,
            selectedCategory,
            handleRadioChange,
            selectedAnswers,
            isAnswersMissing,
            correctAnswersCount,
            checkAnswers,
            isQuizOver,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider }