import React, { useState } from "react";

import {
    Boundary,
    BreadcrumbProps,
    Breadcrumbs,
    Card,
    Checkbox,
    H5,
    InputGroup,
    Label,
    RadioGroup,
    Slider,
} from "@blueprintjs/core";
import { Example, handleStringChange, IExampleProps } from "@blueprintjs/docs-theme";
import '@blueprintjs/core/lib/css/blueprint.css';

export interface IBreadcrumbsExampleState {
    collapseFrom: Boundary;
    renderCurrentAsInput: boolean;
    alwaysRenderOverflow: boolean;
    width: number;
}

const COLLAPSE_FROM_RADIOS = [
    { label: "Start", value: Boundary.START.toString() },
    { label: "End", value: Boundary.END.toString() },
];

const ITEMS: BreadcrumbProps[] = [
    { icon: "folder-close", text: "All files" },
    { icon: "folder-close", text: "Users" },
    { icon: "folder-close", text: "Janet" },
    { href: "#", icon: "folder-close", text: "Photos" },
    { href: "#", icon: "folder-close", text: "Wednesday" },
    { icon: "document", text: "image.jpg", current: true },
];
// Show less items for always redner example so we can see when everything fits
const ITEMS_FOR_ALWAYS_RENDER: BreadcrumbProps[] = [
    { href: "#", icon: "folder-close", text: "Root" },
    { icon: "document", text: "image.jpg", current: true },
];

export default function BreadcrumbsExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<IBreadcrumbsExampleState>({
        alwaysRenderOverflow: false,
        collapseFrom: Boundary.START,
        renderCurrentAsInput: false,
        width: 50,
    });

    const handleChangeCollapse = handleStringChange(collapseFrom =>
        setState({
            ...state,
            collapseFrom: collapseFrom as Boundary
        })
    );

    const renderLabel = (value: number) => {
        return `${value}%`;
    };

    const handleChangeWidth = (e: number) => {
        const width = e;
        setState({
            ...state,
            width: width
        })
    };

    const handleChangeRenderCurrentAsInput = () => {
        setState({
            ...state,
            renderCurrentAsInput: !state.renderCurrentAsInput
        })
    };

    const handleChangeAlwaysRenderOverflow = () => {
        setState({
            ...state,
            alwaysRenderOverflow: !state.alwaysRenderOverflow
        })
    };

    const renderBreadcrumbInput = ({ text }: BreadcrumbProps) => {
        return <BreadcrumbInput defaultValue={typeof text === "string" ? text : undefined} />;
    };

    const breadcrumbWidthLabelId = "num-visible-items-label";

    const options = (
        <>
            <H5>Props</H5>
            <RadioGroup
                name="collapseFrom"
                inline={true}
                label="Collapse from"
                onChange={handleChangeCollapse}
                options={COLLAPSE_FROM_RADIOS}
                selectedValue={state.collapseFrom.toString()}
            />
            <Checkbox
                name="alwaysRenderOverflow"
                label="Always render overflow"
                onChange={handleChangeAlwaysRenderOverflow}
                checked={state.alwaysRenderOverflow}
            />
            <Checkbox
                name="renderCurrent"
                label="Render current breadcrumb as input"
                onChange={handleChangeRenderCurrentAsInput}
                checked={state.renderCurrentAsInput}
            />
            <H5>Example</H5>
            <Label id={breadcrumbWidthLabelId}>Width</Label>
            <Slider
                labelRenderer={renderLabel}
                labelStepSize={50}
                max={100}
                onChange={handleChangeWidth}
                showTrackFill={false}
                value={state.width}
                handleHtmlProps={{ "aria-labelledby": breadcrumbWidthLabelId }}
            />
        </>
    );

    
    return (
        <Example options={options} {...IExampleProps}>
            <Card elevation={0} style={{ width: `${state.width}%` }}>
                <Breadcrumbs
                    collapseFrom={state.collapseFrom}
                    items={state.alwaysRenderOverflow ? ITEMS_FOR_ALWAYS_RENDER : ITEMS}
                    currentBreadcrumbRenderer={state.renderCurrentAsInput ? renderBreadcrumbInput : undefined}
                />
            </Card>
        </Example>
    );

    

    
}

function BreadcrumbInput(props: any) {
    const [text, setText] = useState(props.defaultValue ?? "");

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setText((event.target as HTMLInputElement).value);
    };

    return <InputGroup placeholder="rename me" value={text} onChange={handleChange} />;
    
}