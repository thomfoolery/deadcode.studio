import React, {ReactNode, useEffect} from 'react';

import {ConsoleEntryTypes} from '../../types';

import styles from './styles.module.css';

export interface Props {
  type: ConsoleEntryTypes;
  children?: ReactNode;
  content?: any;
  next?(): void;
};

function ConsoleLine({type, children, content = '', next = () => undefined}: Props) {
  const classes = type === ConsoleEntryTypes.Command ?
    [styles.ConsoleLine, styles.isCommandLine] :
    [styles.ConsoleLine]

  useEffect(next, [next]);

  return (
    <code className={classes.join(' ')}>
      {children ? children : content}
    </code>
  );
}

export default ConsoleLine;
