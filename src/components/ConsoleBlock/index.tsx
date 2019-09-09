import React from 'react';
import {IConsoleBufferEntry} from '../../types';

import ConsoleLine from '../ConsoleLine';

export interface Props {
  next(): void;
  entries?: IConsoleBufferEntry[];
};

function ConsoleBlock({next, entries}: Props) {
  return (
    <>
      {
        entries && entries.map(({type, content}, i) => (
          <ConsoleLine
            type={type}
            next={next}
            key={`${i}`}
            content={content}/>
        ))
      }
    </>
  )
}

export default ConsoleBlock;