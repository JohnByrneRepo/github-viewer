define(function(require, Commit) {

  // Application.
  var app = require("app");

  Commit.Collection = Backbone.Collection.extend({
    url: function() {
      return "https://api.github.com/repos/" + this.user + "/" + this.repo +
        "/commits?callback=?";
    }
  });

  Commit.Views = {
    Item: Backbone.View.extend({
      template: "commit/item",

      // Use the <TR> from the template.
      el: false,

      serialize: function() {
        return {
          model: this.model,
          repo: this.options.repo,
          user: this.options.user
        };
      }
    }),

    List: Backbone.View.extend({
      template: "commit/list",

      beforeRender: function() {
        this.options.commits.each(function(commit) {
          this.insertView("table", new Commit.Views.Item({
            model: commit,
            repo: this.options.commits.repo,
            user: this.options.commits.user
          }));
        }, this);
      },

      serialize: function() {
        return { commits: this.options.commits };
      },

      initialize: function() {
        this.listenTo(this.options.commits, "reset sync request", this.render);
      }
    })
  };

});
