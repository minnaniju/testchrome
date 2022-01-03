import { GlobalUtils } from '../../utils';
import { ApiValidator, ExtendedJoi as joi } from '../../utils/validation';

export class TemplateAPI {
  public static test = async (object, options) => {
    ApiValidator.validateQuery(
      options.query,
      joi.object().keys({
        test: joi.boolean().default(false)
      })
    );
    const { test } = options.query;
    const response = GlobalUtils.responseObject();
    if (test) {
      response.data = {
        ...options
      };
      return response;
    }
    response.data = options.transactionId;
    return response;
  };
}
