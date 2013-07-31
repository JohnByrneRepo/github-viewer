// Application.
var app = require("app");
var Commit = exports;

Commit.Collection = Backbone.Collection.extend({
  url: function() {
    return "https://api.github.com/repos/" + this.user + "/" + this.repo +
      "/commits?callback=?";
  }
});

Commit.Views = {
  Item: Backbone.View.extend({
    template: _.template(require("text!templates/commit/item.html")),

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
    template: _.template(require("text!templates/commit/list.html")),

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
      return this;
    },

    initialize: function() {
      this.listenTo(this.options.commits, "reset sync request", this.render);
    }
  })
};
