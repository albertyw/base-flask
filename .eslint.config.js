import globals from 'globals';
import js from '@eslint/js';

let globalVars = globals.browser;
globalVars = {...globalVars, ...{
  'context': true,
  'describe': true,
  'it': true,
  'before': true,
  'after': true,
  'beforeEach': true,
  'afterEach': true,
  'beforeAll': true,
  'afterAll': true,
  'process': true,
}};

export default [
  js.configs.recommended,
  {
    'rules': {
      'indent': [
        'error',
        2
      ],
      'linebreak-style': [
        'error',
        'unix'
      ],
      'quotes': [
        'error',
        'single'
      ],
      'semi': [
        'error',
        'always'
      ],
    },
    'languageOptions': {
      'ecmaVersion': 2022,
      'sourceType': 'module',
      'globals': globalVars,
    },
  },
  {
    'ignores': [
      'static/gen',
    ],
  },
];
