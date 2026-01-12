/**
 * Client Purchase Order Module Exports
 */

module.exports = {
  Controller: require('./client-po.controller'),
  Service: require('./client-po.service'),
  Repository: require('./client-po.repository'),
  Model: require('./client-po.model'),
  ItemModel: require('./client-po-item.model'),
  Routes: require('./client-po.routes'),
  Validator: require('./client-po.validator'),
  Schema: require('./client-purchase-order.schema')
};
