// Application.
var app = require("app");
var User = exports;

// Modules.
var Repo = require("modules/repo");

User.Collection = Backbone.Collection.extend({
  url: function() {
    return "https://api.github.com/orgs/" + this.org + "/members?callback=?";
  }
});

User.Views = {
  Item: Backbone.View.extend({
    template: _.template(require("text!templates/user/item.html")),

    tagName: "li",

    serialize: function() {
      return { model: this.model };
    },

    events: {
      click: "changeUser"
    },

    changeUser: function(ev) {
      var model = this.model;
      var org = app.router.users.org;
      var name = model.get("login");

      app.router.go("org", org, "user", name);
    },

    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    }
  }),

  List: Backbone.View.extend({
    template: _.template(require("text!templates/user/list.html")),

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
  })
};
