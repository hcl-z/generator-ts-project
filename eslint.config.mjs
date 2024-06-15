import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['coverage', '**/coverage/**', '**/templates'],
  rules: {
    'no-console': 'off',
  },
})
