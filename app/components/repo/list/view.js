import app from "app";
import Item from "components/repo/item/view";
import template from "text!components/repo/list/template.html";

var Layout = Backbone.Layout.extend({
  template: _.template(template),

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

export default Layout;
