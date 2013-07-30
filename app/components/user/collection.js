var app = require("app");

module.exports = Backbone.Collection.extend({
  url: function() {
    return app.api + "orgs/" + this.org + "/members?callback=?";
  }
});
