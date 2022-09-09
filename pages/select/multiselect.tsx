import React, { useState } from 'react';

import { Code, H5, MenuItem, Switch } from '@blueprintjs/core';
import { Example, IExampleProps } from '@blueprintjs/docs-theme';
import { Popover2 } from '@blueprintjs/popover2';
import { ItemRenderer, MultiSelect2 } from '@blueprintjs/select';

import {
    areFilmsEqual,
    arrayContainsFilm,
    createFilm,
    filterFilm,
    getFilmItemProps,
    IFilm,
    maybeAddCreatedFilmToArrays,
    maybeDeleteCreatedFilmFromArrays,
    renderCreateFilmOption,
    TOP_100_FILMS,
} from '../../components/common/films';
import { PropCodeTooltip } from '../../components/common/propCodeTooltip';

import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';

const FilmMultiSelect = MultiSelect2.ofType<IFilm>();

export interface IMultiSelectExampleState {
    allowCreate: boolean;
    createdItems: IFilm[];
    disabled: boolean;
    fill: boolean;
    films: IFilm[];
    hasInitialContent: boolean;
    intent: boolean;
    items: IFilm[];
    matchTargetWidth: boolean;
    openOnKeyDown: boolean;
    popoverMinimal: boolean;
    resetOnSelect: boolean;
    showClearButton: boolean;
    tagMinimal: boolean;
}

