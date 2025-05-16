import {LEISURE_FOLDER, PERSONAL_IMPROVEMENT_FOLDER} from './fake/folder';
import {DEFAULT_LIST, GROCERY_LIST} from './fake/list';
import {Resource} from './types';

export const RESOURCES: Resource[] = [
  DEFAULT_LIST,
  PERSONAL_IMPROVEMENT_FOLDER,
  LEISURE_FOLDER,
  GROCERY_LIST,
];

export const getResources = async (): Promise<Resource[]> => {
  return RESOURCES;
};
