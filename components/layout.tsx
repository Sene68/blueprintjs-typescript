import Link from 'next/link';
import { useRouter } from 'next/router';

type LayoutProps = {
    children: React.ReactNode,
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  const menuItems = [
    {
        href: '/',
        title: 'Homepage',
    },
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
    }
  ];

  return (
    <div className='min-h-screen flex flex-col'>
      {/* <header className='bg-purple-200 sticky top-0 h-14 flex justify-center items-center font-semibold uppercase'>
        Next.js sidebar menu
      </header> */}
      <div className='flex flex-col md:flex-row flex-1'>
        <aside className='bg-slate-100 w-full md:w-60'>
          <nav>
            <ul>
              {menuItems.map(({ href, title }) => (
                <li className='m-2' key={title}>
                  <Link href={href}>
                    <a
                      className={`flex p-2 bg-slate-200 rounded hover:bg-slate-400 cursor-pointer ${
                        router.asPath === href && 'bg-slate-600 text-white'
                      }`}
                    >
                      {title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className='flex-1'>
          <div className="main">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}