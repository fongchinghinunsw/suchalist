import { Folder } from './folder';
import { List, ListWithOrder } from './list';

export type Resource = List | Folder;

export type TopLevelResource = ListWithOrder | Folder;
