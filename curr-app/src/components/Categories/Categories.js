import React from 'react'
import { Redirect } from 'react-router-dom'
import curriculum from 'database/curriculum'
import { getCurriculumUrl } from 'utils/redirectstrings'


class Categories extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: {},
            toCurricMain: false
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
        }
    }
    
    GetCurriculumFromHTTPRequest(schoolid, category) {
        console.log("getcatfromhttp:",schoolid, category);
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
                        <CategoryList key={category.name} categories={category}/>     
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

const CategoryList = ({ categories }) => {
    let subcategories = [...categories.category]
    let catItems = [...categories.categoryItems]
    return (
        <div>
            <h1>{categories.name}</h1>
            <div>

                    { !( Object.keys(catItems).length === 0 && catItems.constructor === Object )  &&
                            catItems.map(c => {
                                return (
                                    <div key={c.name}>
                                        {c.name}  {c.notes}
                                    </div>
                                )
                            })
                    }
                    { !( Object.keys(subcategories).length === 0 && subcategories.constructor === Object )  &&
                            subcategories.map(c => <CategoryList key={c.name} categories={c}/>)
                    }
            </div>
        </div>
    )
}
export default Categories