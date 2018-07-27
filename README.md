# Common frontend

A package of common components, actions and stores for the [React/Rails Shopify app](https://github.com/pemberton-rank/react-shopify-app). Used in production by the 100k user app: [Plug in SEO](https://apps.shopify.com/plug-in-seo).

## How to use ##

This package goes hand-in-hand with the [React/Rails Shopify app](https://github.com/pemberton-rank/react-shopify-app), and it's ready to go.

Reference the repo and a specific version in your package.json like this:

``` "common-frontend": "https://github.com/pemberton-rank/common-frontend.git#v1.1.9" ```

## Development ##

If you're developing a project X, changing common-frontend and want to use your local version:

* in project X run: ```npm link /path/to/your/common-frontend``` like ```npm link ../../pemberton-rank/common-frontend```
* build common-frontend using: ```npm run build```
* run project X as normal with ```npm start run```

**Often forgotten:** Whenever you make a change in your local common-frontend, run ```npm link /path/to/your/common-frontend``` again for project X to pick up the change.

# Debugging #

All of the code from your local common-frontend will be in your bundle.js with a source map, so available in your browser's developer console. Setting breakpoints etc. will work as normal. If it doesn't, you're doing something wrong and dev will be a lot harder!

# Versioning #

A numbered version is created when your common-frontend pull request is approved and the branch is merged into master.

The development process is:

* create a branch of common-frontend
* create a branch of project X (the project which references common-frontend)
* work on your local common-frontend as in 'Development' above, and project X
* when you are finished with all of the work needed for common-frontend, create a pull request for it
* when that pull request is approved and merged an admin of common-frontend will:
  * up the version number in common-frontend's package.json
  * tag a release on master with the version like ```git tag v1.1.9```
  * push this tag ```git push origin master --tags```
* edit the project X package.json to reference this new version like ``` "common-frontend": "https://github.com/pemberton-rank/common-frontend.git#v1.1.9" ```
* create a pull request for project X

If there are issues with common-frontend discovered in testing project X you will have to create a new branch and version.

## How to ##

### Extend a user ###

common-frontend provides you with the common methods for working with a user. If you'd like to extend the user by, say, adding new properties to them, you can create an ExtendedUserActions in your project to add the new properties.

Let's say we want to add a new property to a User: sandwichPreference.

* create an ExtendedUserActions in your project
* add an ```updateProfile(profile)``` function to ```ExtendedUserActions``` 
* we'll call this action, passing the entire User with their sandwichPreference whenever we want to update the user's sandwichPreference:

```
updateProfile(profile) {
  ApiClient.updateProfile({ userProfile: profile }).then((data) => {
    UserActions.setExtendedUser(data.session);
  });
}
```

ApiClient.updateProfile does a PUT on user_profiles. The Rails API sets the user, including the sandwichPreference.

We'll also need to modify the API's sessions resource to return this property.

The sandwichPreference is now available at UserStore.currentUser.sandwichPreference, keeping the common code clean and upgradeable.
