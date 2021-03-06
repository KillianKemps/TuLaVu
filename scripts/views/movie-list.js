var MovieListView = Backbone.View.extend({

  el: '#app',

  events: {
    'submit form': 'addMovie',
    'change input[type="radio"]': 'seeMovie'
  },

  addMovie: function(event) {
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

  seeMovie: function(event) {
    var $input = $(event.currentTarget);
    var inputValue = $input.val();

    // On récupère le data-title du li parent
    var movieTitle = $input.parents('li').attr('data-title');

    // On regarde la collection si on a un modèle correspondant
    var targetModel = this.myMovieCollection.findWhere({
      title: movieTitle
    });

    // On met à jour la propriété seen
    if(targetModel) {
      targetModel.set({
        seen: inputValue === 'seen'
      });
    }

    this.render();
  },

  getTemplate: function(movieData) {
    var isSeenChecked = '';
    var isNotSeenChecked = 'checked';

    if(movieData.seen) {
      isSeenChecked = 'checked';
      isNotSeenChecked =  '';
    }

    var movieTemplate = '\
      <li data-title="' + movieData.title + '">\
        <h2>' + movieData.title + '</h2>\
        <img src="' + movieData.poster + '" />\
        <form>\
          <label for="seen">Vu</label>\
          <input ' + isSeenChecked + ' type="radio" class="movie-seen" name="movie" value="seen">\
          <label for="not-seen">Pas vu</label>\
          <input ' + isNotSeenChecked + ' type="radio" class="movie-unseen" name="movie" value="unseen">\
        </form>\
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

    var $movieTotal = this.$('.movie-total');
    var $movieSeenTotal = this.$('.movie-seen-total');
    var $movieUnseenTotal = this.$('.movie-unseen-total');

    // On le réinitialise
    $renderTarget.empty();

    // On récupère tous les films de la collection
    // Ce qui retourne un tableau d'objets
    var allMyMovies = this.myMovieCollection.toJSON();

    // On va comptabiliser les films vus
    var seenMovies = 0;

    for (var i = 0; i < allMyMovies.length; i++) {
      var movie = allMyMovies[i];

      if(movie.seen) {
        seenMovies++;
      }

      var movieTemplate = this.getTemplate(movie);

      // Une fois le template récupéré, on l'ajoute au DOM
      $renderTarget.append(movieTemplate);
    }

    // On affiche les statistiques
    $movieTotal.text(allMyMovies.length);
    $movieSeenTotal.text(seenMovies);
    $movieUnseenTotal.text(allMyMovies.length - seenMovies);
  }
});
