import React, { useState } from 'react'

const ArtDropdown = (props) => {
    const { arts, defaultArt } = props;
    const [art, setArt] = useState(defaultArt);

    if (!arts) return null;
    
    const handleChange = (e) => {
        const {value} = e.target
        console.log("artDropDown", value)
        setArt(value)
        props.setDefaultArt(value)
    }
    return (
        <div>
            <select value={art} onChange={handleChange}>
                {arts.map( (art,index) => <option key={index} value={art}>{art}</option>)}
            </select>
        </div>
    )
}

export default ArtDropdown;