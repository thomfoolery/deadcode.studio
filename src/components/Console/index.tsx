import React from 'react';
import {IConsoleEntry} from '../../reducers';

import ConsoleBlock from '../ConsoleBlock';
import ConsoleInput from '../ConsoleInput';
import ConsoleChoices from '../ConsoleChoices';

import styles from './styles.module.css';

export interface Props {
  choices: any[];
  entries?: IConsoleEntry[];
};

function Console({
  choices,
  entries,
}: Props) {
  return (
    <div className={styles.Console}>

      <ConsoleBlock
        entries={entries}/>
      {
          choices.length > 0 ?
          <ConsoleChoices choices={choices} /> :
          <ConsoleInput />
      }
    </div>
  )
}

export default React.memo(Console);