import { default as home } from './home';

interface IFolder {
  name: string;
  content: any;
  permissions: any;
}

export function Folder(name: string, files: IFile[], folders: IFolder[], permissions?: any): IFolder {
  return {
    name,
    content: {
      files,
      folders,
    },
    permissions,
  };
}

interface IFile {
  name: string;
  type: string;
  content: string;
  permissions: any;
}

export function File(name: string, content: string, permissions?: any): IFile {
  return {
    name,
    type: 'file',
    content,
    permissions,
  }
}

export default {
  home,
}

