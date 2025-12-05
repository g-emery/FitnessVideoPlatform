'use strict';

const POINTS_PER_VIDEO = 10;

module.exports = {
  async watchCompleted(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('You must be logged in.');
    }

    const { videoId } = ctx.request.body || {};
    if (!videoId) {
      return ctx.badRequest('videoId missing');
    }

    try {
      // 1. Get current user (no badges for now)
      const fullUser = await strapi.entityService.findOne(
        'plugin::users-permissions.user',
        user.id
      );

      const newPoints = (fullUser.points || 0) + POINTS_PER_VIDEO;

      // 2. Update only points
      const updatedUser = await strapi.entityService.update(
        'plugin::users-permissions.user',
        user.id,
        {
          data: {
            points: newPoints,
          },
        }
      );

      // 3. Respond with updated points
      ctx.body = {
        points: updatedUser.points,
        earned: POINTS_PER_VIDEO,
      };
    } catch (err) {
      console.error('Gamification error:', err);
      ctx.internalServerError('Something went wrong in watchCompleted');
    }
  },
};
