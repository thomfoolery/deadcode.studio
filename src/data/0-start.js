import {ConsoleEntryTypes} from '../types';

export default [
  {
    type: ConsoleEntryTypes.Output,
    content: 'boot loader recognized',
  },
  {
    type: ConsoleEntryTypes.Output,
    content: 'attempting remote connection',
  },
  {
    type: ConsoleEntryTypes.Output,
    content: '',
  },
  {
    type: ConsoleEntryTypes.Command,
    content: 'system buffer reset',
  },
  {
    type: ConsoleEntryTypes.Output,
    content: '',
  },
  {
    type: ConsoleEntryTypes.Output,
    content: 'initializing...',
  },
  {
    type: ConsoleEntryTypes.Output,
    content: '',
  },
];
