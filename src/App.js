import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from "./reducer";
import styled from "@emotion/styled";

import Grid from "./components/Grid";
import Toolbox from "./components/Toolbox";


export const Context = createContext(initialState);

const Main = styled.main`
  background:${props => props.background};
  overflow:auto;
`

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Main background={state.globalBackground}>
        <Toolbox />
        <Grid />
      </Main>
    </Context.Provider>
  );
}

export default App;
