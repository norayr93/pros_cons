const makeActionCreator = (type, ...argNames) => (...args) => {
    const action = {type};
    argNames.forEach((arg, index) => {
        action[arg] = args[index];
    });
    return action;
};

export default makeActionCreator;
