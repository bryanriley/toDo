var source = $("#toDoTemplate").html();
var template = Handlebars.compile(source);

$('#popUp').removeClass('hidden');

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

      event.preventDefault();

      // grab user message input
      var toDoItem = $('#toDoItem').val()

      // clear message input (for UX purposes)
      $('#toDoItem').val('')

      // create a section for toDo data in your db
      var dataReference = toDoAppReference.ref('toDo');

      // use the set method to save data to the toDo
      dataReference.push({
        toDoItem: toDoItem,
        toDoStatus: 'Incomplete'
      })

      updateNumbers();

  });

  $('#toDoForm').keypress(function(event) {

    if(event.which == 13) {

      event.preventDefault();

      // grab user message input
      var toDoItem = $('#toDoItem').val()

      // clear message input (for UX purposes)
      $('#toDoItem').val('')

      // create a section for toDo data in your db
      var dataReference = toDoAppReference.ref('toDo');

      // use the set method to save data to the toDo
      dataReference.push({
        toDoItem: toDoItem,
        toDoStatus: 'Incomplete'
      })

      updateNumbers();

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
    event.preventDefault();
    console.log('Delete Clicked');

    var id = $(event.target.parentNode).attr('data-id');
    deleteMessage(id);
  });

  $('#toDoList').on('click', 'li .incomplete', function(event) {
    event.preventDefault();
    console.log('Incomplete Clicked');

    var id = $(event.target.parentNode).attr('data-id');
    var toDoStatus = $(event.target.parentNode).attr('data-toDoStatus');
    updateCompleteMessage(id, parseInt(toDoStatus));

    $(this).toggleClass();
    $(this).toggleClass('complete');
    var listItem = $(this).parent('li');
    $(listItem).addClass('completed');

  });

  $('#toDoList').on('click', 'li .complete', function(event) {
    event.preventDefault();
    console.log('Complete Clicked');

    var id = $(event.target.parentNode).attr('data-id');
    var toDoStatus = $(event.target.parentNode).attr('data-toDoStatus');
    updateIncompleteMessage(id, parseInt(toDoStatus));

    $(this).toggleClass();
    $(this).toggleClass('complete');
    var listItem = $(this).parent('li');
    $(listItem).removeClass('completed');

  });

  function getToDoListItems() {

    // use reference to app database to listen for changes in toDo data
    toDoAppReference.ref('toDo').on('value', function(results) {

      $('#toDoList li').remove();

      // iterate through results coming from database call - ie toDo
      results.forEach(function (firebaseData) {
        var toDoItem = firebaseData.val().toDoItem;
        var toDoStatus = firebaseData.val().toDoStatus;

        var toDoNumber = 1;

        // Templating
        var toDoData = {
          toDo: toDoItem,
          itemNumber: toDoNumber
        };

        // console.log('toDo:', toDoData.toDo);

        // Handlbars Templates
        var templateHtml = template(toDoData);

        var $html = $(templateHtml);
        $html.attr('data-id', firebaseData.key);
        $html.attr('data-toDoStatus', toDoStatus);

        // if ($('#toDoList li').data("todostatus") === 'Complete') {
        //   console.log('11');
        //     $('li.personal').addClass('completed');
        // } else if ($('#toDoList li').data("todostatus") === 'Incomplete') {
        //   console.log('aa');
        // } else {
        //   console.log('bb');
        // }

        $('#toDoList').append($html);

        updateNumbers();
        updateStatus();
        $('#popUp').addClass('hidden');

        // console.log(templateHtml);

      });

    });
  }

  function updateCompleteMessage(id, toDoStatus) {
    // find message whose objectId is equal to the id we're searching with
    var toDoReference =  toDoAppReference.ref('toDo').child(id);

    // update votes property
    toDoReference.update({
      toDoStatus: 'Complete'
    })

  }

  function updateIncompleteMessage(id, toDoStatus) {
    // find message whose objectId is equal to the id we're searching with
    var toDoReference =  toDoAppReference.ref('toDo').child(id);

    // update votes property
    toDoReference.update({
      toDoStatus: 'Incomplete'
    })


  }

  function deleteMessage(id) {
    // find message whose objectId is equal to the id we're searching with
    var toDoReference = toDoAppReference.ref('toDo/' + id)

    toDoReference.remove();
  }


  function updateNumbers() {
    $('.number').each(function(i) {
      if (i === 1) {
        return;
      }
      $(this).text(i);
    });
  }

  function updateStatus() {

    $('li[data-todostatus="Complete"]').addClass('completed');
    $('li[data-todostatus="Incomplete"]').removeClass('completed');

    // if ($('#toDoList li').data("todostatus") === 'Complete') {
    //   $('.status').addClass('complete');
    // }

    $('#toDoList li').each(function() {
      if ($(this).data('todostatus') === 'Complete') {
        $(this).children('.status').addClass('complete');
        console.log('TEST');
      }
    });

  }

  getToDoListItems();

});
