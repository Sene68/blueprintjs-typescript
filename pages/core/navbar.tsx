import React, { useState } from 'react';

import {
    Alignment,
    Button,
    Classes,
    H5,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Switch,
} from '@blueprintjs/core';
import { Example, handleBooleanChange, IExampleProps } from '@blueprintjs/docs-theme';

import '@blueprintjs/core/lib/css/blueprint.css';

export interface INavbarExampleState {
    alignRight: boolean;
}

export default function NavbarExample(IExampleProps: IExampleProps) {
    const [alignRight, setAlignRight] = useState<boolean>(false);

    const handleAlignRightChange = handleBooleanChange((alignRight: boolean) => setAlignRight(alignRight));

    const options = (
        <>
            <H5>Props</H5>
            <Switch checked={alignRight} label="Align right" onChange={handleAlignRightChange} />
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <Navbar>
                <NavbarGroup align={alignRight ? Alignment.RIGHT : Alignment.LEFT}>
                    <NavbarHeading>Blueprint</NavbarHeading>
                    <NavbarDivider />
                    <Button className={Classes.MINIMAL} icon="home" text="Home" />
                    <Button className={Classes.MINIMAL} icon="document" text="Files" />
                </NavbarGroup>
            </Navbar>
        </Example>
    );
}
