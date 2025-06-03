import { selectFolderMap } from '@renderer/stores/tasks/tasks';
import { useState } from 'react';
import { IoFolderOpenOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { FolderHeader } from '../types';
import BaseHeaderItem from './BaseHeaderItem';
import ListHeaderItem from './ListHeaderItem';

type Props = {
  folderHeader: FolderHeader;
  onListHeaderClick: (taskListId: string) => void;
};

export default function FolderHeaderItem({
  folderHeader: { id, lists },
  onListHeaderClick
}: Props) {
  const folderMap = useSelector(selectFolderMap);
  const folder = folderMap[id];

  const [isExpanded, setIsExpanded] = useState(false);

  const onToggleListItems = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <BaseHeaderItem
        icon={{ Icon: IoFolderOpenOutline, size: 16 }}
        title={folder.title}
        onClick={onToggleListItems}
      />
      {isExpanded && (
        <div className="pl-3">
          {lists.map((list) => (
            <ListHeaderItem key={list.id} listHeader={list} onListHeaderClick={onListHeaderClick} />
          ))}
        </div>
      )}
    </>
  );
}
