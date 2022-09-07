import React, { useState } from 'react';

import { H5, MenuItem, Switch } from '@blueprintjs/core';
import { Example, IExampleProps } from '@blueprintjs/docs-theme';
import { Suggest2 } from '@blueprintjs/select';

import {
    areFilmsEqual,
    createFilm,
    filterFilm,
    IFilm,
    maybeAddCreatedFilmToArrays,
    maybeDeleteCreatedFilmFromArrays,
    renderCreateFilmOption,
    renderFilm,
    TOP_100_FILMS,
} from '../../components/common/films';

import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';

const FilmSuggest = Suggest2.ofType<IFilm>();

export interface ISuggestExampleState {
    allowCreate: boolean;
    closeOnSelect: boolean;
    createdItems: IFilm[];
    disabled: boolean;
    fill: boolean;
    film: IFilm;
    items: IFilm[];
    matchTargetWidth: boolean;
    minimal: boolean;
    openOnKeyDown: boolean;
    resetOnClose: boolean;
    resetOnQuery: boolean;
    resetOnSelect: boolean;
}

export default function SuggestExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<ISuggestExampleState>({
        allowCreate: false,
        closeOnSelect: true,
        createdItems: [],
        disabled: false,
        fill: false,
        film: TOP_100_FILMS[0],
        items: [...TOP_100_FILMS],
        matchTargetWidth: false,
        minimal: true,
        openOnKeyDown: false,
        resetOnClose: false,
        resetOnQuery: true,
        resetOnSelect: false,
    });

    const renderInputValue = (film: IFilm) => film.title;

    const handleValueChange = (film: IFilm) => {
        // delete the old film from the list if it was newly created
        const { createdItems, items } = maybeDeleteCreatedFilmFromArrays(state.items, state.createdItems, state.film);
        // add the new film to the list if it is newly created
        const { createdItems: nextCreatedItems, items: nextItems } = maybeAddCreatedFilmToArrays(
            items,
            createdItems,
            film,
        );
        setState({ ...state, createdItems: nextCreatedItems, film, items: nextItems });
    };

    const handleSwitchChange = (prop: keyof ISuggestExampleState) => {
        return (event: React.FormEvent<HTMLInputElement>) => {
            const checked = event.currentTarget.checked;
            setState((state) => ({ ...state, [prop]: checked }));
        };
    };

    const handleAllowCreateChange = handleSwitchChange('allowCreate');

    const handleCloseOnSelectChange = handleSwitchChange('closeOnSelect');

    const handleDisabledChange = handleSwitchChange('disabled');

    const handleFillChange = handleSwitchChange('fill');

    const handleOpenOnKeyDownChange = handleSwitchChange('openOnKeyDown');

    const handleResetOnCloseChange = handleSwitchChange('resetOnClose');

    const handleResetOnQueryChange = handleSwitchChange('resetOnQuery');

    const handleResetOnSelectChange = handleSwitchChange('resetOnSelect');

    const maybeCreateNewItemFromQuery = state.allowCreate ? createFilm : undefined;
    const maybeCreateNewItemRenderer = state.allowCreate ? renderCreateFilmOption : undefined;

    const options = (
        <>
            <H5>Props</H5>
            <Switch label="Close on select" checked={state.closeOnSelect} onChange={handleCloseOnSelectChange} />
            <Switch
                label="Open popover on key down"
                checked={state.openOnKeyDown}
                onChange={handleOpenOnKeyDownChange}
            />
            <Switch label="Reset on close" checked={state.resetOnClose} onChange={handleResetOnCloseChange} />
            <Switch label="Reset on query" checked={state.resetOnQuery} onChange={handleResetOnQueryChange} />
            <Switch label="Reset on select" checked={state.resetOnSelect} onChange={handleResetOnSelectChange} />
            <Switch label="Allow creating new items" checked={state.allowCreate} onChange={handleAllowCreateChange} />
            <H5>Appearance props</H5>
            <Switch label="Disabled" checked={state.disabled} onChange={handleDisabledChange} />
            <Switch label="Fill container width" checked={state.fill} onChange={handleFillChange} />
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <FilmSuggest
                {...state}
                createNewItemFromQuery={maybeCreateNewItemFromQuery}
                createNewItemRenderer={maybeCreateNewItemRenderer}
                inputValueRenderer={renderInputValue}
                items={state.items}
                itemsEqual={areFilmsEqual}
                itemPredicate={filterFilm}
                itemRenderer={renderFilm}
                noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
                onItemSelect={handleValueChange}
            />
        </Example>
    );
}
