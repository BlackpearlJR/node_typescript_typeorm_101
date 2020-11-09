
//Everything is working, The resource has been fetched and is transmitted in the message body.
export const OK = { code: 200, message: 'OK' };

// A new resource has been created
export const CREATED = { code: 201, message: 'CREATED' };

// The resource was successfully deleted, no response body
export const NO_CONTENT = { code: 204, message: 'NO CONTENT' };

// This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same cached version of the response.
export const NOT_MODIFIED = {
  code: 304,
  message: 'The condition set for an If-None-Match header was not met. This response indicates that the requested document has not been modified and that a cached response should be retrieved. Check the value of the If-None-Match HTTP request header.'
};

// The request was invalid or cannot be served. The exact error should be explained in the error payload.
export const BAD_REQUEST = {
  code: 400,
  message: 'The request failed because it contained an invalid value. The value could be a parameter value, a header value, or a property value.'
};

// The request requires user authentication.
export const UNAUTHORIZED = { code: 401, message: 'The user is not authorized to make the request.' };

// The server understood the request but is refusing it or the access is not allowed.
export const FORBIDDEN = { code: 403, message: 'The requested operation is forbidden and cannot be completed.' };

// There is no resource behind the URI.
export const NOT_FOUND = {
  code: 404,
  message: 'The requested operation failed because a resource associated with the request could not be found.'
};