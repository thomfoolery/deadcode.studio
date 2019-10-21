import React, { useContext } from 'react';
import { ConsoleContext } from '../Game';
import {IConsoleEntry} from '../../reducers/console';

import ConsoleBlock from '../ConsoleBlock';
import ConsoleInput from '../ConsoleInput';
import ConsoleChoices from '../ConsoleChoices';

import styles from './styles.module.css';

export interface Props {
  next(): void;
  choices: any[];
  entries?: IConsoleEntry[];
  isConsoleFocused: boolean;
};

function Console({
  next,
  choices,
  entries,
  isConsoleFocused,
}: Props) {
  const { isConsoleEnabled } = useContext(ConsoleContext);

  return (
    <div className={styles.Console}>

      <ConsoleBlock
        next={next}
        entries={entries}/>
      {
        isConsoleEnabled &&
        <>
        {
           choices ?
            <ConsoleChoices
              next={next}
              choices={choices}
              isConsoleFocused={isConsoleFocused}
            /> :
            <ConsoleInput
              next={next}
              isConsoleFocused={isConsoleFocused}
            />
        }
        </>
      }
    </div>
  )
}

export default React.memo(Console);