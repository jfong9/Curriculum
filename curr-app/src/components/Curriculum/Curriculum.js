import React, { useState, useEffect } from 'react'
import { Query, withApollo }from 'react-apollo'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ArtDropdown from 'components/ArtDropdown'
import { GET_CURRICULUM } from 'actions/curriculumActions'
import DisplayTopCategories from './DisplayTopCategories'
import CreateTopCatButton from './CreateTopCatButton'
import DisplayCategories from './DisplayCategories'
import style from './Curriculum.module.css'

const INFO_QUERY = gql`
    query getSensitiveInfo {
        info: sensitiveInformation
        # info: regularInfo
    }
`

function Curriculum({schoolId, defaultArt, ...props}) {
    const [selectedCategoryId, setCategoryId] = useState(null);
    const [count, setCount] = useState(0);
    const curriculumQueryInput = getCurriculumQueryInput(schoolId, defaultArt); 
    const isInitialized = () => {
        return schoolId && defaultArt 
    }

    useEffect( () => {
        // setCategoryId("5e8e466a4dab5634e42a4c77");
        setCategoryId(null);
    }, [defaultArt, schoolId]);

     
    // const { loading, error, data: curricData } = useQuery(GET_CURRICULUM, {
    //     variables: curriculumQueryInput,
    //     skip: !isInitialized() 
    // });

    //using lazyquery + useeffect to avoid apollo unmounting warning
    const [getCurriculum, { loading, error, data: curricData }] = useLazyQuery(GET_CURRICULUM, {
        variables: curriculumQueryInput,
        skip: !isInitialized() 
    });

    let isMounted = true;
    useEffect( () => {
        if (isMounted && isInitialized()) {
            getCurriculum();
        }
        return () => {
            isMounted = false;
        };
    }, [defaultArt, schoolId]);


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
        setCategoryId(id);
    }

    const onTopCategoryDelete = (deletedId) => {
        if (selectedCategoryId === deletedId) setCategoryId(null);
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
                        categoryClick={getAllCats}
                        onDelete={onTopCategoryDelete}
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
                    { selectedCategoryId && 
                        <DisplayCategories 
                            selectedCategory={selectedCategoryId}
                        />}
            
                </div>
                <div className={style.attribution}>
                    <small>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></small>
                </div>
            </div>}
        </React.Fragment>
    )
}

function getCurriculumQueryInput(schoolId, art) {
    console.log({schoolId})
    return {
        "input": {
            schoolId, 
            art,
        }
    }
}

export default withApollo(Curriculum)