import React from 'react';
import {IConsoleEntry, ConsoleEntryTypes} from '../../reducers/console';

import GameTitle from '../GameTitle';
import ConsoleLine from '../ConsoleLine';

const presentations = {
  GameTitle,
}

export interface Props {
  entries?: IConsoleEntry[];
};

function ConsoleBlock({entries}: Props) {
  return (
    <div>
      {
        entries && entries.map((entry, i) => {
          const { type, content } = entry;

          if (type === ConsoleEntryTypes.Special) {
            const parts = content.trim().split(' ');
            const componentName = parts[parts.length - 1];
            const Component = presentations[componentName];

            return (
              <Component
                key={`${i}-${content}`}
              />
            );
          }
          return (
            <ConsoleLine
              {...entry}
              key={`${i}-${content}`}
            />
          )
        })
      }
    </div>
  )
}

export default React.memo(ConsoleBlock);