import React, { useState } from 'react'
import { Link, Redirect} from 'react-router-dom'
import CategoryInput from 'components/CategoryInput';
import { Query } from 'react-apollo'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ArtDropdown from 'components/ArtDropdown'
import { withApollo } from 'react-apollo'
import * as curriculumActions from 'actions/curriculumActions'

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

    showModal = (event) => {
        console.log('button:', event.target.name);
        //console.log("cat list", show)
        this.setShow(true);
    }

    handleOK = (data) => {
        // console.log("Curric handleOK:", data);
        this.setShow(false);
    }

    handleCancel = (data) => {
        // console.log("Curric handleCancel:", data);
        this.setShow(false);
    }

    handleCurriculumResponse(curriculum) {
        let topCategories = [];
        if (curriculum) {
            topCategories = curriculum.topCategories;
        }
        this.setState( {topCategories} );
    }

    componentDidMount() {
        const {schoolId, defaultArt } = this.props;
        // console.log("s", defaultArt, schoolId);
        // console.log("client", client)
        this.GetTopCatsFromQuery(schoolId, defaultArt)
    }

    componentDidUpdate(prevProps, prevState) {
        const {schoolId, defaultArt } = this.props;
        if ((prevProps.schoolId !== schoolId && schoolId !== '') || 
            (prevProps.defaultArt !== defaultArt && defaultArt !== '')) {
            this.GetTopCatsFromQuery(schoolId, defaultArt)
        }
    }

    async GetTopCatsFromQuery(schoolId, art) {
        const { client } = this.props;
        const curriculum = await curriculumActions.queryCurriculum(client, schoolId, art)
        console.log(curriculum)
        this.handleCurriculumResponse(curriculum);
    }

    render() {
        let display = <this.DisplayTopCategories/>;
        const {show} = this.state;
        return (
            <div>
                <button name='addTopCat' onClick={this.showModal}>
                    add cat
                </button>
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
        // console.log(topCategories);

        return (
            <div>
                <ArtDropdown {...this.props} />
                <div>Click the Gray Links</div>
                {topCategories.map(c => {
                    let link = null;
                    if (c) {
                        link =  (
                            <div key={c._id}>
                                 {c.title}
                            </div> 
                            
                            // <Link key={c._id} color='White' to={`${this.props.match.url}/${c.title}`}>
                            //     <div key={c._id} style={{color:'Gray'}}>{c.title}</div>
                            // </Link>
                    )}
                    return link;
                })}
                <div>Top Category Only</div>
                <div>-dives into the category's sub cats/items</div>
            </div>
        )
    }
}

export default withApollo(Curriculum)