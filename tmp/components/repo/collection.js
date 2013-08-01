define("components/repo/collection",
  [],
  function() {
    "use strict";
    var app = require("app");

    module.exports = Backbone.Collection.extend({
      url: function() {
        return app.api + "users/" + this.user + "/repos?callback=?";
      },

      comparator: function(repo) {
        return -new Date(repo.get("pushed_at"));
      }
    });

  });