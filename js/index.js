$(document).ready(function () {
  //Page Loder
  jQuery(window).load(function () {
    $('.overlay').fadeOut('slow');
  });

  $('input[type=text]').focusin(function () {
    $('.form-group').css('width', '100%');
  }).focusout(function () {
    if ($('input[type=text]').val().length < 1) {
      $('#search-icon').removeClass('glyphicon glyphicon-remove');
      $('#search-icon').addClass('glyphicon glyphicon-search');
      $('.form-group').css('width', '130px');
      $('.search').removeClass('top');
      $('.search').addClass('middle');
    }
  });

  $('body').on('click', '.result', function () {
    window.open('https://en.wikipedia.org/wiki/' + $(this).children('.title').text(), '_blank');
  });

  //Use enter key to search for Wikipedia entries
  $(document).keypress(function (key) {
    if (!$('input[type=text]').is(":focus")) {
      return;
    } else if ($('input[type=text]').val().length < 1) {
      return;
    } else if (key.which == 13) {
      getPages();
    }
  });

  $('#search-icon').click(function () {
    if ($(this).hasClass('glyphicon-remove')) {
      $('#footer').hide();
      $('#search-icon').removeClass('glyphicon glyphicon-remove');
      $('#search-icon').addClass('glyphicon glyphicon-search');
      $('input[type=text]').val('');
      $('#search-container').css('height', '100vh');
      $('.form-group').css('width', '130px');
      $('.search').removeClass('top');
      $('.search').addClass('middle');
      $('#results').empty();
      $('#results').addClass('hidden');
      $('#footer').fadeIn('slow');
    }

    if ($('input[type=text]').val().length < 1) {
      return;
    }

    getPages();
  });

  function getPages() {
    $('#search-icon').removeClass('glyphicon glyphicon-search');
    $('#search-icon').addClass('glyphicon glyphicon-remove');
    $('.search').addClass('top');
    $('.search').removeClass('middle');
    $('#search-container').css('height', '300px');
    $('#results').removeClass('hidden');

    var searchItem = $('input[type=text]').val();
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&limit=15&list=search&utf8=1&srsearch=" + searchItem + "&callback=?", function (json) {
      var pages = json.query.search.length;
      for (var index = 0; index < pages; index++) {
        var pageTitle = json.query.search[index].title;
        var pageSnippet = json.query.search[index].snippet + '...';
        $('#results').append('<div class="result"><div class="title">' + pageTitle + '</div><div class="snippet">' + pageSnippet + '</div></div>');
      }
    });
  }

});
