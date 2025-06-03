import { selectFolderMap } from '@renderer/stores/tasks/tasks';
import { IoFolderOpenOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { FolderHeader } from '../types';
import BaseHeaderItem from './BaseHeaderItem';

type Props = {
  folderHeader: FolderHeader;
  onListHeaderClick: (taskListId: string) => void;
};

export default function FolderHeaderItem({ folderHeader: { id }, onListHeaderClick }: Props) {
  const folderMap = useSelector(selectFolderMap);
  const folder = folderMap[id];

  return (
    <BaseHeaderItem
      icon={{ Icon: IoFolderOpenOutline, size: 16 }}
      title={folder.title}
      onClick={() => {}}
    />
  );
}
