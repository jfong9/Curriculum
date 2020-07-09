import React, { useState, useEffect, useRef } from 'react'
import { Query, withApollo }from 'react-apollo'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ArtDropdown from 'components/ArtDropdown'
import { GET_CURRICULUM } from 'actions/curriculumActions'
import DisplayTopCategories from './DisplayTopCategories'
import CreateTopCatButton from './CreateTopCatButton'
import style from './Curriculum.module.css'
import DisplayCategories from './DisplayCategories'
import { useHistory } from 'react-router-dom'

const INFO_QUERY = gql`
    query getSensitiveInfo {
        info: sensitiveInformation
        # info: regularInfo
    }
`
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current=value;
    });
    return ref.current;
}

function Curriculum({schoolId, defaultArt, ...props}) {
    const history = useHistory();
    const [selectedCategory, setCategory] = useState(null);
    const [count, setCount] = useState(0);
    const curriculumQueryInput = getCurriculumQueryInput(schoolId, defaultArt); 
    const isInitialized = () => {
        return schoolId && defaultArt 
    }
    const prevCount = usePrevious(count);


    useEffect( () => {
        setCategory("5e8e466a4dab5634e42a4c77");
        // setCategory(null);
    }, [defaultArt, schoolId]);

    
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

    const getAllCats = (id) => { 
        console.log(id);
        setCount(count+1);
        setCategory(id);
        history.push('/MainPortal/Curriculum')
    }

    console.log(`Current ${count} prev ${prevCount}`);

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
                        categoryClick={getAllCats}
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
                <div className={style.curriculumDisplay}>
                    { selectedCategory && <DisplayCategories {...props} selectedCategory={selectedCategory}/>}
                </div>
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