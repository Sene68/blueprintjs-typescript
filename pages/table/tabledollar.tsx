import * as React from 'react';

import { Classes } from '@blueprintjs/core';
import { Example, IExampleProps } from '@blueprintjs/docs-theme';
import { Cell, Column, ColumnHeaderCell2, Table2 } from '@blueprintjs/table';

import '@blueprintjs/table/lib/css/table.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';

export default function TableDollarExample(IExampleProps: IExampleProps) {
    const USD_TO_EURO_CONVERSION = 0.85;

    const renderColumnHeader = (index: number) => {
        const name = ['Dollars', 'Euros'][index]!;
        return <ColumnHeaderCell2 name={name} index={index} nameRenderer={renderName} />;
    };

    const renderName = (name: string) => {
        return (
            <div style={{ lineHeight: '24px' }}>
                <div className={Classes.TEXT_LARGE}>
                    <strong>{name}</strong>
                </div>
                <div className={Classes.MONOSPACE_TEXT}>Number</div>
            </div>
        );
    };

    const dollarCellRenderer = (rowIndex: number) => <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>;
    const euroCellRenderer = (rowIndex: number) => (
        <Cell>{`€${(rowIndex * 10 * USD_TO_EURO_CONVERSION).toFixed(2)}`}</Cell>
    );
    return (
        <Example options={false} showOptionsBelowExample={true} {...IExampleProps}>
            <Table2 numRows={20} enableGhostCells={true} enableFocusedCell={true}>
                <Column cellRenderer={dollarCellRenderer} columnHeaderCellRenderer={renderColumnHeader} />
                <Column cellRenderer={euroCellRenderer} columnHeaderCellRenderer={renderColumnHeader} />
            </Table2>
        </Example>
    );
}
