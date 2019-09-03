# react-canvas-cursor

> A React Component that adds a canvas based cursor

[![NPM](https://img.shields.io/npm/v/react-canvas-cursor.svg)](https://www.npmjs.com/package/react-canvas-cursor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-canvas-cursor
```

## Usage

Props

color - string (optional -- default '#000')
size - integer (optional -- default 20)
fill - boolean (optional -- default false)

```jsx
import React, { Component } from 'react';

import Cursor from 'react-canvas-cursor';

class MyApp extends Component {
  render() {
    return <Cursor fill={true} color="#ff0000" fill={true} />;
  }
}
```

## License

MIT © [nmacarthur](https://github.com/nmacarthur)
