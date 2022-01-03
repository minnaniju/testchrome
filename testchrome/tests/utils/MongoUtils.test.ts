import sinon, { SinonSpy } from 'sinon';
import { MongoUtils } from '../../src/server/utils/MongoUtils';
import { TestUtils } from './TestUtils';

/**
 * Calling chai should so that sinon-chai assertions are loaded
 */
chai.should();

describe('MongoUtils : ', () => {
  const sandbox = sinon.createSandbox();
  describe('caseInsensitiveDBString', () => {
    let spy: SinonSpy;

    beforeEach(() => {
      spy = sandbox.spy(MongoUtils, 'caseInsensitiveDBString');
    });
    afterEach(() => {
      spy.restore();
    });

    /**
     * Test on null, undefined, emptyString, 0, NAN and false
     */
    it('Argument is null', () => {
      const argument = null;
      const response = new RegExp(`^${argument}$`, 'i');
      MongoUtils.caseInsensitiveDBString(argument);

      /**
       * Assertions
       */
      TestUtils.basicBlackBoxAssertions({ spy, response, args: argument });
    });

    it('Argument is undefined', () => {
      const argument = undefined;
      const response = new RegExp(`^${argument}$`, 'i');
      MongoUtils.caseInsensitiveDBString(argument);

      /**
       * Assertions
       */
      TestUtils.basicBlackBoxAssertions({ spy, response, args: argument });
    });

    it('Argument is empty string', () => {
      const argument = [''];
      const response = new RegExp(`^${argument}$`, 'i');
      MongoUtils.caseInsensitiveDBString(argument);

      /**
       * Assertions
       */
      TestUtils.basicBlackBoxAssertions({ spy, response, args: argument });
    });

    it('Argument is 0', () => {
      const argument = [0];
      const response = new RegExp(`^${argument}$`, 'i');
      MongoUtils.caseInsensitiveDBString(argument);

      /**
       * Assertions
       */
      TestUtils.basicBlackBoxAssertions({ spy, response, args: argument });
    });

    it('Argument is false', () => {
      const argument = [false];
      const response = new RegExp(`^${argument}$`, 'i');
      MongoUtils.caseInsensitiveDBString(argument);

      /**
       * Assertions
       */
      TestUtils.basicBlackBoxAssertions({ spy, response, args: argument });
    });

    it('Argument is NAN', () => {
      const argument = [NaN];
      const response = new RegExp(`^${argument}$`, 'i');
      MongoUtils.caseInsensitiveDBString(argument);

      /**
       * Assertions
       */
      TestUtils.basicBlackBoxAssertions({ spy, response, args: argument });
    });
  });
});
