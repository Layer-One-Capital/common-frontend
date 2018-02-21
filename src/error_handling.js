import axios from 'axios';
import { NoticeActions } from 'actions'

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  if ((error.status != 422) && (error.config.url.indexOf('healthcheck') == -1)) {
    console.log('server returned error response', error);
    // 422 errors should be handled by the individual handlers, everything else we can assume is not handled
    NoticeActions.setGenericError();
  }
  return Promise.reject(error);
});
