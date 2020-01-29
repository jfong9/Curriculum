import React from 'react'
import Modal from 'utils/Modal'
import 'utils/Modal/Modal.module.css'

class CategoryInput extends React.Component {
    constructor(props) {
        super(props)

        this.state = { show: false }
        console.log("catinput ctor", this.state.show)
    }
    
    componentDidUpdate(prevProps) {
        const {show} = this.props
        if (prevProps.show !== show) {
            console.log("catinput update", show)
            this.setState({show});
        }
    }

    handleOK = () => {
        this.props.handleOK(this.props);
        // console.log("catinput handleok");
    }

    handleCancel = () => {
        this.props.handleCancel(this.props);
        // console.log("catinput handle cancel");
    }

    render() {
        return (
            <main>
                <Modal show={this.state.show} handleOK={this.handleOK} handleCancel={this.handleCancel}>
                    <p>Test1</p>
                    <p>Test2</p>
                </Modal>
            </main>
        )
    }
}

export default CategoryInput;