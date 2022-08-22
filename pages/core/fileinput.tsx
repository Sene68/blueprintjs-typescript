import React, { useState } from 'react';

import { FileInput, FormGroup, H5, InputGroup } from '@blueprintjs/core';
import { Example, IExampleProps } from '@blueprintjs/docs-theme';

import '@blueprintjs/core/lib/css/blueprint.css';

interface IFileInputExampleState {
    buttonText?: string;
    text?: string;
}

export default function FileInputExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<IFileInputExampleState>({
        buttonText: '',
        text: '',
    });

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setState({
            ...state,
            text: e.target.value,
        });

    const handleButtonTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setState({
            ...state,
            buttonText: e.target.value,
        });

    const options = (
        <>
            <H5>Props</H5>
            <FormGroup label="Text">
                <InputGroup placeholder="Choose file..." onChange={handleTextChange} value={state.text} />
            </FormGroup>
            <FormGroup label="Button text">
                <InputGroup placeholder="Browse" onChange={handleButtonTextChange} value={state.buttonText} />
            </FormGroup>
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <FileInput text={state.text} buttonText={state.buttonText} />
        </Example>
    );
}
