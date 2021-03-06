/*!
 * Copyright 2014 Apereo Foundation (AF) Licensed under the
 * Educational Community License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 *     http://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var CropAPI = require('./api.crop');
var RestUtil = require('./util');

/**
 * Creates a group through the REST API. Optional arguments will only be added if they are defined
 * and will be sent as is.
 *
 * @param  {RestContext}       restCtx             Standard REST Context object that contains the current tenant URL and the current user credentials
 * @param  {String}            displayName         The display name for this group
 * @param  {String}            [description]       The description for this group
 * @param  {String}            [visibility]        The visibility for this group. This can be 'public', 'loggedin' or 'private'
 * @param  {String}            [joinable]          Whether or not this group is joinable. This can be 'yes', 'no', or 'request'
 * @param  {String[]}          [managers]          An array of userIds that should be made managers
 * @param  {String[]}          [members]           An array of userIds that should be made members
 * @param  {Function}          callback            Standard callback function
 * @param  {Object}            callback.err        An error that occurred, if any
 * @param  {Group}             callback.response   A Group object representing the created group
 */
var createGroup = module.exports.createGroup = function(restCtx, displayName, description, visibility, joinable, managers, members, callback) {
    var postData = {
        'displayName': displayName,
        'description': description,
        'visibility': visibility,
        'joinable': joinable,
        'managers': managers,
        'members': members
    };
    RestUtil.RestRequest(restCtx, '/api/group/create', 'POST', postData, callback);
};

/**
 * Deletes a group through the REST API.
 *
 * @param  {RestContext}    restCtx         Standard REST Context object that contains the current tenant URL and the current user credentials
 * @param  {String}         groupId         The id of the group you wish to delete
 * @param  {Function}       callback        Standard callback function
 * @param  {Object}         callback.err    An error that occurred, if any
 */
var deleteGroup = module.exports.deleteGroup = function(restCtx, groupId, callback) {
    return RestUtil.RestRequest(restCtx, '/api/group/' + RestUtil.encodeURIComponent(groupId), 'DELETE', null, callback);
};

/**
 * Restores a group through the REST API.
 *
 * @param  {RestContext}    restCtx         Standard REST Context object that contains the current tenant URL and the current user credentials
 * @param  {String}         groupId         The id of the group you wish to restore
 * @param  {Function}       callback        Standard callback function
 * @param  {Object}         callback.err    An error that occurred, if any
 */
var restoreGroup = module.exports.restoreGroup = function(restCtx, groupId, callback) {
    return RestUtil.RestRequest(restCtx, '/api/group/' + RestUtil.encodeURIComponent(groupId) + '/restore', 'POST', null, callback);
};

/**
 * Get a group trough the REST API.
 *
 * @param  {RestContext}  restCtx             Standard REST Context object that contains the current tenant URL and the current user credentials
 * @param  {String}       groupId             The id of the group you wish to retrieve
 * @param  {Function}     callback            Standard callback function
 * @param  {Object}       callback.err        An error that occurred, if any
 * @param  {Group}        callback.response   The group object representing the requested group
 */
var getGroup = module.exports.getGroup = function(restCtx, groupId, callback) {
    RestUtil.RestRequest(restCtx, '/api/group/' + RestUtil.encodeURIComponent(groupId), 'GET', null, callback);
};

/**
 * Updates a group through the REST API. Optional arguments will only be added if they are defined
 * and will be sent as is.
 *
 * @param  {RestContext}    restCtx                       Standard REST Context object that contains the current tenant URL and the current user credentials
 * @param  {String}         groupId                       The id of the group you wish to update
 * @param  {Object}         profileFields                 Object where the keys represent the profile fields that need to be updated and the values represent the new values for those profile fieldss
 * @param  {String}         [profileFields.displayName]   New display name for the group
 * @param  {String}         [profileFields.description]   New description for the group
 * @param  {String}         [profileFields.visibility]    New visibility setting for the group. The possible values are 'private', 'loggedin' and 'public'
 * @param  {String}         [profileFields.joinable]      New joinability setting for the group. The possible values are 'yes', 'no' and 'request'
 * @param  {Function}       callback                      Standard callback method takes argument `err`
 * @param  {Object}         callback.err                  An error that occurred, if any
 * @param  {Group}          callback.updatedGroup         Group object representing the updated group
 */
var updateGroup = module.exports.updateGroup = function (restCtx, groupId, profileFields, callback) {
    RestUtil.RestRequest(restCtx, '/api/group/' + RestUtil.encodeURIComponent(groupId), 'POST', profileFields, callback);
};

/**
 * Get the members of a group through the REST API.
 *
 * @param  {RestContext}        restCtx             Standard REST Context object that contains the current tenant URL and the current user credentials
 * @param  {String}             groupId             The id of the group you wish to update
 * @param  {String}             start               The principal id to start from (this will not be included in the response)
 * @param  {Number}             limit               The number of members to retrieve.
 * @param  {Function}           callback            Standard callback function
 * @param  {Object}             callback.err        An error that occurred, if any
 * @param  {Object}             callback.response   An object with key 'results', whose value is a mixed array of User and Group objects that are members of the group
 */
var getGroupMembers = module.exports.getGroupMembers = function(restCtx, groupId, start, limit, callback) {
    var params = {
        'start': start,
        'limit': limit
    };
    RestUtil.RestRequest(restCtx, '/api/group/' + RestUtil.encodeURIComponent(groupId) + '/members', 'GET', params, callback);
};

