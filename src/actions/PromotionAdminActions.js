import alt from 'flux'
import { createActions } from 'alt-utils/lib/decorators'
import { PromotionAdminSource } from 'sources'
import moment from 'moment'

@createActions(alt)
export default class PromotionAdminActions {
  constructor() {
    this.generateActions(
      'setPromotions'
    )
  }

  all() {
    const actions = this.actions || this

    return PromotionAdminSource.all().then((results) => {
      actions.setPromotions(results)
    }).catch(resp => {
      alert('Oh, an error happened')
    })
  }
}
