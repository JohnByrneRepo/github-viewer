define("components/user/item/view",
  [],
  function() {
    "use strict";
    var app = require("app");

    module.exports = Backbone.Layout.extend({
      template: _.template(require("text!components/user/item/template.html")),

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
    });

  });