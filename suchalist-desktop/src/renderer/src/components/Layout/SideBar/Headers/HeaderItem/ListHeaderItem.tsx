import IconButton from '@renderer/components/base/IconButton';
import Menu, { MenuOption } from '@renderer/components/base/Menu';
import DeleteListModal from '@renderer/components/modal/DeleteListModal/DeleteListModal';
import RenameListModal from '@renderer/components/modal/RenameListModal/RenameListModal';
import { selectListMap, tasksActions } from '@renderer/stores/tasks/tasks';
import { useState } from 'react';
import {
  IoCreateOutline,
  IoEllipsisHorizontalOutline,
  IoListOutline,
  IoTrashOutline
} from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { ListHeader } from '../types';
import BaseHeaderItem from './BaseHeaderItem';

type Props = {
  listHeader: ListHeader;
  hasOption: boolean;
  onListHeaderClick: (taskListId: string) => void;
};

export default function ListHeaderItem({
  listHeader: { id },
  hasOption,
  onListHeaderClick
}: Props) {
  const dispatch = useDispatch();
  const listMap = useSelector(selectListMap);
  const list = listMap[id];

  const [isRenameListModalVisible, setIsRenameListModalVisible] = useState(false);
  const [isDeleteListModalVisible, setIsDeleteListModalVisible] = useState(false);

  const toggleRenameListModal = () => {
    setIsRenameListModalVisible(!isRenameListModalVisible);
  };

  const toggleDeleteListModal = () => {
    setIsDeleteListModalVisible(!isDeleteListModalVisible);
  };

  const onRenameList = (newTitle: string) => {
    dispatch(tasksActions.renameList({ list, newTitle }));
    toggleRenameListModal();
  };

  const onDeleteList = () => {
    dispatch(tasksActions.deleteList(id));
  };

  const menuOptions: MenuOption[] = [];
  if (hasOption) {
    menuOptions.push({
      title: 'Rename List',
      Icon: () => <IoCreateOutline />,
      onClick: toggleRenameListModal
    });

    menuOptions.push({
      title: 'Delete List',
      Icon: () => <IoTrashOutline className="text-red-500" />,
      onClick: toggleDeleteListModal
    });
  }

  return (
    <>
      <BaseHeaderItem
        icon={{ Icon: IoListOutline, size: 16 }}
        title={list.title}
        onClick={() => onListHeaderClick(id)}
        rightSection={
          menuOptions.length > 0 && (
            <Menu
              Button={() => <IconButton Icon={IoEllipsisHorizontalOutline} size={16} />}
              options={menuOptions}
              anchor="bottom start"
            />
          )
        }
      />
      <RenameListModal
        defaultTitle={list.title}
        isOpen={isRenameListModalVisible}
        onRenameList={onRenameList}
        onClose={toggleRenameListModal}
      />
      <DeleteListModal
        listName={list.title}
        isOpen={isDeleteListModalVisible}
        onConfirm={onDeleteList}
        onCancel={toggleDeleteListModal}
      />
    </>
  );
}
