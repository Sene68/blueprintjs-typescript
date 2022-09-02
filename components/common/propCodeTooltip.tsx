import * as React from 'react';

import { Code } from '@blueprintjs/core';
import { Tooltip2, Tooltip2Props } from '@blueprintjs/popover2';

/**
 * Opinionated subset of tooltip props.
 * Specify content or snippet, but not both.
 */
export interface PropCodeTooltipProps
    extends Omit<Tooltip2Props, 'content' | 'snippet' | 'placement' | 'interactionKind'> {
    content?: JSX.Element;
    snippet?: string;
}

/**
 * An explanatory tooltip for a component prop control rendered inside the options
 * of a @blueprintjs/docs-theme `<Example>`. This component will render its provided `props.snippet`
 * inside a `<Code>` element as the tooltip content.
 */
export const PropCodeTooltip: React.FC<PropCodeTooltipProps> = ({ snippet, ...props }) => {
    return <Tooltip2 content={<Code>{snippet}</Code>} {...props} placement="left" interactionKind="hover" />;
};
