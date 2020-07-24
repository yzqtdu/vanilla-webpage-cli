# vanilla-webpage-cli

> easy-to-use cli tool for web development

---

## Table of Contents(内容) 

- [Installation](#installation)
- [Features](#features)
- [License](#license)

---

## Installation

> run the following command to create a new project    

```shell
$ npx vanilla-webpage-cli create <project-name>
```
please set a name which has not been used in your current directory.

### Development

```shell
$ npm run serve
```
or

```shell
$ npm run build
```
---

## Features

### project structure

> you may import net sevice from the `reques.js` file directly

```
|———— node_modules
|———— src
|    |———— index.html
|    |———— main.js  (entry point)
|    |———— request.js
|———— package.json
|———— package-lock.json
|———— webpack.config.js
|———— tsconfig.json (when using typescript)
```

With previously installed templates, it's convinient to start development and build for production.

### out-of-box tools

- Optional TypeScript (highly recommended)
- Webpack and useful loaders/plugins (no worry about choosing thoes confusing loaders/plugins ever since)
- Babel (always ❤ with mordern JavaScript)
- Axios (easy to send request)
- Eslint 
  
The Webpack will use `main.js` as the entry point, also you can change it inside the config file, and with the help of Webpack plugins there's no need to import it in `index.html` using `script` tag.

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)
