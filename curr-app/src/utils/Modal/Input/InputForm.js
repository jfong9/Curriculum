import React from 'react'

export const InputForm = ({ onSubmit, onCancel, buttonRef }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="Title">Title</label>
                <input className="form-control" id="title"/>
            </div>
            <br/>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">
                    Submit
                </button>
                <button ref={buttonRef} className="form-control btn btn-primary" type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default InputForm;