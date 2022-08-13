import React, { useState } from "react";

import { Button, H5, Intent, Switch, Tag } from "@blueprintjs/core";
import { Example, handleBooleanChange, handleValueChange, IExampleProps } from "@blueprintjs/docs-theme";

import { IntentSelect } from "../../components/common/intentSelect";

import '@blueprintjs/core/lib/css/blueprint.css';

export interface ITagExampleState {
    fill: boolean;
    intent: Intent;
    interactive: boolean;
    large: boolean;
    minimal: boolean;
    removable?: boolean;
    round: boolean;
    tags: string[];
}

const INITIAL_TAGS = ["London", "New York", "San Francisco", "Seattle"];

export default function TagExample(IExampleProps: IExampleProps){
    const [state, setState] = useState<ITagExampleState>({
        fill: false,
        intent: Intent.NONE,
        interactive: false,
        large: false,
        minimal: false,
        removable: false,
        round: false,
        tags: INITIAL_TAGS,
    });

    const [icon, setIcon] = useState<boolean>(false);

    const [rightIcon, setRightIcon] = useState<boolean>(false);

    const handleFillChange = handleBooleanChange((fill: boolean) => setState({ 
        ...state,
        fill: fill
     }));

    const handleIconChange = handleBooleanChange((icon: boolean) => setIcon(icon));

    const handleIntentChange = handleValueChange((intent: Intent) => setState({ 
        ...state,
        intent: intent
     }));

    const handleInteractiveChange = handleBooleanChange((interactive: boolean) => setState({ 
        ...state,
        interactive: interactive
     }));

    const handleLargeChange = handleBooleanChange((large: boolean) => setState({ 
        ...state,
        large: large
     }));

    const handleMinimalChange = handleBooleanChange((minimal: boolean) => setState({ 
        ...state,
        minimal: minimal
     }));

    const handleRemovableChange = handleBooleanChange((removable?: boolean) => setState({ 
        ...state,
        removable: removable
     }));

    const handleRightIconChange = handleBooleanChange((rightIcon: boolean) => setRightIcon(rightIcon));

    const handleRoundChange = handleBooleanChange((round: boolean) => setState({ 
        ...state,
        round: round
     }));

    const resetTags = () => setState({ 
        ...state,
        tags: INITIAL_TAGS
     });

    const options = (
        <>
            <H5>Props</H5>
            <Switch label="Fill" checked={state.fill} onChange={handleFillChange} />
            <Switch label="Large" checked={state.large} onChange={handleLargeChange} />
            <Switch label="Minimal" checked={state.minimal} onChange={handleMinimalChange} />
            <Switch label="Interactive" checked={state.interactive} onChange={handleInteractiveChange} />
            <Switch label="Removable" checked={state.removable} onChange={handleRemovableChange} />
            <Switch label="Round" checked={state.round} onChange={handleRoundChange} />
            <Switch label="Left icon" checked={icon} onChange={handleIconChange} />
            <Switch label="Right icon" checked={rightIcon} onChange={handleRightIconChange} />
            <IntentSelect intent={state.intent} onChange={handleIntentChange} />
            <H5>Example</H5>
            <Button icon="refresh" text="Reset tags" onClick={resetTags} />
        </>
    );

    const tagElements = state.tags.map(tag => {
        const onRemove = () => setState({ 
            ...state,
            tags: state.tags.filter(t => t !== tag) 
        });

        return (
            <Tag
                key={tag}
                //onRemove={state.removable && onRemove}
                icon={icon === true ? "home" : undefined}
                rightIcon={rightIcon === true ? "map" : undefined}
                {...state}
            >
                {tag}
            </Tag>
        );
    });
    return (
        <Example options={options} {...IExampleProps}>
            {tagElements}
        </Example>
    );
}
