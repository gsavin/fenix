'use strict';

const util = require('util');
const EventEmitter = require('events');

function ViewUtils() {
  EventEmitter.call(this);
}

util.inherits(ViewUtils, EventEmitter);

ViewUtils.prototype.init = function() {
  this.emit('init');
};

var viewUtils = new ViewUtils();

/**
 * Handle the opening/closing of submenu.
 *
 * Submenus are used in nav. It consists of a link, the opener, and the submenu.
 * The parent should contain only one submenu. Clicking on the opener toggles
 * the `opened` class on the submenu, so the CSS can handle the visibility of
 * this element.
 */
function installSubmenuOpeners() {
  var openers = document.querySelectorAll('.submenu-opener');

  for(let i = 0; i < openers.length; i++) {
    var opener  = openers[i]
      , submenu = opener.parentElement.querySelector('.submenu');

    if (!submenu) {
      return;
    }

    opener.addEventListener('click', function(e) {
      e.preventDefault();
      submenu.classList.toggle('opened');
    });
  }
}

viewUtils.on('init', installSubmenuOpeners);

module.exports = viewUtils;
