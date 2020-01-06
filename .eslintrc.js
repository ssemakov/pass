module.exports = {
  extends: 'erb',
  settings: {
    'import/resolver': {
      webpack: {
        config: require.resolve('./configs/webpack.config.eslint.js')
      }
    }
  },
  rules: {
    'react/jsx-props-no-spreading': [
      'error',
      {
        explicitSpread: 'ignore',
        html: 'enforce',
        custom: 'ignore'
      }
    ],
    'react/prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        controlComponents: ['Field']
      }
    ]
  }
};
