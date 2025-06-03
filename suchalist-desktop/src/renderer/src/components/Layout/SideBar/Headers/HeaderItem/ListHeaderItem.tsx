import { selectListMap } from '@renderer/stores/tasks/tasks';
import { IoListOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { ListHeader } from '../types';
import BaseHeaderItem from './BaseHeaderItem';

type Props = {
  listHeader: ListHeader;
  onListHeaderClick: (taskListId: string) => void;
};

export default function ListHeaderItem({ listHeader: { id }, onListHeaderClick }: Props) {
  const listMap = useSelector(selectListMap);
  const list = listMap[id];

  return (
    <BaseHeaderItem
      icon={{ Icon: IoListOutline, size: 16 }}
      title={list.title}
      onClick={() => onListHeaderClick(id)}
    />
  );
}
