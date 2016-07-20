var RestUtil = require('./util');

/**
 * Create a new meeting through the REST API.
 * 
 * @param {RestContext}     restCtx             Standard REST Context object that contains the current tenant URL and the current user credentials
 * @param {String}          displayName         Display name for the created meeting item
 * @param {String}          description         The meeting item's description
 * @param {Boolean}         chat                The meeting items's chat option
 * @param {Boolean}         contactList         The meeting item's contactList option
 * @param {String}          visibility          The meeting item's visibility. This can be public, loggedin or private
 * @param {String[]}        managers            Array of user/group ids that should be added as managers to the meeting item
 * @param {String[]}        members             Array of user/group ids that should be added as members to the meeting item
 * @param {Function}        callback            Standard callback method
 * @param {Object}          callback.err        Error object containing error code and error message
 * @param {Meeting}         callback.meeting    Meeting object representing the created meeting
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
 * @param {RestContext}     restCtx             Standard REST Context object that contains the current tenant URL and the current user credentials
 * @param {String}          meetingId           Meeting id of the meeting item we're trying to retrieve the members for
 * @param {String}          start               The principal id to start from (this will not be included in the response)
 * @param {Number}          limit               The number of members to retrieve
 * @param {Function}        callback            Standard callback method
 * @param {Object}          callback.err        Error object containing error code and error message
 * @param {User[]|Group[]}  callback.members    Array that contains an object for each member. Each object has a role property that contains the role of the member and a profile property that contains the principal profile of the member
 */
var getMembers = module.exports.getMembers = function (restCtx, meetingId, start, limit, callback) {
    var params = {
        'start': start,
        'limit': limit
    };
    RestUtil.RestRequest(restCtx, '/api/meeting-jitsi/' + RestUtil.encodeURIComponent(meetingId) + '/members', 'GET', params, callback);
};

/**
 * Update a meeting item's metadata through the REST API.
 * 
 * @param {RestContext}     restCtx             Standard REST Context object that contains the current tenant URL and the current user credentials
 * @param {String}          meetingId           Meeting id of the meeting item we're trying to update
 * @param {Object}          params              JSON object where the keys represent all of the profile field names we want to update and the values represent the new values for those fields
 * @param {Function}        callback            Standard callback method
 * @param {Object}          callback.err        Error object containing error code and error message
 * @param {Meeting}         callback.meeting    The updated meeting object
 */
var updateMeeting = module.exports.updateMeeting = function (restCtx, meetingId, params, callback) {
    RestUtil.RestRequest(restCtx, '/api/meeting-jitsi/' + RestUtil.encodeURIComponent(meetingId), 'PUT', params, callback);
};

/**
 * Delete a meeting item through the REST API.
 * 
 * @param {RestContext}     restCtx             Standard REST Context object that contains the current tenant URL and the current user credentials
 * @param {String}          meetingId           Meeting id of the meeting item we're trying to delete
 * @param {Function}        callback            Standard callback method
 * @param {Object}          callback.err        Error object containing error code and error message
 */
var deleteMeeting = module.exports.deleteMeeting = function (restCtx, meetingId, callback) {
    RestUtil.RestRequest(restCtx, '/api/meeting-jitsi/' + RestUtil.encodeURIComponent(meetingId), 'DELETE', null, callback);
};

/**
 * Get a meeting item through the REST API.
 * 
 * @param {RestContext}     restCtx             Standard REST Context object that contains the current tenant URL and the current user credentials
 * @param {String}          meetingId           Meeting id of the meeting item we're trying to get
 * @param {Function}        callback            Standard callback method
 * @param {Object}          callback.err        Error object containing error code and error message
 * @param {Meeting}         callback.meeting    The updated meeting object
 */
var getMeeting = module.exports.getMeeting = function (restCtx, meetingId, callback) {
    RestUtil.RestRequest(restCtx, '/api/meeting-jitsi/' + RestUtil.encodeURIComponent(meetingId), 'GET', null, callback);
};

/**
 * Get a principal meetings library through the REST API.
 * 
 * @param {RestContext}     restCtx             Standard REST Context object that contains the current tenant URL and the current user credentials
 * @param {String}          principalId         User or group id for who we want to retrieve the library
 * @param {Function}        callback            Standard callback method
 * @param {Object}          callback.err        Error object containing error code and error message
 * @param {Meeting[]}       callback.meeting    The updated meeting object
 */
var getMeetingsLibrary = module.exports.getMeetingsLibrary = function (restCtx, principalId, callback) {
    RestUtil.RestRequest(restCtx, '/api/meeting-jitsi/library/' + RestUtil.encodeURIComponent(principalId), 'GET', null, callback);
};