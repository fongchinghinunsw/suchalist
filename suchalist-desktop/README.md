# suchalist-desktop

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

In Electron, `dependencies` are packages needed at runtime (for the main and preload processes), whereas `devDependencies` are packages only need at build time (linters, copmilers, Vite, etc.).

```bash
$ yarn
```

The following command allows you to use native Node.js modules in Electron apps without your system version of Node.js matching exactly (which is often not the case, and sometimes not even possible).

```bash
$ yarn rebuild
```

https://github.com/electron/rebuild
https://github.com/WiseLibs/better-sqlite3/issues/126

### Development

```bash
$ yarn dev
```

### Build

```bash
# For windows
$ yarn build:win

# For macOS
$ yarn build:mac

# For Linux
$ yarn build:linux
```
