'use strict'

import gql from 'graphql-tag'

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
