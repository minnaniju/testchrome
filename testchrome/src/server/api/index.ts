import url from 'url';
import _ from 'lodash';
import crypto from 'crypto';
import { ITransactionId } from '../lib/eventLogger/interfaces/ILogDocument';

/**
 * ### HTTP
 *
 * Decorator for API functions which are called via an HTTP request. Takes the API method and wraps
 * it so that it gets data from the request and returns a sensible JSON response.
 *
 * @public
 * @param {Function} apiMethod API method to call
 * @return {Function} middleware format function to be called by the route when a matching request
 *   is made
 */
const http = function http(apiMethod) {
  return async function apiHandler(req, res, next) {
    // We define 2 properties for using as arguments in API calls:

    const transactionId: ITransactionId = {
      transactionId: crypto.randomBytes(32).toString('hex'),
      nameAPI: req.originalUrl ?? req.baseUrl
    };
    const object = req.body;
    const requestKeys = [
      `file`,
      `files`,
      `headers`,
      `params`,
      `query`,
      `clientIp`,
      `transactionId`
    ];
    const requestHeaders = req.headers;
    const httpReferrer =
      requestHeaders.referrer || requestHeaders.referer || requestHeaders[`client-referrer`];

    const options = {
      ..._.pick(req, requestKeys),
      user: req.user ? req.user : null,
      referrer: httpReferrer && url.parse(httpReferrer).hostname
    };

    try {
      const response = await apiMethod(object, options);

      /**
       * Setting response body in the res
       */
      res.body = response;

      if (req.method === `DELETE`) {
        // if response isn't empty then send 200
        if (response) return res.status(200).send(response);
        return res.status(204).end();
      }

      const contentType = res.get(`Content-Type`);

      // Keep CSV header and formatting
      if (contentType && contentType.indexOf(`text/csv`) === 0) {
        return res.status(200).send(response);
      }

      if (contentType && contentType.indexOf(`text/xml`) === 0) {
        res.statusCode(200).send(response);
      }

      // CASE: api method response wants to handle the express response
      // example: serve files (stream)
      if (_.isFunction(response)) {
        return response(req, res, next);
      }

      // Send a properly formatting HTTP response containing the data with correct headers
      res.json(response || {});
    } catch (err) {
      // To be handled by the API middleware
      next(err);
    }
  };
};

export default {
  http
};
