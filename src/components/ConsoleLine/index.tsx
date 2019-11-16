import React, {ReactNode, useEffect, useContext} from 'react';
import { ConsoleEntryTypes } from '../../reducers/console';

import { GameControllerContext } from '../GameController';

import styles from './styles.module.css';

export interface Props {
  type: ConsoleEntryTypes;
  children?: ReactNode;
  content?: any;
  options?: any;
};

function split(content)  {
  return content.split('').map((char, i) =>
    (
      <span
        key={`${i}-${char}`}
        className={styles.char}>
        {char}
      </span>
    )
  );
}

function ConsoleLine({
  type,
  children,
  options = {},
  content = ' ',
}: Props) {
  const { next } = useContext(GameControllerContext);

  const { classNames = [] } = options;
  const isUserContent = content.startsWith('User:');
  const classes = [styles.ConsoleLine, ...classNames];

  if (type === ConsoleEntryTypes.Command) {
    classes.push(styles.isCommandLine);
  }
  if (options.color) {
    classes.push(styles[options.color]);
  }
  if (isUserContent) {
    classes.push(styles.isUser);
  }

  useEffect(() => {
    if (type !== ConsoleEntryTypes.Command) {
      setTimeout(next, options.delay || 0);
    }
  }, []);

  return (
    <code className={classes.join(' ')}>
      {children ? children : split(content)}
    </code>
  );
}

export default React.memo(ConsoleLine);
