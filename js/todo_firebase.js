var source = $("#toDoTemplate").html();
var template = Handlebars.compile(source);

$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB1U2ekfGtzjTR6D4KpK4EDnNDl8MXyG-U",
    authDomain: "todo-fbda0.firebaseapp.com",
    databaseURL: "https://todo-fbda0.firebaseio.com",
    storageBucket: "todo-fbda0.appspot.com",
  };

  firebase.initializeApp(config);

  var messageAppReference = firebase.database();

  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

  $('#toDoForm').submit(function(event) {
      // by default a form submit reloads the DOM which will subsequently reload all our JS
      // to avoid this we preventDefault()
      event.preventDefault()

      // grab user message input
      var message = $('#toDoItem').val()

      // clear message input (for UX purposes)
      $('#toDoItem').val('')

      // create a section for messages data in your db
      var messagesReference = messageAppReference.ref('messages');

      // use the set method to save data to the messages
      messagesReference.push({
        message: message,
        votes: 0
      })
  });

  $('#toDoForm').keypress(function(event) {

    if(event.which == 13) {
      // by default a form submit reloads the DOM which will subsequently reload all our JS
      // to avoid this we preventDefault()
      event.preventDefault()

      // grab user message input
      var message = $('#toDoItem').val()

      // clear message input (for UX purposes)
      $('#toDoItem').val('')

      // create a section for messages data in your db
      var messagesReference = messageAppReference.ref('messages');

      // use the set method to save data to the messages
      messagesReference.push({
        message: message,
        votes: 0
      })
    }
});

  // $('.message-board').on('click', 'li .fa-thumbs-up', function(event) {
  //   var id = $(event.target.parentNode).attr('data-id');
  //   var votes = $(event.target.parentNode).attr('data-votes');
  //   updateMessage(id, parseInt(votes) + 1);
  // });
  //
  // $('.message-board').on('click', 'li .fa-thumbs-down', function(event) {
  //   var id = $(event.target.parentNode).attr('data-id');
  //   var votes = $(event.target.parentNode).attr('data-votes');
  //   updateMessage(id, parseInt(votes) - 1);
  // });
  //
  // $('.message-board').on('click', 'li .fa-remove', function(event) {
  //   var id = $(event.target.parentNode).attr('data-id');
  //   deleteMessage(id);
  // });

  function getFanMessages() {

    // use reference to app database to listen for changes in messages data
    messageAppReference.ref('messages').on('value', function(results) {

      $('#toDoList li').remove();

      // iterate through results coming from database call - ie messages
      results.forEach(function (fbMessage) {
        var msg = fbMessage.val().message;
        // var votes = fbMessage.val().votes;

        // load the results into the DOM
        console.log('msg:', msg);

        // Create new jQuery object of list
        var $newList = ($('<li class="personal"></li>'));

        // Add Id as data attr so we can refer to later for updating
        $newList.attr('data-id', fbMessage.key);
        // $newList.attr('data-votes', votes);

        // Add msg to Li
        $newList.html(template);

        //show votes
        // $newList.append('<i style="padding: 0px 5px;" class="fa fa-thumbs-up" aria-hidden="true"></i><i style="padding: 0px 5px;" class="fa fa-thumbs-down" aria-hidden="true"></i><i style="padding: 0px 5px;" class="fa fa-remove" aria-hidden="true"></i><div class="pull-right">' + votes + '</div>');

        // add message to list
        $('#toDoList').append($newList);

        // var toDoNumber = 1;
        //
        // toDoNumber++


        // Templating
        var articleContent = {
          toDo: msg
          // number: toDoNumber
        };
        console.log('toDo:', articleContent.toDo);

        // Handlbars Templates
        var templateHtml = template(articleContent);

        // Create jQuery object
        var $html = $(templateHtml);
        console.log(templateHtml);
        // console.log($(html));

        // $("#main").append($html);
        });

    });
  }

  // function updateMessage(id, votes) {
  //   // find message whose objectId is equal to the id we're searching with
  //   var messageReference =  messageAppReference.ref('messages').child(id);
  //
  //   // update votes property
  //   messageReference.update({
  //     votes: votes
  //   })
  // }
  //
  // function deleteMessage(id) {
  //   // find message whose objectId is equal to the id we're searching with
  //   var messageReference = messageAppReference.ref('messages/' + id)
  //
  //   messageReference.remove();
  // }

  getFanMessages();

});
