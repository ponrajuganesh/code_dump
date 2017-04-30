// function that let's the admin to
// activate and De-activate the users
$(document).ready(function() {
  var $BTN = $(".permissions-button");
  var $SEARCHBAR = $("#username");

  $BTN.click(function () {
    var user_id;
    var user_type;
    var is_active;

    // prepare the permission data structure
    // based on button click
    if ($(this).text().trim() == "De-activate") {
      $(this).parent().parent().addClass("disabled")
      $(this).removeClass("btn-danger").addClass("btn-success");
      $(this).text('Activate');

      user_id = $(this).val();
      user_type = $(this).parent().parent().attr("value");
      is_active = 0;

    }
    else {
      $(this).parent().parent().removeClass("disabled")
      $(this).removeClass("btn-success").addClass("btn-danger");
      $(this).text('De-activate');

      user_id = $(this).val();
      user_type = $(this).parent().parent().attr("value");
      is_active = 1;
    }

    // calls the set_permissions function via AJAX
    // to write the data parameters to the data base
    $.getJSON($SCRIPT_ROOT + '/set_permissions', {
      user_id: user_id,
      user_type: user_type,
      is_active: is_active
    }, function(data) {
      console.log(data)
    });

  });

  // dynamically shows and hides the users
  $SEARCHBAR.keyup(function () {
    var search_query = $(this).val();
    if (search_query) {
      $("li.list-group-item").find(".col_8").each(function() {
        if ($(this).text().trim().indexOf(search_query) < 0) {
          console.log($(this).parent().attr("style", "display:none"));
        }
      });
    } else {
      $("li.list-group-item").each(function() {
        $(this).removeAttr("style");
      });
    }
  });
})
