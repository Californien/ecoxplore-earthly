<img src="./.github/content/changelog.png">

# Change Log

All notable changes to the 'cfnx-webdev-setup-pro' repository will be documented in this file. You don't really understand 'Added Feature' on the newest version? Check the README.md file.

## [v2.2.2]

-   Fixed linter. (=> Now, you have to run `npm run lint` in the main directory)
-   Updated Strapi (_v5.8.0_ **--->** v5.8.0)

## [v2.2.1]

### Updates

-   Improved `nuxt.config.ts`-aliases with `path.resolve()`

## [v2.2.0]

### Updates

-   Updating Nuxt (_v3.12.3_ **--->** v3.13.2)
-   Updating Strapi (_v4.25.2_ **--->** v5.2.0)
-   Improved ESLint
-   Added / Edited / Removed ESLint dependencies

## [v2.1.0]

### Updates

-   Updating Nuxt (_v3.11.1_ **--->** v3.12.3)

## [v2.0.0]

### Updates

-   Adjusted prettier and eslint options
-   Replaced font files by one variable font ==> more data-efficient!
-   Whole scripts rework
-   Updating Strapi (_v4.20.5_ **--->** v4.25.2)

### Added Features

-   Added `vitest`, to test frontend code
-   Added GitHub Actions

## [v1.2.0]

### Added Features

-   Added automatic code formatting (prettier)
-   Added code linting (eslint)

## [v1.1.1]

### Updates

-   Updating Nuxt (_v3.7.4_ **--->** v3.11.1)
-   Updating Strapi (_v4.19.1_ **--->** v4.20.5)

### Added features

#### Strapi-installation audit (`npm run build`)

Because of an error, which occured during `npm run build`, a strapi-installation audit is testing, if strapi is correctly installed, before running the command. If this test is successful, `npm run build` will be runned, otherwise it'll be blocked.

## [v1.1.0]

### Updates

-   Incorrect terminal-colour compatibility fixed
-   --> Adding script files (`/scripts/`)

## [v1.0.0]

### Main information

-   `cfnx-webdev-setup-pro` is finished! It contains Nuxt (v3.7.4) and Strapi (v4.19.1).
-   This is an extremely advanced server setup to build any web application you can imagine!
-   Perfect collaboration of frontend (Nuxt) and backend (Strapi)

### Framework specialization

-   Nuxt is a full-stack JavaScript framework based on Vue.js that provides server-side rendering, data fetching and many other features! [More information](https://nuxt.com/)
-   Strapi is a headless CMS-system and perfect for administing content, including user management. Its very easy and clean interface makes it to a really cool backend system! [More information](https://strapi.io/)
