import { useContext } from 'react'
import Category from './Category'
import Difficulty from './Difficulty'
import Type from './Type'
import { AppContext } from '../context/AppContext'
import quizSettingsData from '../data/quizSettingsData'

export default function Settings() {
    const { handleSubmitSettings } = useContext(AppContext)
    
    return (
        <div className="container settings-container">
            <h1 className="heading--medium">Settings</h1>
            <form className="form">
                <Category categories={quizSettingsData.category} />
                <Difficulty difficulty={quizSettingsData.difficulty}/>
                <Type type={quizSettingsData.type}/>
                <button onClick={handleSubmitSettings} className="btn btn--medium form-btn">Start quiz</button>
            </form>
        </div>
    )
}