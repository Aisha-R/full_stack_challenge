const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
    console.log(action)
    const stateCopy = { ...state };
    switch (action.type) {
        case 'GOOD':
            stateCopy.good += 1
            return stateCopy
        case 'OK':
            stateCopy.ok += 1
            return stateCopy
        case 'BAD':
            stateCopy.bad += 1
            return stateCopy
        case 'ZERO':
            const newState = {
                good: 0,
                ok: 0,
                bad: 0
            }
            return newState
        default: return state
    }
  
}

export default counterReducer