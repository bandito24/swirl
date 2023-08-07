export const addToStateArray = (stateCallback, value) => {
    stateCallback(prev => [
        ...prev, value
    ])
}

export const removeFromStateArray = (stateCallback, value) => {
    stateCallback(prev => {
        const oldArray = [...prev];
        return oldArray.filter(val => {
            return val !== value
        })
    })
}
