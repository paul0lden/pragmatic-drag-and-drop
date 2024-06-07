/* eslint-disable @atlaskit/design-system/no-unsafe-design-token-usage */
/** @jsx jsx */

import { css, jsx } from '@emotion/react';

import { token } from '@atlaskit/tokens';

const droppableAreaOverlayStyles = css({
	border: '2px dashed transparent',
	borderRadius: 3,
	transition: 'background-color 300ms ease, border 300ms ease',
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	pointerEvents: 'none',
	boxSizing: 'border-box',
});

const droppableAreaOverlayDraggingFromStyles = {
	default: css({
		background: token('color.background.selected'),
		borderColor: token('color.border.selected'),
	}),
	borderless: css({
		background: token('color.background.selected'),
	}),
	subtle: css({
		background: 'none',
	}),
};

const droppableAreaOverlayDraggingOverStyles = {
	default: css({
		background: token('color.background.selected.hovered'),
	}),
	borderless: css({
		background: token('color.background.selected.hovered'),
	}),
	subtle: css({
		background: token('color.background.accent.blue.subtlest'),
	}),
};

type DroppableAreaOverlayAppearance = 'default' | 'borderless' | 'subtle';

export type DroppableAreaOverlayProps = {
	isDraggingFrom: boolean;
	isDraggingOver: boolean;

	/**
	 * Variants
	 */
	appearance?: DroppableAreaOverlayAppearance;
};

/**
 * Used to draw the blue background and border for pinned fields with
 * `react-beautiful-dnd`
 */
export function DroppableAreaOverlay({
	isDraggingFrom,
	isDraggingOver,
	appearance = 'default',
}: DroppableAreaOverlayProps) {
	return (
		<div
			css={[
				droppableAreaOverlayStyles,
				isDraggingFrom && droppableAreaOverlayDraggingFromStyles[appearance],
				isDraggingOver && droppableAreaOverlayDraggingOverStyles[appearance],
			]}
		/>
	);
}
