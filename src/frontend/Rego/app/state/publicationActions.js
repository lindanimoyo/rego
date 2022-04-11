const setPmid = (payload) => (
  {
    type: "SET_PMID",
    payload: payload
  }
)
const setWebenv = (payload, screen) => (
  {
    type: "SET_WEBENV",
    payload: payload,
    screen: screen
  }
)
const setQuerykey = (payload, screen) => (
  {
    type: "SET_QUERYKEY",
    payload: payload,
    screen: screen
  }
)

const setReferer = (payload) => (
  {
    type: 'SET_REFERER',
    payload: payload
  }
)

const setPMC = (payload) => (
  {
    type: 'SET_PMC',
    payload: payload
  }
)

const setSearchTerm = (payload) => (
  {
    type: 'SET_SEARCH_TERM',
    payload: payload
  }
)

const setFavourite = (payload, mode) => (
  {
    type: 'SET_FAVOURITE',
    payload: payload,
    mode: mode
  }
)

export {
  setPmid,
  setQuerykey,
  setWebenv,
  setReferer,
  setPMC,
  setSearchTerm,
  setFavourite
};
