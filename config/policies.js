/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  UserController:{
    me:  ['authMiddleware'],
    // getAllUser:  ['authMiddleware']
   },

  ControlController:{
    create:  ['authMiddleware'],
    update:  ['authMiddleware'],
    delete:  ['authMiddleware'],
    getAllControl:  ['authMiddleware']
  }
  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

};
