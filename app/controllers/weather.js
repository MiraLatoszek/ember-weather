var WeatherController = Ember.ObjectController.extend({

  needs: ['locations'],

  locations: Ember.computed.alias('controllers.locations'),

  isSavedWeather: function(){
    if (this.get('locations').filterProperty('id', this.get('id')).length >= 1){
      return true;
    } else {
      return false;
    }
  }.property('id'),

  locationUpdated: function() {
    if (this.get('locations').filterProperty('id', this.get('id')).length >= 1) {
      this.set('isSavedWeather', true);
    } else {
      this.set('isSavedWeather', false);
    }
  }.observes('locations.@each.id')

});

export default WeatherController;

