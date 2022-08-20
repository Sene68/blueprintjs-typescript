import React, { useState } from 'react';

import {
    Button,
    ButtonGroup,
    H5,
    Label,
    NonIdealState,
    NonIdealStateIconSize,
    Spinner,
    Switch,
} from '@blueprintjs/core';
import { Example, handleBooleanChange, IExampleProps } from '@blueprintjs/docs-theme';
import { IconName } from '@blueprintjs/icons';

import { IconSelect } from '../../components/common/iconSelect';
import { Layout, LayoutSelect } from '../../components/common/layoutSelect';
import { Size, SizeSelect } from '../../components/common/sizeSelect';

import '@blueprintjs/core/lib/css/blueprint.css';

const sizeToNonIdealStateIconSize: Record<Size, NonIdealStateIconSize> = {
    large: NonIdealStateIconSize.STANDARD,
    regular: NonIdealStateIconSize.SMALL,
    small: NonIdealStateIconSize.EXTRA_SMALL,
};

const nonIdealStateIconSizeToSize: Record<NonIdealStateIconSize, Size> = Object.fromEntries(
    Object.entries(sizeToNonIdealStateIconSize).map((a) => a.reverse()),
);

const defaultIcon: IconName = 'search';

export interface INonIdealStateExampleState {
    icon?: IconName;
    iconSize: NonIdealStateIconSize;
    layout: Layout;
    showAction: boolean;
    showDescription: boolean;
    showTitle: boolean;
    visual: VisualKind;
}

export default function NonIdealStateExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<INonIdealStateExampleState>({
        icon: defaultIcon,
        iconSize: NonIdealStateIconSize.STANDARD,
        layout: 'vertical',
        showAction: true,
        showDescription: true,
        showTitle: true,
        visual: 'icon',
    });

    const toggleShowAction = handleBooleanChange((showAction: boolean) =>
        setState({
            ...state,
            showAction: showAction,
        }),
    );

    const toggleShowDescription = handleBooleanChange((showDescription: boolean) =>
        setState({
            ...state,
            showDescription: showDescription,
        }),
    );

    const toggleShowTitle = handleBooleanChange((showTitle: boolean) =>
        setState({
            ...state,
            showTitle: showTitle,
        }),
    );

    const handleIconNameChange = (icon?: IconName) =>
        setState({
            ...state,
            icon: icon,
        });

    const handleLayoutChange = (layout: Layout) =>
        setState({
            ...state,
            layout: layout,
        });

    const handleSizeChange = (size: Size) =>
        setState({
            ...state,
            iconSize: sizeToNonIdealStateIconSize[size],
        });

    const handleVisualKindChange = (visual: VisualKind) =>
        setState({
            ...state,
            visual: visual,
        });

    const options = (
        <>
            <H5>Props</H5>
            <LayoutSelect layout={state.layout} onChange={handleLayoutChange} />
            <VisualSelect visual={state.visual} onChange={handleVisualKindChange} />
            <IconSelect disabled={state.visual !== 'icon'} iconName={state.icon} onChange={handleIconNameChange} />
            <SizeSelect
                label="Visual size"
                optionLabels={['XS', 'Small', 'Standard']}
                size={nonIdealStateIconSizeToSize[state.iconSize]}
                onChange={handleSizeChange}
            />
            <Switch label="Show title" checked={state.showTitle} onChange={toggleShowTitle} />
            <Switch label="Show description" checked={state.showDescription} onChange={toggleShowDescription} />
            <Switch label="Show action" checked={state.showAction} onChange={toggleShowAction} />
        </>
    );

    const visual = state.visual === 'icon' ? state.icon : <Spinner size={state.iconSize} />;
    const action = <Button outlined={true} text="New file" icon="plus" intent="primary" />;
    const description = (
        <div>
            Your search didn't match any files.
            <br />
            Try searching for something else, or create a new file.
        </div>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <NonIdealState
                icon={visual}
                iconSize={state.iconSize}
                title={state.showTitle ? 'No search results' : undefined}
                description={state.showDescription ? description : undefined}
                action={state.showAction ? action : undefined}
                layout={state.layout}
            />
        </Example>
    );
}

type VisualKind = 'icon' | 'spinner';

/** Button radio group to switch between icon and spinner visuals. */
const VisualSelect: React.FC<{ visual: VisualKind; onChange: (option: VisualKind) => void }> = ({
    visual,
    onChange,
}) => {
    const handleIcon = React.useCallback(() => onChange('icon'), []);
    const handleSpinner = React.useCallback(() => onChange('spinner'), []);

    return (
        <Label>
            Visual
            <ButtonGroup fill={true} style={{ marginTop: 5 }}>
                <Button active={visual === 'icon'} text="Icon" onClick={handleIcon} />
                <Button active={visual === 'spinner'} text="Spinner" onClick={handleSpinner} />
            </ButtonGroup>
        </Label>
    );
};
