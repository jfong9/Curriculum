import React from 'react'

export const ConfirmForm = ({ onSubmit, onCancel, buttonRef, confirmText }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="Title">{confirmText}</label>
            </div>
            <br/>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">
                    YES 
                </button>
                <button ref={buttonRef} className="form-control btn btn-primary" type="button" onClick={onCancel}>
                    NO
                </button>
            </div>
        </form>
    );
}

export default ConfirmForm;