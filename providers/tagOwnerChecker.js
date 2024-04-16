const { TagService } = require('../services');

const tagService = new TagService();

async function ownerChecker(tagId, userId) {
    const tag = await tagService.retrieveUserSpecificTag(tagId);
    if (tag.byUser === userId) return true;
    else return false;
}

module.exports = ownerChecker;