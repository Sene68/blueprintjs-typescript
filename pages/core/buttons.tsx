import * as React from "react";

import { AnchorButton, Button, Code, H5, Intent, Switch } from "@blueprintjs/core";
import { Example, handleBooleanChange, handleValueChange, IExampleProps } from "@blueprintjs/docs-theme";

import { IntentSelect } from "../../components/common/intentSelect";
import { Size, SizeSelect } from "../../components/common/sizeSelect";
import '@blueprintjs/core/lib/css/blueprint.css';

export interface IButtonsExampleState {
    active: boolean;
    disabled: boolean;
    iconOnly: boolean;
    intent: Intent;
    loading: boolean;
    minimal: boolean;
    outlined: boolean;
    size: Size;
    wiggling: boolean;
}

export default class ButtonsExample extends React.PureComponent<IExampleProps, IButtonsExampleState> {
    public state: IButtonsExampleState = {
        active: false,
        disabled: false,
        iconOnly: false,
        intent: Intent.NONE,
        loading: false,
        minimal: false,
        outlined: false,
        size: "regular",
        wiggling: false,
    };

    private handleActiveChange = handleBooleanChange(active => this.setState({ active }));

    private handleDisabledChange = handleBooleanChange(disabled => this.setState({ disabled }));

    private handleIconOnlyChange = handleBooleanChange(iconOnly => this.setState({ iconOnly }));

    private handleLoadingChange = handleBooleanChange(loading => this.setState({ loading }));

    private handleMinimalChange = handleBooleanChange(minimal => this.setState({ minimal }));

    private handleOutlinedChange = handleBooleanChange(outlined => this.setState({ outlined }));

    private handleSizeChange = (size: Size) => this.setState({ size });

    private handleIntentChange = handleValueChange((intent: Intent) => this.setState({ intent }));

    private wiggleTimeoutId: number | undefined;

    public componentWillUnmount() {
        window.clearTimeout(this.wiggleTimeoutId);
    }

    public render() {
        const { iconOnly, wiggling, size, ...buttonProps } = this.state;

        const options = (
            <>
                <H5>Props</H5>
                <Switch label="Active" checked={this.state.active} onChange={this.handleActiveChange} />
                <Switch label="Disabled" checked={this.state.disabled} onChange={this.handleDisabledChange} />
                <Switch label="Loading" checked={this.state.loading} onChange={this.handleLoadingChange} />
                <Switch label="Minimal" checked={this.state.minimal} onChange={this.handleMinimalChange} />
                <Switch label="Outlined" checked={this.state.outlined} onChange={this.handleOutlinedChange} />
                <SizeSelect size={this.state.size} onChange={this.handleSizeChange} />
                <IntentSelect intent={this.state.intent} onChange={this.handleIntentChange} />
                <H5>Example</H5>
                <Switch label="Icons only" checked={this.state.iconOnly} onChange={this.handleIconOnlyChange} />
            </>
        );

        return (
            <Example options={options} {...this.props}>
                <div>
                    <p>
                        <Code>Button</Code>
                    </p>
                    <Button
                        className={this.state.wiggling ? "docs-wiggle" : ""}
                        icon="refresh"
                        onClick={this.beginWiggling}
                        small={size === "small"}
                        large={size === "large"}
                        {...buttonProps}
                    >
                        {!iconOnly && "Click to wiggle"}
                    </Button>
                </div>
                <div>
                    <p>
                        <Code>AnchorButton</Code>
                    </p>
                    <AnchorButton
                        href="#core/components/button"
                        icon="duplicate"
                        rightIcon="share"
                        target="_blank"
                        text={iconOnly ? undefined : "Duplicate this page"}
                        small={size === "small"}
                        large={size === "large"}
                        {...buttonProps}
                    />
                </div>
            </Example>
        );
    }

    private beginWiggling = () => {
        window.clearTimeout(this.wiggleTimeoutId);
        this.setState({ wiggling: true });
        this.wiggleTimeoutId = window.setTimeout(() => this.setState({ wiggling: false }), 300);
    };
}