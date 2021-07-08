const initialState = {
    post : []
}

export default (state = initialState, action) => {
    switch (action.type) {
     case 'SIMPLE_ACTION':
      return {
       post: [...state.post , action.payload]
      }
     default:
      return state
    }
   }