import React from 'react'
import { Link } from 'react-router-dom'
import curriculum from 'database/curriculum'

class Curriculum extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topCategories: [],
            fullCurriculum: []
        }
    }

    componentDidMount() {
        const {match: {params}} = this.props;
        console.log("curriculum",this.props);
        let {topcats, fullcurric} = this.GetTopCatsFromHTTPRequest(params.schoolid);
        this.setState( {topCategories: topcats, fullCurriculum: fullcurric} );
    }
    componentDidUpdate(prevProps, prevState) {
        const {location, match:{params} } = this.props;
        if (location.pathname !== prevProps.location.pathname) {
            let {topcats, fullcurric} = this.GetTopCatsFromHTTPRequest(params.schoolid);
            this.setState( {topCategories: topcats, fullCurriculum: fullcurric} );
        }
    }
    GetTopCatsFromHTTPRequest(schoolid) {
        let [curric] = curriculum.filter( (c) => c.schoolid === schoolid).map( c => c.category)
        let topcats = curric.map(c => c.name);
        return  {topcats, curric}
    }
    render() {
        const {topCategories, fullCurriculum} = this.state
        console.log(topCategories);
        return (
            <div>
                <div>Click the Gray Links</div>
                {topCategories.map(c => {
                    return (
                        <Link key={c} color='White' to={`${this.props.match.url}/${c}`}>
                            <div key={c} style={{color:'Gray'}}>{c}</div>
                        </Link>
                    )
                    
                })}
                <div>Top Category Only</div>
                <div>-dives into the category's sub cats/items</div>
                <div>be cool to be able to add custom background or image</div>
                <div>Remove Item</div>
                <div>Remove Category</div>
            </div>
        )
    }
}

export default Curriculum