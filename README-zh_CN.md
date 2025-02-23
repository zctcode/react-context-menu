# @ihatecode/react-context-menu

<a href="https://github.com/zctcode/react-context-menu/blob/main/README.md" target="_blank">Englist</a> | 中文

<p>
<img alt="npm" src="https://img.shields.io/npm/v/@ihatecode/react-context-menu?logo=npm&color=%234ac41c">
<img alt="npm" src="https://img.shields.io/npm/dm/@ihatecode/react-context-menu?logo=npm&color=%234ac41c">
<img alt="GitHub forks" src="https://img.shields.io/github/forks/zctcode/react-context-menu">
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/zctcode/react-context-menu">
</p>

# 介绍
**一个用 React 编写的自定义右键菜单组件**

## 安装
```bash
# npm
npm install @ihatecode/react-context-menu
# yarn
yarn add @ihatecode/react-context-menu
# pnpm
pnpm add @ihatecode/react-context-menu
```

## 使用

```jsx
import React from 'react';
import ContextMenu from '@ihatecode/react-context-menu';
import '@ihatecode/react-context-menu/lib/style.css';

const App: React.FC = () => {
  const [contextMenu] = ContextMenu.useContextMenu();

  return (
    <div style={{ width:'100vw', height:'100vh'}}>
      <div style={{ width:'100%', height:'100%'}} onContextMenu={contextMenu.onContextMenu}></div>
        <ContextMenu
          contextMenu={contextMenu}
          items={[{ key:'1', label: '菜单 1' }, { key:'2', label: '菜单 2' }]}
          onClick={(key) => console.log(key)}
        />
    </div>
  );
};

export default App;
```

## 属性
##### ContextMenu Props
|属性|类型|是否必须|描述|
|-|-|:-:|-|
|className|string|否|自定义类样式|
|zIndex|number|否||
|contextMenu|object|是|菜单实例|
|destroyOnClose|boolean|否|是否关闭时销毁|
|items|any|是|菜单项|
|onClick|(key: string) => void|否|菜单项点击事件|

##### ContextMenu Item Props
|属性|类型|是否必须
|-|-|:-:
|key|string|是|
|label|string|是|
|icon|ReactNode|否|
|disabled|boolean|否|
|children|any|否|

## 许可证
MIT