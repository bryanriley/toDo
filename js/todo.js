'use strict';
var toDoList = {};

// Compile element using handlebars
toDoList.compileItem = function(item) {
  var source = $('#to-do-template').html();
  var template = Handlebars.compile(source);
  return template(item);
}

// Note: this starter data is usually loaded from somewhere
toDoList.todos = [{toDo: "Clean fridge"}, {toDo: "Take out Puppy"}, {toDo: "Finish work"} ];

toDoList.addToList = function(list, item) {
    var itemObject = {toDo: item.val()};
    toDoList.todos.push(itemObject);
    var compiledItem = toDoList.compileItem(itemObject)
    list.append(compiledItem);
    $('#new-thing').val('');
}

// Initial population of the list from todos array
toDoList.populateList = function(list) {
  for (var i=0; i<toDoList.todos.length; ++i) {
    var newItem = toDoList.compileItem(toDoList.todos[i]);
    list.append(newItem);
  }
}

// Remove both the data from the model/array and from the DOM
toDoList.removeFromList = function($list, $item) {
  var itemIndex = $item.index();

  // Remove item from main data array
  if (itemIndex > -1)
      toDoList.todos.splice(itemIndex, 1);

  // Remove dom element of item
  $item.remove();
}

$(function() {

  var $thingList = $('#toDoList'),
      $button = $('#newItemButton');

  toDoList.populateList($thingList);

  /************************* Event Handlers *************************/
  $button.on('click', function(event) {
    event.preventDefault();
    var $newItemText = $('#newItem');
    if($newItemText.val())
      toDoList.addToList($thingList, $newItemText);
  });

  $thingList.on('click', 'a.incomplete', function(e) {
    e.preventDefault();
    var listItem = $(this).parent('li');
    $(this).parent().toggleClass('completed');
    $(this).addClass('complete');
    // $('li.personal > .status').removeClass('incomplete');
  });

  $thingList.on('click', 'a.complete', function(e) {
    e.preventDefault();
    var listItem = $(this).parent('li.complete');
    $(this).parent().removeClass('completed');
    $(this).removeClass('complete');
  });

  $thingList.on('click', 'a.delete', function(e) {
    e.preventDefault();
    var $listItem = $(this).parent('li');
    toDoList.removeFromList($thingList, $listItem);
  });

  /************************* End Event Handlers *************************/
});
