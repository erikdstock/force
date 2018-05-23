import React from 'react'
import renderTestComponent from '../../__tests__/utils/renderTestComponent'
import DOM from '../DOM'

const rewire = require('rewire')('../Layout')
const Layout = rewire.default

xdescribe.only('DOM Interactions', () => {
  describe.only('.handleRegister', () => {
    it('opens the login modal if there is no user', () => {
      rewire.__set__('ArtworkBrowser', () => <div />)
      const { wrapper } = renderTestComponent({
        Component: () => (
          <DOM>
            <Layout />
          </DOM>
        ),
        // Component: DOM,
        options: { renderMode: 'render' },
        data: {
          app: {
            user: { id: 'user' },
            auction: {
              name: 'An Auction',
            },
            me: {
              id: 'user',
              bidders: [],
              has_qualified_credit_cards: true,
            },
          },
        },
      })

      // const dom = wrapper.find(DOM).instance()
      // .handleRegister()
      // console.log(typeof dom)
      console.log(wrapper.find(DOM).instance())
      wrapper
        .find(DOM)
        .instance()
        .handleRegister()
      // const button = wrapper.find('body .js-register-button')
      // console.log(button.html())
      // button.simulate('click')
      // wrapper.simulate('click', '.js-register-button')
      wrapper
        .find('.accept-conditions-register')
        .exists()
        .should.be.true()
      // console.log(wrapper)
    })
    it('stays on the auction page if the user is already registered')
    it('opens the conditions of sale modal if there is a user with credit card')
    it(
      'redirects to auction-registration (the credit card form) if user does not have a credit card'
    )
  })
})
