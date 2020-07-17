'use strict'

import gql from 'graphql-tag'

const CAT_OUTPUT = gql`
    fragment category_output on Category {
        _id
        title
        currentChildren {
            _id
            title
        }
        currentItems {
            _id
            title
        }
        archivedChildren {
            _id
            title
        }
        archivedItems {
            _id
            title
        }
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
            _id
            currentChildren {
                _id
                title
            }
        }
    }
`
export const MOVE_CAT_ARCH = gql`
    mutation moveArchCategory($input: MoveInput! ) {
        moveArchChildCategoryTo(input: $input) {
            _id
            archivedChildren {
                _id
                title
            }
        }
    }
`
export const MOVE_ITEM = gql`
    mutation moveItem($input: MoveInput! ) {
        moveCurrCategoryItemTo(input: $input) {
            _id
            currentItems {
                _id
                title
            }
        }
    }
`
export const MOVE_ITEM_ARCH = gql`
    mutation moveItem($input: MoveInput! ) {
        moveArchCategoryItemTo(input: $input) {
            _id
            archivedItems {
                _id
                title
            }
        }
    }
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

export const ARCHIVE_CAT = gql`
    mutation archiveCategory($input: MoveInput! ) {
        archiveChildCategory(input: $input) {
            _id
            archivedChildren {
                _id
                title
            }
            currentChildren {
                _id
                title
            }
        }
    }
`
export const UNARCHIVE_CAT = gql`
    mutation unarchiveCategory($input: MoveInput! ) {
        unarchiveChildCategory(input: $input) {
            _id
            currentChildren {
                _id
                title
            }
            archivedChildren{
                _id
                title
            }
        }
    }
`
export const ARCHIVE_ITEM = gql`
    mutation archiveItem($input: MoveInput! ) {
        archiveItem(input: $input) {
            _id
            archivedItems {
                _id
                title
            }
            currentItems {
                _id
                title
            }
        }
    }
`
export const UNARCHIVE_ITEM = gql`
    mutation unarchiveItem($input: MoveInput! ) {
        unarchiveItem(input: $input) {
            _id
            archivedItems {
                _id
                title
            }
            currentItems {
                _id
                title
            }
        }
    }
`