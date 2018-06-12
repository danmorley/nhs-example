document.addEventListener("DOMContentLoaded", function(event) {
  hideMetaFields();
  addSequenceControlsInfoButton();
});

/**
 *  Hides all meta fields when the page loads.
 */
function hideMetaFields() {
  console.log('Hiding meta fields');
  var elems = document.getElementsByClassName("dct-meta-field");

  Array.prototype.forEach.call(elems, function(el) {
    el.parentElement.classList.add('dct-hidden-field');
  });
}

/**
 *  Adds info buttons to all panels that have been given the dct-meta-panel
 *  class.
 */
function addSequenceControlsInfoButton() {
  console.log('Adding sequence controls');
  var metaPanelElems = document.getElementsByClassName('dct-meta-panel');

  Array.prototype.forEach.call(metaPanelElems, function(el) {
    var parentContainerEl = el.parentElement.parentElement;
    var n = parentContainerEl.id.lastIndexOf('-');
    var rootId = parentContainerEl.id.substr(0, n);     // Strip container suffix.
    var buttonGroupEl = parentContainerEl.querySelector(".sequence-controls > .button-group");
    addInfoButton(buttonGroupEl, rootId);
  });
}

/**
 *  Adds a new info button to the given button groups allowing the user
 *  to toggle the meta fields on and off so that they can be hidden
 *  unless needed.
 */
function addInfoButton(buttonGroup, rootId) {
  var button = document.createElement('button');
  button.id = rootId + '-info';
  button.classList.add('button','icon', 'text-replace', 'icon-cogs');
  button.title = 'Info';
  button.addEventListener("click", function(e) {
      e.preventDefault();
      var rootElem = document.getElementById(rootId + '-container');
      var childElems = rootElem.getElementsByTagName('LI');
      Array.prototype.forEach.call(childElems, function(el) {
        el.classList.toggle('dct-hidden-field');
      });
  });
  buttonGroup.appendChild(button);
}
