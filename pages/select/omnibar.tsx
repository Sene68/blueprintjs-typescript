import React, { useState } from 'react';

import { Button, H5, HotkeysTarget2, KeyCombo, MenuItem, Position, Switch, Toaster } from '@blueprintjs/core';
import { Example, IExampleProps, handleBooleanChange } from '@blueprintjs/docs-theme';
import { Omnibar } from '@blueprintjs/select';

import {
    areFilmsEqual,
    createFilm,
    filterFilm,
    IFilm,
    renderCreateFilmOption,
    renderFilm,
    TOP_100_FILMS,
} from '../../components/common/films';

import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';

const FilmOmnibar = Omnibar.ofType<IFilm>();

export interface IOmnibarExampleState {
    allowCreate: boolean;
    isOpen: boolean;
    resetOnSelect: boolean;
}

export default function OmnibarExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<IOmnibarExampleState>({
        allowCreate: false,
        isOpen: false,
        resetOnSelect: true,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleClick = (_event: React.MouseEvent<HTMLElement>) => {
        setState({ ...state, isOpen: true });
    };

    const handleItemSelect = (film: IFilm) => {
        setState({ ...state, isOpen: false });

        toaster.show({
            message: (
                <span>
                    You selected <strong>{film.title}</strong>.
                </span>
            ),
        });
    };

    const handleClose = () => setState({ ...state, isOpen: false });

    const handleToggle = () => setState({ ...state, isOpen: !state.isOpen });

    const handleAllowCreateChange = handleBooleanChange((allowCreate: boolean) => setState({ ...state, allowCreate }));

    const handleResetChange = handleBooleanChange((resetOnSelect: boolean) => setState({ ...state, resetOnSelect }));

    let toaster: Toaster;

    const refHandlers = {
        toaster: (ref: Toaster) => (toaster = ref),
    };

    const maybeCreateNewItemFromQuery = state.allowCreate ? createFilm : undefined;
    const maybeCreateNewItemRenderer = state.allowCreate ? renderCreateFilmOption : undefined;

    const options = (
        <>
            <H5>Props</H5>
            <Switch label="Reset on select" checked={state.resetOnSelect} onChange={handleResetChange} />
            <Switch label="Allow creating new films" checked={state.allowCreate} onChange={handleAllowCreateChange} />
        </>
    );

    return (
        <HotkeysTarget2
            hotkeys={[
                {
                    combo: 'shift + o',
                    global: true,
                    label: 'Show Omnibar',
                    onKeyDown: handleToggle,
                    // prevent typing "O" in omnibar input
                    preventDefault: true,
                },
            ]}
        >
            <Example options={options} {...IExampleProps}>
                <span>
                    <Button text="Click to show Omnibar" onClick={handleClick} />
                    {' or press '}
                    <KeyCombo combo="shift + o" />
                </span>

                <FilmOmnibar
                    {...state}
                    createNewItemFromQuery={maybeCreateNewItemFromQuery}
                    createNewItemRenderer={maybeCreateNewItemRenderer}
                    itemPredicate={filterFilm}
                    itemRenderer={renderFilm}
                    items={TOP_100_FILMS}
                    itemsEqual={areFilmsEqual}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    onClose={handleClose}
                    onItemSelect={handleItemSelect}
                />
                <Toaster position={Position.TOP} ref={refHandlers.toaster} />
            </Example>
        </HotkeysTarget2>
    );
}

// export class OmnibarExample extends React.PureComponent<ExampleProps, IOmnibarExampleState> {
//     public state: IOmnibarExampleState = {
//         allowCreate: false,
//         isOpen: false,
//         resetOnSelect: true,
//     };

//     const handleAllowCreateChange = handleBooleanChange((allowCreate) => setState({ allowCreate }));

//     const handleResetChange = handleBooleanChange((resetOnSelect) => setState({ resetOnSelect }));

//     const toaster: Toaster;

//     const refHandlers = {
//         toaster: (ref: Toaster) => (toaster = ref),
//     };

//     public render() {
//         const { allowCreate } = state;

//         const maybeCreateNewItemFromQuery = allowCreate ? createFilm : undefined;
//         const maybeCreateNewItemRenderer = allowCreate ? renderCreateFilmOption : null;

//         return (
//             <HotkeysTarget2
//                 hotkeys={[
//                     {
//                         combo: 'shift + o',
//                         global: true,
//                         label: 'Show Omnibar',
//                         onKeyDown: handleToggle,
//                         // prevent typing "O" in omnibar input
//                         preventDefault: true,
//                     },
//                 ]}
//             >
//                 <Example options={renderOptions()} {...props}>
//                     <span>
//                         <Button text="Click to show Omnibar" onClick={handleClick} />
//                         {' or press '}
//                         <KeyCombo combo="shift + o" />
//                     </span>

//                     <FilmOmnibar
//                         {...state}
//                         createNewItemFromQuery={maybeCreateNewItemFromQuery}
//                         createNewItemRenderer={maybeCreateNewItemRenderer}
//                         itemPredicate={filterFilm}
//                         itemRenderer={renderFilm}
//                         items={TOP_100_FILMS}
//                         itemsEqual={areFilmsEqual}
//                         noResults={<MenuItem disabled={true} text="No results." />}
//                         onClose={handleClose}
//                         onItemSelect={handleItemSelect}
//                     />
//                     <Toaster position={Position.TOP} ref={refHandlers.toaster} />
//                 </Example>
//             </HotkeysTarget2>
//         );
//     }

//     protected renderOptions() {
//         return (
//             <>
//                 <H5>Props</H5>
//                 <Switch label="Reset on select" checked={state.resetOnSelect} onChange={handleResetChange} />
//                 <Switch
//                     label="Allow creating new films"
//                     checked={state.allowCreate}
//                     onChange={handleAllowCreateChange}
//                 />
//             </>
//         );
//     }

//     const handleClick = (_event: React.MouseEvent<HTMLElement>) => {
//         setState({ isOpen: true });
//     };

//     const handleItemSelect = (film: IFilm) => {
//         setState({ isOpen: false });

//         toaster.show({
//             message: (
//                 <span>
//                     You selected <strong>{film.title}</strong>.
//                 </span>
//             ),
//         });
//     };

//     const handleClose = () => setState({ isOpen: false });

//     const handleToggle = () => setState({ isOpen: !state.isOpen });
// }
