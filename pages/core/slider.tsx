import React, { useState } from "react";

import { H5, Slider, Switch } from "@blueprintjs/core";
import { Example, handleBooleanChange, IExampleProps } from "@blueprintjs/docs-theme";

import '@blueprintjs/core/lib/css/blueprint.css';

export interface ISliderExampleState {
    value1?: number;
    value2?: number;
    value3?: number;
    vertical?: boolean;
}

export default function SliderExample(IExampleProps: IExampleProps){
    const [state, setState] = useState<ISliderExampleState>({
        value1: 0,
        value2: 2.5,
        value3: 30,
        vertical: false,
    });

    const toggleVertical = handleBooleanChange((vertical: boolean) => setState({ 
        ...state,
        vertical: vertical
    }));

    const getChangeHandler = (key: string) => {
        return (value: number) => setState({ 
            ...state,
            [key]: value 
        });
    }

    const renderLabel2 = (val: number) => {
        return `${Math.round(val * 100)}%`;
    };

    const renderLabel3 = (val: number) => {
        return val === 0 ? `£${val}` : `£${val},000`;
    };

    const options = (
        <>
            <H5>Props</H5>
            <Switch checked={state.vertical} label="Vertical" key="vertical" onChange={toggleVertical} />
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <Slider
                min={0}
                max={10}
                stepSize={0.1}
                labelStepSize={10}
                onChange={getChangeHandler("value2")}
                value={state.value2}
                vertical={state.vertical}
                handleHtmlProps={{ "aria-label": "example 1" }}
            />
            <Slider
                min={0}
                max={0.7}
                stepSize={0.01}
                labelStepSize={0.14}
                onChange={getChangeHandler("value1")}
                labelRenderer={renderLabel2}
                value={state.value1}
                vertical={state.vertical}
                handleHtmlProps={{ "aria-label": "example 2" }}
            />
            <Slider
                min={-12}
                max={48}
                stepSize={6}
                labelStepSize={10}
                onChange={getChangeHandler("value3")}
                labelRenderer={renderLabel3}
                showTrackFill={false}
                value={state.value3}
                vertical={state.vertical}
                handleHtmlProps={{ "aria-label": "example 3" }}
            />
        </Example>
    );
}