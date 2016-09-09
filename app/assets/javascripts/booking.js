var exported;

$(document).ready(function() {


  $('.button-collapse').sideNav({
    edge: 'right', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  });


  var ticketBox = {};
  var priceTotal = 0;

  getTalks(createTicketBoard, shoppingCart);

  function getTalks(render, pool) {

    $.ajax({
      type: "GET",
      url: 'https://staar-conf.herokuapp.com/api/events'
    }).done(
      function(res){
        console.log(JSON.stringify(res));
        ticketBox = pool(res); //fetch from database ticketing info
        render(res); //Populate the ticket listing page
        // console.log(ticketBox.toString());
        switchEvent();
      }
    );

  }

  function createTicketBoard( talks ) {
    // generate a section for each talk
    var $talkList = $('<div>', {class: 'talk-list container'});
    var $pricePanel = $('<div>', {class: 'pricePanel'}).text("Total: $" + 0);

    talks.forEach(
      function (talk){
        // element generation

        var $talk = $('<div>', {class: "talk row"}).data('id', talk.id);
        var $talkHeader = $('<div>', {class: "talk-header col s12"});
        var $topic = $('<div>', {class: 'topic'}).text(talk.topic);
        var $time = $('<div>', {class: 'time'}).text("31st, Oct @ " + talk.session_time);
        var $ticketEntry = $('<div>', {class: "ticket-entry col s12"});
        var $ticketQty = $('<input>', {class: 'ticketQty', type: 'text', value: 0});
        var $priceSeat = $('<div>', {class: 'price-seat'});
        var $price = $('<div>', {class: 'price'}).text("Price: $" + talk.price);
        var $seats = $('<div>', {class: 'seats'}).text("Tickets Left: " + talk.seats);
        var $ticketForm = $('<div>', {class: 'ticketForm row col s12'});

        var $minusDiv = $('<div>', {class: 'minusDiv col s6'});
        var $plusDiv = $('<div>', {class: 'plusDiv col s6'});

        var $minusBtn = $('<button>', {class: 'minus waves-effect waves-light btn-large'}).text("-");
        var $plusBtn = $('<button>', {class: 'plus waves-effect waves-light btn-large'}).text("+");

        // appending
        // $ticketForm.append($ticketQty);
        $minusDiv.append($minusBtn);
        $plusDiv.append($plusBtn);
        $ticketForm.append($minusDiv);
        $ticketForm.append($plusDiv);

        $priceSeat.append($price);
        $priceSeat.append($seats);

        $ticketEntry.append($ticketQty);
        $ticketEntry.append($priceSeat);

        $talkHeader.append($topic);
        $talkHeader.append($time);

        $talk.append($talkHeader);
        $talk.append($ticketEntry);
        $talk.append($ticketForm);

        $talkList.append($talk)

      }
    );

    $('.ticketing').append($talkList);

    $talkList.append($pricePanel);
    $talkList.append("");


    //event bundling
    $('.minus').on('click', function(event) {
      var $qty = $(event.target).closest('.talk').find('.ticketQty');
      var ticket_id = $(event.target).closest('.talk').data('id');
      var currentQty = Number($qty.val());
      if(currentQty !== 0) {
        $qty.val(currentQty-1);
        ticketBox.updateTickets(ticket_id, currentQty-1);
        // debugger
      }else{
        ticketBox.updateTickets(ticket_id, 0);
      }
      $('.pricePanel').text("Total: $" + ticketBox.getTotal());
    });

    $('.plus').on('click', function(event) {
      var $qty = $(event.target).closest('.talk').find('.ticketQty');
      var ticket_id = $(event.target).closest('.talk').data('id');
      var currentQty = +$qty.val();
      if(currentQty < ticketBox.getSeats(ticket_id)){
        $qty.val(currentQty+1);
        ticketBox.updateTickets(ticket_id, currentQty+1);
        $('.pricePanel').text("Total: $" + ticketBox.getTotal());
      }

    });

    $('.ticketQty').on('focusout', function(event){
      var $qty = $(event.target).closest('.talk').find('.ticketQty');
      var ticket_id = $(event.target).closest('.talk').data('id');
      // updateTotal(ticket_id, $qty.val());

      if( /^\d+$/.test($qty.val()) && +$qty.val() <= ticketBox.getSeats(ticket_id) ){
        var qty = +$qty.val();
        console.log(qty);
        ticketBox.updateTickets(ticket_id, qty);
      }else if( +$qty.val() > ticketBox.getSeats(ticket_id)){
        $qty.val(ticketBox.getSeats(ticket_id));
        ticketBox.updateTickets(ticket_id, ticketBox.getSeats(ticket_id));
      }else{
        $qty.val(0);
        ticketBox.updateTickets(ticket_id, 0);
      }
      $('.pricePanel').text("Total: $" + ticketBox.getTotal());
    });


  }

  function switchEvent() {

    //click to switch to ticket listing page

    $('#buy-btn').on('click', function() {
      //reset all price fields and shopping cart

        ticketBox.clearBucket();
        $('.ticketQty').each(function () {
          $(this).val(0);
        });
        $('.pricePanel').text("total: $0");

    });

    //click to proceed to payment

    $('#book-btn').on('click', function(){
      $('.button-collapse').sideNav('hide');
      summary();//Display the payment summary
      exported = ticketBox;
      console.log(ticketBox.getTotal());
    });

    $( "#pay-btn" ).click(function(event) {
      $('.button-collapse').sideNav('hide');
    });



    //Create a summary of tickets bought

    function summary() {
      console.log(ticketBox.toString());
      var booked = ticketBox.getAllTickets();
      var $tickets = $('<table>', {class : 'tickets centered'});
      $('.summary-payment').empty();
      $tickets.append("<thead><tr><th data-field='name'>Ticket</th><th data-field='price'>Price</th><th data-field='qty'>Qty</th><th data-field='sub-total'>Sub Total</th></tr></thead>");

      var $ticket_body = $('<tbody>', {class : 'ticket-body'});
      for ( k in booked){
        if(booked[k] > 0){

            var $ticket = $('<tr>', {class : 'ticket'});
              var $topic = $('<td>', {class : 'topic_booked'}).text(ticketBox.getTopic(k));
              var $qty = $('<td>', {class : 'qty_booked'}).text(booked[k]);
              var $price = $('<td>', {class : 'single_price'}).text("$" + ticketBox.getPrice(k));
              var $sub_total = $('<td>', {class : 'sub_total'}).text("$" + ticketBox.calPrice(k, booked[k]));

          $ticket.append($topic);
          $ticket.append($price);
          $ticket.append($qty);
          $ticket.append($sub_total);
          $ticket_body.append($ticket);

        }

      }//summary-payment

      $ticket_body.append("<tr class='tfoot'><td colspan='3'>Total Price</td><td>$" + ticketBox.getTotal() +  "</td></tr>");
      $tickets.append($ticket_body);
      $('.summary-payment').append($tickets);
    }

  }

});


