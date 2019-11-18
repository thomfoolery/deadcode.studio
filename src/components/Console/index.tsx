import React from 'react';
import { IConsoleEntry } from '../../reducers/console';

import ConsoleBlock from '../ConsoleBlock';
import ConsoleInput from '../ConsoleInput';
import ConsoleChoices from '../ConsoleChoices';

import styles from './styles.module.css';

export interface Props {
  consoleChoices: any[];
  entries?: IConsoleEntry[];
};

function Console({
  consoleChoices,
  entries,
}: Props) {
  return (
    <div className={styles.Console}>
      <div className={styles.ConsoleBuffer}>
        <ConsoleBlock entries={entries}/>
      </div>
      <div className={styles.ConsoleInput}>
        {
          consoleChoices.length > 0 ?
            <ConsoleChoices consoleChoices={consoleChoices} /> :
            <ConsoleInput />
        }
      </div>
    </div>
  )
}

export default React.memo(Console);