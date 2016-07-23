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

  // firebase.auth().signInAnonymously().catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  // });

  $('#registerCreate').click(function(event) {
      var name = $('#registerName').val();
      var email = $('#registerEmailAddress').val();
      var password = $('#registerPassword').val();
      $('#registerName').val('');
      $('#registerEmailAddress').val('');
      $('#registerPassword').val('');
      console.log(name);
      console.log(password);
      console.log(email);
      event.preventDefault();
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        $('#registerError').show();
        $('#registerError').append(errorMessage)
      });
  });

  $('#loginBtn').click(function(event) {
      var email = $('#loginEmailAddress').val();
      var password = $('#loginPassword').val();
      $('#loginEmailAddress').val('');
      $('#loginPassword').val('');
      console.log(password);
      console.log(email);
      event.preventDefault();
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        $('#loginError').show();
        $('#loginError').append(errorMessage)
      });
  });

  $('#signIn').click(function(event) {
    event.preventDefault();
    $('.register-form').hide();
    $('.login-form').fadeIn();
    console.log('signIn clicked');
  })

  $('#createAccount').click(function(event) {
    event.preventDefault();
    $('.login-form').hide();
    $('.register-form').fadeIn();
    console.log('signIn clicked');
  })

  $('#toDoForm').submit(function(event) {
      event.preventDefault();
      var toDoItem = $('#toDoItem').val();
      $('#toDoItem').val('');
      var dataReference = toDoAppReference.ref('toDo');
      dataReference.push({
        toDoItem: toDoItem,
        toDoStatus: 'Incomplete'
      })
  });

  $('#toDoForm').keypress(function(event) {

    if(event.which == 13) {
      event.preventDefault();
      var toDoItem = $('#toDoItem').val()
      $('#toDoItem').val('')
      var dataReference = toDoAppReference.ref('toDo');
      dataReference.push({
        toDoItem: toDoItem,
        toDoStatus: 'Incomplete'
      })
    }
});

  $('#toDoList').on('click', 'li .delete', function(event) {
    event.preventDefault();
    var id = $(event.target.parentNode).attr('data-id');
    deleteMessage(id);
  });

  $('#toDoList').on('click', 'li .incomplete', function(event) {
    event.preventDefault();
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
    var id = $(event.target.parentNode).attr('data-id');
    var toDoStatus = $(event.target.parentNode).attr('data-toDoStatus');
    updateIncompleteMessage(id, parseInt(toDoStatus));
    $(this).toggleClass();
    $(this).toggleClass('complete');
    var listItem = $(this).parent('li');
    $(listItem).removeClass('completed');

  });

  function getToDoListItems() {

    toDoAppReference.ref('toDo').on('value', function(results) {

      $('#toDoList li').remove();

      results.forEach(function (firebaseData) {
        var toDoItem = firebaseData.val().toDoItem;
        var toDoStatus = firebaseData.val().toDoStatus;
        var toDoNumber = 1;
        var toDoData = {
          toDo: toDoItem,
          itemNumber: toDoNumber
        };
        var templateHtml = template(toDoData);
        var $html = $(templateHtml);
        $html.attr('data-id', firebaseData.key);
        $html.attr('data-toDoStatus', toDoStatus);

        $('#toDoList').append($html);
        updateNumbers();
        updateStatus();
        $('#popUp').addClass('hidden');

        // console.log(templateHtml);
      });
      updateProgress();
    });
  }

  function updateCompleteMessage(id, toDoStatus) {
    var toDoReference =  toDoAppReference.ref('toDo').child(id);
    toDoReference.update({
      toDoStatus: 'Complete'
    })
  }

  function updateIncompleteMessage(id, toDoStatus) {
    var toDoReference =  toDoAppReference.ref('toDo').child(id);
    toDoReference.update({
      toDoStatus: 'Incomplete'
    })
  }

  function deleteMessage(id) {
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
    $('#toDoList li').each(function() {
      if ($(this).data('todostatus') === 'Complete') {
        $(this).children('.status').addClass('complete');
      }
    });
  }

  function updateProgress() {
    var toDoProgress = $("li.completed").length * 10;
    var toDoCount = $("#toDoList li").length * 10;
    var totalProgress = toDoProgress/toDoCount * 100;
    $('#progressBar').animate({width: (totalProgress) + '%' }, 500);
  }

  getToDoListItems();

});
