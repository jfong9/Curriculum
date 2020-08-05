
import gql from 'graphql-tag'

const CURRIC_OUTPUT = gql`
    fragment curric_output on Curriculum {
        _id
        topCategories {
            _id
            title
        }
        archivedTopCategories{
            _id
            title
        }
    }
`
const ALL_CAT_OUTPUT = gql`
    fragment category_output on Category {
        _id
        title
        currentChildren {
            _id
        }
        currentItems {
            _id
            title
        }
        archivedChildren {
            _id
        }
        archivedItems{
            _id
            title
        }
    }
`

export const GET_CURRICULUM = gql`
    query curriculum($input: CurriculumInput!) {
        curriculum(input: $input) {
            ...curric_output
        }
    }
    ${CURRIC_OUTPUT}
`
export const CREATE_TOP_CAT = gql`
    mutation createTopCategory($input: CategoryInput!) {
        createTopCategory(input: $input) {
          _id
          title
        }
    }
`

export const MOVE_TOP_CAT = gql`
    mutation moveTopCategoryTo($input: MoveInput!) {
        moveTopCategoryTo(input: $input) {
            ...curric_output
        }
    }
    ${CURRIC_OUTPUT}
`
export const DELETE_TOP_CAT = gql`
    mutation delCurrTopCategory($input: DeleteInput!) {
        delCurrTopCategory(input: $input) {
            ...curric_output
        }
    }
    ${CURRIC_OUTPUT}
`

export const GET_ALL_CATS = gql`
    query allCatMutation($input: MongoObjectId!) {
        getAllCategoryElements(input: $input) {
            ...category_output
        }
    }
    ${ALL_CAT_OUTPUT}
`