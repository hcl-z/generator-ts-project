const Generator = require('yeoman-generator')
const { store } = require('../utils')

class ReadMeGenerator extends Generator {
  writing() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      store.get(),
    )
  }
}
module.exports = {
  Generator: ReadMeGenerator,
  path: require.resolve('./'),
}
