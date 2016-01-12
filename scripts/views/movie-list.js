var MovieListView = Backbone.View.extend({

  el: '#app',

  events: {
    'submit form': 'addMovie'
  },

  addMovie: function() {
    // Kill submit event
    event.preventDefault();

    var $form = $(event.currentTarget);
    var movieTitle = $form.find('.movie-title').val();
    var moviePoster = $form.find('.movie-poster').val();

    var newMovieModel = new MovieModel({
      title: movieTitle,
      poster: moviePoster
    });

    this.myMovieCollection.add(newMovieModel);

    // Une fois le film ajouté, on va vouloir l'afficher à l'écran
    this.render();
  },

  getTemplate: function(movieData) {
    var movieTemplate = '\
      <li>\
        <h2>' + movieData.title + '</h2>\
        <img src="' + movieData.poster + '" />\
      </li>\
    ';

    // On retourne la string convertie en HTML grâce à jQuery
    return $(movieTemplate);
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

      // Une fois le template récupéré, on l'ajoute au DOM
      $renderTarget.append(movieTemplate);
    }
  }
});
