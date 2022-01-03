/**
 * Using bluebird-global to make .map function of bluebird available via Promise
 * This comment suggested using bluebird-global instead of bluebird to fix the typescript shenanigan
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42084#issuecomment-581993103
 * Futher read the index.d.ts file for more information on the usage
 * node_modules/@types/bluebird-global/index.d.ts
 */
import 'source-map-support/register';
import promise from 'bluebird-global';
import mongoose from 'mongoose';
import momentTz from 'moment-timezone';
/**
 * Importing config before starting anything
 */
import { config } from './config';

/**
 * importing Server
 */
import { Server } from './server';

/**
 * Set default moment timezone from config
 */
const defaultTimeZone = config.get('server:defaultTimeZone');
momentTz.tz.setDefault(defaultTimeZone);

/**
 * Set bluebird as default promise
 * Need to use any because of declaration bug
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42084
 * Even after importing bluebird-global global assignment of global.Promise = promise is needed for the code to
 * actually work in runtime
 */
global.Promise = <any>promise;

/**
 * Set mongoose promise to use bluebird promise
 */
mongoose.Promise = global.Promise;

/**
 * Start the server
 */

Server.init().catch(err => {
  console.error(err);
  process.exit(2);
});
