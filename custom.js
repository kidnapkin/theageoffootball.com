
jQuery(document).ready(function ($) {
  var title = document.title, url = $(location).attr('href'), temp = -1

  $(window).on('scroll', function () {
    e = $(this).scrollTop();

    for (var items = $(".gallery-format-list .gallery-format-item"), i = 0, f = 0; i < items.length; ++i) {
      if (isScrolledIntoView(items[i])) {
        $title = title + " - страница " + (i + 1 - f),
          $url = url + (i + 1 - f),
          temp !== i && (temp = i,
            changeUrl($title, $url),
            updateLiveInternetCounter());
        break
      }
    }
  });

  function changeUrl(page, url) {
    if (history.pushState) {
      var opts = {
        page,
        url
      };
      window.history.pushState(opts, opts.page, opts.url)
    }
    document.title = page;
  }

  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop() + 100;
    var elemTop = $(elem).offset().top;
    return elemTop + $(elem).height() >= docViewTop && elemTop <= docViewTop;
  }

  function updateLiveInternetCounter() {
    (new Image).src = "//counter.yadro.ru/hit?title=" + ("undefined" == typeof screen ? "" : ";s" + screen.width + "*" + screen.height + "*" + (screen.colorDepth ? screen.colorDepth : screen.pixelDepth)) + ";u" + escape(document.URL) + ";h" + escape(document.title.substring(0, 150)) + ";" + Math.random()
  }
});
