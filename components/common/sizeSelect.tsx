import * as React from "react";

import { Button, ButtonGroup, Label } from "@blueprintjs/core";

export type Size = "small" | "regular" | "large";

export interface SizeSelectProps {
    label?: string;
    size: Size;
    optionLabels?: [string, string, string];
    onChange: (size: Size) => void;
}

export const SizeSelect: React.FC<SizeSelectProps> = props => {
    const handleSmall = React.useCallback(() => props.onChange("small"), []);
    const handleRegular = React.useCallback(() => props.onChange("regular"), []);
    const handleLarge = React.useCallback(() => props.onChange("large"), []);

    return (
        <Label>
            {props.label}
            <ButtonGroup fill={true} style={{ marginTop: 5 }}>
                <Button active={props.size === "small"} text={"Small"} onClick={handleSmall} />
                <Button active={props.size === "regular"} text={"Regular"} onClick={handleRegular} />
                <Button active={props.size === "large"} text={"Large"} onClick={handleLarge} />
            </ButtonGroup>
        </Label>
    );
};

SizeSelect.defaultProps = {
    label: "Size",
    optionLabels: ["Small", "Regular", "Large"],
};