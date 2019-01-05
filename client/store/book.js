import axios from 'axios'

const API_URL = 'http://openlibrary.org/'

/**
 * ACTION TYPES
 */
const GET_BOOKS = 'GET BOOKS'

/**
 * ACTION CREATORS
 */
const getBooks = (books) => ({ type: GET_BOOKS, books})

/**
 * THUNK CREATORS
 */
export const getSearchedBooks = (searchQuery) => async (dispatch) => {
    try {
        console.log(API_URL + 'search.json?q=' + searchQuery)
        const res = await axios.get(API_URL + 'search.json?q=' + searchQuery)
        console.log(res)
        dispatch(getBooks(res.data.docs))
    } catch (error) {
        console.error(error)
    }
}

/**
 * REDUCER
 */
const reducer = (state = {books: []}, action) => {
    switch (action.type) {
        case GET_BOOKS:
            return {...state, books: action.books}
        default:
            return state
    }
}

export default reducer
