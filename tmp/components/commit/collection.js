define("components/commit/collection",
  [],
  function() {
    "use strict";
    var app = require("app");

    module.exports = Backbone.Collection.extend({
      url: function() {
        return app.api + "repos/" + this.user + "/" + this.repo +
          "/commits?callback=?";
      }
    });

  });