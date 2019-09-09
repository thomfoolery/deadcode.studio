import React from 'react';
import {IAction} from '../../reducers/console';
import {IConsoleBufferEntry, ConsoleEntryTypes} from '../../types';

import ConsoleBlock from '../ConsoleBlock';
import ConsoleLine from '../ConsoleLine';
import ConsoleInput from '../ConsoleInput';

import styles from './styles.module.css';

export interface Props {
  next?(): void;
  entries?: IConsoleBufferEntry[];
  dispatch(action: IAction): void;
};

function Console({next = () => null, entries, dispatch}: Props) {
  return (
    <div className={styles.Console}>

      <ConsoleBlock
        next={next}
        entries={entries}/>

      <ConsoleLine
        type={ConsoleEntryTypes.Command}>
        <ConsoleInput dispatch={dispatch}/>
      </ConsoleLine>

    </div>
  )
}

export default Console;