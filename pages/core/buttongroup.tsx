import React, { useState } from "react";

import { Alignment, AnchorButton, Button, ButtonGroup, Classes, H5, Icon, Intent, Switch } from "@blueprintjs/core";
import { Example, handleBooleanChange, handleValueChange, IExampleProps } from "@blueprintjs/docs-theme";
import { Tooltip2 } from "@blueprintjs/popover2";

import AlignmentSelect from "../../components/common/alignmentSelect";
import { IntentSelect } from "../../components/common/intentSelect";
import '@blueprintjs/core/lib/css/blueprint.css';

export interface IButtonGroupExampleState {
    alignText: Alignment;
    fill: boolean;
    intent: Intent;
    minimal: boolean;
    large: boolean;
    vertical: boolean;
}

export default function ButtonGroupExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<IButtonGroupExampleState>({
        alignText: Alignment.CENTER,
        fill: false,
        intent: Intent.NONE,
        large: false,
        minimal: false,
        vertical: false,
    });

    const [iconOnly, setIconOnly] = useState<boolean>(false);

    const handleFillChange = () => {
        setState({
            ...state,
            fill: !state.fill
        }); 
    };

    const handleIconOnlyChange = () => {
        setIconOnly(!iconOnly);
    };

    const handleIntentChange = handleValueChange((intent: Intent) => setState({
        ...state,
        intent: intent
    }));

    const handleLargeChange = () => {
        setState({
            ...state,
            large: !state.large
        }); 
    };

    const handleMinimalChange = () => {
        setState({
            ...state,
            minimal: !state.minimal
        }); 
    };

    const handleVerticalChange = () => {
        setState({
            ...state,
            vertical: !state.vertical
        }); 
    };

    const handleAlignChange = (alignText: Alignment) => {
        setState({
            ...state,
            alignText: alignText
        }); 
    };

    const intentLabelInfo = (
        <Tooltip2
            content={
                <span className={Classes.TEXT_SMALL}>
                    Intents are set individually on each button <br />
                    in the group, not the ButtonGroup wrapper.
                </span>
            }
            placement="top"
            minimal={true}
        >
            <span>
                Intent{" "}
                <span style={{ padding: 2, lineHeight: "16px", verticalAlign: "top" }}>
                    <Icon className={Classes.TEXT_MUTED} icon="info-sign" size={12} />
                </span>
            </span>
        </Tooltip2>
    );
    const options = (
        <>
            <H5>Props</H5>
            <Switch checked={state.fill} label="Fill" onChange={handleFillChange} />
            <Switch checked={state.large} label="Large" onChange={handleLargeChange} />
            <Switch checked={state.minimal} label="Minimal" onChange={handleMinimalChange} />
            <Switch checked={state.vertical} label="Vertical" onChange={handleVerticalChange} />
            <IntentSelect intent={state.intent} label={intentLabelInfo} onChange={handleIntentChange} />
            <AlignmentSelect align={state.alignText} onChange={handleAlignChange} />
            <H5>Example</H5>
            <Switch checked={iconOnly} label="Icons only" onChange={handleIconOnlyChange} />
        </>
    );

    return (
        <Example options={options}>
            {/* set `minWidth` so `alignText` will have an effect when vertical */}
            <ButtonGroup style={{ minWidth: 200 }} {...state}>
                <Button intent={state.intent} icon="database" text={iconOnly ? undefined : "Queries"} />
                <Button intent={state.intent} icon="function" text={iconOnly ? undefined : "Functions"} />
                <AnchorButton
                    intent={state.intent}
                    icon="cog"
                    rightIcon="settings"
                    text={iconOnly ? undefined : "Options"}
                />
            </ButtonGroup>
        </Example>
    );
}