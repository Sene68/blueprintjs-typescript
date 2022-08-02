import React, { useState } from "react";

import { Button, Card, Classes, Elevation, H5, Label, Slider, Switch } from "@blueprintjs/core";
import { Example, IExampleProps } from "@blueprintjs/docs-theme";
import '@blueprintjs/core/lib/css/blueprint.css';

export interface ICardExampleState {
    elevation: Elevation;
    interactive: boolean;
}

export default function CardExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<ICardExampleState>({
        elevation: 0,
        interactive: false
    });

    const handleElevationChange = (elevation: Elevation) => {
        setState({
            ...state,
            elevation: elevation
        }); 
    };

    const handleInteractiveChange = () => {
        setState({
            ...state,
            interactive: !state.interactive
        }); 
    };

    const options = (
        <>
            <H5>Props</H5>
            <Switch checked={state.interactive} label="Interactive" onChange={handleInteractiveChange} />
            <Label>
                Elevation
                <Slider
                    max={4}
                    showTrackFill={false}
                    value={state.elevation}
                    onChange={handleElevationChange}
                    handleHtmlProps={{ "aria-label": "card elevation" }}
                />
            </Label>
        </>
    );

    return (
        <Example options={options}>
            <Card {...state}>
                <H5>
                    <a href="#">Analytical applications</a>
                </H5>
                <p>
                    User interfaces that enable people to interact smoothly with data, ask better questions, and
                    make better decisions.
                </p>
                <Button text="Explore products" className={Classes.BUTTON} />
            </Card>
        </Example>
    );
}