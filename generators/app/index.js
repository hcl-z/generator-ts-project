'use strict'
const path = require('node:path')
const Generator = require('yeoman-generator')
const askName = require('inquirer-npm-name')
const chalk = require('chalk')
const yosay = require('yosay')
const mkdirp = require('mkdirp')
const GitGenerator = require('../git')
const PkgGenerator = require('../pkgConfig')
const LintGenerator = require('../lint')
const LicenseGenerator = require('../license')
const ReadMeGenerator = require('../readMe')
const CIGenerator = require('../ci')
const ReleaseGenerator = require('../release')
const PackGenerator = require('../pack')
const TestGenerator = require('../test')
const TsConfigGenerator = require('../typescript')
const { store } = require('../utils')

module.exports = class extends Generator {
  initializing() {
    this.log(
      yosay(`Welcome to the super ${chalk.red('generator-stupid')} generator!`),
    )

    return askName(
      {
        name: 'projectName',
        message: 'Your project name',
        default: 'tiny-project',
      },
      this,
    ).then((props) => {
      this.destinationRoot(this.destinationPath(props.projectName))
      store.set('projectName', props.projectName)
      this.composeWith(PkgGenerator)
      this.composeWith(LicenseGenerator)
      this.composeWith(ReadMeGenerator)
      this.composeWith(GitGenerator)
      this.composeWith(LintGenerator)
      this.composeWith(CIGenerator)
      this.composeWith(ReleaseGenerator)
      this.composeWith(TestGenerator)
      this.composeWith(PackGenerator)
      this.composeWith(TsConfigGenerator)
    })
  }

  writing() {
    const projectName = store.get('projectName')
    if (path.basename(this.destinationPath()) !== projectName) {
      this.log(
        `Your generator must be inside a folder named ${projectName}\nI'll automatically create this folder.`,
      )
      mkdirp.sync(projectName)
    }

    const copyFiles = ['src', '.vscode']
    const copyTplFiles = ['package.json']

    copyFiles.forEach((file) => {
      this.fs.copy(this.templatePath(file), this.destinationPath(file))
    })

    copyTplFiles.forEach((file) => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        store.get(),
      )
    })
  }

  install() {
    console.log('Installing dependencies...')
    const pkgManager = store.get('pkgManager')
    this.spawnCommandSync(pkgManager, ['install'])

    const installDependencies = store.get('installDependencies') || []
    const installDevDependencies = store.get('installDevDependencies') || []

    if (installDependencies.length > 0) {
      if (pkgManager === 'yarn') {
        this.spawnCommandSync(pkgManager, ['add', ...installDependencies, '-S'])
      }
      else {
        this.spawnCommandSync(pkgManager, ['install', ...installDependencies, '-S'])
      }
    }

    if (installDevDependencies.length > 0) {
      if (pkgManager === 'yarn') {
        this.spawnCommandSync(pkgManager, ['add', ...installDevDependencies, '-D'])
      }
      else {
        this.spawnCommandSync(pkgManager, ['install', ...installDevDependencies, '-D'])
      }
    }
  }

  end() {
    const pkgManager = store.get('pkgManager')
    try {
      this.spawnCommandSync(pkgManager, ['run', 'lint:fix'])
    }
    catch (e) {}
    this.prompt([
      {
        type: 'confirm',
        name: 'code',
        message: 'open project with code command?',
        default: true,
      },
    ]).then((props) => {
      if (props.code) {
        this.spawnCommandSync('code', [this.destinationPath()])
      }
    })
  }
}
