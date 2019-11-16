import React, {ReactNode, useEffect} from 'react';

import {ConsoleEntryTypes} from '../../reducers';

import styles from './styles.module.css';

export interface Props {
  type: ConsoleEntryTypes;
  children?: ReactNode;
  next?(): void;
  content?: any;
  options?: any;
};

const noop = () => undefined;

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
  next = noop,
  options = {},
  content = ' ',
}: Props) {
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
