const Generator = require('yeoman-generator')
const { store, setDevDependency, setScript } = require('../utils')

class PackGenerator extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'list',
        name: 'pack',
        message: 'which pack tool do you want to use?',
        choices: ['tsup', 'rollup', 'tsc'],
        default: 'tsup',
      },
    ]).then((props) => {
      store.merge(props)
    })
  }

  configuring() {
    const pack = store.get('pack')
    if (pack === 'rollup') {
      setDevDependency('@rollup/plugin-typescript', '^11.1.6')
      setDevDependency('@rollup/plugin-node-resolve', '^15.2.3')
      setDevDependency('rollup', '^4.18.0')
      setScript('dev', 'rollup -c')
      setScript('build', 'rollup')
    }
    else if (pack === 'tsup') {
      setScript('dev', 'tsup --watch')
      setScript('build', 'tsup')
    }
    else if (pack === 'tsc') {
      setScript('dev', 'tsc --watch')
      setScript('build', 'tsc')
    }
  }

  writing() {
    const pack = store.get('pack')
    if (pack === 'tsup') {
      this.fs.copy(
        this.templatePath('tsup.config.ts.template'),
        this.destinationPath('tsup.config.ts'),
      )
    }
    else if (pack === 'rollup') {
      this.fs.copy(
        this.templatePath('rollup.config.ts.template'),
        this.destinationPath('rollup.config.ts'),
      )
    }
  }
}
module.exports = {
  Generator: PackGenerator,
  path: require.resolve('./'),
}
