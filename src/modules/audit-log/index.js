/**
 * AuditLog Module
 * Module exports
 */

module.exports = {
  routes: require('./audit-log.routes'),
  controller: require('./audit-log.controller'),
  service: require('./audit-log.service'),
  repository: require('./audit-log.repository'),
  model: require('./audit-log.model'),
  validator: require('./audit-log.validator'),
  schema: require('./audit-log.schema')
};
