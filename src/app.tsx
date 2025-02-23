import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import ContextMenu, { ContextMenuItemProps } from './components';
import './components/style.css';
import './index.scss';

function App() {
    const [contextMenu] = ContextMenu.useContextMenu();
    const [type, setType] = useState('basic');

    const handleMenuClick = (key: string | number) => {
        alert(key);
    }

    const itemsMap: { [key: string]: (ContextMenuItemProps | ContextMenuItemProps[])[] } = useMemo(() => {
        return {
            basic: [
                {
                    key: 'copy',
                    label: 'Copy'
                },
                {
                    key: 'refresh',
                    label: 'Refresh'
                },
                {
                    key: 'delete',
                    label: 'Delete'
                },
                {
                    key: 'share',
                    label: 'Share'
                },
                {
                    key: 'download',
                    label: 'Download'
                }
            ],
            menuicon: [
                {
                    key: 'copy',
                    label: 'Copy',
                    icon: <IconCopy />
                },
                {
                    key: 'refresh',
                    label: 'Refresh',
                    icon: <IconRefresh />
                },
                {
                    key: 'delete',
                    label: 'Delete',
                    icon: <IconDelete />
                },
                {
                    key: 'share',
                    label: 'Share',
                    icon: <IconShare />
                },
                {
                    key: 'download',
                    label: 'Download',
                    icon: <IconDownload />
                }
            ],
            menugroup: [
                {
                    key: 'copy',
                    label: 'Copy',
                    icon: <IconCopy />
                },
                {
                    key: 'refresh',
                    label: 'Refresh',
                    icon: <IconRefresh />
                },
                [{
                    key: 'delete',
                    label: 'Delete',
                    icon: <IconDelete />
                },
                {
                    key: 'share',
                    label: 'Share',
                    icon: <IconShare />
                }],
                {
                    key: 'download',
                    label: 'Download',
                    icon: <IconDownload />
                }
            ],
            submenu: [
                {
                    key: 'copy',
                    label: 'Copy',
                    icon: <IconCopy />
                },
                {
                    key: 'refresh',
                    label: 'Refresh',
                    icon: <IconRefresh />
                },
                {
                    key: 'delete',
                    label: 'Delete',
                    icon: <IconDelete />
                },
                {
                    key: 'share',
                    label: 'Share',
                    icon: <IconShare />,
                    children: [
                        {
                            key: 'facebook',
                            label: 'Facebook',
                            icon: <IconFacebook />
                        },
                        {
                            key: 'twitter',
                            label: 'Twitter',
                            icon: <IconTwitter />
                        }
                    ]
                },
                {
                    key: 'download',
                    label: 'Download',
                    icon: <IconDownload />
                }
            ],
            disableditem: [
                {
                    key: 'copy',
                    label: 'Copy',
                    icon: <IconCopy />
                },
                {
                    key: 'refresh',
                    label: 'Refresh',
                    icon: <IconRefresh />
                },
                [{
                    key: 'delete',
                    label: 'Delete',
                    icon: <IconDelete />,
                    disabled: true,
                },
                {
                    key: 'share',
                    label: 'Share',
                    icon: <IconShare />,
                    children: [
                        {
                            key: 'facebook',
                            label: 'Facebook',
                            icon: <IconFacebook />
                        },
                        {
                            key: 'twitter',
                            label: 'Twitter',
                            icon: <IconTwitter />,
                            disabled: true,
                        }
                    ]
                }],
                {
                    key: 'download',
                    label: 'Download',
                    icon: <IconDownload />,
                }
            ],
        };
    }, []);

    return (
        <div className="container" onContextMenu={contextMenu.onContextMenu}>
            <div className="tips">Select the menu type and right-click to open the menu.</div>
            <div className="radio-group">
                <div className="radio-wrapper">
                    <input value="basic" type="radio" id="radio1" name="radio" checked={type === 'basic'} onChange={e => setType(e.target.value)} />
                    <label htmlFor="radio1">Basic</label>
                </div>
                <div className="radio-wrapper">
                    <input value="menuicon" type="radio" id="radio2" name="radio" checked={type === 'menuicon'} onChange={e => setType(e.target.value)} />
                    <label htmlFor="radio2">Menu Icon</label>
                </div>
                <div className="radio-wrapper">
                    <input value="menugroup" type="radio" id="radio3" name="radio" checked={type === 'menugroup'} onChange={e => setType(e.target.value)} />
                    <label htmlFor="radio3">Menu Group</label>
                </div>
                <div className="radio-wrapper">
                    <input value="submenu" type="radio" id="radio4" name="radio" checked={type === 'submenu'} onChange={e => setType(e.target.value)} />
                    <label htmlFor="radio4">Sub Menu</label>
                </div>
                <div className="radio-wrapper">
                    <input value="disableditem" type="radio" id="radio5" name="radio" checked={type === 'disableditem'} onChange={e => setType(e.target.value)} />
                    <label htmlFor="radio5">Menu item disabled</label>
                </div>
            </div>
            <ContextMenu
                contextMenu={contextMenu}
                items={itemsMap[type]}
                onClick={handleMenuClick}
            />
        </div>
    );
}

function IconCopy(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M2 2h14v14H2zm20 6v14H8v-4h2v2h10V10h-2V8z"></path></svg>
    )
}

function IconRefresh(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M17.65 6.35A7.96 7.96 0 0 0 12 4a8 8 0 0 0-8 8a8 8 0 0 0 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18a6 6 0 0 1-6-6a6 6 0 0 1 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z"></path></svg>
    )
}

function IconDelete(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zM7 6h10v13H7zm2 2v9h2V8zm4 0v9h2V8z"></path></svg>
    )
}

function IconShare(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="m21 12l-7-7v4C7 10 4 15 3 20c2.5-3.5 6-5.1 11-5.1V19z"></path></svg>
    )
}

function IconDownload(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M13 5v6h1.17L12 13.17L9.83 11H11V5zm2-2H9v6H5l7 7l7-7h-4zm4 15H5v2h14z"></path></svg>
    )
}

function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z" fill="currentColor"></path></svg>
    )
}

function IconTwitter(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m12.71 6.33c.48-.4 1.04-.88 1.29-1.41c-.41.21-.9.34-1.44.41c.5-.36.91-.83 1.12-1.47c-.52.28-1.05.52-1.71.64c-1.55-1.87-5.26-.35-4.6 2.45c-2.61-.16-4.2-1.34-5.52-2.79c-.75 1.22-.1 3.07.79 3.58c-.46-.03-.81-.17-1.14-.33c.04 1.54.89 2.28 2.08 2.68c-.36.07-.76.09-1.14.03c.37 1.07 1.14 1.74 2.46 1.88c-.9.76-2.56 1.29-3.9 1.08c1.15.73 2.46 1.31 4.28 1.23c4.41-.2 7.36-3.36 7.43-7.98z" fill="currentColor"></path></svg>
    )
}

const container = document.getElementById('root') || document.body;
const root = createRoot(container);
root.render(<App />);