const Generator = require('yeoman-generator')
const { store } = require('../utils')

class PkgGenerator extends Generator {
  initializing() {
    this.props = {}
  }

  prompting() {
    return this.prompt([
      {
        name: 'description',
        message: 'Description',
      },
      {
        name: 'userName',
        message: 'Author\'s Name',
        default: this.user.git.name(),
        store: true,
      },
      {
        name: 'email',
        message: 'Author\'s Email',
        default: this.user.git.email(),
        store: true,
      },
      {
        name: 'repository',
        message: 'Repository',
        store: true,
        default: answers =>
          `https://github.com/${answers.userName}/${store.get('projectName')}`,
      },
      {
        name: 'keywords',
        message: 'keywords(split by space)',
        default: '',
      },
      {
        name: 'pkgManager',
        type: 'list',
        message: 'which Pkg Manager do you want to use?',
        default: 'npm',
        choices: ['npm', 'yarn', 'pnpm'],
        store: true,
      },
    ]).then((props) => {
      store.merge(props)
    })
  }
}

module.exports = {
  Generator: PkgGenerator,
  path: './',
}
