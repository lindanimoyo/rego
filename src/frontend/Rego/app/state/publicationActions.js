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
export {setPmid, setQuerykey, setWebenv, setReferer};
