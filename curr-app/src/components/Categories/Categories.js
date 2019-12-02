import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import curriculum from 'database/curriculum'
import { getCurriculumUrl } from 'utils/redirectstrings'
import Modal from 'utils/Modal'
import 'utils/Modal/Modal.module.css'

class Categories extends React.Component {
    constructor(props) {
        super(props)
        console.log("category ctor")
        this.state = {
            category: {},
            toCurricMain: false,
            show: false
        }
    }

    
    
    componentDidMount() {
        const {schoolid, match : {params}} = this.props
        let curriculum = this.GetCurriculumFromHTTPRequest(schoolid, params.category)
        console.log("categories", curriculum)
        this.setState( {category : curriculum})

    }
    
    componentDidUpdate(prevProps, prevState) {
        const {schoolid, match:{params}} = this.props;
        if (prevProps.schoolid !== schoolid && schoolid !== '' ) {
            this.setState({toCurricMain: true})
            return <Redirect to={getCurriculumUrl(params.username)}/>
        }
    }
    
    GetCurriculumFromHTTPRequest(schoolid, category) {
        console.log("getcatfromhttp:",schoolid, category);
        if (schoolid === '' || category === '') return {}
        let [curric] = curriculum
                        .filter(c => c.schoolid === schoolid)
                        .map(c => c.category)
        curric = curric.filter(c => {
                            return c.name === category
                        })[0]
        return curric;
    }
    render() {
        const {category, toCurricMain} = this.state
        const { match: {params}} = this.props
        if (toCurricMain === true) {
            console.log("Redirecting to: ", this.props.match.url)
            return <Redirect to={getCurriculumUrl(params.username)}/>;
        }
        
        return (
            <div>
                <div>Parent Category Managed here </div>
                <div>Recursive display here. </div>
                <div>
                    { !( Object.keys(category).length === 0 && category.constructor === Object )  &&
                        <CategoryList key={category.name} canDelete={false} categories={category}/>     
                    }
                </div>
                <div>This is where we add sub cat's and category items </div>
                <div>Will clicking turn into a sub view?</div>
                <div>How much depth with this display?</div>
                <div>Shouldn't be able to remove itself</div>
                <div>For now Categories will always be under a "top" category</div>
                <div>Remove Item</div>
                <div>Remove Category</div>
            
            </div>
        )
    }
}

const CategoryList = ({ categories, canDelete }) => {
    const [show, setShow] = useState(false);
    let subcategories = [...categories.category]
    let catItems = [...categories.categoryItems]
    let deleteButton = null;
    if (canDelete) {
        deleteButton = <button>delete</button>
    }

    const showModal = () => {
        console.log("cat list", show)
        setShow(true);
    }

    const handleOK = (data) => {
        // console.log("catlist handleOK:", data);
        setShow(false);
    }

    const handleCancel = (data) => {
        // console.log("catlist handleCancel:", data)
        setShow(false);
    }

    return (
        <div>
            <h1>
                {categories.name}
                <button onClick={showModal}>add cat</button>
                <button onClick={showModal}>add item</button>
                {deleteButton}
                <CategoryInput show={show} handleCancel={handleCancel} handleOK={handleOK}/>
            </h1>
            <div>
                    {/* Go through category items */}
                    { !( Object.keys(catItems).length === 0 && catItems.constructor === Object )  &&
                            catItems.map(c => {
                                return (
                                    <div key={c.name}>
                                        {c.name}  {c.notes}
                                        <button>remove item</button>
                                    </div>
                                )
                            })
                    }
                    {/* go through sub categories */}
                    { !( Object.keys(subcategories).length === 0 && subcategories.constructor === Object )  &&
                            subcategories.map(c => <CategoryList key={c.name} canDelete={true} categories={c}/>)
                    }
            </div>
        </div>
    )
}

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
export default Categories