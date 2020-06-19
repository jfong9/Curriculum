import React from 'react'
import ReactDOM from 'react-dom'
import modalStyle from './Modal.module.css'
import FocusTrap from 'focus-trap-react';

export const Modal = ({
    modalRef,
    component,
    onClickOutside,
    onKeyDown
    }) => {
    return ReactDOM.createPortal(
        <FocusTrap>
            <aside
                tag="aside"
                role="dialog"
                tabIndex="-1"
                aria-modal="true"
                className={modalStyle.modalCover}
                onClick={onClickOutside}
                onKeyDown={onKeyDown}
            > 
                <div className={modalStyle.modalArea} ref={modalRef}>
                    <div className={modalStyle.modalBody}>
                        {component}
                    </div>
                </div>
            </aside>
        </FocusTrap>,
        document.body
    );
}

export default Modal