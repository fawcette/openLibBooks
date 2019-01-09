import axios from 'axios'

const API_URL = 'http://openlibrary.org/'

/**
 * INITIAL STATE
 */

const initialState = {
    books: [], 
    sortType: 'none', 
    filterDateRange: {startYear: -Infinity, endYear: Infinity}
}

/**
 * ACTION TYPES
 */
const GET_BOOKS = 'GET_BOOKS'
const SET_SORT = 'SET_SORT'
const SET_DATE_RANGE = 'SET_DATE_RANGE'

/**
 * ACTION CREATORS
 */
const getBooks = (books) => ({ type: GET_BOOKS, books})
const setSort = (sortType) => ({type: SET_SORT, sortType})
const setDateRange = (startYear, endYear) => ({type: SET_DATE_RANGE, startYear, endYear})

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

export const setFilterDateRange = (startYear, endYear) => (dispatch) => {
    dispatch(setDateRange(startYear, endYear))
}

/**
 * REDUCER
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKS:
            return {...state, books: action.books}
        case SET_SORT:
            return {...state, sortType: action.sortType}
        case SET_DATE_RANGE:
            return {...state, filterDateRange: {startYear: action.startYear, endYear: action.endYear}}
        default:
            return state
    }
}

export default reducer
