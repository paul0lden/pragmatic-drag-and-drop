/* eslint-disable @atlaskit/design-system/no-unsafe-design-token-usage */
/** @jsx jsx */
import { forwardRef, type HTMLAttributes, memo, type ReactNode, type Ref } from 'react';

import { css, jsx, type SerializedStyles } from '@emotion/react';

import DragHandlerIcon from '@atlaskit/icon/glyph/drag-handler';
import Lozenge from '@atlaskit/lozenge';
import { token } from '@atlaskit/tokens';

import { type DragState } from '../../../hooks/use-sortable-field';

const subtaskStyles = css({
  background: 'transparent',
  position: 'relative',
  boxSizing: 'border-box',
  paddingLeft: 24,
});

const subtaskInnerStyles = css({
  display: 'grid',
  height: '100%',
  gridTemplateColumns: 'repeat(3, 1fr)',
  alignItems: 'center',
  justifyItems: 'start',
  borderBottom: `1px solid ${token('color.border')}`,
  position: 'relative',
});

export type SubtaskAppearance = 'default' | 'overlay' | 'disabled';

const subtaskAppearanceStyles: Record<SubtaskAppearance, SerializedStyles> = {
  default: css({}),
  overlay: css({
    /**
     * Weirdly Linear appears to apply extra opacity for the preview
     */
    opacity: 0.4,
  }),
  disabled: css({}),
};

const dragHandleStyles = css({
  position: 'absolute',
  left: -4,
  top: 2,
});

const dragHandleButtonStyles = css({
  border: 'none',
  padding: '4px 0px',
  borderRadius: 3,
  background: token('color.background.neutral.subtle'),
  cursor: 'pointer',
  ':hover': {
    background: token('color.background.neutral.subtle.hovered'),
  },
});

export type SubtaskProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  title: string;
  appearance?: SubtaskAppearance;
  isHovering?: boolean;
  dragHandleRef?: Ref<HTMLDivElement>;
  dragState: DragState;
};

const cellStyles = css({
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  height: '100%',
  boxSizing: 'border-box',
  ':not(:first-of-type)': {
    borderLeft: `1px solid ${token('color.border')}`,
  },
});

function Cell({ children }: { children: ReactNode }) {
  return <div css={cellStyles}>{children}</div>;
}

const DragHandle = memo(
  forwardRef<HTMLDivElement>(function DragHandle({}, ref) {
    return (
      <span ref={ref} css={dragHandleStyles}>
        <button css={dragHandleButtonStyles}>
          <DragHandlerIcon label="drag handle" />
        </button>
      </span>
    );
  }),
);

export const Subtask = forwardRef<HTMLDivElement, SubtaskProps>(
  function Subtask(
    {
      id,
      title,
      appearance = 'default',
      isHovering = false,
      children,
      dragHandleRef,
      dragState,
      ...props
    },
    ref,
  ) {
    return (
      <div ref={ref} css={[subtaskStyles]} {...props}>
        <div css={[subtaskInnerStyles, subtaskAppearanceStyles[appearance]]}>
          <Cell>
            <span style={{ fontWeight: 500 }}>{title}</span>
          </Cell>
          <Cell>June 14, 2023 3:48 PM</Cell>
          <Cell>
            <Lozenge appearance="inprogress">In progress</Lozenge>
          </Cell>
          {children}
        </div>
        {dragState === 'idle' && isHovering && (
          <DragHandle ref={dragHandleRef} />
        )}
      </div>
    );
  },
);
