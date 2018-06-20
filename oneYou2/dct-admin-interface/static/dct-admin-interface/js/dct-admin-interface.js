document.addEventListener("DOMContentLoaded", function(event) {
  hideMetaFields();
  addSequenceControlsInfoButton();
  addMetaBlockInfoButton();
});

document.addEventListener("DOMNodeInserted", function(event) {
  var elem = event.target;
  if (elem && elem.classList && elem.classList.contains('sequence-member')) {
    hideMetaFields();
    addSequenceControlsInfoButton();
    addMetaBlockInfoButton();
  }
});

/**
 *  Hides all meta fields when the page loads.
 */
function hideMetaFields(newElem) {
  console.log('Hiding meta fields');
  var elems = [ newElem ];
  if (!newElem)
    elems = document.getElementsByClassName("dct-meta-field");

  Array.prototype.forEach.call(elems, function(el) {
    if (el && !el.classList.contains('error'))
      el.parentElement.classList.add('dct-hidden-field');
  });
}

/**
 *  Adds info buttons to all panels that have been given the dct-meta-panel
 *  class.
 */
function addSequenceControlsInfoButton(newElem) {
  console.log('Adding sequence controls');
  var metaPanelElems = [ newElem ];
  if (!newElem)
    metaPanelElems = document.getElementsByClassName('dct-meta-panel');

  Array.prototype.forEach.call(metaPanelElems, function(el) {
    var parentContainerEl = el.parentElement.parentElement;
    var n = parentContainerEl.id.lastIndexOf('-');
    var rootId = parentContainerEl.id.substr(0, n);     // Strip container suffix.
    var buttonGroupEl = parentContainerEl.querySelector(".sequence-controls > .button-group");
    console.log('buttonGroupEl is ', buttonGroupEl);
    // if (!buttonGroupEl) buttonGroupEl = addButtonGroup(el);
    addInfoButton(buttonGroupEl, rootId);
  });
}

function addMetaBlockInfoButton(newElem) {
  console.log('Adding meta block controls');
  var metaBlockElems = [ newElem ];
  if (!newElem)
    metaBlockElems = document.getElementsByClassName('dct-meta-block');

  Array.prototype.forEach.call(metaBlockElems, function(el, n) {
    var rootId = uuidv4();
    el.id = rootId + '-container';
    var buttonGroupEl = addButtonGroup(el, rootId);
    addInfoButton(buttonGroupEl, rootId);
  });
}

/**
 *  Adds a new info button to the given button groups allowing the user
 *  to toggle the meta fields on and off so that they can be hidden
 *  unless needed.
 */
function addInfoButton(buttonGroup, rootId) {
  console.log('adding button to ', buttonGroup);
  var buttonId = rootId + '-info';
  var existingButton = document.getElementById(buttonId);
  if (existingButton) return;

  var button = document.createElement('button');
  button.id = buttonId;
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

/**
 *  Adds a new info button to the given button groups allowing the user
 *  to toggle the meta fields on and off so that they can be hidden
 *  unless needed.
 */
function addButtonGroup(el) {
  console.log('Adding button group', el);

  var buttonGroup = document.createElement('div');
  buttonGroup.classList.add('sequence-controls');
  var heading = document.createElement('h3');
  var label = document.createElement('label');
  label.innerHTML = 'Image';
  heading.appendChild(label);
  buttonGroup.appendChild(heading);
  var group = document.createElement('div');
  group.classList.add('button-group', 'button-group-square');
  buttonGroup.appendChild(group);
  el.insertBefore(buttonGroup, el.childNodes[0]);
  return group;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
