const Generator = require('yeoman-generator')
const { store, setDevDependency } = require('../utils')

class JestGenerator extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'confirm',
        name: 'test',
        message: 'Do you want to init test framework?',
        default: true,
        store: true,
      },
      {
        type: 'list',
        name: 'testFramework',
        message: 'Which test framework do you want to use?',
        choices: ['jest', 'mocha'],
        store: true,
        when: props => props.test,
      },
    ]).then((props) => {
      store.merge(props)
    })
  }

  writing() {
    if (!store.get('test')) {
      return
    }

    const testFramework = store.get('testFramework')
    if (testFramework === 'jest') {
      setDevDependency('jest')
      setDevDependency('ts-jest')
      setDevDependency('@types/jest')
      this.fs.copy(
        this.templatePath('jest.config.js'),
        this.destinationPath('jest.config.js'),
      )
      this.fs.copy(
        this.templatePath('test/jest.spec.ts'),
        this.destinationPath('test/index.spec.ts'),
      )
    }
    else {
      setDevDependency('mocha')
      setDevDependency('@types/mocha')
      setDevDependency('chai')
      setDevDependency('@types/chai')
      this.fs.copy(
        this.templatePath('test/mocha.spec.ts'),
        this.destinationPath('test/index.spec.ts'),
      )
    }
  }
}
module.exports = {
  Generator: JestGenerator,
  path: require.resolve('./'),
}
