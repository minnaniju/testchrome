import _ from 'lodash';
import chai from 'chai';
import sinon from 'sinon';
import Bluebird from 'bluebird-global';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

global._ = _;
global.Promise = <any>Bluebird;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.sandbox = sinon.createSandbox();

chai.use(chaiHttp);
chai.use(sinonChai);
chai.use(chaiAsPromised);
