define("components/repo/list/view",
  [],
  function() {
    "use strict";
    var app = require("app");

    var Item = require("components/repo/item/view");

    module.exports = Backbone.Layout.extend({
      template: _.template(require("text!components/repo/list/template.html")),

      className: "repos-wrapper",

      serialize: function() {
        return { repos: this.options.repos };
      },

      beforeRender: function() {
        this.options.repos.each(function(repo) {
          this.insertView("ul", new Item({
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
    });

  });