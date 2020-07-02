import React from 'react'
import { Query, withApollo }from 'react-apollo'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ArtDropdown from 'components/ArtDropdown'
import { GET_CURRICULUM } from 'actions/curriculumActions'
import DisplayTopCategories from './DisplayTopCategories'
import CreateTopCatButton from './CreateTopCatButton'
import style from './Curriculum.module.css'

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
        <React.Fragment>
            {hasCurriculumData() && 
            <div className={style.curriculum}>
                <div className={style.sideMenu}>
                    <ArtDropdown className={style.artDropDown} {...props} defaultArt={defaultArt} />
                    <CreateTopCatButton className={style.createCat} {...props} curricData={curricData} queryInput={curriculumQueryInput}/>
                    <DisplayTopCategories 
                        {...props} 
                        topCategories={getTopCategory()} 
                        parentId={curricData.curriculum._id}
                        currInputVars={curriculumQueryInput}
                    />
                    {/* this is just a sample query */}
                    {/* <Query query={INFO_QUERY}>
                        { ( {loading, error, data} ) => {
                                if (loading) return <div>Loading Curr</div>
                                if (error) return <div>Error curr</div>
                                if (data.info) return <div>{data.info}</div>
                                return null
                            }
                        }
                    </Query> */}
                </div>
                {/* <div className={style.curriculumDisplay}>
                    <li className={style.subCurricItem}>
                       {`White Belt`}
                    </li>
                    <li className={style.subCurricItem1}>
                       {`    Throws:`}
                       <li className={style.subCurricItem2}>
                           {`    Tai-Otoshi`}
                       </li>
                    </li>
                   <li className={style.subCurricItem1}>
                       {`    Pins:`}
                       <li className={style.subCurricItem2}>
                           {`    Kesa Gatame`}
                       </li>
                    </li>

                    {`White Belt\n \tThrows: \nTai-Otoshi \nOsoto-gari \nPins:\n Kesa-Gatame`} 
                </div> */}
            </div>}
        </React.Fragment>
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