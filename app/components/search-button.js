import getJSON from "appkit/utils/get-json";

export default Ember.Component.extend({
  classNames: ['row', 'search'],
  searchTerm: null,
  name: 'name',
  results: [],

  triggerSearch: function (data) {
    var _this = this;
    var r = this.get('results');
    var d = r.map(function(item) {
        return {
          value: item.name,
          name: item.name,
          tokens: [item.name],
          emberObject: item
        };
      });
    window.console.log('d %o', d);
    this.$('input').typeahead({
      name: "typeahead",
      local: d
    });
  }.on('didInsertElement'),

  triggerAutoComplete: function () {
    var self = this;
    Ember.run.debounce(null, function () {
      getJSON('/api/search/' + self.get('searchTerm')).then(function (data) {
        self.set('results', self._parseResults(data));
      });
    }, 400);

  }.observes('searchTerm'),

  triggerTypeahead: function() {
    var _this = this;
    var r = this.get('results');
    var d = r.map(function(item) {
        return {
          value: item.name,
          name: item.name,
          tokens: [item.name],
          emberObject: item
        };
      });
    window.console.log('d %o', d);
    this.$('input').typeahead({
      name: "typeahead",
      local: d
    });
  }.observes('results'),

  // initializeTypeahead: function(){
  //   var _this = this;
  //   var data = this.get('results');
  //   debugger;
  //   this.typeahead = this.$().typeahead({
  //     name: "typeahead",
  //     limit: this.get("limit") || 5,
  //     local: data.map(function(item) {
  //       return {
  //         value: item.name,
  //         name: item.name,
  //         tokens: [item.name],
  //         emberObject: item
  //       };
  //     })
  //   });

  //   this.typeahead.on("typeahead:selected", function(event, item) {
  //     _this.set("selection", item.emberObject);
  //   });

  //   this.typeahead.on("typeahead:autocompleted", function(event, item) {
  //     _this.set("selection", item.emberObject);
  //   });

  //   if (this.get("selection")) {
  //     this.typeahead.val(this.get("selection.name"));
  //   }
  // }.observes('results'),


  // openResults: function() {
  //   if (this.get('results').length > 1) {

  //     var input = this.$().find('input'),
  //         inputOffsetTop = input.offset().top,
  //         inputOffsetLeft = input.offset().left,
  //         inputHeight = input.outerHeight(),
  //         topOffset = inputOffsetTop + inputHeight,

  //         resultDropdown = this.$().find('#result-dropdown');

  //     return resultDropdown.css({'top': topOffset, 'left': inputOffsetLeft});
  //   }
  // }.observes('results'),

  closeResultDropdown: function(){
    this.$('#result-dropdown').css({'left': '-999999px'});
  },

  actions: {
    search: function (val) {
      this.closeResultDropdown();
      this.set('searchTerm', val);
      this.sendAction("searchMessage", val);
    }
  },

  _parseResults: function(data){
    var parsedData = JSON.parse(data[1]);
    return parsedData.RESULTS.filterProperty('type', 'city');
  }
});
