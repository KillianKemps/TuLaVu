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
    var $renderTarget = this.$('.movie-list');

    // On le réinitialise
    $renderTarget.empty();

    // On récupère tous les films de la collection
    // Ce qui retourne un tableau d'objets
    var allMyMovies = this.myMovieCollection.toJSON();

    for (var i = 0; i < allMyMovies.length; i++) {
      var movie = allMyMovies[i];

      var movieTemplate = this.getTemplate(movie);
    }
  }
});
