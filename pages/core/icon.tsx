import React, { useState } from "react";

import { H5, Icon, IconSize, Intent, Label, Slider } from "@blueprintjs/core";
import { Example, handleValueChange, IExampleProps } from "@blueprintjs/docs-theme";
import { IconName } from "@blueprintjs/icons";

import { IconSelect } from "../../components/common/iconSelect";
import { IntentSelect } from "../../components/common/intentSelect";

import '@blueprintjs/core/lib/css/blueprint.css';

export interface IIconExampleState {
    icon?: IconName;
    iconSize: number;
    intent: Intent;
}

export default function IconExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<IIconExampleState>({
        icon: "calendar",
        iconSize: IconSize.STANDARD,
        intent: Intent.NONE,
    });

    const MAX_ICON_SIZE = 100;

    const iconSizeLabelId = "icon-size-label";

    const handleIntentChange = handleValueChange((intent: Intent) => setState({
        ...state,
        intent: intent
    }));

    const handleIconSizeChange = (iconSize: number) => {
        setState({
            ...state,
            iconSize: iconSize
        });
    };

    const handleIconNameChange = (icon?: IconName) => {
        setState({
            ...state,
            icon: icon
        });
    };

    

    const options = (
        <>
            <H5>Props</H5>
            <IconSelect iconName={state.icon} onChange={handleIconNameChange} />
            <IntentSelect intent={state.intent} onChange={handleIntentChange} />
            <Label id={iconSizeLabelId}>Icon size</Label>
            <Slider
                labelStepSize={MAX_ICON_SIZE / 5}
                min={0}
                max={MAX_ICON_SIZE}
                showTrackFill={false}
                value={state.iconSize}
                onChange={handleIconSizeChange}
                handleHtmlProps={{ "aria-labelledby": iconSizeLabelId }}
            />
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <Icon icon={state.icon} size={state.iconSize} intent={state.intent} />
        </Example>
    );
}