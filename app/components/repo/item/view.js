import app from "app";
import template from "text!components/repo/item/template.html";

var Layout = Backbone.Layout.extend({
  template: _.template(template),

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
});

export default Layout;
