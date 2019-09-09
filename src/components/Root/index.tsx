import React, {useReducer} from 'react';
import {stateReducer, defaultState} from '../../reducers/console';

import Orchestrator from '../Orchestrator';
import Console from '../Console';

import initialPage from '../../data/0-start.js';

function Root() {
  const [state, dispatch] = useReducer(stateReducer, defaultState);
  const {consoleEntries} = state;

  return (
    <Orchestrator
      dispatch={dispatch}
      initialPage={initialPage}>
      {
        (next) => (
          <Console
            next={next}
            dispatch={dispatch}
            entries={consoleEntries}/>
        )
      }
    </Orchestrator>
  );
}

export default Root;
