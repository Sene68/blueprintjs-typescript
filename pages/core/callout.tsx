import React, { useState } from "react";

import { Callout, Code, H5, Intent, Switch } from "@blueprintjs/core";
import { Example, handleBooleanChange, handleValueChange, IDocsExampleProps } from "@blueprintjs/docs-theme";

import { IntentSelect } from "../../components/common/intentSelect";
import '@blueprintjs/core/lib/css/blueprint.css';

export interface ICalloutExampleState {
    intent: Intent;
    showHeader: boolean;
}

export default function CalloutExample(IDocsExampleProps: IDocsExampleProps) {
    const [state, setState] = useState<ICalloutExampleState>({
        intent: Intent.NONE,
        showHeader: true
    });

    const handleHeaderChange = handleBooleanChange((showHeader: boolean) => setState({
        ...state,
        showHeader: showHeader
    }));

    const handleIntentChange = handleValueChange((intent: Intent) => setState({
        ...state,
        intent: intent
    }));

    const options = (
        <>
            <H5>Props</H5>
            <IntentSelect intent={state.intent} onChange={handleIntentChange} />
            <H5>Example</H5>
            <Switch checked={state.showHeader} label="Show header" onChange={handleHeaderChange} />
        </>
    );

    return (
        <Example options={options}>
            <Callout {...state} title={state.showHeader ? "Visually important content" : undefined}>
                The component is a simple wrapper around the CSS API that provides props for modifiers and optional
                title element. Any additional HTML props will be spread to the rendered <Code>{"<div>"}</Code>{" "}
                element.
            </Callout>
        </Example>
    );
}