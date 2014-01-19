export default Ember.Component.extend({
  weather: null,
  weatherDetails: Ember.computed.alias('weather.weather'),

  setupBackGroundImages: function(){
    this._setImageBackGround(this.get('weather.imageLarge'));
  }.on('didInsertElement'),

  setImage: function(){
    this._setImageBackGround(this.get('weather.imageLarge'));
  }.observes('weather.imageLarge'),

  // dd: function(){
  //   alert('dave');
  // }.observes('locations.@each.id'),

  actions: {
    saveLocation: function (location) {
      this.sendAction('saveLocationHandler', location);
    },
    removeLocation: function (location) {
      this.sendAction('removeLocationHandler', location);
    }
  },

  _setImageBackGround: function(image){
    this.$('.bg').css('background-image', 'url(' + image + ')');
    this.$('#bg').foggy({
      blurRadius: 12,
      opacity: 1
    });
  }

});
