'use strict'

import gql from 'graphql-tag'

const CAT_OUTPUT = gql`
    fragment category_output on Category {
        _id
        title
    }
`
export const EDIT_CAT = gql`
    mutation editCategory($input: EditInput! ) {
        editCategory(input: $input) {
            _id
            title
        }
    }
`

export const EDIT_CAT_ITEM = gql`
    mutation editCategoryItem($input: EditInput! ) {
        editCategoryItem(input: $input) {
            _id
            title
        }
    }
`

export const MOVE_CAT = gql`
    mutation moveCategory($input: MoveInput! ) {
        moveCurrChildCategoryTo(input: $input) {
            ...category_output
        }
    }
    ${CAT_OUTPUT}
`
export const MOVE_ITEM = gql`
    mutation moveItem($input: MoveInput! ) {
        moveCurrCategoryItemTo(input: $input) {
            ...category_output
        }
    }
    ${CAT_OUTPUT}
`
export const CREATE_CAT = gql`
    mutation createCategory($input: CategoryInput!) {
        createCurrChildCategory(input: $input) {
          _id
          title
        }
    }
`
export const CREATE_ITEM = gql`
    mutation createItem($input: CategoryItemInput!) {
        createCurrCategoryItem(input: $input) {
            _id
            title
        }
    }
`
export const DELETE_CAT = gql`
    mutation delCurrChildCategory($input: DeleteInput!) {
        delCurrChildCategory(input: $input) {
            ...category_output
        }
    }
    ${CAT_OUTPUT}
`
export const DELETE_ITEM = gql`
    mutation delCurrCategoryItem($input: DeleteInput!) {
        delCurrCategoryItem(input: $input) {
            ...category_output
        }
    }
    ${CAT_OUTPUT}
`