import React, { useState } from 'react';

import { H5, MenuItem, Switch } from '@blueprintjs/core';
import { Example, IExampleProps } from '@blueprintjs/docs-theme';

import { IFilm, TOP_100_FILMS } from '../../components/common/films';
import FilmSelect from '../../components/common/filmSelect';

import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';

export interface ISelectExampleState {
    allowCreate: boolean;
    createFirst: boolean;
    createdItems: IFilm[];
    disableItems: boolean;
    disabled: boolean;
    fill: boolean;
    filterable: boolean;
    hasInitialContent: boolean;
    matchTargetWidth: boolean;
    minimal: boolean;
    resetOnClose: boolean;
    resetOnQuery: boolean;
    resetOnSelect: boolean;
}

export default function SelectExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<ISelectExampleState>({
        allowCreate: false,
        createFirst: false,
        createdItems: [],
        disableItems: false,
        disabled: false,
        fill: false,
        filterable: true,
        hasInitialContent: false,
        matchTargetWidth: false,
        minimal: false,
        resetOnClose: false,
        resetOnQuery: true,
        resetOnSelect: false,
    });

    const handleSwitchChange = (prop: keyof ISelectExampleState) => {
        return (event: React.FormEvent<HTMLInputElement>) => {
            const checked = event.currentTarget.checked;
            setState((state) => ({ ...state, [prop]: checked }));
        };
    };

    const handleAllowCreateChange = handleSwitchChange('allowCreate');

    const handleCreateFirstChange = handleSwitchChange('createFirst');

    const handleDisabledChange = handleSwitchChange('disabled');

    const handleFillChange = handleSwitchChange('fill');

    const handleFilterableChange = handleSwitchChange('filterable');

    const handleInitialContentChange = handleSwitchChange('hasInitialContent');

    const handleItemDisabledChange = handleSwitchChange('disableItems');

    const handleMatchTargetWidthChange = handleSwitchChange('matchTargetWidth');

    const handleMinimalChange = handleSwitchChange('minimal');

    const handleResetOnCloseChange = handleSwitchChange('resetOnClose');

    const handleResetOnQueryChange = handleSwitchChange('resetOnQuery');

    const handleResetOnSelectChange = handleSwitchChange('resetOnSelect');

    const isItemDisabled = (film: IFilm) => state.disableItems && film.year < 2000;

    const options = (
        <>
            <H5>Props</H5>
            <Switch label="Filterable" checked={state.filterable} onChange={handleFilterableChange} />
            <Switch label="Reset on close" checked={state.resetOnClose} onChange={handleResetOnCloseChange} />
            <Switch label="Reset on query" checked={state.resetOnQuery} onChange={handleResetOnQueryChange} />
            <Switch label="Reset on select" checked={state.resetOnSelect} onChange={handleResetOnSelectChange} />
            <Switch
                label="Use initial content"
                checked={state.hasInitialContent}
                onChange={handleInitialContentChange}
            />
            <Switch
                label="Disable films before 2000"
                checked={state.disableItems}
                onChange={handleItemDisabledChange}
            />
            <Switch label="Allow creating new items" checked={state.allowCreate} onChange={handleAllowCreateChange} />
            <Switch
                label="Create new position: first"
                disabled={!state.allowCreate}
                checked={state.createFirst}
                onChange={handleCreateFirstChange}
            />
            <H5>Appearance props</H5>
            <Switch label="Disabled" checked={state.disabled} onChange={handleDisabledChange} />
            <Switch label="Fill container width" checked={state.fill} onChange={handleFillChange} />
            <H5>Popover props</H5>
            <Switch
                label="Match target width"
                checked={state.matchTargetWidth}
                onChange={handleMatchTargetWidthChange}
            />
            <Switch label="Minimal popover style" checked={state.minimal} onChange={handleMinimalChange} />
        </>
    );

    const initialContent = state.hasInitialContent ? (
        <MenuItem disabled={true} text={`${TOP_100_FILMS.length} items loaded.`} roleStructure="listoption" />
    ) : undefined;

    return (
        <Example options={options} {...IExampleProps}>
            <FilmSelect
                allowCreate={state.allowCreate}
                createNewItemPosition={state.createFirst ? 'first' : 'last'}
                disabled={state.disabled}
                itemDisabled={isItemDisabled}
                initialContent={initialContent}
            />
        </Example>
    );
}
