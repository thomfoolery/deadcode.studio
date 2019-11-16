import React from 'react';

import GameController from '../GameController';
import Console from '../Console';

import styles from './styles.module.css';
import { IGameState } from '../../reducers';

interface IProps {
  storyEngine: any;
}

const MAX_ENTRIES_LENGTH = 100;

function Render(consoleState: IGameState) {
  return (
    <Console
      choices={consoleState.choices}
      entries={consoleState.consoleEntries.slice(MAX_ENTRIES_LENGTH * -1)}
    />
  )
}

function Root({ storyEngine }: IProps) {
  return (
    <div className={styles.Root}>
      <GameController storyEngine={storyEngine}>
        {Render}
      </GameController>
    </div>
  );
}

export default Root;
