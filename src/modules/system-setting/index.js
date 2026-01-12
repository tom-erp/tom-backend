/**
 * SystemSetting Module
 * Module exports
 */

module.exports = {
  routes: require('./system-setting.routes'),
  controller: require('./system-setting.controller'),
  service: require('./system-setting.service'),
  repository: require('./system-setting.repository'),
  model: require('./system-setting.model'),
  validator: require('./system-setting.validator'),
  schema: require('./system-setting.schema')
};
