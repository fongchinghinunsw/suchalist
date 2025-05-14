import {Folder, List} from '@/services/task-service/types';

/**
 * Represents a list header item.
 * @property {string} id - The unique identifier of the list.
 * @property {string} title - The title of the list.
 */
export type ListHeader = {
  type: 'LIST';
} & Pick<List, 'id'>;

/**
 * Represents a folder header item which can contain multiple list header items.
 * @property {string} id - The unique identifier of the folder.
 * @property {string} title - The title of the folder.
 * @property {string[]} lists - The array of lists' unique identifiers contained within the folder.
 */
export type FolderHeader = {
  type: 'FOLDER';
  lists: ListHeader[];
} & Pick<Folder, 'id'>;

/**
 * Union type representing either a list header or a folder header.
 */
export type Header = ListHeader | FolderHeader;

export function isFolderHeader(header: Header): header is FolderHeader {
  return header.type === 'FOLDER';
}
