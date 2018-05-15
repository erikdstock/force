import AcceptConditionsOfSaleModal from 'desktop/apps/auction_support/client/accept_conditions_of_sale_modal.coffee'
import ConfirmRegistrationModal from 'desktop/components/credit_card/client/confirm_registration.coffee'
import PropTypes from 'prop-types'
import mediator from 'desktop/lib/mediator.coffee'
import scrollToTop from 'desktop/apps/auction/utils/scrollToTop'
import { Component } from 'react'
import { connect } from 'react-redux'

class DOM extends Component {
  static propTypes = {
    auction: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    user: PropTypes.object,
  }

  // Selectors
  $ = null
  $body = null
  $registerBtn = null

  componentDidMount() {
    console.log('cdm')
    const FastClick = require('fastclick')

    // removes 300ms delay
    if (FastClick.attach) {
      FastClick.attach(document.body)
    }

    this.$ = require('jquery')
    this.addEventListeners()
    this.maybeShowConfirmRegistrationModal()
    console.log('before')

    this.maybeStartRegistrationFlow()
    console.log('after')
  }

  componentWillUnmount() {
    this.removeEventListeners()
  }

  addEventListeners() {
    this.$body = this.$('body')
    this.$body.find('.Sidebar').on('click', '.artsy-checkbox', scrollToTop)
    this.$registerBtn = this.$body.find('.js-register-button')
    this.$registerBtn.on('click', this.handleRegister)
  }

  removeEventListeners() {
    this.$body.off('click')
    this.$registerBtn.off('click', this.handleRegister)
  }

  handleRegister = event => {
    const { user, auction, me } = this.props
    if (!user) {
      mediator.trigger('open:auth', {
        mode: 'register',
        redirectTo: auction.registrationFlowUrl(),
        signupIntent: 'register to bid',
      })
    }
    if (me.has_qualified_credit_cards) {
      this.showAcceptConditions()
    } else {
      window.location.href = auction.registerUrl()
    }
  }

  maybeStartRegistrationFlow() {
    console.log('checking registration flow...')
    if (this.props.user && location.pathname.match('/registration')) {
      console.log('registration flow')
      this.handleRegister()
    }
  }

  maybeShowConfirmRegistrationModal() {
    console.log('maybe show confirm registration...')
    const { auction, user } = this.props
    if (user) {
      if (location.pathname.match('/confirm-registration')) {
        new ConfirmRegistrationModal({
          auction,
        })
      }
    }
  }

  // TODO: also support a link
  showAcceptConditions() {
    const { auction, user } = this.props
    if (user) {
      new AcceptConditionsOfSaleModal({
        auction,
      })
    }
  }

  render() {
    return this.props.children
  }
}

const mapStateToProps = state => ({
  auction: state.app.auction,
  user: state.app.user,
  me: state.app.me,
})

export default connect(mapStateToProps)(DOM)
