import React, {ReactNode, useState, useEffect, useContext} from 'react';
import { ConsoleEntryTypes } from '../../reducers/console';
import { GameContext } from '../../contexts/game';

import styles from './styles.module.css';

export interface Props {
  type: ConsoleEntryTypes;
  children?: ReactNode;
  content?: any;
  options?: any;
};

function ConsoleLine({
  type,
  children,
  options = {},
  content = ' ',
}: Props) {
  const [renderLength, setRenderLength] = useState(0);
  const { next } = useContext(GameContext);

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
      if (renderLength === content.length) {
        setTimeout(next, options.delay || 0);
      }
      else {
        setTimeout(() => setRenderLength(renderLength + 1), 5);
      }
    } else {
      setRenderLength(
        type === ConsoleEntryTypes.Command ? content.length : 0
      );
    }
  }, [renderLength]);

  return (
    <code className={classes.join(' ')}>
      {
        !children ?
          content.substr(0, renderLength) :
          children
      }
    </code>
  );
}

export default React.memo(ConsoleLine);
