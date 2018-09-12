import { UserStore } from 'stores'

export default class Root extends React.Component {
  static propTypes = {
    location: React.PropTypes.object.isRequired,
    ifReferrerLocation: React.PropTypes.string.isRequired,
    ifAuthenticatedLocation: React.PropTypes.string.isRequired,
    ifUnauthenticatedLocation: React.PropTypes.string.isRequired
  }

  constructor(props) {
    if (props.location.query.ref) {
      let referrer = encodeURIComponent(props.location.query.ref)
      document.cookie = `ref=${referrer}; path=/; max-age=2592000` // one month
      window.location = props.ifReferrerLocation
    } else {
      if (UserStore.getState().authenticated) window.location = props.ifAuthenticatedLocation
      else window.location = props.ifUnauthenticatedLocation
    }

    super(props)
  }

  render() {
    return null
  }
}
