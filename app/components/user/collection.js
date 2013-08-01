import app from "app";

var Collection = Backbone.Collection.extend({
  url: function() {
    return app.api + "orgs/" + this.org + "/members?callback=?";
  }
});

export default Collection;
