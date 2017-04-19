# pr-common #

A package of common components, actions and stores. Things that will be used in every app we create. So far, Blimpon and Plug in SEO v3 use it.

### How to use ###

Reference the repo and a specific version in your package.json like this:

``` "pr-common": "bitbucket:pembertonrank/common-frontend#v1.0.7-beta" ```

### Changes ###

If you're developing a project X, changing pr-common and want to use your local version:

* in project X run: ```npm link /path/to/your/common-frontend```
* run pr-common using: ```npm run build```
* run project X as normal

### Versioning ###

* update package.json file with current version
* commit changes
* add tag ```git tag v1.x.x```
* push on server ```git push origin master --tags```