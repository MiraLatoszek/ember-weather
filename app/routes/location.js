export default Ember.Route.extend({
  actions: {

    saveLocationHandler: function (location) {
      var id = location.get('title').split(", ").join('-').toLowerCase();
      var createdLocation = this.store.createRecord('location', {
        id: id,
        location: location.get('title'),
        lField: location.get('lField'),
        weather: location
      });
      createdLocation.save();
    }
  }

});