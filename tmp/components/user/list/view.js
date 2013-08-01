define("components/user/list/view",
  [],
  function() {
    "use strict";
    var app = require("app");

    module.exports = Backbone.Layout.extend({
      template: _.template(require("text!components/commit/list/template.html")),

      serialize: function() {
        return { users: this.options.users };
      },

      beforeRender: function() {
        this.options.users.each(function(user) {
          this.insertView(".user-list", new User.Views.Item({
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

  });