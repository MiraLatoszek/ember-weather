import getJSON from "appkit/utils/get-json";

var TypeAheadComponent = Ember.Component.extend({
  searchTerm: null,

  setUpTypeahead: function() {
    this._super();
    var _this = this;
    var input = this.$('input');

    this.typeahead = input.typeahead({
      name: 'searchTerm',
      valueKey: 'name',
      remote: '/api/search/%QUERY'
    });

    this.typeahead.on("typeahead:selected", function(event, item) {
      window.console.log('item %o', item.name);
      _this.sendAction("searchMessage", item.name);
    });

    this.typeahead.on("typeahead:autocompleted", function(event, item) {
      window.console.log('item2 %o', item.name);
      _this.set("selection", item.name);
    });
  }.on('didInsertElement')

});

export default TypeAheadComponent;
