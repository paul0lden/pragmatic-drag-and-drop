/* eslint-disable @atlaskit/design-system/no-unsafe-design-token-usage */
/** @jsx jsx */
import { forwardRef } from 'react';

import { css, jsx } from '@emotion/react';

import DropdownMenu, {
  CustomTriggerProps,
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import FocusRing from '@atlaskit/focus-ring';
import { token } from '@atlaskit/tokens';

import type { DragState } from '../../hooks/use-sortable-field';

import SubtaskDraggableIcon from './subtask-draggable-icon';

const dragHandleStyles = css({
  border: 'none',
  padding: 0,
  borderRadius: 3,
  overflow: 'hidden',
  cursor: 'grab',
});

const dragHandleIdleStyles = css({
  ':focus-visible': {
    opacity: 1,
  },
});

const dragHandleHiddenStyles = css({
  opacity: 0,
});

/**
 * Because we're overlaying the subtask object icon we need to recreate a
 * surface behind our drag handle so we don't see the subtask icon.
 */
const dragHandleSurfaceStyles = css({
  background: token('elevation.surface'),
  position: 'absolute',
  top: 8,
  left: 4,
  width: 24,
  height: 24,
});

const dragHandleEmulatedSubtaskBackgroundStyles = css({
  background: token('color.background.neutral'),
  width: '100%',
  height: '100%',
});

const dragHandleInnerStyles = css({
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  padding: 4,
  background: token('color.background.neutral'),
  ':hover, :focus': {
    background: token('color.background.neutral.hovered'),
  },
  ':active': {
    background: token('color.background.neutral.pressed'),
  },
});

const dragHandleInnerSelectedStyles = css({
  color: token('color.text.selected'),
  background: token('color.background.selected'),
  ':hover, :focus, :active': {
    background: token('color.background.selected'),
  },
});

type SubtaskDragHandleProps = {
  isHovering?: boolean;
  dragState: DragState;
};

function SubtaskDragHandleTrigger({
  triggerRef,
  isIdle,
  isHovering,
  isSelected,
  ...triggerProps
}: CustomTriggerProps<HTMLButtonElement> & {
  isIdle: boolean;
  isHovering: boolean;
}) {
  return (
    <FocusRing>
      <button
        ref={triggerRef}
        {...triggerProps}
        css={[
          dragHandleStyles,
          isIdle && dragHandleIdleStyles,
          !isHovering && !isSelected && dragHandleHiddenStyles,
          dragHandleSurfaceStyles,
        ]}
      >
        <div css={dragHandleEmulatedSubtaskBackgroundStyles}>
          <div
            css={[
              dragHandleInnerStyles,
              isSelected && dragHandleInnerSelectedStyles,
            ]}
          >
            <SubtaskDraggableIcon />
          </div>
        </div>
      </button>
    </FocusRing>
  );
}

export const SubtaskDragHandle = forwardRef<
  HTMLButtonElement,
  SubtaskDragHandleProps
>(function SubtaskDragHandle({ isHovering = false, dragState }, ref) {
  return (
    <DropdownMenu<HTMLButtonElement>
      trigger={triggerProps => (
        <SubtaskDragHandleTrigger
          {...triggerProps}
          isHovering={isHovering}
          isIdle={dragState === 'idle'}
        />
      )}
    >
      <DropdownItemGroup>
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem>Share</DropdownItem>
        <DropdownItem>Move</DropdownItem>
        <DropdownItem>Clone</DropdownItem>
        <DropdownItem>Delete</DropdownItem>
        <DropdownItem>Report</DropdownItem>
      </DropdownItemGroup>
    </DropdownMenu>
  );
});
