import { File, Folder } from '..';

export default {
  name: 'start',
  ip: '200.45.783.666',
  filesystem: Folder('/',
    [
      File('hello-world.txt', 'hello world'),
    ],
    [
      Folder('glovebox',
        [
          File('address.txt', 'file'),
        ],
        []
      ),
    ],
  ),
};
