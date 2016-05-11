'use strict';

module.exports = {
  register: function(tagName, proto) {
    return document.registerElement(tagName, {prototype: proto});
  },

  setTemplate: function(element, templateName) {
    var template = document.querySelector('#template-' + templateName)
      , clone    = document.importNode(template.content, true);

    element.appendChild(clone);
  }
};
