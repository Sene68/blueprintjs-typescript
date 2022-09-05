import * as React from 'react';

import { Button, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, Select2, Select2Props } from '@blueprintjs/select';

import {
    areFilmsEqual,
    createFilm,
    filterFilm,
    getFilmItemProps,
    IFilm,
    maybeAddCreatedFilmToArrays,
    maybeDeleteCreatedFilmFromArrays,
    renderCreateFilmOption,
    TOP_100_FILMS,
} from './films';

const FilmSelect = Select2.ofType<IFilm>();

type Props = Omit<
    Select2Props<IFilm>,
    | 'createNewItemFromQuery'
    | 'createNewItemRenderer'
    | 'itemPredicate'
    | 'itemRenderer'
    | 'items'
    | 'itemsEqual'
    | 'noResults'
    | 'onItemSelect'
> & {
    allowCreate?: boolean;
};

export default function ({ allowCreate = false, fill, ...restProps }: Props) {
    const maybeCreateNewItemFromQuery = allowCreate ? createFilm : undefined;
    const maybeCreateNewItemRenderer = allowCreate ? renderCreateFilmOption : undefined;

    const [items, setItems] = React.useState([...TOP_100_FILMS]);
    const [createdItems, setCreatedItems] = React.useState<IFilm[]>([]);
    const [selectedFilm, setSelectedFilm] = React.useState(TOP_100_FILMS[0]);
    const handleItemSelect = React.useCallback((newFilm: IFilm) => {
        // Delete the old film from the list if it was newly created.
        const step1Result = maybeDeleteCreatedFilmFromArrays(items, createdItems, selectedFilm);
        // Add the new film to the list if it is newly created.
        const step2Result = maybeAddCreatedFilmToArrays(step1Result.items, step1Result.createdItems, newFilm);
        setCreatedItems(step2Result.createdItems);
        setSelectedFilm(newFilm);
        setItems(step2Result.items);
    }, []);

    const itemRenderer = React.useCallback<ItemRenderer<IFilm>>(
        (film, props) => {
            if (!props.modifiers.matchesPredicate) {
                return null;
            }
            return <MenuItem {...getFilmItemProps(film, props)} selected={film === selectedFilm} />;
        },
        [selectedFilm],
    );

    return (
        <FilmSelect
            createNewItemFromQuery={maybeCreateNewItemFromQuery}
            createNewItemRenderer={maybeCreateNewItemRenderer}
            fill={fill}
            itemPredicate={filterFilm}
            itemRenderer={itemRenderer}
            items={items}
            itemsEqual={areFilmsEqual}
            menuProps={{ 'aria-label': 'films' }}
            noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
            onItemSelect={handleItemSelect}
            {...restProps}
        >
            <Button
                disabled={restProps.disabled}
                fill={fill}
                icon="film"
                rightIcon="caret-down"
                text={selectedFilm ? `${selectedFilm.title} (${selectedFilm.year})` : '(No selection)'}
            />
        </FilmSelect>
    );
}
