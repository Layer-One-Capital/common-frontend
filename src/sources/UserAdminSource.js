import axios from 'axios'
import { ApiHelper } from 'utils'

const UserAdminSource = {
  search: function(q) {
    return axios.get(ApiHelper.apiUrl(`user_admin/search?q=${q}`)
    ).then(res => res.data)
  },

  makeRefund: function(params) {
    return axios.post(ApiHelper.apiUrl(`user_admin/refunds`), params
    )
  }
}

export default UserAdminSource
