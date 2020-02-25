import React, {createContext, useMemo} from 'react';

export const GlobalContext = createContext();

const GlobalContextProvider = props => {
    const {userCredentials, todos, dispatch} = props.values;

    const contextValues = useMemo(() => ({userCredentials, todos, dispatch}), [userCredentials, todos, dispatch]);

    return <GlobalContext.Provider value={contextValues}>{props.children}</GlobalContext.Provider>;
};

export default GlobalContextProvider;
