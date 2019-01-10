import axios from 'axios'

const API_URL = 'http://openlibrary.org/'

/**
 * INITIAL STATE
 */
const initialState = {
    books: [],
    singleBook: {}, 
    sortType: 'none', 
    filterDateRange: {startYear: -Infinity, endYear: Infinity},
    filterLanguage: {}
}

/**
 * ACTION TYPES
 */
const GET_BOOKS = 'GET_BOOKS'
const GET_BOOK = 'GET_BOOK'
const SET_SORT = 'SET_SORT'
const SET_DATE_RANGE = 'SET_DATE_RANGE'
const SET_LANGUAGE = 'SET_LANGUAGE'

/**
 * ACTION CREATORS
 */
const getBooks = (books) => ({ type: GET_BOOKS, books})
const getBook = (book) => ({ type: GET_BOOK, book})
const setSort = (sortType) => ({type: SET_SORT, sortType})
const setDateRange = (startYear, endYear) => ({type: SET_DATE_RANGE, startYear, endYear})
const setLanguage = (languageDict) => ({type: SET_LANGUAGE, languageDict})

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

export const getSingleBook = (id) => async (dispatch) => {
    try {
        let idType = (id.slice(0, 2) == 'OL') ? 'OLID' : 'ISBN'
        const res = await axios.get(API_URL + `api/books?bibkeys=${idType}` + id + '&jscmd=details&format=json')
        let idProperty = (idType === 'OLID') ? `${idType}:${id}` : `${idType}${id}`
        dispatch(getBook(res.data[idProperty]))
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

export const setFilterLanguage = (languageDict) => (dispatch) => {
    dispatch(setLanguage(languageDict))
}

/**
 * REDUCER
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKS:
            return {...state, books: action.books}
        case GET_BOOK:
            return {...state, singleBook: action.book}
        case SET_SORT:
            return {...state, sortType: action.sortType}
        case SET_DATE_RANGE:
            return {...state, filterDateRange: {startYear: action.startYear, endYear: action.endYear}}
        case SET_LANGUAGE:
            return {...state, filterLanguage: action.languageDict}
        default:
            return state
    }
}

export default reducer
