const INITIAL_STATE = {
  pmid:''
}

export const publicationReducer = (state=INITIAL_STATE, action) => {
  switch (action.type){
    case 'SET_PMID':
      state.pmid = action.payload;
      return {...state}
    default:
      return state
  }
}
