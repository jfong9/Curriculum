import React, { Component } from 'react';
import { Modal } from '../Modal';
import ModalTrigger from '../ModalTrigger';
import { ConfirmForm } from "./ConfirmForm";

export class ConfirmContainer extends Component {
    state = { isShown: false };

    showModal = () => {
        this.setState({isShown: true})
        this.toggleScrollLock();
    };

    closeModal = () => {
        this.setState({isShown: false});
        this.ModalTrigger.focus();
        this.toggleScrollLock();
    };
   
    onClickOutside = (event) => {
        if (this.modal && this.modal.contains(event.target)) return;
        this.closeModal();
    };

    onKeyDown = (event) => {
        console.log("keydown", event.keyCode)
        if (event.keyCode === 27) {
            this.closeModal();
        }
    };
    
    toggleScrollLock = () => {
        document.querySelector('html').classList.toggle('scroll-lock');
    };

    render() {
        const {triggerText, onSubmit, confirmText } = this.props;
        const {isShown} = this.state;
        return (
            <React.Fragment>
                <ModalTrigger
                    showModal={this.showModal}
                    buttonRef={(n) => (this.ModalTrigger = n)}
                    triggerText={triggerText}
                />
                {isShown ? (
                    <Modal 
                        modalRef={(n) => (this.modal = n)}
                        onClickOutside={this.onClickOutside}
                        onKeyDown={this.onKeyDown}
                        component={<ConfirmForm 
                                        onSubmit={onSubmit} 
                                        onCancel={this.closeModal} 
                                        buttonRef={(n) => (this.closeButton = n)}
                                        confirmText={confirmText}
                                    />}
                    />
                ) : null}
            </React.Fragment>
        )
    }
}

export default ConfirmContainer;