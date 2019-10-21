import React from 'react';
import {IConsoleEntry, ConsoleEntryTypes} from '../../reducers/console';

import GameTitle from '../GameTitle';
import ConsoleLine from '../ConsoleLine';

const presentations = {
  GameTitle,
}

export interface Props {
  next(): void;
  entries?: IConsoleEntry[];
};

function ConsoleBlock({next, entries}: Props) {
  return (
    <>
      {
        entries && entries.map((entry, i) => {
          const { type, content } = entry;

          if (type === ConsoleEntryTypes.Special) {
            const parts = content.trim().split(' ');
            const componentName = parts[parts.length - 1];
            const Component = presentations[componentName];

            return (
              <Component
                next={next}
                key={`${i}-${content}`}
              />
            );
          }
          return (
            <ConsoleLine
              {...entry}
              next={next}
              key={`${i}-${content}`}
            />
          )
        })
      }
    </>
  )
}

export default React.memo(ConsoleBlock);