const keys = config.analyticKeys
analytics.load((__RELEASE__) ? keys.production : keys.development)

// expects the Segment analytics.js snippet (see index.html)
export default class Analytics {
  static identify(uid, traits) {
    analytics.identify(uid, traits)
  }

  static reset() {
    analytics.reset()
  }

  static page(category, name, properties, options, callback) {
    analytics.page(category, name, properties, options, callback)
  }

  static track(event, properties, options, callback) {
    analytics.track(event, properties, options, callback)
  }

  static completeOrder(paymentReference, jobId, jobName, jobTemplateId, totalUSD) {
    // The code below might work okay for jobs with a single payment step item.
    // But those with multiple payment step items may show weird data.
    // Really there's a single order (job) with multiple payments, however they're completed in different sessions
    //  meaning the mapping to standard ecommerce properties isn't possible (order > line items).

    //https://segment.com/docs/spec/ecommerce/#completing-an-order
    //https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce

    analytics.track('Completed Order', {
      orderId: paymentReference,
      total: totalUSD,
      currency: 'USD',
      products: [
        {
          id: jobTemplateId,
          sku: jobId,
          name: jobName,
          price: totalUSD,
          quantity: 1
        }
      ]
    })
  }

  static showLiveChat() {
    analytics.ready(function() {
      $zopim(function() {
        $zopim.livechat.button.show()
      })
    })
  }

  static hideLiveChat() {
    analytics.ready(function() {
      $zopim(function() {
        $zopim.livechat.hideAll()
      })
    })
  }

  static popupLiveChat() {
    analytics.ready(function() {
      $zopim(function() {
        $zopim.livechat.window.show()
      })
    })
  }
}
