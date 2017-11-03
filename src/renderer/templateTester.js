import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import store from './store';

Handlebars.registerHelper('boolToInt', bool => (bool ? 1 : 0));

Handlebars.registerHelper('default', (value, fallback) => (value || fallback));

Handlebars.registerHelper('increment', value => parseInt(value, 10) + 1);

Handlebars.registerHelper('enabledEach', (context, options) => context.filter(item => item.enabled)
  .reduce((ret, current, i) => {
    current.index = i;
    ret += options.fn(current);
    return ret;
  }, '')
);

class Template {
  static getStore(module) {
    return _.clone(store.state[module]);
  }

  static generateProfile() {
    const difficulty = Template.getStore('difficulty');
    difficulty.datetime = new Date().toLocaleString();

    const location = path.join(__dirname, 'templates/Arma3Profile.handlebars');
    fs.readFile(location, 'utf8', (err, data) => {
      if (err) return console.error(err);
      const template = Handlebars.compile(data);
      const result = template(difficulty);
      fs.writeFile('test.Arma3Profile', result, (err) => {
        if (err) throw err;
        console.log('OK!');
      });

      return '';
    });
  }

  static generateConfig() {
    const config = Template.getStore('config');
    config.missions = Template.getStore('missions');
    config.datetime = new Date().toLocaleString();

    const location = path.join(__dirname, 'templates/ServerConfig.handlebars');
    fs.readFile(location, 'utf8', (err, data) => {
      if (err) return console.error(err);
      const template = Handlebars.compile(data);
      const result = template(config);
      fs.writeFile('test.cfg', result, (err) => {
        if (err) throw err;
        console.log('OK!');
      });

      return '';
    });
  }
}

export default Template;
