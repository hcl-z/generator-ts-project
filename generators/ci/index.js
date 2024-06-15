const Generator = require('yeoman-generator')
const { store } = require('../utils')

class CIGenerator extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'list',
        name: 'ci-template',
        message: 'Which GitubAction CI template do you want to use?',
        choices: ['release', 'publish'],
      },
    ]).then((props) => {
      store.merge(props)
    })
  }

  writing() {
    if (store.get('ci-template') === 'release') {
      this.fs.copy(
        this.templatePath('workflow-release.yml'),
        this.destinationPath('.github/workflows/release.yml'),
      )
    }
    else if (store.get('ci-template') === 'publish') {
      const pkgManager = store.get('pkgManager')
      this.fs.copyTpl(
        this.templatePath('workflow-publish.yml'),
        this.destinationPath('.github/workflows/publish.yml'),
        {
          installCommand: `${pkgManager} install`,
          buildCommand: `${pkgManager} run build`,
          publishCommand: 'npm publish',
        },
      )
    }
  }
}
module.exports = {
  Generator: CIGenerator,
  path: require.resolve('./'),
}
