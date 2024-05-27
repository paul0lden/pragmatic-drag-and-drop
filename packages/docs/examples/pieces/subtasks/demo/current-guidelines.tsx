/* eslint-disable @atlaskit/design-system/no-unsafe-design-token-usage */
/** @jsx jsx */
import { useRef } from 'react';

import { css, jsx } from '@emotion/react';

import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';

import { type DragState, useSortableField } from '../../hooks/use-sortable-field';
import { useTopLevelWiring } from '../../hooks/use-top-level-wiring';
import { initialData } from '../data';
import {
  Subtask,
  type SubtaskAppearance,
  type SubtaskProps,
} from '../primitives/subtask';
import { SubtaskContainer } from '../primitives/subtask-container';

const type = 'subtasks--current-guidelines';

type DraggableSubtaskProps = SubtaskProps & {
  index: number;
};

const draggableSubtaskStyles = css({ cursor: 'grab', position: 'relative' });

const stateToAppearanceMap: Record<DragState, SubtaskAppearance> = {
  idle: 'default',
  preview: 'overlay',
  dragging: 'disabled',
};

function DraggableSubtask({
  index,
  id,
  ...subtaskProps
}: DraggableSubtaskProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { dragState, closestEdge } = useSortableField({
    id,
    index,
    type,
    ref,
  });

  return (
    <Subtask
      ref={ref}
      {...subtaskProps}
      id={id}
      appearance={stateToAppearanceMap[dragState]}
      css={draggableSubtaskStyles}
    >
      {closestEdge && <DropIndicator edge={closestEdge} gap="1px" />}
    </Subtask>
  );
}

export default function SubtaskCurrentGuidelines() {
  const { data } = useTopLevelWiring({ initialData, type });

  return (
    <SubtaskContainer>
      {data.map((item, index) => (
        <DraggableSubtask
          key={item.id}
          id={item.id}
          title={item.title}
          index={index}
        />
      ))}
    </SubtaskContainer>
  );
}
