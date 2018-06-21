import alt from 'flux'
import { createStore, datasource, bind } from 'alt-utils/lib/decorators'
import { PromotionAdminActions } from 'actions'

@createStore(alt)
export default class PromotionAdminStore {
  constructor() {
    this.state = {
      promotions: []
    }
    this.bindActions(PromotionAdminActions)
  }

  static displayName = 'PromotionAdminStore'

  setPromotions(promotions) {
    this.setState({ promotions })
  }
}
