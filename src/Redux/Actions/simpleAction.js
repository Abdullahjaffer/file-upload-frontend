export const simpleAction = (post) => dispatch => {
    dispatch({
     type: 'SIMPLE_ACTION',
     payload: post
    })
   }