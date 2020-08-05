'use strict'

import gql from 'graphql-tag'

const STUDENT_CURR_OUTPUT = gql`
    fragment student_curr_output on StudentCurriculum {
        _id
        studentId
        art
        topCategories {
            id
            status
        }
        currentCategories {
            id
            status
        }
        currentItems {
            id
            status
        }
        hiddenCategories {
            id
            status
        }
        hiddenItems {
            id
            status
        }
    }
  
`

export const GET_STUDENT_CURR_CURRIC = gql`
    query getStudentCurrCurric($input: StudentCurrInput!) {
        getStudentCurrCurric(input: $input) {
            ...student_curr_output
        }
    }
    ${STUDENT_CURR_OUTPUT}
`

export const ADD_TOP_CAT = gql`
    mutation AddTopCurrElements($input: StudentCurrElementsInput! ) {
        addTopCurrElements(input: $input) {
            ...student_curr_output
        }
    }
    ${STUDENT_CURR_OUTPUT}
`

export const CLEAR_STUDENT_CURR = gql`
    mutation ClearCurriculum($input: StudentCurrInput!) {
        clearCurrCurric(input: $input) {
            ...student_curr_output
        }
    }
    ${STUDENT_CURR_OUTPUT}
`

export const UPDATE_STATUS = gql`
    mutation updateStatus($input: StudentCurrUpdate!) {
        updateStatus(input: $input) {
            ...student_curr_output
        }
    }
    ${STUDENT_CURR_OUTPUT}
`