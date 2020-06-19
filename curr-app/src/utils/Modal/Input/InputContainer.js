import React, { Component } from 'react';
import { Modal } from '../Modal';
import ModalTrigger from '../ModalTrigger';
import { InputForm } from "./InputForm";

export class InputContainer extends Component {
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
        if (event.keyCode === 27) {
            this.closeModal();
        }
    };
    
    toggleScrollLock = () => {
        document.querySelector('html').classList.toggle('scroll-lock');
    };

    render() {
        const {triggerText, onSubmit } = this.props;
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
                        component={<InputForm onSubmit={onSubmit} onCancel={this.closeModal} buttonRef={(n) => (this.closeButton = n)}/>}
                    />
                ) : null}
            </React.Fragment>
        )
    }
}

export default InputContainer;