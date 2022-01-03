import {config} from './index';
// import packageJson from '../../package.json';

const serverName: string = config.nConfig.get('server:name');
const serverHost: string = config.nConfig.get('server:host');
const serverBaseUrl: string = config.nConfig.get('server:url');
const serverPort: Number = config.nConfig.get('server:port');
const defaultTimeZone: string = config.nConfig.get('server:defaultTimeZone');
const assetsDirectory: string = config.nConfig.get('paths:assets');
const contentDirectory: string = config.nConfig.get('paths:content');
const uploadsDirectory: string = config.nConfig.get('paths:uploads');

const env: string = config.nConfig.get('env');
const dbHost: string = config.nConfig.get('database:host');
const dbPort: Number = config.nConfig.get('database:port');
const dbName: string = config.nConfig.get('database:name');
const dbUser: string = config.nConfig.get('database:user');
const dbPassword: string = config.nConfig.get('database:password');
const dbDebug: boolean = config.nConfig.get('database:debug');

const S3_ACCESS_KEY: string = process.env?.S3_ACCESS_KEY ?? '';
const S3_SECRET_KEY: string = process.env?.S3_SECRET_KEY ?? '';
const S3_STATIC_BUCKET: string = process.env?.S3_STATIC_BUCKET ?? '';
const S3_STATIC_BUCKET_URL: string = process.env?.S3_STATIC_BUCKET_URL ?? '';

export const CONSTANT_CONFIG = {
  SERVER: {
    NAME: serverName,
    HOST: serverHost,
    URL: serverBaseUrl,
    PORT: serverPort,
    DEFAULT_TIME_ZONE: defaultTimeZone
  },
  /**
   * Default user agent used in API calls made from this app
   */
  // USER_AGENT: `${serverName}/${packageJson.version}`,
  USER_AGENT: `${serverName}`,

  ENV: env,
  DATABASE: {
    HOST: dbHost,
    PORT: dbPort,
    NAME: dbName,
    USER: dbUser,
    PASSWORD: dbPassword,
    DEBUG: dbDebug
  },
  PATHS: {
    ASSETS: assetsDirectory,
    CONTENT: contentDirectory,
    UPLOADS: uploadsDirectory
  },
  S3: {
    ACCESS_KEY: S3_ACCESS_KEY,
    SECRET_KEY: S3_SECRET_KEY,
    STATIC_BUCKET: S3_STATIC_BUCKET,
    STATIC_BUCKET_URL: S3_STATIC_BUCKET_URL
  }
};
