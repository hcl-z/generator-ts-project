const Generator = require('yeoman-generator')
const { store, setInstallDevpendency, setDevDependency, setScript } = require('../utils')

class LintGenerator extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'checkbox',
        name: 'lint',
        message: 'Which linter do you want to use?',
        choices: ['eslint', 'biome', 'editorconfig', 'none'],
        store: true,
      },
    ]).then((props) => {
      store.merge(props)
    })
  }

  configuring() {
    const linter = store.get('lint')
    if (linter.includes('biome')) {
      setDevDependency('@biomejs/biome', '^1.7.0')
    }
    else if (linter.includes('eslint')) {
      setInstallDevpendency('eslint')
      setInstallDevpendency('@antfu/eslint-config')
      setScript('lint', 'eslint .')
      setScript('lint:fix', 'eslint --fix')
    }
  }

  writing() {
    const fileMap = {
      editorconfig: '.editorconfig',
      eslint: 'eslint.config.mjs',
      biome: 'biome.json',
    }

    const linter = store.get('lint')
    if (Array.isArray(linter)) {
      for (const item of linter) {
        if (fileMap[item]) {
          this.fs.copy(
            this.templatePath(fileMap[item]),
            this.destinationPath(fileMap[item]),
          )
        }
      }
    }

    if (linter.includes('eslint')) {
      this.fs.copy(
        this.templatePath('settings.json'),
        this.destinationPath('.vscode/settings.json'),
      )
    }
  }
}
module.exports = {
  Generator: LintGenerator,
  path: require.resolve('./'),
}
