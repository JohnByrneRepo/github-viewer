import app from "app";
import template from "text!components/user/list/template.html";
import Item from "components/user/item/view";

var Layout = Backbone.Layout.extend({
  template: _.template(template),

  serialize: function() {
    return { users: this.options.users };
  },

  beforeRender: function() {
    this.options.users.each(function(user) {
      this.insertView(".user-list", new Item({
        model: user
      }));
    }, this);
  },

  afterRender: function() {
    // Only re-focus if invalid.
    this.$("input.invalid").focus();
  },

  initialize: function() {
    // Whenever the collection resets, re-render.
    this.listenTo(this.options.users, "reset sync request", this.render);
  },

  events: {
    "submit form": "updateOrg"
  },

  updateOrg: function(ev) {
    app.router.go("org", this.$(".org").val());

    return false;
  }
});

export default Layout;
