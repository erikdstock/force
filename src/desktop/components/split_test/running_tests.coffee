# Centralizes configuration for currently running split tests
#
# eg.
# header_design:
#   key: 'header_design'
#   outcomes:
#     old: 8
#     new: 2
#   edge: 'new'
#   dimension: 'dimension1' # Optional GA dimension
#   scope: 'local' # Optionally disable global initialization
#   control_group: 'old' #Defaults to `control`
#
# Note: if there are no running tests
# this should export empty Object
# module.exports = {}

module.exports = {
  artist_page_variants:
    key: 'artist_page_variants'
    outcomes:
      control: 25
      no_info: 25
      no_header: 25
      no_info_header: 25
    control_group: 'control'
    edge: 'no_info_header'
  merch_sort_test:
    key: 'merch_sort_test'
    outcomes:
      control: 50
      experiment: 50
    control_group: 'control'
    edge: 'experiment'
  gdpr_compliance_test:
    key: 'gdpr_compliance_test'
    outcomes:
      control: 100
      combined_terms_of_service: 0
      separated_terms_of_service: 0
    control_group: 'control'
    edge: 'gdpr_terms_of_service'
}
