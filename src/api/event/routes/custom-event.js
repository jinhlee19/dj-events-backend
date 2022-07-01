"use strict";

/**
 * Custom Router.
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/events/me",
      handler: "event.me",
      config: {},
    },
  ],
};
