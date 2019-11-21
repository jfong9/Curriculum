import React from 'react'
import { Link, Redirect} from 'react-router-dom'
import curriculum from 'database/curriculum'


class Curriculum extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topCategories: [],
            fullCurriculum: [],
            toCurricMain: false
        }
    }


    componentDidMount() {
        const {schoolid} = this.props;
        console.log("curriculum",this.props);
        let {topcats, fullcurric} = this.GetTopCatsFromHTTPRequest(schoolid);
        this.setState( {topCategories: topcats, fullCurriculum: fullcurric} );
    }

    componentDidUpdate(prevProps, prevState) {
        const {schoolid} = this.props;
        const {toCurricMain} = this.state;
        if (prevProps.schoolid !== schoolid && schoolid !== '' ) {
            let {topcats, fullcurric} = this.GetTopCatsFromHTTPRequest(schoolid);
            this.setState( {topCategories: topcats, fullCurriculum: fullcurric, toCurricMain: true} );
        }
    }

    GetTopCatsFromHTTPRequest(schoolid) {
        if (schoolid === '') return {topcats:[], curric:[]};
        let [curric] = curriculum.filter( (c) => c.schoolid === schoolid).map( c => c.category)
        let topcats = curric.map(c => c.name);
        return  {topcats, curric}
    }

    render() {
        let display = <this.DisplayTopCategories/>;
        return (
            <div>
                {display}
                <div>be cool to be able to add custom background or image</div>
                <div>Remove Item</div>
                <div>Remove Category</div>
            </div>
        )
    }
    DisplayTopCategories = () => {
        const {topCategories} = this.state
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
            </div>
        )
    }
}

export default Curriculum