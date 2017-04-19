import Alt from 'alt'
import chromeDebug from 'alt-utils/lib/chromeDebug'

const alt = new Alt()

if (!__PRERELEASE__ && !__RELEASE__)
  chromeDebug(alt)

export default alt
