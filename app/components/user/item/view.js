var app = require("app");

module.exports = Backbone.Layout.extend({
  template: _.template(require("text!components/user/item/template.html")),

  // Use the <TR> from the template.
  el: false,

  serialize: function() {
    return {
      model: this.model,
      repo: this.options.repo,
      user: this.options.user
    };
  }
});
