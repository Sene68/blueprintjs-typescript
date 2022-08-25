import Link from 'next/link';
import { Classes, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';

import '@blueprintjs/core/lib/css/blueprint.css';

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    const coreComponentItems = [
        {
            href: '/core/breadcrumbs',
            title: 'BreadCrumbs',
        },
        {
            href: '/core/buttons',
            title: 'Buttons',
        },
        {
            href: '/core/buttongroup',
            title: 'Button Group',
        },
        {
            href: '/core/callout',
            title: 'Callout',
        },
        {
            href: '/core/card',
            title: 'Card',
        },
        {
            href: '/core/collapse',
            title: 'Collapse',
        },
        {
            href: '/core/divider',
            title: 'Divider',
        },
        {
            href: '/core/editabletext',
            title: 'Editable Text',
        },
        {
            href: '/core/icon',
            title: 'Icon',
        },
        {
            href: '/core/menu',
            title: 'Menu',
        },
        {
            href: '/core/navbar',
            title: 'Navbar',
        },
        {
            href: '/core/nonIdealState',
            title: 'Non Ideal State',
        },
        {
            href: '/core/progress',
            title: 'Progress',
        },
        {
            href: '/core/spinner',
            title: 'Spinner',
        },
        {
            href: '/core/tag',
            title: 'Tag',
        },
        {
            href: '/core/text',
            title: 'Text',
        },
        {
            href: '/core/tree',
            title: 'Tree',
        },
    ];
    const coreFormControlItems = [
        {
            href: '/core/formgroup',
            title: 'Form group',
        },
        {
            href: '/core/controlgroup',
            title: 'Control group',
        },
        {
            href: '/core/checkbox',
            title: 'Checkbox',
        },
        {
            href: '/core/radio',
            title: 'Radio',
        },
        {
            href: '/core/slider',
            title: 'Slider',
        },
        {
            href: '/core/switch',
            title: 'Switch',
        },
    ];
    const coreFormInputItems = [
        {
            href: '/core/fileinput',
            title: 'File Input',
        },
        {
            href: '/core/numericinput',
            title: 'Numeric Input',
        },
        {
            href: '/core/textinput',
            title: 'Text Input',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-col md:flex-row flex-1">
                <aside className="bg-slate-100 w-full md:w-60">
                    <Menu className={Classes.ELEVATION_1}>
                        <MenuDivider title="Main" />
                        <MenuItem icon="home" text="Home" />
                        <MenuDivider title="Core" />
                        <MenuItem icon="widget" text="Components" />
                        <ul>
                            {coreComponentItems.map(({ href, title }) => (
                                <li className="m-2 sidebar-link" key={title}>
                                    <Link href={href}>{title}</Link>
                                </li>
                            ))}
                        </ul>
                        <MenuItem icon="control" text="Form Controls" />
                        <ul>
                            {coreFormControlItems.map(({ href, title }) => (
                                <li className="m-2 sidebar-link" key={title}>
                                    <Link href={href}>{title}</Link>
                                </li>
                            ))}
                        </ul>
                        <MenuItem icon="log-in" text="Form Inputs" />
                        <ul>
                            {coreFormInputItems.map(({ href, title }) => (
                                <li className="m-2 sidebar-link" key={title}>
                                    <Link href={href}>{title}</Link>
                                </li>
                            ))}
                        </ul>
                    </Menu>
                </aside>
                <main className="flex-1">
                    <div className="main">{children}</div>
                </main>
            </div>
        </div>
    );
}
