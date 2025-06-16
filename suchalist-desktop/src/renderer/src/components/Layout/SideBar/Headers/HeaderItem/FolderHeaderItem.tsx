import { selectFolderMap } from '@renderer/stores/tasks/tasks';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  IoChevronBackOutline,
  IoEllipsisHorizontalOutline,
  IoFolderOpenOutline
} from 'react-icons/io5';
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
        rightSection={
          <div className="flex gap-2">
            <IoEllipsisHorizontalOutline />
            <motion.div
              animate={{ rotate: isExpanded ? -90 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <IoChevronBackOutline />
            </motion.div>
          </div>
        }
        onClick={onToggleListItems}
      />
      {isExpanded && (
        <div className="pl-3">
          {lists.map((list) => (
            <ListHeaderItem
              key={list.id}
              listHeader={list}
              hasOption={true}
              onListHeaderClick={onListHeaderClick}
            />
          ))}
        </div>
      )}
    </>
  );
}
