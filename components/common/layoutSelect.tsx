import * as React from "react";

import { Button, ButtonGroup, Label } from "@blueprintjs/core";

export type Layout = "horizontal" | "vertical";

export interface LayoutSelectProps {
    layout: Layout;
    onChange: (size: Layout) => void;
}

/** Button radio group to switch between horizontal and vertical layouts. */
export const LayoutSelect: React.FC<LayoutSelectProps> = ({ layout, onChange }) => {
    const handleVertical = React.useCallback(() => onChange("vertical"), []);
    const handleHorizontal = React.useCallback(() => onChange("horizontal"), []);

    return (
        <Label>
            Layout
            <ButtonGroup fill={true} style={{ marginTop: 5 }}>
                <Button active={layout === "vertical"} text="Vertical" onClick={handleVertical} />
                <Button active={layout === "horizontal"} text="Horizontal" onClick={handleHorizontal} />
            </ButtonGroup>
        </Label>
    );
};