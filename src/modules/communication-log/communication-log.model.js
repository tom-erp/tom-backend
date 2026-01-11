/**
 * Communication Log Model
 * Table: communication_logs
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class CommunicationLogModel extends BaseModel {
  constructor() {
    super('communication_logs', db);
  }

  /**
   * Find logs by entity
   */
  async findByEntity(entityType, entityId) {
    return this.db('communication_logs')
      .where({ entity_type: entityType, entity_id: entityId })
      .orderBy('communication_date', 'desc');
  }

  /**
   * Find logs by communication type
   */
  async findByCommunicationType(entityType, entityId, communicationType) {
    return this.db('communication_logs')
      .where({ 
        entity_type: entityType, 
        entity_id: entityId,
        communication_type: communicationType
      })
      .orderBy('communication_date', 'desc');
  }

  /**
   * Find logs by direction
   */
  async findByDirection(entityType, entityId, direction) {
    return this.db('communication_logs')
      .where({ 
        entity_type: entityType, 
        entity_id: entityId,
        direction
      })
      .orderBy('communication_date', 'desc');
  }

  /**
   * Find logs by date range
   */
  async findByDateRange(entityType, entityId, startDate, endDate) {
    return this.db('communication_logs')
      .where({ entity_type: entityType, entity_id: entityId })
      .whereBetween('communication_date', [startDate, endDate])
      .orderBy('communication_date', 'desc');
  }

  /**
   * Find logs by logged by user
   */
  async findByLoggedBy(loggedById) {
    return this.db('communication_logs')
      .where({ logged_by: loggedById })
      .orderBy('communication_date', 'desc');
  }
}

module.exports = new CommunicationLogModel();
