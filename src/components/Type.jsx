import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Type({ type }) {
    const { handleSettingsChange} = useContext(AppContext)

    const optionEl = type.map(item => {
        const optionText = item === 'multiple' ? 'Multiple Choice' : 'True/False'
        return (
            <option key={item} value={item}>{optionText}</option>
        )
    })
    
    return (
        <div className="form-item">
            <label htmlFor="type" className="select-label semi-bold">Select type:</label>
            <select 
                id="type" 
                name="type" 
                onChange={handleSettingsChange}
                className='select-input'
            >
                <option value=''>Any type</option>
                {optionEl}
            </select>
        </div>
    )
}