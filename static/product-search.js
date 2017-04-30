// function that lets to search the products
$(document).ready(function() {
  var $PRODUCTSEARCHBAR = $("#product_search");

  $PRODUCTSEARCHBAR.keyup(function () {
    console.log('Working!');
    var search_query = $("#product_search").val().trim().toLowerCase();
    if (search_query) {
      $("#search-results").find('a').each(function() {
        $("#search-results").removeAttr("style");
        if ($(this).text().trim().toLowerCase().startsWith(search_query)) {
          $(this).removeAttr("style");
        }
      });
    }
    else {
      $("#search-results").attr("style", "display:none");
      $("#search-results").find('a').each(function() {
          $(this).attr("style", "display:none");
      });
    }
  });
});
