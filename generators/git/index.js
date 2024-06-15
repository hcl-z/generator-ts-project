const Generator = require('yeoman-generator')
const { store } = require('../utils')

class GitGenerator extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'confirm',
        name: 'git',
        message: 'Would you like to initialize a git repository?',
        default: true,
      },
      {
        name: 'gitRemote',
        message: 'Git remote url',
        type: 'input',
        default: () => {
          return `https://github.com/${store.get('userName')}/${store.get(
            'projectName',
          )}.git`
        },
        when: (answers) => {
          return answers.git
        },
      },
    ]).then((props) => {
      store.merge(props)
    })
  }

  writing() {
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore'),
    )
  }

  configuring() {
    if (store.get('git')) {
      try {
        this.spawnCommandSync('git', ['init'])
        this.spawnCommandSync('git', [
          'remote',
          'add',
          'origin',
          store.get('gitRemote'),
        ])
      }
      catch (error) {
      }
    }
  }
}

module.exports = {
  Generator: GitGenerator,
  path: require.resolve('./'),
}
