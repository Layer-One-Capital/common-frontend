import axios from 'axios'
import { ApiHelper } from 'utils'

const PromotionAdminSource = {
  all: function(q) {
    return axios.get(ApiHelper.apiUrl('promotions')
    ).then(res => res.data)
  }
}

export default PromotionAdminSource
