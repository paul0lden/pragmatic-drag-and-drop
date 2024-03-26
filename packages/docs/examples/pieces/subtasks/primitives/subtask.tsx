/* eslint-disable @atlaskit/design-system/no-unsafe-design-token-usage */
/** @jsx jsx */
import { forwardRef, HTMLAttributes, ReactNode } from 'react';

import { css, jsx, SerializedStyles } from '@emotion/react';

import Avatar from '@atlaskit/avatar';
import Badge from '@atlaskit/badge';
import Lozenge from '@atlaskit/lozenge';
import { token } from '@atlaskit/tokens';

import SubtaskIcon from './subtask-icon';

const subtaskStyles = css({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  gap: 12,
  alignItems: 'center',

  background: token('color.background.neutral.subtle'),

  height: 40,
  padding: '0px 8px',

  borderBottom: `1px solid transparent`,
});

const subtaskNotLastItemStyles = css({
  ':not(:last-child)': {
    borderColor: token('color.border'),
  },
});

const subtaskIdStyles = css({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '16px',
});

const subtaskGroupStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

function SubtaskGroup({ children }: { children: ReactNode }) {
  return <div css={subtaskGroupStyles}>{children}</div>;
}

const subtaskLabelStyles = css({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  color: token('color.text'),
  ':hover': {
    color: token('color.text'),
  },
});

export type SubtaskAppearance = 'default' | 'overlay' | 'disabled';

const subtaskAppearanceStyles: Record<SubtaskAppearance, SerializedStyles> = {
  default: css({
    '--subtask-hover': 0,
    ':hover': {
      background: token('color.background.neutral.subtle.hovered'),
      '--subtask-drag-handle-icon-display': 'inline-flex',
      '--subtask-hover': 1,
    },
  }),
  overlay: css({
    background: token('elevation.surface.overlay'),
    boxShadow: token('elevation.shadow.overlay'),
    borderRadius: 3,
  }),
  disabled: css({
    /**
     * Using disabled color tokens is recommended,
     * but does not work for well for images or other
     * components we cannot override.
     */
    opacity: 0.4,
  }),
};

export type SubtaskProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  title: string;
  isLastItem?: boolean;
  appearance?: SubtaskAppearance;
  elemAfter?: ReactNode;
  isIconHidden?: boolean;
};

export const Subtask = forwardRef<HTMLDivElement, SubtaskProps>(
  function Subtask(
    {
      id,
      title,
      appearance = 'default',
      isLastItem = false,
      children,
      elemAfter,
      isIconHidden = false,
      ...props
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        css={[
          subtaskStyles,
          subtaskAppearanceStyles[appearance],
          !isLastItem && subtaskNotLastItemStyles,
        ]}
        {...props}
      >
        {children}
        <SubtaskGroup>
          <SubtaskIcon isIconHidden={isIconHidden} />
          <a css={subtaskIdStyles} href="#" draggable={false}>
            {id}
          </a>
        </SubtaskGroup>
        <a css={subtaskLabelStyles} href="#" draggable={false}>
          {title}
        </a>
        <SubtaskGroup>
          <Badge>{1}</Badge>
          <Avatar size="small" />
          <Lozenge appearance="default">Todo</Lozenge>
          {elemAfter}
        </SubtaskGroup>
      </div>
    );
  },
);
