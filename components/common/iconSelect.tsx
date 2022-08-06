import classNames from "classnames";
import * as React from "react";

import { Alignment, Button, Classes } from "@blueprintjs/core";
import { IconName } from "@blueprintjs/icons";
import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";

import { getIconNames, IconNameOrNone, NONE } from "./iconNames";

const ICON_NAMES = getIconNames();

export interface IIconSelectProps {
    disabled?: boolean;
    iconName?: IconName;
    onChange: (iconName?: IconName) => void;
}

const TypedSelect = Select2.ofType<IconNameOrNone>();

export class IconSelect extends React.PureComponent<IIconSelectProps> {
    public render() {
        const { disabled, iconName } = this.props;
        return (
            <label className={classNames(Classes.LABEL, { [Classes.DISABLED]: disabled })}>
                Icon
                <TypedSelect
                    disabled={disabled}
                    items={ICON_NAMES}
                    itemPredicate={this.filterIconName}
                    itemRenderer={this.renderIconItem}
                    noResults={<MenuItem2 disabled={true} text="No results" />}
                    onItemSelect={this.handleIconChange}
                    popoverProps={{ minimal: true }}
                >
                    <Button
                        alignText={Alignment.LEFT}
                        className={Classes.TEXT_OVERFLOW_ELLIPSIS}
                        disabled={disabled}
                        fill={true}
                        icon={iconName}
                        text={iconName || NONE}
                        rightIcon="caret-down"
                    />
                </TypedSelect>
            </label>
        );
    }

    private renderIconItem: ItemRenderer<IconName | typeof NONE> = (icon, { handleClick, handleFocus, modifiers }) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }
        return (
            <MenuItem2
                selected={modifiers.active}
                icon={icon === NONE ? undefined : icon}
                key={icon}
                onClick={handleClick}
                onFocus={handleFocus}
                text={icon}
            />
        );
    };

    private filterIconName = (query: string, iconName: IconName | typeof NONE) => {
        if (iconName === NONE) {
            return true;
        }
        if (query === "") {
            return iconName === this.props.iconName;
        }
        return iconName.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    };

    private handleIconChange = (icon: IconNameOrNone) => this.props.onChange(icon === NONE ? undefined : icon);
}