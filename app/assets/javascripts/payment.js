$(function() {
  var $form = $('#payment-form');
  $form.submit(function(event) {
    // Disable the submit button to prevent repeated clicks:
    $form.find('.submit').prop('disabled', true);
    // $('#loader').empty();
    $('#loader').append("<div class='progress'><div class='indeterminate'></div></div>");
    // Request a token from Stripe:
    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from being submitted:
    return false;
  });
});

function stripeResponseHandler(status, response) {
  // Grab the form:
  var $form = $('#payment-form');

  if (response.error) {
    // Show the errors on the form:
    $form.find('.payment-errors').text(response.error.message);
    $form.find('.submit').prop('disabled', false); // Re-enable submission

  } else {
    // Get the token ID:
    var firstname = $form.find('#first_name').val();
    var surname = $form.find('#last_name').val();
    var email_ = $form.find('#email').val();

    var token_ = response.id;
    var amount_ = exported.getTotal();
    var alltickets = exported.getAllTickets();
    console.log(amount_);
    console.log(token_);
    console.log(exported.toString());

    $.ajax({
      type:"POST",
      url:"http://localhost:3000/api/charges",
      data:{token : token_,
            amount : amount_,
            info : { fname : firstname,
                     sname : surname,
                     email : email_,
                     tickets : alltickets
                   }
          }

    }).done(function(res){

      console.log(res);
      var $paymentContainer = $('.payment-container');
      $("#payment").empty();

      var page_content = "<div class='.done'>" +
        "<i id='tick' class='large material-icons'>done</i>" +
        "<h4 id='payment-successful' class='center-align line-height-h4'>Payment Successful</h4>" +
        "<p id='payment-text' class='center-align line-height'>Your tickets along with your payment confirmation have been emailed to you</p>" +
        "<p id='payment-text2' class='center-align line-height'>See you there!</p>" +
        "<a id='home-btn' class='waves-effect waves-light btn-large'>Home</a></div>";

      $("#payment").append(page_content);

      $( "#home-btn" ).click(function(event) {
        //go back to homepage

        $('.ticketQty').each(function () {
          $(this).val(0);
        });
        exported.clearBucket();
        $('.pricePanel').text("total: $0");
        exported.selfUpdate(updateSeats);
        $('.button-collapse').sideNav('hide');
        window.scrollTo(0, 0);

        $("#payment").empty();
        $("#payment").append($paymentContainer);
        $("#loader").empty();

        var $form = $('#payment-form');
        $form.submit(function(event) {
          // Disable the submit button to prevent repeated clicks:
          $form.find('.submit').prop('disabled', true);
          $('#loader').append("<div class='progress'><div class='indeterminate'></div></div>");
          // Request a token from Stripe:
          Stripe.card.createToken($form, stripeResponseHandler);

          // Prevent the form from being submitted:
          return false;
        });

      });

      function updateSeats(lastest) {
        $(".seats").each(function() {
          var theId = $(this).closest('.talk').data('id');
          $(this).text("Tickets left: " + lastest[theId].seats);
        });
      }

    });
  }
}
