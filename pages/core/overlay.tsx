import classNames from 'classnames';
import React, { useState } from 'react';

import { Button, Classes, Code, H3, H5, Intent, Overlay, Switch } from '@blueprintjs/core';
import { Example, IExampleProps, handleBooleanChange } from '@blueprintjs/docs-theme';

import { IBlueprintExampleData } from '../../components/common/types';

import '@blueprintjs/core/lib/css/blueprint.css';

const OVERLAY_EXAMPLE_CLASS = 'docs-overlay-example-transition';
const OVERLAY_TALL_CLASS = 'docs-overlay-example-tall';

export interface IOverlayExampleState {
    autoFocus: boolean;
    canEscapeKeyClose: boolean;
    canOutsideClickClose: boolean;
    enforceFocus: boolean;
    hasBackdrop: boolean;
    isOpen: boolean;
    usePortal: boolean;
    useTallContent: boolean;
}

export default function OverlayExample(IExampleProps: IExampleProps<IBlueprintExampleData>) {
    const [state, setState] = useState<IOverlayExampleState>({
        autoFocus: true,
        canEscapeKeyClose: true,
        canOutsideClickClose: true,
        enforceFocus: true,
        hasBackdrop: true,
        isOpen: false,
        usePortal: true,
        useTallContent: false,
    });

    const handleAutoFocusChange = handleBooleanChange((autoFocus: boolean) =>
        setState({
            ...state,
            autoFocus: autoFocus,
        }),
    );

    const handleBackdropChange = handleBooleanChange((hasBackdrop: boolean) =>
        setState({
            ...state,
            hasBackdrop: hasBackdrop,
        }),
    );

    const handleEnforceFocusChange = handleBooleanChange((enforceFocus: boolean) =>
        setState({ ...state, enforceFocus: enforceFocus }),
    );

    const handleEscapeKeyChange = handleBooleanChange((canEscapeKeyClose: boolean) =>
        setState({ ...state, canEscapeKeyClose: canEscapeKeyClose }),
    );

    const handleUsePortalChange = handleBooleanChange((usePortal: boolean) =>
        setState({ ...state, usePortal: usePortal }),
    );

    const handleOutsideClickChange = handleBooleanChange((val: boolean) =>
        setState({ ...state, canOutsideClickClose: val }),
    );

    const handleOpen = () =>
        setState({
            ...state,
            isOpen: true,
        });

    const handleClose = () =>
        setState({
            ...state,
            isOpen: false,
            useTallContent: false,
        });

    const classes = classNames(
        Classes.CARD,
        Classes.ELEVATION_4,
        OVERLAY_EXAMPLE_CLASS,
        IExampleProps.data?.themeName,
        {
            [OVERLAY_TALL_CLASS]: state.useTallContent,
        },
    );

    const options = (
        <>
            <H5>Props</H5>
            <Switch checked={state.autoFocus} label="Auto focus" onChange={handleAutoFocusChange} />
            <Switch checked={state.enforceFocus} label="Enforce focus" onChange={handleEnforceFocusChange} />
            <Switch checked={state.usePortal} onChange={handleUsePortalChange}>
                Use <Code>Portal</Code>
            </Switch>
            <Switch
                checked={state.canOutsideClickClose}
                label="Click outside to close"
                onChange={handleOutsideClickChange}
            />
            <Switch checked={state.canEscapeKeyClose} label="Escape key to close" onChange={handleEscapeKeyChange} />
            <Switch checked={state.hasBackdrop} label="Has backdrop" onChange={handleBackdropChange} />
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <Button onClick={handleOpen} text="Show overlay" />
            <Overlay onClose={handleClose} className={Classes.OVERLAY_SCROLL_CONTAINER} {...state}>
                <div className={classes}>
                    <H3>I'm an Overlay!</H3>
                    <p>
                        This is a simple container with some inline styles to position it on the screen. Its CSS
                        transitions are customized for this example only to demonstrate how easily custom transitions
                        can be implemented.
                    </p>
                    <p>
                        Click the "Focus button" below to transfer focus to the "Show overlay" trigger button outside of
                        this overlay. If persistent focus is enabled, focus will be constrained to the overlay. Use the{' '}
                        <Code>tab</Code> key to move to the next focusable element to illustrate this effect.
                    </p>
                    <p>
                        Click the "Make me scroll" button below to make this overlay's content really tall, which will
                        make the overlay's container (but not the page) scrollable
                    </p>
                    <br />
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button intent={Intent.DANGER} onClick={handleClose} style={{ margin: '' }}>
                            Close
                        </Button>
                    </div>
                </div>
            </Overlay>
        </Example>
    );
}
