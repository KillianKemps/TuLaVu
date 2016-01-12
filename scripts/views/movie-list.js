var MovieListView = Backbone.View.extend({

  el: '#app',

  events: {
  },

  initialize: function() {
    // On lie la collection à la vue en l'instanciant à l'intérieur
    this.myMovieCollection = new MovieCollection();

    this.render();
  },

  render: function() {
  }
});