var shoppingCart = function (ticket_arr) {


  var initialize = function( t_arr ) {
    var t_obj = {};
    t_arr.forEach(function(t) {
        t_obj[t.id] = {topic: t.topic, time: t.session_time,  price: t.price, seats: t.seats}
    });
    return t_obj;
  }

  var ticketList = initialize(ticket_arr);
  var ticketBucket = {};

  return {
      updateTickets : function(t_id, qty) {
        //if(qty!==0){
          ticketBucket[t_id] = qty;
        //}
      },
      selfUpdate : function(callback){
        $.ajax({
          type: "GET",
          url: 'https://staar-conf.herokuapp.com/api/events'
        }).done(
          function(res){
            console.log(JSON.stringify(res));
            ticketList = initialize(res);
            callback(ticketList);
          }
        );
      },
      getTopic : function(t_id) {
        return ticketList[t_id].topic
      },
      getSeats : function(t_id) {
        return ticketList[t_id].seats
      },
      getPrice : function(t_id) {
        return ticketList[t_id].price
      },
      calPrice : function(t_id, qty) {
        return ticketList[t_id].price * qty
      },
      getTotal : function() {
        var sum = 0;
        $.each(ticketBucket, function(t_id, qty) {
          sum += ticketList[t_id].price * qty
        });
        return sum;
      },
      getAllTickets : function() {
        var ticketsBooked = {}
        $.each(ticketBucket, function(k, v) {
          if(v!==0){ticketsBooked[k] = v}
        });
        return ticketsBooked;
      },
      clearBucket : function() {
        ticketBucket = {};
      },
      toString : function() {
        $.each(ticketList, function(k, v){
          console.log(k + ":" + v.topic + " | " + v.price + " | " + v.seats);
        });
        $.each(ticketBucket, function(k, v){
          console.log(k + " : " + v);
        });
        // return ticketList.toString();
      }
  }
}
