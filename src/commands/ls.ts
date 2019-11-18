import { ConsoleEntryTypes } from '../reducers/console';
import { getFolder } from './utils';

function getContent(destFolder) {
  if (destFolder) {
    const files = destFolder.content.files.reduce((acc, file) => `${acc}\n  ${file.name}`, '');
    const folders = destFolder.content.folders.reduce((acc, folder) => `${acc}\n  ./${folder.name}`, '');

    return `  .\n  ..${files}${folders}`;
  }
  else {
    return null;
  }
}

export default function ls(args, state): any {
  const options = { color: 'yellow' };
  const pwd = state.gameServerPwd;
  const destFolder = getFolder(state.gameServer.filesystem, pwd);
  const content = getContent(destFolder) || `/${pwd.join('/')} does not exist`;

  return {
    ...state,
    consoleEntries: state.consoleEntries.concat([
      {
        type: ConsoleEntryTypes.Output,
        content,
        options,
      },
    ]),
  };
}
