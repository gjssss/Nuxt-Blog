import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
    },
  },
)
