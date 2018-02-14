AuthModalView = require './view.coffee'
mediator = require '../../lib/mediator.coffee'
sanitizeRedirect = require 'artsy-passport/sanitize-redirect'
_ = require 'lodash'

personalizeWithRedirect = (personalize, redirect) ->
  if redirect
    separator = if personalize.match /\?/ then '&' else '?'
    "#{personalize}#{separator}redirectTo=#{redirect}"
  else
    personalize

# Default options for the modal - passed to ModalView's super()
modalDefaults =
  backdrop: true
  transition: 'fade'

module.exports = (options) ->
  # console.log('hmmm even this isn\'t working 🤔 - ok now it is 😎')
  View = options.view || AuthModalView
  currentLocation = location.pathname

  { backdrop, transition, width } = options

  # standard authModal options
  { mode, redirectTo, copy, userData, personalize } = options
  # modalOpts.mode = mode


  { destination, successCallback } = options # Can't find a case where these are actually used.

  #InquireViaPhoneModalView
  { artistIds, context } = options


  redirectToWithDefault = if (redirectTo?) then sanitizeRedirect(redirectTo) else currentLocation

  # override personalize path with another string (or false to override onboarding + redirect immediately)
  personalize = personalize? && personalize || '/personalize'
  postLoginRedirectTo = encodeURIComponent(redirectToWithDefault)
  if (personalize)
    postSignupRedirectTo = encodeURIComponent(personalizeWithRedirect(personalize, redirectToWithDefault))
  else
    postSignupRedirectTo = postLoginRedirectTo
  

  modalOpts = _({
    # New stuff #
    viaEntrypoint: true,
    postSignupRedirectTo,
    postLoginRedirectTo,
    # New ends #
    copy,
    mode,
    userData,
    artistIds,
    context,
    destination,
    successCallback,
  }).omit(_.isUndefined)
  return new View(Object.assign {}, modalDefaults, modalOpts)
