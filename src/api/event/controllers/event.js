"use strict";

/**
 *  event controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::event.event");

("use strict");

/* --------- Add Custom Controller --------- */

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  // 로그인된 유저에게 글이 해당하지 않는 이슈 해결
  // Create user event----------------------------------------
  async create(ctx) {
    let entity;
    ctx.request.body.data.user = ctx.state.user.id;
    entity = await super.create(ctx);
    return entity;
  },
  //
  // Get logged in users
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { message: ["No authorization header was found"] },
      ]);
    }

    const data = await strapi.db.query("api::event.event").findMany({
      where: {
        user: { id: user.id },
      },
      populate: { user: true, image: true },
    });
    if (!data) {
      return ctx.notFound();
    }

    const res = await this.sanitizeOutput(data, ctx);
    return res;
  },
}));
