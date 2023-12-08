import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Category({ categories }) {
    const { handleSettingsChange } = useContext(AppContext)
    
    const optionEl = categories.map(item => {
        return (
            <option key={item.id} value={item.id}>{item.name}</option>
        )
    })
    
    return (
        <div className="form-item">
            <label htmlFor="category" className="select-label semi-bold">Select a category:</label>
            <select 
                id="category" 
                name="category" 
                onChange={handleSettingsChange}
                className='select-input'
            >
                <option value=''>Any category</option>
                {optionEl}
            </select>
        </div>
    )
    
}