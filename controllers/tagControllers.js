const { TagService } = require('../services');
const { tagOwnerChecker } = require('../providers');

const tagService = new TagService();

async function createTag(req, res) {
    return res.status(201).send(await tagService.createTag(req.body.name, req.user.id));
}

async function getAllMyTags(req, res) {
    return res.status(200).send(await tagService.retrieveAllUserTags(req.user.id));
}

async function getMySpecificTag(req, res) {
    if (await tagOwnerChecker(req.params.id, req.user.id)) return res.status(200).send(await tagService.retrieveUserSpecificTag(req.params.id));
    else return res.status(401).send('UnAuthorized! you are not the owner of this tag!');
}

async function updateTag(req, res) {
    if (await tagOwnerChecker(req.params.id, req.user.id)) return res.status(201).send(await tagService.updateTag(req.params.id, req.body.name));
    else return res.status(401).send('UnAuthorized! you are not the owner of this tag!');
}

async function deleteTag(req, res) {
    if (await tagOwnerChecker(req.params.id, req.user.id)) return res.status(204).send(await tagService.deleteTag(req.params.id));
    else return res.status(401).send('UnAuthorized! you are not the owner of this tag!');
}

module.exports = {
    createTag,
    getAllMyTags,
    getMySpecificTag,
    updateTag,
    deleteTag,
}