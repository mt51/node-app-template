{
  "root": true,
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "env": {
    "node": true,
    "es6": true
  },
  "extends": ["eslint:recommended", "google", "plugin:prettier/recommended"],
  "rules": {
    "max-len": [
      2,
      {
        "code": 120,
        "tabWidth": 2,
        "ignoreUrls": true,
        "ignorePattern": "^\\s*var\\s.+=\\s*require\\s*\\("
      }
    ],
    "require-jsdoc": 0,
    "valid-jsdoc": 0,
    "no-console": 0
  }
}
