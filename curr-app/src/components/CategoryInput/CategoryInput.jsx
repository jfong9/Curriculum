import React from 'react'
import Modal from 'utils/Modal'
// import 'utils/Modal/Modal.module.css'
import ReactDOM from 'react-dom'

const CategoryInput = ({content}) => {
    return ReactDOM.createPortal(
        <aside className="modal-cover">
            <div className="modal-area">
                <button className="_modal-ok">
                    <span id="ok-modal" className="_hide-visual">OK</span>
                </button>
                <button className="_modal-cancel">
                    <span id="cancel-modal" className="_hide-visual">Cancel</span>
                    {/* <svg className="_modal-cancel-icon"> */}
                        {/* <path d="M 10,10 L 30,30 M 30,10 L 10,30"/> */}
                    {/* </svg> */}
                </button>

            </div>
            <div className="modal-body">content</div>
        </aside>,
        document.body
    );
}
class CategoryInputOld extends React.Component {
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
            console.log("catinput update", show)
            this.setState({show, title: ''});
        }
    }

    setTitle = (event) => {
        event.preventDefault();
        this.setState({title: event.target.value})
    }
    handleOK = (event) => {
        event.preventDefault();
        const { title } = this.state
        this.props.handleOK( {event, title} );
        // console.log("catinput handleok");
    }

    handleCancel = (event) => {
        event.preventDefault();
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