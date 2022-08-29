import Link from 'next/link';
import { Classes, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import {
    coreComponentItems,
    coreFormControlItems,
    coreFormInputItems,
    overlayItems,
    datetimeItems,
} from '../utils/nav-link';

import '@blueprintjs/core/lib/css/blueprint.css';

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
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
                        <MenuItem icon="log-in" text="Overlays" />
                        <ul>
                            {overlayItems.map(({ href, title }) => (
                                <li className="m-2 sidebar-link" key={title}>
                                    <Link href={href}>{title}</Link>
                                </li>
                            ))}
                        </ul>
                        <MenuDivider title="Datetime" />
                        <MenuItem icon="calendar" text="Datetime" />
                        <ul>
                            {datetimeItems.map(({ href, title }) => (
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
