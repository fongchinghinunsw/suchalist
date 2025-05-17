import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../tasks';

export default function reorderTopLevelResources(
  state: TasksState,
  action: PayloadAction<{
    from: number;
    to: number;
  }>,
) {
  const {from, to} = action.payload;

  if (from === to) {
    return;
  }

  const [movedHeader] = state.headers.splice(from, 1);
  state.headers.splice(to, 0, movedHeader);

  store(state, from, to);
}

function store(state: TasksState, from: number, to: number) {
  const [movedResource] = state.resources.splice(from, 1);
  state.resources.splice(to, 0, movedResource);
}
