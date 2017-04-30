$(document).ready(function() {
  var $TABLE = $('#table');
  var $BTN = $('#export');

  // hide a row from the table
  $('#table-add').click(function () {
    var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
    $clone.removeAttr("style");
    $TABLE.find('table').append($clone);
  });

  $('.table-remove').click(function () {
    $(this).parents('tr').detach();
  });

  $('td').click(function () {
    if ($(this).text() == "Enter Qty" || $(this).text() == "Enter Price") {
      $(this).text("");
    }
  });

  // A few jQuery helpers for exporting only
  jQuery.fn.pop = [].pop;
  jQuery.fn.shift = [].shift;

  var data = [];
  $BTN.click(function () {
    var $rows = $TABLE.find('tr:not(:hidden)');
    var headers = [];
    var has_data = 0;

    // Get the headers (add special header logic here)
    $($rows.shift()).find('th:not(:empty)').each(function () {
      headers.push($(this).text().toLowerCase());
    });

    // Turn all existing rows into a loopable array
    $rows.each(function () {
      var $td = $(this).find('td');
      var h = {};
      console.log("HAS DATA 1 " + has_data);
      // Use the headers from earlier to name our hash keys
      var message = "";
      headers.forEach(function (header, i) {
        if (header != "add") {
          has_data = 1;

          if (! $.trim($td.eq(i).text()) || $td.eq(i).text() == "Enter Qty" || $td.eq(i).text() == "Enter Price" ) {

            if (i == 0) {
              message = "Qty missing";
            }
            else {
              message = "Cost missing";
            }

            $.notify({
              message: message
            },{
              type: 'danger'
            });
            return false;
          }

          if (! $.isNumeric($.trim($td.eq(i).text()))) {
            if (i == 0) {
              message = "Qty should be a number";
            }
            else {
              message = "Cost should be a number";
            }

            $.notify({
              message: message
            },{
              type: 'danger'
            });
            return false;
          }

          h[header] = $td.eq(i).text();
        }
      });
      console.log("HAS DATA 2 " + has_data);
      data.push(h);
    });

    if (has_data == 0) {
      $.notify({
        message: "No data! Add Qty and Cost"
      },{
        type: 'danger'
      });
      return false;
    }

    //
    $.getJSON($SCRIPT_ROOT + '/add_product_properties', {
      properties: JSON.stringify(data),
      product_id: $("#product_id").val()
    }, function(data) {
      $('#product_properties_mascot_block').removeAttr("style");
      $('#product_properties_mascot_message').text("Successfully updated product info");
    });

  });
})