export default function MultiSelectExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<IMultiSelectExampleState>({
        allowCreate: false,
        createdItems: [],
        disabled: false,
        fill: false,
        films: [],
        hasInitialContent: false,
        intent: false,
        items: TOP_100_FILMS,
        matchTargetWidth: false,
        openOnKeyDown: false,
        popoverMinimal: true,
        resetOnSelect: true,
        showClearButton: true,
        tagMinimal: false,
    });

    const renderTag = (film: IFilm) => film.title;

    const renderFilm: ItemRenderer<IFilm> = (film, props) => {
        if (!props.modifiers.matchesPredicate) {
            return null;
        }

        return (
            <MenuItem
                {...getFilmItemProps(film, props)}
                selected={isFilmSelected(film)}
                shouldDismissPopover={false}
                text={`${film.rank}. ${film.title}`}
            />
        );
    };

    const handleTagRemove = (_tag: React.ReactNode, index: number) => {
        deselectFilm(index);
    };

    const getSelectedFilmIndex = (film: IFilm) => {
        return state.films.indexOf(film);
    };

    const isFilmSelected = (film: IFilm) => {
        return getSelectedFilmIndex(film) !== -1;
    };

    const selectFilm = (film: IFilm) => {
        selectFilms([film]);
    };

    const selectFilms = (filmsToSelect: IFilm[]) => {
        const { createdItems, films, items } = state;

        let nextCreatedItems = createdItems.slice();
        let nextFilms = films.slice();
        let nextItems = items.slice();

        filmsToSelect.forEach((film) => {
            const results = maybeAddCreatedFilmToArrays(nextItems, nextCreatedItems, film);
            nextItems = results.items;
            nextCreatedItems = results.createdItems;
            // Avoid re-creating an item that is already selected (the "Create
            // Item" option will be shown even if it matches an already selected
            // item).
            nextFilms = !arrayContainsFilm(nextFilms, film) ? [...nextFilms, film] : nextFilms;
        });

        setState({
            ...state,
            createdItems: nextCreatedItems,
            films: nextFilms,
            items: nextItems,
        });
    };

    const deselectFilm = (index: number) => {
        const { films } = state;

        const film = films[index];
        const { createdItems: nextCreatedItems, items: nextItems } = maybeDeleteCreatedFilmFromArrays(
            state.items,
            state.createdItems,
            film,
        );

        // Delete the item if the user manually created it.
        setState({
            ...state,
            createdItems: nextCreatedItems,
            films: films.filter((_film, i) => i !== index),
            items: nextItems,
        });
    };

    const handleFilmSelect = (film: IFilm) => {
        if (!isFilmSelected(film)) {
            selectFilm(film);
        } else {
            deselectFilm(getSelectedFilmIndex(film));
        }
    };

    const handleFilmsPaste = (films: IFilm[]) => {
        // On paste, don't bother with deselecting already selected values, just
        // add the new ones.
        selectFilms(films);
    };

    const handleSwitchChange = (prop: keyof IMultiSelectExampleState) => {
        return (event: React.FormEvent<HTMLInputElement>) => {
            const checked = event.currentTarget.checked;
            setState((state) => ({ ...state, [prop]: checked }));
        };
    };

    const handleClear = () => {
        setState({ ...state, films: [] });
    };

    const popoverRef: React.RefObject<Popover2<any>> = React.createRef();

    const handleAllowCreateChange = handleSwitchChange('allowCreate');

    const handleDisabledChange = handleSwitchChange('disabled');

    const handleFillChange = handleSwitchChange('fill');

    const handleInitialContentChange = handleSwitchChange('hasInitialContent');

    const handleIntentChange = handleSwitchChange('intent');

    const handleKeyDownChange = handleSwitchChange('openOnKeyDown');

    const handleResetChange = handleSwitchChange('resetOnSelect');

    const handleShowClearButtonChange = handleSwitchChange('showClearButton');

    const handleTagMinimalChange = handleSwitchChange('tagMinimal');

    const initialContent = state.hasInitialContent ? (
        <MenuItem disabled={true} text={`${TOP_100_FILMS.length} items loaded.`} roleStructure="listoption" />
    ) : // explicit undefined (not null) for default behavior (show full list)
    undefined;
    const maybeCreateNewItemFromQuery = state.allowCreate ? createFilm : undefined;
    const maybeCreateNewItemRenderer = state.allowCreate ? renderCreateFilmOption : undefined;

    const options = (
        <>
            <H5>Props</H5>
            <Switch label="Open popover on key down" checked={state.openOnKeyDown} onChange={handleKeyDownChange} />
            <Switch label="Reset query on select" checked={state.resetOnSelect} onChange={handleResetChange} />
            <Switch
                label="Use initial content"
                checked={state.hasInitialContent}
                onChange={handleInitialContentChange}
            />
            <PropCodeTooltip
                content={
                    <>
                        <Code>createNewItemFromQuery</Code> and <Code>createNewItemRenderer</Code> are{' '}
                        {state.allowCreate ? 'defined' : 'undefined'}
                    </>
                }
            >
                <Switch
                    label="Allow creating new films"
                    checked={state.allowCreate}
                    onChange={handleAllowCreateChange}
                />
            </PropCodeTooltip>
            <PropCodeTooltip
                content={
                    <>
                        <Code>onClear</Code> is {state.showClearButton ? 'defined' : 'undefined'}
                    </>
                }
            >
                <Switch
                    label="Show clear button"
                    checked={state.showClearButton}
                    onChange={handleShowClearButtonChange}
                />
            </PropCodeTooltip>
            <H5>Appearance props</H5>
            <PropCodeTooltip snippet={`disabled={${state.disabled.toString()}}`}>
                <Switch label="Disabled" checked={state.disabled} onChange={handleDisabledChange} />
            </PropCodeTooltip>
            <PropCodeTooltip snippet={`fill={${state.fill.toString()}}`}>
                <Switch label="Fill container width" checked={state.fill} onChange={handleFillChange} />
            </PropCodeTooltip>
            <H5>Tag props</H5>
            <Switch label="Minimal tag style" checked={state.tagMinimal} onChange={handleTagMinimalChange} />
            <Switch label="Cycle through tag intents" checked={state.intent} onChange={handleIntentChange} />
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <FilmMultiSelect
                {...state}
                createNewItemFromQuery={maybeCreateNewItemFromQuery}
                createNewItemRenderer={maybeCreateNewItemRenderer}
                initialContent={initialContent}
                itemPredicate={filterFilm}
                itemRenderer={renderFilm}
                items={state.items}
                itemsEqual={areFilmsEqual}
                menuProps={{ 'aria-label': 'films' }}
                noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
                onClear={state.showClearButton ? handleClear : undefined}
                onItemSelect={handleFilmSelect}
                onItemsPaste={handleFilmsPaste}
                popoverRef={popoverRef}
                tagRenderer={renderTag}
                selectedItems={state.films}
                tagInputProps={{
                    onRemove: handleTagRemove,
                }}
            />
        </Example>
    );
}
