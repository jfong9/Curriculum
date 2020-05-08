import React, { useState, useEffect } from 'react'
import { Link, Redirect} from 'react-router-dom'
import CategoryInput from 'components/CategoryInput';
import { Query, withApollo }from 'react-apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ArtDropdown from 'components/ArtDropdown'
import {GET_CURRICULUM, CREATE_TOP_CAT, MOVE_TOP_CAT} from 'actions/curriculumActions'

const INFO_QUERY = gql`
    query getSensitiveInfo {
        info: sensitiveInformation
        # info: regularInfo
    }
`
function Curriculum({schoolId, defaultArt, ...props}) {
    const [show, setShow] = useState(false);
    const curricInput = {
        "input": {
            schoolId, 
            art: defaultArt
        }
    }

    const isInitialized = () => {
        return schoolId && defaultArt 
    }

    const { loading, error, data: curricData } = useQuery(GET_CURRICULUM, {
        variables: curricInput,
        skip: !isInitialized() 
    });

    const [createTopCategory, { data: createCatData }] = useMutation(CREATE_TOP_CAT)//,

    if (loading) return null;
    if (error) return `Something went wrong: ${error}`;
    if (!isInitialized()) return null;

    const showModal = (event) => {
        console.log('button:', event.target.name);
        setShow(true);
    }

    const handleOK = async ( {title} ) => {
        const parentId = curricData.curriculum._id;
        const input = {
            "input": { 
                "parentId": parentId,
                "title": title
            }
        }
        createTopCategory({ 
            variables: input,
            refetchQueries: [{
                query: GET_CURRICULUM,
                variables: curricInput
            }]
        })
        setShow(false)
    }

    const handleCancel = async (data) => {
        setShow(false);
    }

    const getTopCategory = () => {
        if (!curricData.curriculum) return [];
        let {topCategories} = curricData.curriculum;
        if (!topCategories) return [];
        return topCategories;
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
            <ArtDropdown {...props} />
            <CategoryInput show={show} handleCancel={handleCancel} handleOK={handleOK} />
            {curricData.curriculum &&<DisplayTopCategories 
                {...props} 
                defaultArt={defaultArt} 
                topCategories={getTopCategory()} 
                parentId={curricData.curriculum._id}
                currInputVars={curricInput}
            />}
            <div>be cool to be able to add custom background or image</div>
            <div>Remove Item</div>
            <div>Remove Category</div>
        </div>
    )
}

function DisplayTopCategories({topCategories, parentId, ...props}) {
    function moveIndexDown(index) {
        const length = topCategories.length
        let newIndex = 0
        if (index > length) newIndex = length -1;
        else if (index > 0) newIndex = index - 1;
        return newIndex
    }

    function moveIndexUp(index) {
        const length = topCategories.length
        let newIndex = 0
        if (index > (length - 1)) newIndex = length - 1;
        else if (index >= 0) newIndex = index + 1;
        return newIndex
    }

    return (
        <div>
            <div>Click the Gray Links</div>
            {topCategories.map( (cat, index) => {
                let link = null;
                if (cat) {
                    link =  (
                        <li key={cat._id}>
                            {cat.title} 
                            <MoveButton {...props} index={moveIndexDown(index)} childId={cat._id} parentId={parentId} moveQuery={MOVE_TOP_CAT}>
                                {"↑"}
                            </MoveButton>   
                            <MoveButton {...props} index={moveIndexUp(index)} childId={cat._id} parentId={parentId} moveQuery={MOVE_TOP_CAT}>
                                {"↓"}
                            </MoveButton>  
                        </li> 
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

function MoveButton({index, parentId, childId, moveQuery, ...props}) {
    const [moveTopCategory, { data: moveCatData }] = useMutation(moveQuery)

    return (
      <button onClick={
        () => {
            moveTopCategory({
                variables: {
                    "input": {
                        "parentId": parentId,
                        "childId": childId,
                        "index": index
                    }
                },
            }) 
            console.log(`${parentId} ${childId} ${index} Props: ${Object.keys(props)}`)
        }
      }>
        {props.children}
      </button>
    
    );
}

export default withApollo(Curriculum)