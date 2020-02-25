const todosReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ALL_TODOS':
            return action.payload;
        default:
            return state;
    }
};

export default todosReducer;
