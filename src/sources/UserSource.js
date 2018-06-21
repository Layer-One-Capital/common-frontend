import axios from 'axios'
import { ApiHelper } from 'utils'

const UserSource = {
  signin: function(params) {
    return axios.post(ApiHelper.apiUrl('sessions'), {
      signin: params
    }).then(res => res.data)
  },

  signup: function(params) {
    return axios.post(ApiHelper.apiUrl('signups'), {
      signup: params
    }).then(res => res.data)
  },

  forgotPassword: function(email) {
    return axios.post(ApiHelper.apiUrl('forgotten_password_requests'), {
      'forgotten_password_request': { email }
    }).then(res => res.data)
  },

  changePassword: function(token, params) {
    return axios.put(ApiHelper.apiUrl(`passwords/${token}`), {
      'change_password': params
    })
  },

  validatePromotion: function(code) {
    return axios.put(ApiHelper.apiUrl('promotions/validate'), {
      'code': code
    }).then(res => res.data)
  }
}

export default UserSource
