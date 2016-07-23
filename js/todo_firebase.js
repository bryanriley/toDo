var source = $("#toDoTemplate").html();
var template = Handlebars.compile(source);

$('#popUp').removeClass('hidden');

$('#logo').click(function () {
  $('#tttContainer').fadeIn();
});

$('.closeBtn').click(function () {
  $('#tttContainer').fadeOut();
});

$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDdLnV85rhpGwpqjMtwhkoj4Q2kqaEdj_8",
    authDomain: "todolist-14bd8.firebaseapp.com",
    databaseURL: "https://todolist-14bd8.firebaseio.com",
    storageBucket: "todolist-14bd8.appspot.com",
  };

  firebase.initializeApp(config);

  var toDoAppReference = firebase.database();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.uid = user.uid;
      $('#loginEmail').append(user.email);
      $('#loginDetails').fadeIn();
      $('#signout').fadeIn();
    }
    getToDoListItems();
  });

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
      var dataReference = toDoAppReference.ref('users/' + 'a');
      dataReference.push({
        toDoItem: toDoItem,
        toDoStatus: 'Incomplete'
      })

      function writeUserData(userId, name, email) {
        firebase.database().ref('users/' + userId).set({
          username: name,
          email: email
        });
      }
  });

  $('#toDoForm').keypress(function(event) {

    if(event.which == 13) {
      event.preventDefault();
      var toDoItem = $('#toDoItem').val()
      $('#toDoItem').val('')
      var dataReference = toDoAppReference.ref('toDo/users/' + uid);
      dataReference.push({
        toDoItem: toDoItem,
        toDoStatus: 'Incomplete'
      });
    }

    function writeUserData(userId, name, email) {
      firebase.database().ref('users/' + userId).set({
        username: name,
        email: email
      });
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

  $('#signout').on('click', function(event) {
    event.preventDefault();
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      window.location = '/login.html';

    }, function(error) {
      // An error happened.
    });
  });

  function getToDoListItems() {

    toDoAppReference.ref('toDo/users/' + uid).on('value', function(results) {

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
    var toDoReference =  toDoAppReference.ref('toDo/users/' + uid).child(id);
    toDoReference.update({
      toDoStatus: 'Complete'
    })
  }

  function updateIncompleteMessage(id, toDoStatus) {
    var toDoReference =  toDoAppReference.ref('toDo/users/' + uid).child(id);
    toDoReference.update({
      toDoStatus: 'Incomplete'
    })
  }

  function deleteMessage(id) {
    var toDoReference = toDoAppReference.ref('toDo/users/' + uid).child(id);
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

  function sendEmailVerification() {
    // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      // Email Verification sent!
      // [START_EXCLUDE]
      alert('Email Verification Sent!');
      // [END_EXCLUDE]
    });
    // [END sendemailverification]
  }

});
