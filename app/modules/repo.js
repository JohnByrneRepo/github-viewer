// Application.
var app = require("app");
var Repo = exports;

// Modules.
var Commit = require("modules/commit");

Repo.Collection = Backbone.Collection.extend({
  url: function() {
    return "https://api.github.com/users/" + this.user + "/repos?callback=?";
  },

  comparator: function(repo) {
    return -new Date(repo.get("pushed_at"));
  }
});

Repo.Views = {
  Item: Backbone.View.extend({
    template: _.template(require("text!templates/repo/item.html")),

    tagName: "li",

    serialize: function() {
      return { model: this.model };
    },

    events: {
      click: "showCommits"
    },
    
    showCommits: function(ev) {
      var model = this.model;
      var org = app.router.users.org;
      var user = app.router.repos.user;

      // Add the active class.
      this.makeActive();

      // Easily create a URL.
      app.router.go("org", org, "user", user, "repo", model.get("name"));

      return false;
    },

    makeActive: function() {
      // Remove the active class from all other repo items.
      this.$el.siblings().removeClass("active");
      // Add the active class here.
      this.$el.addClass("active");
    },

    beforeRender: function() {
      if (this.options.active) {
        this.makeActive();
      }
    }
  }),

  List: Backbone.View.extend({
    template: _.template(require("text!templates/repo/list.html")),

    className: "repos-wrapper",

    serialize: function() {
      return { repos: this.options.repos };
    },

    beforeRender: function() {
      this.options.repos.each(function(repo) {
        this.insertView("ul", new Repo.Views.Item({
          model: repo,

          // Determine if this View is active.
          active: repo.get("name") === this.options.commits.repo
        }));
      }, this);
    },

    initialize: function() {
      // Whenever the collection resets, re-render.
      this.listenTo(this.options.repos, "sync request reset", this.render);
    }
  })
};
