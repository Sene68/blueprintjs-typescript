import { IconName, IconNames } from "@blueprintjs/icons";

export const NONE = "(none)";
export type IconNameOrNone = IconName | typeof NONE;

export function getIconNames(): IconNameOrNone[] {
    const iconNames = new Set<IconNameOrNone>();
    for (const [, name] of Object.entries(IconNames)) {
        iconNames.add(name);
    }
    iconNames.add(NONE);
    return Array.from(iconNames.values());
}