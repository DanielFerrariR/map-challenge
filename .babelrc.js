const plugins = [
  'react-hot-loader/babel',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-private-methods',
  '@babel/plugin-proposal-private-property-in-object'
]

if (process.env.IS_CYPRESS) {
  plugins.push('istanbul')
}

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '10'
        }
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins
}
