import React, { useState } from 'react';

import { Button, H5, Intent, Switch, TagInput, TagProps } from '@blueprintjs/core';
import { Example, IExampleProps, handleBooleanChange, handleValueChange } from '@blueprintjs/docs-theme';

import { IntentSelect } from '../../components/common/intentSelect';

import '@blueprintjs/core/lib/css/blueprint.css';

const INTENTS = [Intent.NONE, Intent.PRIMARY, Intent.SUCCESS, Intent.DANGER, Intent.WARNING];

const VALUES = [
    // supports single JSX elements
    <strong key="al">Albert</strong>,
    // supports JSX "fragments" (don't forget `key` on elements in arrays!)
    ['Bar', <em key="thol">thol</em>, 'omew'],
    // and supports simple strings
    'Casper',
    // falsy values are not rendered and ignored by the keyboard
    undefined,
];

export interface ITagInputExampleState {
    addOnBlur: boolean;
    addOnPaste: boolean;
    disabled: boolean;
    fill: boolean;
    intent: Intent;
    large: boolean;
    leftIcon: boolean;
    tagIntents: boolean;
    tagMinimal: boolean;
    values: React.ReactNode[];
}

export default function TagInputExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<ITagInputExampleState>({
        addOnBlur: false,
        addOnPaste: true,
        disabled: false,
        fill: false,
        intent: 'none',
        large: false,
        leftIcon: true,
        tagIntents: false,
        tagMinimal: false,
        values: VALUES,
    });

    const handleAddOnBlurChange = handleBooleanChange((addOnBlur: boolean) =>
        setState({
            ...state,
            addOnBlur: addOnBlur,
        }),
    );

    const handleAddOnPasteChange = handleBooleanChange((addOnPaste: boolean) =>
        setState({
            ...state,
            addOnPaste: addOnPaste,
        }),
    );

    const handleDisabledChange = handleBooleanChange((disabled: boolean) =>
        setState({
            ...state,
            disabled: disabled,
        }),
    );

    const handleFillChange = handleBooleanChange((fill: boolean) =>
        setState({
            ...state,
            fill: fill,
        }),
    );

    const handleIntentChange = handleValueChange((intent: Intent) =>
        setState({
            ...state,
            intent: intent,
        }),
    );

    const handleLargeChange = handleBooleanChange((large: boolean) =>
        setState({
            ...state,
            large: large,
        }),
    );

    const handleLeftIconChange = handleBooleanChange((leftIcon: boolean) =>
        setState({
            ...state,
            leftIcon: leftIcon,
        }),
    );

    const handleTagIntentsChange = handleBooleanChange((tagIntents: boolean) =>
        setState({
            ...state,
            tagIntents: tagIntents,
        }),
    );

    const handleTagMinimalChange = handleBooleanChange((tagMinimal: boolean) =>
        setState({
            ...state,
            tagMinimal: tagMinimal,
        }),
    );

    const handleChange = (values: React.ReactNode[]) => {
        setState({
            ...state,
            values: values,
        });
    };

    const handleClear = () => handleChange(state.values.length > 0 ? [] : VALUES);

    const clearButton = (
        <Button
            disabled={state.disabled}
            icon={state.values.length > 1 ? 'cross' : 'refresh'}
            minimal={true}
            onClick={handleClear}
        />
    );

    // define a new function every time so switch changes will cause it to re-render
    // NOTE: avoid this pattern in your app (use getTagProps instead); this is only for
    // example purposes!!
    const getTagProps = (_v: React.ReactNode, index: number): TagProps => ({
        intent: state.tagIntents ? INTENTS[index % INTENTS.length] : Intent.NONE,
        large: state.large,
        minimal: state.tagMinimal,
    });

    const options = (
        <>
            <H5>Props</H5>
            <Switch label="Large" checked={state.large} onChange={handleLargeChange} />
            <Switch label="Disabled" checked={state.disabled} onChange={handleDisabledChange} />
            <Switch label="Left icon" checked={state.leftIcon} onChange={handleLeftIconChange} />
            <Switch label="Add on blur" checked={state.addOnBlur} onChange={handleAddOnBlurChange} />
            <Switch label="Add on paste" checked={state.addOnPaste} onChange={handleAddOnPasteChange} />
            <Switch label="Fill container width" checked={state.fill} onChange={handleFillChange} />
            <IntentSelect intent={state.intent} onChange={handleIntentChange} />
            <H5>Tag props</H5>
            <Switch label="Use minimal tags" checked={state.tagMinimal} onChange={handleTagMinimalChange} />
            <Switch label="Cycle through intents" checked={state.tagIntents} onChange={handleTagIntentsChange} />
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <TagInput
                {...state}
                leftIcon={state.leftIcon ? 'user' : undefined}
                onChange={handleChange}
                placeholder="Separate values with commas..."
                rightElement={clearButton}
                tagProps={getTagProps}
                values={state.values}
            />
        </Example>
    );
}
