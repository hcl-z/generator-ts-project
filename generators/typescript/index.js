const Generator = require('yeoman-generator')

class TsConfigGenerator extends Generator {
  writing() {
    this.fs.copy(this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'))
  }
}
module.exports = {
  Generator: TsConfigGenerator,
  path: require.resolve('./'),
}
