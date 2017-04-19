import axios from 'axios'
import { ApiHelper } from 'utils'

const UserAdminSource = {
  search: function(q) {
    return axios.get(ApiHelper.apiUrl(`user_admin/search?q=${q}`)
    ).then(res => res.data)
  }
}

export default UserAdminSource
