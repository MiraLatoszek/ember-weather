import googleGeoLocations from "appkit/utils/google_geolocation";

export default Ember.Route.extend({

  model: function(){
    return this.store.find('location');
  },

  actions: {
    saveLocation: function(weather){

      var id = weather.get('title').split(", ").join('-').toLowerCase();

      var createdLocation = this.store.createRecord('location', {
        id: id,
        location: weather.get('title'),
        searchField: weather.get('searchField'),
        weather: weather
      });

      createdLocation.save();
    },

    removeLocation: function(weather){
      var locations = this.controllerFor('locations'),
          locationToBeRemoved = locations.findProperty('id', weather.id);

      locationToBeRemoved.deleteRecord();
      locationToBeRemoved.save();
    },

    handleTransition: function(location){
      this.transitionTo('weather', location);
    }
  }
});
