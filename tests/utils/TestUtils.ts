import { SinonSpy } from 'sinon';
import { NodeUtils } from '../../src/server/utils/NodeUtils';
import Throw = Chai.Throw;

export class TestUtils {
  /**
   * This function checks that the spy is
   * - called once
   * - is called with given argument
   * - doesn't throw an error
   * - The response matches the response of the function
   * - If error is null/undefined then it should not have thrown any error
   * @param spy
   * @param args
   * @param response
   * @param error
   */
  public static basicBlackBoxAssertions = ({
    spy,
    args,
    response,
    error
  }: {
    spy: SinonSpy;
    args?: any[];
    response?: any;
    error?: Throw;
  }) => {
    /**
     * Assertions
     */
    spy.should.have.been.calledOnce;
    if (!(NodeUtils.isStrictEmpty(args) || NodeUtils.isNullOrUndefined(args))) {
      spy.should.have.been.calledWith(args);
    }
    if (NodeUtils.isNullOrUndefined(error)) {
      spy.should.not.throw;
    } else {
      spy.should.not.have.throw(error);
    }
    if (!(NodeUtils.isStrictEmpty(response) || NodeUtils.isNullOrUndefined(response))) {
      spy.should.have.returned(response);
    }
  };
}
