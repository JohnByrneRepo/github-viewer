import app from "app";

var Collection = Backbone.Collection.extend({
  url: function() {
    return app.api + "repos/" + this.user + "/" + this.repo +
      "/commits?callback=?";
  }
});

export default Collection;
