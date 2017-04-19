# Common frontend

A package of common components, actions and stores for the [React/Rails Shopify app](https://github.com/pemberton-rank/react-shopify-app). Used in production by the 100k user app: [Plug in SEO](https://apps.shopify.com/plug-in-seo).

### How to use ###

This package goes hand-in-hand with the [React/Rails Shopify app](https://github.com/pemberton-rank/react-shopify-app), and it's ready to go.

Reference the repo and a specific version in your package.json like this:

``` "pr-common": "https://github.com/pemberton-rank/common-frontend.git#v1.1.9" ```

### Changes ###

If you're developing a project X, changing common-frontend and want to use your local version:

* in project X run: ```npm link /path/to/your/common-frontend```
* run common-frontend using: ```npm run build```
* run project X as normal

### Versioning ###

* update package.json file with current version
* commit changes
* add tag ```git tag v1.x.x```
* push on server ```git push origin master --tags```
