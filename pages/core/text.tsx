import React, { useState } from 'react';

import { Text, TextArea } from '@blueprintjs/core';
import { Example, handleStringChange, IExampleProps } from '@blueprintjs/docs-theme';

import '@blueprintjs/core/lib/css/blueprint.css';

export interface ITextExampleState {
    textContent: string;
}

export default function TextExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<ITextExampleState>({
        textContent:
            'You can change the text in the input below. Hover to see full text. ' +
            'If the text is long enough, then the content will overflow. This is done by setting ' +
            'ellipsize to true.',
    });

    const onInputChange = handleStringChange((textContent: string) =>
        setState({
            ...state,
            textContent: textContent,
        }),
    );

    return (
        <Example options={false} {...IExampleProps}>
            <Text ellipsize={true}>
                {state.textContent}
                &nbsp;
            </Text>
            <TextArea fill={true} onChange={onInputChange} value={state.textContent} />
        </Example>
    );
}
