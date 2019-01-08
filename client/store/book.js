import axios from 'axios'

const API_URL = 'http://openlibrary.org/'

/**
 * ACTION TYPES
 */
const GET_BOOKS = 'GET_BOOKS'
const SET_SORT = 'SET_SORT'

/**
 * ACTION CREATORS
 */
const getBooks = (books) => ({ type: GET_BOOKS, books})
const setSort = (sortType) => ({type: SET_SORT, sortType})

/**
 * THUNK CREATORS
 */
export const getSearchedBooks = (searchQuery, type) => async (dispatch) => {
    try {
        let queryUrlStr = searchQuery.split(' ').join('+')
        const res = await axios.get(API_URL + 'search.json?' + type + '=' + queryUrlStr)
        dispatch(getBooks(res.data.docs))
    } catch (error) {
        console.error(error)
    }
}

export const setSortType = (type) => (dispatch) => {
    dispatch(setSort(type))
}

/**
 * REDUCER
 */
const reducer = (state = {books: [], sortType: 'none'}, action) => {
    switch (action.type) {
        case GET_BOOKS:
            return {...state, books: action.books}
        case SET_SORT:
            return {...state, sortType: action.sortType}
        default:
            return state
    }
}

export default reducer
