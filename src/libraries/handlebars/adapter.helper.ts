import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as layouts from 'handlebars-layouts';
import { join } from 'path';

const config = new ConfigService();
// register helpers
handlebars.registerHelper(layouts(handlebars));
handlebars.registerHelper('base_uri', () => {
  return config.get('http://localhost:3001');
});
handlebars.registerHelper('inc', (value) => {
  return parseInt(value) + 1;
});

export { handlebars };
