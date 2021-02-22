# eslint-plugin-ban-package-import

Bans package import. Useful when one wants to remove a deprecated package from project and wants to make sure that it will not be used in a new code.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-ban-package-import`:

```
$ npm install eslint-plugin-ban-package-import --save-dev
```

## Usage

Add `ban-package-import` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["ban-package-import"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "ban-package-import/ban-package-import": [
      2,
      {
        "packages": ["package-to-ban"]
      }
    ]
  }
}
```

## Supported Rules

- ban-package-import