/**
 * Update the members of a group through the REST API.
 *
 * @param  {RestContext}    restCtx             Standard REST Context object that contains the current tenant URL and the current user credentials
 * @param  {String}         groupId             The id of the group you wish to update
 * @param  {Object}         members             A hash object where each key is the id of a user or group and the value is one of 'manager', 'member' or false. In case the value is false, the member will be deleted.
 * @param  {Function}       callback            Standard callback method takes argument `err`
 * @param  {Object}         callback.err        An error that occurred, if any
 */
var setGroupMembers = module.exports.setGroupMembers = function(restCtx, groupId, members, callback) {
    RestUtil.RestRequest(restCtx, '/api/group/' + RestUtil.encodeURIComponent(groupId) + '/members', 'POST', members, callback);
};

/**
 * Join the group as the current user.
 *
 * @param  {RestContext}    restCtx             Standard REST Context object of the current HTTP session
 * @param  {String}         groupId             The id of the group you wish to join
 * @param  {Function}       callback            Invoked when the request completes
 * @param  {Object}         callback.err        An error that occurred, if any
 */
var joinGroup = module.exports.joinGroup = function(restCtx, groupId, callback) {
    RestUtil.RestRequest(restCtx, '/api/group/' + RestUtil.encodeURIComponent(groupId) + '/join', 'POST', null, callback);
};

/**
 * Leave the group as the current user.
 *
 * @param  {RestContext}    restCtx             Standard REST Context object of the current HTTP session
 * @param  {String}         groupId             The id of the group you wish to leave
 * @param  {Function}       callback            Invoked when the request completes
 * @param  {Object}         callback.err        An error that occurred, if any
 */
var leaveGroup = module.exports.leaveGroup = function(restCtx, groupId, callback) {
    RestUtil.RestRequest(restCtx, '/api/group/' + RestUtil.encodeURIComponent(groupId) + '/leave', 'POST', null, callback);
};

/**
 * Returns all of the groups that a user is a direct and indirect member of through the REST API.
 *
 * @param  {RestContext}  restCtx             Standard REST Context object that contains the current tenant URL and the current user credentials
 * @param  {String}       userId              The user id for which we want to get all of the memberships
 * @param  {String}       start               The group id to start from (this will not be included in the response)
 * @param  {Number}       limit               The number of members to retrieve
 * @param  {Function}     callback            Standard callback function
 * @param  {Object}       callback.err        An error that occurred, if any
 * @param  {Group[]}      callback.response   An array of groups representing the direct and indirect memberships of the provided user
 */
var getMembershipsLibrary = module.exports.getMembershipsLibrary = function(restCtx, userId, start, limit, callback) {
    var params = {
        'start': start,
        'limit': limit
    };
    RestUtil.RestRequest(restCtx, '/api/user/' + RestUtil.encodeURIComponent(userId) + '/memberships', 'GET', params, callback);
};

/**
 * Uploads a new profile picture for a group and optionally resize it.
 *
 * @param  {RestContext}     restCtx                 Standard REST Context object that contains the current tenant URL and the current user credentials
 * @param  {String}          groupId                 The id of the group we're trying to upload a new image for.
 * @param  {Function}        fileGenerator           A method that returns an open stream to a file.
 * @param  {Object}          [selectedArea]          If specified, this will crop the picture to the required rectangle and generate the 2 sizes.
 * @param  {Number}          [selectedArea.x]        The top left x coordinate.
 * @param  {Number}          [selectedArea.y]        The top left y coordinate.
 * @param  {Number}          [selectedArea.width]    The width of the rectangle
 * @param  {Number}          [selectedArea.height]   The height of the rectangle
 * @param  {Function}        callback                Standard callback method takes argument `err`
 * @param  {Object}          callback.err            An error that occurred, if any
 * @param  {Object}          callback.principal      The updated principal object.
 */
var uploadPicture = module.exports.uploadPicture = function(restCtx, groupId, file, selectedArea, callback) {
    var params = {'file': file};
    if (!selectedArea) {
        RestUtil.RestRequest(restCtx, '/api/group/' + RestUtil.encodeURIComponent(groupId) + '/picture', 'POST', params, callback);
    } else {
        RestUtil.RestRequest(restCtx, '/api/group/' + RestUtil.encodeURIComponent(groupId) + '/picture', 'POST', params, function(err){
            if (err) {
                return callback(err);
            }
            CropAPI.cropPicture(restCtx, groupId, selectedArea, callback);
        });
    }
};

/**
 * Download a group's picture. Returns a 404 if the group has no picture. This will only return the
 * image when it's run against the nginx server, as it's nginx who sends the picture stream.
 *
 * @param  {RestContext}     restCtx             Standard REST Context object that contains the current tenant URL and the current user credentials
 * @param  {String}          groupId             The ID of the group we're trying to download a picture from.
 * @param  {String}          size                The picture size. One of `small`, `medium` or `large`.
 * @param  {Function}        callback            Standard callback method takes argument `err`
 * @param  {Object}          callback.err        An error that occurred, if any
 * @param  {Object}          callback.picture    The raw picture for this group.
 */
var downloadPicture = module.exports.downloadPicture = function(restCtx, groupId, size, callback) {
    if (!size) {
        return callback({'code': 400, 'msg': 'Missing size parameter'});
    }
    RestUtil.RestRequest(restCtx, '/api/group/' + RestUtil.encodeURIComponent(groupId), 'GET', null, function(err, group) {
        if (err) {
            return callback(err);
        }
        if (!group.picture[size]) {
            return callback({'code': 404, 'msg': 'This group has no picture.'});
        }
        var url = group.picture[size];
        RestUtil.RestRequest(restCtx, url, 'GET', null, callback);
    });
};
