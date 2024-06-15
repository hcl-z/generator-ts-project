const Generator = require('yeoman-generator')
const { store, setDevDependency, setScript } = require('../utils')

class ReleaseGenerator extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'list',
        name: 'release',
        message: 'Which release tool do you want to use?',
        choices: ['changelogen', 'bumpp', 'release-it'],
      },
    ]).then((props) => {
      store.merge(props)
    })
  }

  configuring() {
    const release = store.get('release')
    const depsMap = {
      'changelogen': '^0.5.5',
      'bumpp': '^9.4.1',
      'release-it': '^17.2.1',
    }
    if (depsMap[release]) {
      setDevDependency(release, depsMap[release])
      setScript('release', `${release}`)
    }
  }
}
module.exports = {
  Generator: ReleaseGenerator,
  path: './',
}
