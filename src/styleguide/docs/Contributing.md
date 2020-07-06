## Create your component

1. `git clone https://github.com/makesenseorg/makesense_design-system.git`
2. `cd makesense_design-system` and `yarn install`
3. Create a branch `git checkout -b DS-000_my-new-component-name`
4. Make your changes and commit using descriptive messages, if possible prefixing by JIRA ticket number ie `DS-31: a descriptive message about the component i've just built`
5. Create a pull request and merge

## Build and publish the changes

1. Build the component library `yarn build:lib`
2. Bump the DS version in package.json (see below)
3. Publish on npm `npm publish`

How to bump the version :

| Code status                               | Stage         | Rule                                                               | Example version |
| ----------------------------------------- | ------------- | ------------------------------------------------------------------ | --------------- |
| First release                             | New product   | Start with 1.0.0                                                   | 1.0.0           |
| Backward compatible bug fixes             | Patch release | Increment the third digit                                          |  1.0.1          |
| Backward compatible new components        | Minor release | Increment the middle digit and reset last digit to zero            | 1.1.0           |
| Changes that break backward compatibility | Major release | Increment the first digit and reset middle and last digits to zero | 2.0.0           |

## Get the changes in the other app

1. Update package.json dependency version
2. re-install packages `npm install` or `yarn install` depending on project
