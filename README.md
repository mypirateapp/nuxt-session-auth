# nuxtsessionauth

> My superior Nuxt.js project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

https://github.com/nuxt-community/auth-module/issues/579 How to integrate Facebook and Google OAuth Providers with Back-End API

# What does not work here?
- This has one huge problem.
- Suppose your express session has a cookie expiration of 1m
- After 1m the the session of the user expires in the backend
- However in the frontend the user is still logged in
- If you the refresh the page after 1m on the frontend the user gets logged out
- If you DONT refresh the page after 1m user is still logged in on the frontend even though the user is logged out in the BACKEND