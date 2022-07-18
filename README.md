<p align="center">
  <img width="50px" src="https://raw.githubusercontent.com/Devorein/discente/main/packages/client/public/logo.svg">
<p>

<div align="center"> <h1>Discente</h1></div>

<p align="center">
  <a href="https://github.com/Devorein/discente/actions/workflows/ci.yaml"><img src="https://github.com/Devorein/discente/actions/workflows/ci.yaml/badge.svg" alt="CI Workflow"></a>
  <a href="https://github.com/Devorein/discente/actions/workflows/cd.yaml"><img src="https://github.com/Devorein/discente/actions/workflows/cd.yaml/badge.svg" alt="CD workflow"></a>
  <img src="https://img.shields.io/github/commit-activity/m/Devorein/discente?color=blue" />
  <img src="https://img.shields.io/github/repo-size/Devorein/discente?style=flat-square&color=blue"/>
  <img src="https://img.shields.io/github/contributors/Devorein/discente?label=contributors&color=blue"/>
  <a href="https://codecov.io/gh/Devorein/discente">
    <img src="https://codecov.io/gh/Devorein/discente/branch/main/graph/badge.svg?token=8FOIYTU5A5"/>
  </a>
  <a href="https://github.com/Devorein/discente/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc">
    <img src="https://img.shields.io/github/issues/Devorein/discente?color=blue"/>
  </a>
  <a href="https://main--62a81015e5b807fa987c9de2.chromatic.com/">
    <img src="https://img.shields.io/badge/Storybook-Stories-ff528c?style=flat&logo=storybook"/>
  </a>
  <a href="https://www.chromatic.com/library?appId=62a81015e5b807fa987c9de2&branch=main">
    <img src="https://img.shields.io/badge/Chromatic-Library-orange?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PGNpcmNsZSBmaWxsPSIjRkM1MjFGIiBjeD0iMTI4IiBjeT0iMTI4IiByPSIxMjgiLz48cGF0aCBkPSJtMTU4IDE4Ny0yMC0xMiA2MS0zNSA3LTVjOCAxMiA4IDI3IDEgMzlhMzYgMzYgMCAwIDEtNDkgMTNabS01IDkgOCAzYy02IDEzLTE5IDIxLTMzIDIxLTIwIDAtMzYtMTYtMzYtMzZ2LTcxbDMxIDE4djQ0bDIgNCAyOCAxN1ptLTczLTRhMzYgMzYgMCAwIDEtMzUtNDVjMi0xMCA5LTE4IDE3LTIybDIwLTEydjcxbDEgOGgtM1ptNzktODgtMzEgMTgtMzgtMjJoLTVsLTI4IDE2LTcgNWMtOC0xMi04LTI3LTEtMzlhMzYgMzYgMCAwIDEgNDktMTNsNjEgMzVabS0zMS02OGMyMCAwIDM2IDE2IDM2IDM2djI0bC02MS0zNS04LTRjNi0xMyAxOS0yMSAzMy0yMVptNzkgNDZjMTAgMTcgNCAzOS0xMyA0OWwtNjEgMzZ2LTM2bDM4LTIyYzItMSAzLTMgMy01VjcybC0xLThjMTQtMSAyNyA2IDM0IDE4WiIgZmlsbD0iI0ZGRiIvPjwvc3ZnPg=="/>
  </a>
</p>

## Setup

1. Run `npm install` to install shared dependencies
2. Run `npm run bootstrap` to install dependencies for all packages
3. Run `npm run build` to build all the packages

## Packages

- [`@discente/client`](https://github.com/Devorein/discente/tree/main/packages/client): Package for client code
- [`@discente/seeder`](https://github.com/Devorein/discente/tree/main/packages/seeder): Package for seeder code
- [`@discente/server`](https://github.com/Devorein/discente/tree/main/packages/server): Package for server code
- [`@discente/shared`](https://github.com/Devorein/discente/tree/main/packages/shared): Package for code shared between `@discente/client` & `@discente/server`

## Folder organization

- `.github`: Github specific files (workflows & templates)
- `packages`: Monorepo packages
- `public`: Public assets (logo & images)
- `scripts`: Scripts for github actions
- `.eslintrc.js`: Shared eslint config
- `jest.config.js`: Shared jest config
- `tsconfig.shared.json`: Shared typescript config

## Shared Dev Dependencies

These dev dependencies are shared across all `@discente` packages

- `jest`: Testing Framework
- `lerna`: Monorepo management
- `typescript`: Type safety for javascript
- `nodemon`: Auto restart node.js applications on file change
- `prettier`: Opinionated code formatter
- `eslint`: Linting library
