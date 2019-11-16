import React, {ReactNode, useState, useEffect, useContext} from 'react';
import { ConsoleEntryTypes } from '../../reducers/console';

import { GameControllerContext } from '../GameController';

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
  const [renderedLength, setRenderedLength] = useState(0)
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
      if (renderedLength === content.length) {
        setTimeout(next, options.delay || 0);
      }
      else {
        setTimeout(() => setRenderedLength(renderedLength + 1), 5);
      }
    }
  }, [renderedLength]);

  return (
    <code className={classes.join(' ')}>
      {
        !children ?
          content.substr(0, renderedLength) :
          children
      }
    </code>
  );
}

export default React.memo(ConsoleLine);
