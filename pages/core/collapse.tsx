import React, { useState } from 'react';

import { Button, Collapse, H5, Pre, Switch } from '@blueprintjs/core';
import { Example, handleBooleanChange, IExampleProps } from '@blueprintjs/docs-theme';

import '@blueprintjs/core/lib/css/blueprint.css';

export interface ICollapseExampleState {
    isOpen: boolean;
    keepChildrenMounted: boolean;
}

export default function CollapseExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<ICollapseExampleState>({
        isOpen: false,
        keepChildrenMounted: false,
    });

    const handleChildrenMountedChange = handleBooleanChange((keepChildrenMounted: boolean) =>
        setState({
            ...state,
            keepChildrenMounted: keepChildrenMounted,
        }),
    );

    const handleClick = () => {
        setState({
            ...state,
            isOpen: !state.isOpen,
        });
    };

    const options = (
        <>
            <H5>Props</H5>
            <Switch
                checked={state.keepChildrenMounted}
                label="Keep children mounted"
                onChange={handleChildrenMountedChange}
            />
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <div style={{ width: '100%', height: '100%', margin: 0 }}>
                <Button onClick={handleClick}>{state.isOpen ? 'Hide' : 'Show'} build logs</Button>
                <Collapse isOpen={state.isOpen} keepChildrenMounted={state.keepChildrenMounted}>
                    <Pre>
                        [11:53:30] Finished 'typescript-bundle-blueprint' after 769 ms
                        <br />
                        [11:53:30] Starting 'typescript-typings-blueprint'...
                        <br />
                        [11:53:30] Finished 'typescript-typings-blueprint' after 198 ms
                        <br />
                        [11:53:30] write ./blueprint.css
                        <br />
                        [11:53:30] Finished 'sass-compile-blueprint' after 2.84 s
                    </Pre>
                </Collapse>
            </div>
        </Example>
    );
}
