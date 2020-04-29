import React, { useState, useEffect } from 'react'
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

function Curriculum(props) {
    const [show, setShow] = useState(false);
    const [topCategories, setTopCats] = useState([]);
    const [toCurricMain, goToMain] = useState(false);

    //query for the topcategories
    useEffect( () => {
        const { client, schoolId, defaultArt } = props;
        console.log("testing")
        curriculumActions.queryCurriculum(client, schoolId, defaultArt)
        .then( curriculum => {
            let topCats = [];
            if (curriculum) {
                topCats = curriculum.topCategories;
            }
            setTopCats(topCats);
        });
    }, [props.schoolId, props.defaultArt] );

    const showModal = (event) => {
        console.log('button:', event.target.name);
        //console.log("cat list", show)
        setShow(true);
    }

    const handleOK = async (data) => {
        setShow(false)
    }

    const handleCancel = async (data) => {
        setShow(false);
    }

    return (
        <div>
            <button name='addTopCat' onClick={showModal}>
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
            <CategoryInput show={show} handleCancel={handleCancel} handleOK={handleOK}/>
            <DisplayTopCategories {...props} topCategories={topCategories}/>
            <div>be cool to be able to add custom background or image</div>
            <div>Remove Item</div>
            <div>Remove Category</div>
        </div>
    )
}

function DisplayTopCategories({topCategories, ...props}) {
    return (
        <div>
            <ArtDropdown {...props} />
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


export default withApollo(Curriculum)