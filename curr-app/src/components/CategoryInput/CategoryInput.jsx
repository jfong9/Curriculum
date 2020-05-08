import React from 'react'
import Modal from 'utils/Modal'
import 'utils/Modal/Modal.module.css'

class CategoryInput extends React.Component {
    constructor(props) {
        super(props)

        this.state = { 
            show: false,
            title: ''
        }
        // console.log("catinput ctor", this.state.show)
    }
    
    componentDidUpdate(prevProps) {
        const {show} = this.props
        if (prevProps.show !== show) {
            // console.log("catinput update", show)
            this.setState({show, title: ''});
        }
    }

    setTitle = (event) => {
        this.setState({title: event.target.value})
    }
    handleOK = (event) => {
        const { title } = this.state
        this.props.handleOK( {event, title} );
        // console.log("catinput handleok");
    }

    handleCancel = (event) => {
        const { title }= this.state
        this.props.handleCancel( {event, title});
        // console.log("catinput handle cancel");
    }

    render() {
        const { title, show } = this.state
        return (
            <main>
                <Modal show={show} handleOK={this.handleOK} handleCancel={this.handleCancel}>
                    <label> 
                        Title:
                        <input 
                            type='text' 
                            title='title' 
                            value={title} 
                            onChange={this.setTitle}
                        />
                    </label>
                    <p>Test2</p>
                </Modal>
            </main>
        )
    }
}

export default CategoryInput;