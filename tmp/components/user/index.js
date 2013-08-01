define("components/user/index",
  [],
  function() {
    "use strict";
    module.exports = {
      Collection: require("components/user/collection"),

      Views: {
        Item: require("components/user/item/view"),
        List: require("components/user/list/view")
      }
    };

  });