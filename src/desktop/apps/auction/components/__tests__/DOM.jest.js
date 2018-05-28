import { test } from '../DOM'
const { DOM } = test

jest.mock('jquery', x => () => ({ foo: 'bar' }))
jest.mock('desktop/lib/mediator.coffee', x => x => x)

describe('DOM Interactions', () => {
  describe('.handleRegister', () => {
    it('opens the login modal if there is no user', () => {
      DOM.prototype.componentDidMount = jest.fn()

      const dom = new DOM({
        user: { id: 'user' },
        auction: {
          name: 'An Auction',
        },
        me: {
          id: 'user',
          bidders: [],
          has_qualified_credit_cards: true,
        },
      })

      dom.handleRegister()
    })
    // it('stays on the auction page if the user is already registered')
    // it('opens the conditions of sale modal if there is a user with credit card')
    // it(
    //   'redirects to auction-registration (the credit card form) if user does not have a credit card'
    // )
  })
})
