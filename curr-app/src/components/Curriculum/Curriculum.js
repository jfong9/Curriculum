import React, { useState } from 'react'
import { Link, Redirect} from 'react-router-dom'
import curriculum from 'database/curriculum'
import CategoryInput from 'components/CategoryInput';
import { Query } from 'react-apollo'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const INFO_QUERY = gql`
    query getSensitiveInfo {
        info: sensitiveInformation
        # info: regularInfo
    }
`

class Curriculum extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topCategories: [],
            fullCurriculum: [],
            show: false, 
            toCurricMain: false
        }
    }

    setShow(showModal) {
        this.setState({show: showModal});
    }

    showModal = () => {
        //console.log("cat list", show)
        this.setShow(true);
    }

    handleOK = (data) => {
        console.log("Curric handleOK:", data);
        this.setShow(false);
    }

    handleCancel = (data) => {
        console.log("Curric handleCancel:", data);
        this.setShow(false);
    }

    componentDidMount() {
        const {schoolun} = this.props;
        console.log("curriculum",this.props);
        let {topcats, fullcurric} = this.GetTopCatsFromHTTPRequest(schoolun);
        this.setState( {topCategories: topcats, fullCurriculum: fullcurric} );
    }

    componentDidUpdate(prevProps, prevState) {
        const {schoolun} = this.props;
        const {toCurricMain} = this.state;
        if (prevProps.schoolun !== schoolun && schoolun !== '' ) {
            let {topcats, fullcurric} = this.GetTopCatsFromHTTPRequest(schoolun);
            this.setState( {topCategories: topcats, fullCurriculum: fullcurric, toCurricMain: true} );
        }
    }

    GetTopCatsFromHTTPRequest(schoolun) {
        console.log("curric", schoolun)
        if (!schoolun) return {topcats:[], curric:[]};
        let [curric] = curriculum.filter( (c) => c.schoolun === schoolun).map( c => c.category)
        if (!curric) return {topcats:[], curric:[]};
        let topcats = curric.map(c => c.name);
        return  {topcats, curric}
    }

    render() {
        let display = <this.DisplayTopCategories/>;
        const {show} = this.state;
        return (
            <div>
                <button onClick={this.showModal}>add cat</button>
                <Query query={INFO_QUERY}>
                    { ( {loading, error, data} ) => {
                            if (loading) return <div>Loading Curr</div>
                            if (error) return <div>Error curr</div>
                            if (data.info) return <div>{data.info}</div>
                            return null
                        }
                    }
                </Query>
                <CategoryInput show={show} handleCancel={this.handleCancel} handleOK={this.handleOK}/>
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