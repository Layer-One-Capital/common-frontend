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

### Extending a user ###

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
