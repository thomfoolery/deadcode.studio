import { last, init } from 'ramda';

export function getFolder(folder, path) {
  if (path.length === 0) {
    return folder;
  }
  else {
    const folderName = last(path);
    const nextFolder = folder.content.folders.find(({name}) => name === folderName);

    if (nextFolder) {
      return getFolder(nextFolder, init(path))
    }

    return null;
  }
}
