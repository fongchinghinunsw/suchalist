import {Folder, List} from '@/stores/tasks/types';

export type ListHeader = Pick<List, 'id' | 'title'> & {type: 'LIST'};

export type FolderHeader = Pick<Folder, 'id' | 'title' | 'lists'> & {
  type: 'FOLDER';
};

export type Header = ListHeader | FolderHeader;
