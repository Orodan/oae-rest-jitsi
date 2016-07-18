var RestUtil = require('./util');

/**
 * Create a new meeting through the REST API.
 * 
 * @param {RestContext} restCtx
 * @param {String} displayName
 * @param {String} description
 * @param {Boolean} chat
 * @param {Boolean} contactList
 * @param {String} visibility
 * @param {String[]} managers
 * @param {String[]} members
 * @param {Function} callback
 * @param {Object} callback.err
 * @param {Meeting} callback.meeting
 */
var createMeeting = module.exports.createMeeting = function (restCtx, displayName, description, chat, contactList, visibility, managers, members, callback) {
    var params = {
        'displayName': displayName,
        'description': description,
        'visibility': visibility,
        'chat': chat,
        'contactList': contactList,
        'managers': managers,
        'members': members
    };
    RestUtil.RestRequest(restCtx, '/api/meeting-jitsi/create', 'POST', params, callback);
};

/**
 * Get meeting members through the REST API.
 * 
 * @param {any} restCtx
 * @param {any} meetingId
 * @param {any} start
 * @param {any} limit
 * @param {any} callback
 */
var getMembers = module.exports.getMembers = function (restCtx, meetingId, start, limit, callback) {
    var params = {
        'start': start,
        'limit': limit
    };
    RestUtil.RestRequest(restCtx, '/api/meeting-jitsi/' + RestUtil.encodeURIComponent(meetingId) + '/members', 'GET', params, callback);
};