import React, { useState } from "react";

import { Alignment, H5, Switch, Radio, RadioGroup } from "@blueprintjs/core";
import { Example, handleBooleanChange, handleStringChange, IExampleProps } from "@blueprintjs/docs-theme";

import AlignmentSelect from "../../components/common/alignmentSelect";

import '@blueprintjs/core/lib/css/blueprint.css';

export interface IRadioExampleState {
    alignIndicator: Alignment;
    disabled: boolean;
    inline: boolean;
    large: boolean;
    value?: string;
}

export default function RadioExample(IExampleProps: IExampleProps) {

    const [state, setState] = useState<IRadioExampleState>({
        alignIndicator: Alignment.LEFT,
        disabled: false,
        inline: false,
        large: false,
        value: "one"
    });

    const handleRadioChange = handleStringChange((value: string) => setState({ 
        ...state,
        value: value
     }));

    const handleAlignChange = (alignIndicator: Alignment) => setState({ 
        ...state,
        alignIndicator: alignIndicator
     });

    const handleDisabledChange = handleBooleanChange((disabled: boolean) => setState({ 
        ...state,
        disabled: disabled
     }));

    const handleInlineChange = handleBooleanChange((inline: boolean) => setState({ 
        ...state,
        inline: inline
     }));

    const handleLargeChange = handleBooleanChange((large: boolean) => setState({ 
        ...state,
        large: large
     }));

    const options = (
        <>
            <H5>Props</H5>
            <Switch checked={state.disabled} label="Disabled" onChange={handleDisabledChange} />
            <Switch checked={state.inline} label="Inline" onChange={handleInlineChange} />
            <Switch checked={state.large} label="Large" onChange={handleLargeChange} />
            <AlignmentSelect
                align={state.alignIndicator}
                allowCenter={false}
                label="Align indicator"
                onChange={handleAlignChange}
            />
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <RadioGroup
                inline={state.inline}
                label="Determine lunch"
                name="group"
                onChange={handleRadioChange}
                selectedValue={state.value}
            >
                <Radio {...state} label="Soup" value="one" />
                <Radio {...state} label="Salad" value="two" />
                <Radio {...state} label="Sandwich" value="three" />
            </RadioGroup>
        </Example>
    );

}

// export class RadioExample extends CheckboxExample {
//     private handleRadioChange = handleStringChange(value => this.setState({ value }));

//     // See CheckboxExample for options
//     protected renderExample() {
//         return (
//             <Example options={false} {...this.props}>
//                 <RadioGroup
//                     inline={this.state.inline}
//                     label="Determine lunch"
//                     name="group"
//                     onChange={this.handleRadioChange}
//                     selectedValue={this.state.value}
//                 >
//                     <Radio {...this.state} label="Soup" value="one" />
//                     <Radio {...this.state} label="Salad" value="two" />
//                     <Radio {...this.state} label="Sandwich" value="three" />
//                 </RadioGroup>
//             </Example>
//         );
//     }
// }