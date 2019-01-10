# Open Library Book Search

## Purpose

Provides the ability to search for books, filter results, and retrieve specific book information. Book data is provided by the Open Library API.

## Deployed App Link: https://pacific-crag-58087.herokuapp.com/

## Features

1) Allow the user to search for a book.
   i) Search via book title, author, or both
2) Fetch and display a list of results from the same Open Library API (https://openlibrary.org/developers/api).
3) Allow the user to sort and filter results.
   i) Users can filter by first publish date and language
   ii) Language filter options are dynamic based on search
4) Allow the user to click on a result and view additional details, including at least cover art and description.

## Setup

`npm install` or `yarn install`

## Start

`npm run start-dev`

## Known Issues/Limitations

1) API Limitations
   i) Not all books have a ISBN, so an OLID is used otherwise
   ii) Fetching a book by OLID does not guarantee a non empty object response
   iii) Search API responses do not always match corresponding ISBN or OLID responses
2) Search bar
   i) Search bar does not redirect to result page if on another page
   ii) Media query needs to be used to support different devices
3) Filtering
   i) Need to include a select all/ remove all button
   ii) Need to stop language filter from clearing after collapse
