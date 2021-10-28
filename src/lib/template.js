import Handlebars from 'handlebars';
import * as Fs from 'fs';
import { promisifyAll } from 'bluebird';
import Path from 'path';
import _ from 'lodash';
import Profile from './profile';

const fs = promisifyAll(Fs);

Handlebars.registerHelper('boolToInt', bool => (bool ? 1 : 0));

Handlebars.registerHelper('default', (value, fallback) => (value || fallback));

Handlebars.registerHelper('increment', value => parseInt(value, 10) + 1);

Handlebars.registerHelper('enabledEach', (context = [], options) => context.filter(item => item.enabled)
  .reduce((ret, current, i) => {
    current.index = i;
    ret += options.fn(current);
    return ret;
  }, '')
);

class Template {
  static async getTemplate(id) {
    const path = Path.join(__static, 'templates', id);
    const template = await fs.readFileAsync(path, 'utf8');
    return Handlebars.compile(template);
  }

  static async generateProfile(path, difficulty) {
    const state = _.merge({
      datetime: new Date().toLocaleString()
    }, difficulty);

    const template = await Template.getTemplate('Arma3Profile.handlebars');
    return template(state);
  }

  static async generateConfig(path, config, missions) {
    const state = _.merge({
      datetime: new Date().toLocaleString()
    }, config, { missions });

    const template = await Template.getTemplate('ServerConfig.handlebars');
    return template(state);
  }

  static async saveTemplates(store) {
    const {
      app: { appLocation },
      difficulty,
      config,
      missions: { available: missions },
      user: { active: name }
    } = store;

    const path = await Profile.getProfilePath(appLocation, name);
    const profile = await Template.generateProfile(path, difficulty);
    const configuration = await Template.generateConfig(path, config, missions);

    await fs.writeFileAsync(Path.join(path, 'Users', name, `${name}.Arma3Profile`), profile);
    await fs.writeFileAsync(Path.join(path, `${name}.cfg`), configuration);
  }
}

export default Template;
