import React, { useState } from 'react'

const ArtDropdown = (props) => {
    const { arts, defaultArt, className } = props;
    const [art, setArt] = useState(defaultArt);

    if (!arts) return null;
    
    const handleChange = (e) => {
        const {value} = e.target
        console.log("artDropDown", value)
        setArt(value)
        props.setDefaultArt(value)
    }

    return (
        <React.Fragment>
            <select className={className} value={art} onChange={handleChange}>
                {arts.map( (art,index) => <option key={index} value={art}>{art}</option>)}
            </select>
        </React.Fragment>
    )
}

export default ArtDropdown;