import React, { useState } from 'react';

import {
    Button,
    H5,
    Icon,
    IconSize,
    InputGroup,
    Intent,
    Menu,
    MenuItem,
    Spinner,
    Switch,
    Tag,
} from '@blueprintjs/core';
import { Example, IExampleProps, handleBooleanChange, handleStringChange } from '@blueprintjs/docs-theme';
import { Popover2, Tooltip2 } from '@blueprintjs/popover2';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';

export interface IInputGroupExampleState {
    disabled: boolean;
    filterValue: string;
    large: boolean;
    small: boolean;
    showPassword: boolean;
    tagValue: string;
}

export default function InputGroupExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<IInputGroupExampleState>({
        disabled: false,
        filterValue: '',
        large: false,
        showPassword: false,
        small: false,
        tagValue: '',
    });

    const handleDisabledChange = handleBooleanChange((disabled: boolean) =>
        setState({
            ...state,
            disabled: disabled,
        }),
    );

    const handleLargeChange = handleBooleanChange((large: boolean) =>
        setState({
            ...state,
            large,
            ...(large && { small: false }),
        }),
    );

    const handleSmallChange = handleBooleanChange((small: boolean) =>
        setState({
            ...state,
            small,
            ...(small && { large: false }),
        }),
    );

    const handleFilterChange = handleStringChange((filterValue: string) =>
        window.setTimeout(
            () =>
                setState({
                    ...state,
                    filterValue,
                }),
            10,
        ),
    );

    const handleTagChange = handleStringChange((tagValue: string) =>
        setState({
            ...state,
            tagValue: tagValue,
        }),
    );

    const handleLockClick = () =>
        setState({
            ...state,
            showPassword: !state.showPassword,
        });

    const maybeSpinner = state.filterValue ? <Spinner size={IconSize.STANDARD} /> : undefined;

    const options = (
        <>
            <H5>Props</H5>
            <Switch label="Disabled" onChange={handleDisabledChange} checked={state.disabled} />
            <Switch label="Large" onChange={handleLargeChange} checked={state.large} />
            <Switch label="Small" onChange={handleSmallChange} checked={state.small} />
        </>
    );

    const lockButton = (
        <Tooltip2 content={`${state.showPassword ? 'Hide' : 'Show'} Password`} disabled={state.disabled}>
            <Button
                disabled={state.disabled}
                icon={state.showPassword ? 'unlock' : 'lock'}
                intent={Intent.WARNING}
                minimal={true}
                onClick={handleLockClick}
            />
        </Tooltip2>
    );

    const permissionsMenu = (
        <Popover2
            content={
                <Menu>
                    <MenuItem text="can edit" />
                    <MenuItem text="can view" />
                </Menu>
            }
            disabled={state.disabled}
            placement="bottom-end"
        >
            <Button disabled={state.disabled} minimal={true} rightIcon="caret-down">
                can edit
            </Button>
        </Popover2>
    );

    const resultsTag = <Tag minimal={true}>{Math.floor(10000 / Math.max(1, Math.pow(state.tagValue.length, 2)))}</Tag>;

    return (
        <Example options={options} {...IExampleProps}>
            <Tooltip2 content="My input value state is updated asynchronously with a 10ms delay">
                <InputGroup
                    asyncControl={true}
                    disabled={state.disabled}
                    large={state.large}
                    leftIcon="filter"
                    onChange={handleFilterChange}
                    placeholder="Filter histogram..."
                    rightElement={maybeSpinner}
                    small={state.small}
                    value={state.filterValue}
                />
            </Tooltip2>
            <InputGroup
                disabled={state.disabled}
                large={state.large}
                placeholder="Enter your password..."
                rightElement={lockButton}
                small={state.small}
                type={state.showPassword ? 'text' : 'password'}
            />
            <InputGroup
                disabled={state.disabled}
                large={state.large}
                leftElement={<Icon icon="tag" />}
                onChange={handleTagChange}
                placeholder="Find tags"
                rightElement={resultsTag}
                small={state.small}
                value={state.tagValue}
            />
            <InputGroup
                disabled={state.disabled}
                large={state.large}
                placeholder="Add people or groups..."
                rightElement={permissionsMenu}
                small={state.small}
            />
        </Example>
    );
}
