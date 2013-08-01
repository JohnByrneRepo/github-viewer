import app from "app";
import template from "text!components/commit/item/template.html";

var Layout = Backbone.Layout.extend({
  template: _.template(template),

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

export default Layout;
