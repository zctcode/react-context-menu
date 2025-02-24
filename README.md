# @ihatecode/react-context-menu

Englist | <a href="https://github.com/zctcode/react-context-menu/blob/main/README-zh_CN.md" target="_blank">中文</a>

<p>
<img alt="npm" src="https://img.shields.io/npm/v/@ihatecode/react-context-menu?logo=npm&color=%234ac41c">
<img alt="npm" src="https://img.shields.io/npm/dm/@ihatecode/react-context-menu?logo=npm&color=%234ac41c">
<img alt="GitHub forks" src="https://img.shields.io/github/forks/zctcode/react-context-menu">
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/zctcode/react-context-menu">
</p>

# Introduction
**A context menu component written in React.**

## Install
```bash
# npm
npm install @ihatecode/react-context-menu
# yarn
yarn add @ihatecode/react-context-menu
# pnpm
pnpm add @ihatecode/react-context-menu
```

## Usage

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
          items={[{ key:'1', label: 'item1' }, { key:'2', label: 'item2' }]}
          onClick={(key) => console.log(key)}
        />
    </div>
  );
};

export default App;
```

## Demo
Online demo: [https://q5fknh.csb.app/](https://q5fknh.csb.app/)

[![Edit react-splitter](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/q5fknh)

## Props
##### ContextMenu Props
|Property|Type|Optional
|-|-|:-:
|className|string|Y|
|zIndex|number|Y|
|contextMenu|object|N|
|destroyOnClose|boolean|Y|
|items|any|N|
|onClick|(key: string) => void|Y|

##### ContextMenu Item Props
|Property|Type|Optional
|-|-|:-:
|key|string|N|
|label|string|N|
|icon|ReactNode|Y|
|disabled|boolean|Y|
|children|any|Y|

## License
MIT