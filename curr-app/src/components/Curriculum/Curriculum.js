import React from 'react'
import { Query, withApollo }from 'react-apollo'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ArtDropdown from 'components/ArtDropdown'
import { GET_CURRICULUM } from 'actions/curriculumActions'
import DisplayTopCategories from './DisplayTopCategories'
import CreateTopCatButton from './CreateTopCatButton'

const INFO_QUERY = gql`
    query getSensitiveInfo {
        info: sensitiveInformation
        # info: regularInfo
    }
`

function Curriculum({schoolId, defaultArt, ...props}) {
    const curriculumQueryInput = getCurriculumQueryInput(schoolId, defaultArt); 
    const isInitialized = () => {
        return schoolId && defaultArt 
    }

    const { loading, error, data: curricData } = useQuery(GET_CURRICULUM, {
        variables: curriculumQueryInput,
        skip: !isInitialized() 
    });

    if (loading) return null;
    if (error) return `Something went wrong: ${error}`;
    if (!isInitialized()) return null;
    
    const hasCurriculumData = () => {
        return (curricData && 
               curricData.curriculum &&
               curricData.curriculum._id
        )
    }

    const getTopCategory = () => {
        let {topCategories} = curricData.curriculum;
        if (!topCategories) return [];
        return topCategories;
    }

    return (
        <div>
            {hasCurriculumData() && 
                <React.Fragment>
                    <CreateTopCatButton {...props} curricData={curricData} queryInput={curriculumQueryInput}/>
                    <ArtDropdown {...props} defaultArt={defaultArt} />
                    <DisplayTopCategories 
                        {...props} 
                        topCategories={getTopCategory()} 
                        parentId={curricData.curriculum._id}
                        currInputVars={curriculumQueryInput}
                    />
                </React.Fragment>}
            <div>be cool to be able to add custom background or image</div>
            {/* this is just a sample query */}
            <Query query={INFO_QUERY}>
                { ( {loading, error, data} ) => {
                        if (loading) return <div>Loading Curr</div>
                        if (error) return <div>Error curr</div>
                        if (data.info) return <div>{data.info}</div>
                        return null
                    }
                }
            </Query>
        </div>
    )
}

function getCurriculumQueryInput(schoolId, art) {
    return {
        "input": {
            schoolId, 
            art,
        }
    }
}

export default withApollo(Curriculum)