const Generator = require('yeoman-generator')
const { store } = require('../utils')

class LicenseGenerator extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'list',
        name: 'license',
        message: 'Which license do you want to use?',
        choices: [
          'MIT',
          'ISC',
          'Apache-2.0',
          'BSD-2-Clause',
          'BSD-3-Clause',
          'GPL-3.0',
          'LGPL-3.0',
          'AGPL-3.0',
          'MPL-2.0',
          'Unlicense',
          'None',
        ],
      },
    ]).then((props) => {
      store.merge(props)
    })
  }

  writing() {
    const license = store.get('license')
    if (license && license !== 'None') {
      this.fs.copyTpl(
        this.templatePath(license),
        this.destinationPath('LICENSE'),
        { ...store.get(), year: new Date().getFullYear() },
      )
    }
  }
}
module.exports = {
  Generator: LicenseGenerator,
  path: require.resolve('./'),
}
