import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Difficulty({ difficulty }) {
    const { handleSettingsChange } = useContext(AppContext)

    const optionEl = difficulty.map(item => {
        const optionText = item.charAt(0).toUpperCase() + item.slice(1)
        return (
            <option key={item} value={item}>{optionText}</option>
        )
    })
    
    return (
        <div className="form-item">
            <label htmlFor="difficulty" className="select-label semi-bold">Select difficulty:</label>
            <select 
                id="difficulty" 
                name="difficulty" 
                onChange={handleSettingsChange}
                className='select-input'
            >
                <option value=''>Any difficulty</option>
                {optionEl}
            </select>
        </div>
    )    
}