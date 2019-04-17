+++
title = "Products client (React)"
+++

# Products client (React)

## Summary

This is a premade frontend client for the [Products module](https://docs.walhall.io/marketplace/products-module), written in React.

See the [Interfaces](#interfaces) section for screenshots.

Current React version: **v0.0.1**

## Dependencies

### npm libraries

-  `polished`
-  `react-inline-editing`
-  `react-redux`
-  `redux-saga`
-  `styled-components`

## Local development

To **build** the project: 

-  Development environment: `npm run build`
-  Production environment: `npm run build-prod`

The build artifacts will be stored in the `dist/` directory.

To **run tests** using [Jest](https://jestjs.io/): 

`npm run test`

## File structure

Within the `/src` directory, the following structure is used:

-  `/assets`: Assets to be used within the project.
-  `/components`: Components that do not have routes assigned to them.
-  `/redux`: Contains the actions, reducers and sagas for the client. 

## Interfaces

-  Products list view:
    ![image](/src/assets/screenshots/interface-view-list.png)
-  Products tile view:
    ![image](/src/assets/screenshots/interface-view-tile.png)

## Services

This client connects to the following services:

-  [Products service (Django)](https://docs.walhall.io/marketplace/products-module/products-service)

## API documentation (React Styleguidist)

Run `npm run styleguidist` to generate Styleguidist documentation to the `/styleguide` directory.

## License

Copyright &#169;2019 Humanitec GmbH.

This code is released under the [Humanitec Affero GPL](LICENSE).
