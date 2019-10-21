import React from 'react';

import Game from '../Game';
import Console from '../Console';

interface IProps {
  storyEngine: any;
}

function Render(next, state) {
  return (
    <Console
      next={next}
      isConsoleFocused={true}
      choices={state.choices}
      entries={state.consoleEntries}
    />
  )
}

function Root({ storyEngine }: IProps) {
  return (
    <div style={{ display: 'flex' }}>
      <Game storyEngine={storyEngine}>
        {Render}
      </Game>
    </div>
  );
}

export default Root;
