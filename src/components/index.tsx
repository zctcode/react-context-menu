import * as React from 'react';
import * as ReactDOM from 'react-dom';
import cn from 'classnames';

interface ContextMenuState {
    visible: boolean;
    position: {
        x: number;
        y: number;
    };
}

type ContextMenuFunctionA = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
type ContextMenuFunctionB = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: ContextMenuItemProps) => void;
type UseContextMenu = () => [ContextMenuState & { onContextMenu: ContextMenuFunctionA; onClose: () => void; }];

export interface ContextMenuItemProps {
    key: string | number;
    icon?: React.ReactNode;
    label: string;
    disabled?: boolean;
    children?: (ContextMenuItemProps | ContextMenuItemProps[])[];
}

export interface ContextMenuProps {
    zIndex?: number;
    className?: string;
    items: (ContextMenuItemProps | ContextMenuItemProps[])[];
    contextMenu: ContextMenuState & { onClose: () => void };
    destroyOnClose?: boolean;
    onClick?: (key: string | number) => void;
}

type ContextMenuComponent = React.FC<ContextMenuProps> & {
    useContextMenu: UseContextMenu;
};

const ContextMenu: ContextMenuComponent = (props) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [visible, setVisible] = React.useState<boolean>(false);
    const [position, setPosition] = React.useState({ top: 0, left: 0 });

    React.useEffect(() => {
        setVisible(props.contextMenu.visible);
        if (!props.contextMenu.visible) return;
        const containerWidth = containerRef.current?.offsetWidth || 0;
        const containerHeight = containerRef.current?.offsetHeight || 0;
        const positionY = props.contextMenu?.position.y === undefined ? -9999 : props.contextMenu?.position.y;
        const positionX = props.contextMenu?.position.x === undefined ? -9999 : props.contextMenu?.position.x;
        setPosition({
            top: positionY + containerHeight > window.innerHeight ? positionY - containerHeight : positionY,
            left: positionX + containerWidth > window.innerWidth ? positionX - containerWidth : positionX
        });
    }, [containerRef.current, props.contextMenu.visible, props.contextMenu?.position.x, props.contextMenu?.position.y]);

    const eventPreprocess = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleMouseEnter: ContextMenuFunctionB = (e, item) => {
        eventPreprocess(e);
        if (item.disabled || !item.children?.length) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const subMenu = e.currentTarget.lastElementChild;
        const subMenuWidth = subMenu?.clientWidth || 0;
        const subMenuHeight = subMenu?.clientHeight || 0;
        const x = (window.innerWidth - rect.right) > subMenuWidth ? 'left:calc(100% - 8px)' : `right:calc(100% - 8px)`;
        const y = (window.innerHeight - rect.bottom) > subMenuHeight ? 'top:-8px' : `bottom:${-(window.innerHeight - rect.bottom - 8)}px`;
        e.currentTarget.lastElementChild?.setAttribute('style', `${x};${y}`);
    };

    const handleMouseLeave: ContextMenuFunctionA = (e) => {
        eventPreprocess(e);
        e.currentTarget.lastElementChild?.removeAttribute('style');
    };

    const handleClick: ContextMenuFunctionB = (e, item) => {
        eventPreprocess(e);
        if (item.disabled || item.children?.length) return;
        props.onClick?.(item.key);
        props.contextMenu.onClose();
    }

    const renderItems = React.useCallback((items: (ContextMenuItemProps | ContextMenuItemProps[])[], withIcon?: boolean) => {
        const hasIcon = withIcon || items.flat().some((item) => item.icon !== undefined);

        return items.map((item) => {
            if (Array.isArray(item)) {
                const key = item.map((i) => i.key).join("-");
                return (
                    <div className="ihc-context-menu-group" key={key}>{renderItems(item, hasIcon)}</div>
                );
            }

            const subItems = item.children || [];

            return (
                <div
                    key={item.key}
                    className={cn("ihc-context-menu-item", { "ihc-item-disabled": item.disabled })}
                    onMouseEnter={(e) => handleMouseEnter(e, item)}
                    onMouseLeave={handleMouseLeave}
                    onClick={(e) => handleClick(e, item)}
                >
                    {hasIcon && <div className="ihc-menu-item-icon">{item.icon}</div>}
                    <div className="ihc-menu-item-label">{item.label}</div>
                    <div className="ihc-menu-item-icon-right">
                        {subItems.length > 0 && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m10 17l5-5l-5-5" />
                            </svg>
                        )}
                    </div>
                    {subItems.length > 0 && <div className="ihc-sub-context-menu">{renderItems(subItems)}</div>}
                </div>
            );
        });
    }, []);

    const style: React.CSSProperties = {
        position: 'fixed',
        zIndex: props.zIndex,
        ...position
    };

    if (!visible && props.destroyOnClose) return null;

    return ReactDOM.createPortal(
        <div
            ref={containerRef}
            style={style}
            className={cn("ihc-context-menu", { "ihc-visible": visible }, props.className)}
            onClick={eventPreprocess}
            onContextMenu={eventPreprocess}>
            {renderItems(props.items)}
        </div>,
        document.body
    );
}

const useContextMenu: UseContextMenu = () => {
    const _defaultState = { visible: false, position: { x: -9999, y: -9999 } };
    const [state, setState] = React.useState<ContextMenuState>({ ..._defaultState });

    React.useEffect(() => {
        const onClick = () => setState({ ..._defaultState });
        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    }, []);

    const onContextMenu: ContextMenuFunctionA = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setState({ visible: true, position: { x: e.clientX, y: e.clientY } });
    };

    const onClose = () => setState({ ..._defaultState });

    return [{
        ...state,
        onClose,
        onContextMenu
    }];
}

ContextMenu.useContextMenu = useContextMenu;
export default ContextMenu;