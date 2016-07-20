var source = $("#toDoTemplate").html();
var template = Handlebars.compile(source);




// Set number as 1
// Each time a toDo item is added, ++
// Get new toDo item value and ++
// Update new toDo item value in firebase

var toDoNumber = 1;

$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB1U2ekfGtzjTR6D4KpK4EDnNDl8MXyG-U",
    authDomain: "todo-fbda0.firebaseapp.com",
    databaseURL: "https://todo-fbda0.firebaseio.com",
    storageBucket: "todo-fbda0.appspot.com",
  };

  firebase.initializeApp(config);

  var toDoAppReference = firebase.database();

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
      var toDoItem = $('#toDoItem').val()

      // clear message input (for UX purposes)
      $('#toDoItem').val('')

      // create a section for toDo data in your db
      var dataReference = toDoAppReference.ref('toDo');

      // use the set method to save data to the toDo
      dataReference.push({
        toDoItem: toDoItem,
        toDoNumber: toDoNumber
      })

      // toDoNumber++

      // updateNumbers();


  });

  $('#toDoForm').keypress(function(event) {

    if(event.which == 13) {
      // by default a form submit reloads the DOM which will subsequently reload all our JS
      // to avoid this we preventDefault()
      event.preventDefault()

      // grab user message input
      var toDoItem = $('#toDoItem').val()

      // clear message input (for UX purposes)
      $('#toDoItem').val('')

      // create a section for toDo data in your db
      var dataReference = toDoAppReference.ref('toDo');

      // use the set method to save data to the toDo
      dataReference.push({
        toDoItem: toDoItem,
        toDoNumber: toDoNumber
      })

      // toDoNumber++

      // updateNumbers();

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

  $('#toDoList').on('click', 'li .delete', function(event) {
    console.log('Delete Clicked');

    var id = $(event.target.parentNode).attr('data-id');
    deleteMessage(id);
    // updateNumbers();
  });

  function getFanMessages() {

    // use reference to app database to listen for changes in toDo data
    toDoAppReference.ref('toDo').on('value', function(results) {

      $('#toDoList li').remove();

      // iterate through results coming from database call - ie toDo
      results.forEach(function (firebaseData) {
        var toDoItem = firebaseData.val().toDoItem;
        var toDoNumber = firebaseData.val().toDoNumber;

        // Add Id as data attr so we can refer to later for updating
        // $newList.attr('data-votes', votes);

        // Templating
        var toDoData = {
          toDo: toDoItem,
          itemNumber: toDoNumber
        };

        console.log('toDo:', toDoData.toDo);

        // Handlbars Templates
        var templateHtml = template(toDoData);

        var $html = $(templateHtml);
        $html.attr('data-id', firebaseData.key);

        $('#toDoList').append($html);

        // console.log(templateHtml);

      });

    });
  }

  // function updateMessage(id, votes) {
  //   // find message whose objectId is equal to the id we're searching with
  //   var messageReference =  toDoAppReference.ref('toDo').child(id);
  //
  //   // update votes property
  //   messageReference.update({
  //     votes: votes
  //   })
  // }

  function deleteMessage(id) {
    // find message whose objectId is equal to the id we're searching with
    var toDoReference = toDoAppReference.ref('toDo/' + id)

    toDoReference.remove();
  }


  // function updateNumbers() {
  //   //get all .number's and iterate over them
  //   //using the index of the iterator, update the numbers.
  //
  //   $('.number').forEach(function(i) {
  //
  //   });
  // }

  getFanMessages();

});
