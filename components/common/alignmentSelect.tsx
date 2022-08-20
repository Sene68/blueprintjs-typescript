import * as React from 'react';
import { Alignment, Button, ButtonGroup } from '@blueprintjs/core';

export interface IAlignSelectProps {
    align: Alignment | undefined;
    allowCenter?: boolean;
    label?: string;
    onChange: (align: Alignment) => void;
}

export default function AlignmentSelect(props: IAlignSelectProps) {
    const label = 'Align Text';
    const allowCenter = props.allowCenter;

    const handleAlignLeft = () => {
        props.onChange(Alignment.LEFT);
    };

    const handleAlignCenter = () => {
        props.onChange(Alignment.CENTER);
    };

    const handleAlignRight = () => {
        props.onChange(Alignment.RIGHT);
    };

    return (
        <div>
            {label}
            <ButtonGroup fill={true} style={{ marginTop: 5 }}>
                <Button active={props.align === Alignment.LEFT} text="Left" onClick={handleAlignLeft} />
                {allowCenter && (
                    <Button
                        active={props.align == null || props.align === Alignment.CENTER}
                        text="Center"
                        onClick={handleAlignCenter}
                    />
                )}
                <Button active={props.align === Alignment.RIGHT} text="Right" onClick={handleAlignRight} />
            </ButtonGroup>
        </div>
    );
}
