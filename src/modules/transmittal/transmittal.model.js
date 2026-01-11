/**
 * Transmittal Form Model
 * Table: transmittal_forms
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class TransmittalModel extends BaseModel {
  constructor() {
    super('transmittal_forms', db);
  }

  /**
   * Find transmittals by project
   */
  async findByProject(projectId) {
    return this.db('transmittal_forms')
      .where({ project_id: projectId })
      .whereNull('deleted_at')
      .orderBy('transmittal_date', 'desc');
  }

  /**
   * Find transmittal by transmittal number
   */
  async findByTransmittalNumber(transmittalNumber) {
    return this.db('transmittal_forms')
      .where({ transmittal_number: transmittalNumber })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find transmittals by type
   */
  async findByType(transmittalType) {
    return this.db('transmittal_forms')
      .where({ transmittal_type: transmittalType })
      .whereNull('deleted_at')
      .orderBy('transmittal_date', 'desc');
  }

  /**
   * Find transmittals by status
   */
  async findByStatus(status) {
    return this.db('transmittal_forms')
      .where({ status })
      .whereNull('deleted_at')
      .orderBy('transmittal_date', 'desc');
  }

  /**
   * Find transmittals by recipient
   */
  async findByRecipient(recipientId) {
    return this.db('transmittal_forms')
      .where({ recipient_id: recipientId })
      .whereNull('deleted_at')
      .orderBy('transmittal_date', 'desc');
  }

  /**
   * Update status
   */
  async updateStatus(id, status, updatedBy = null) {
    const updateData = {
      status,
      updated_at: this.db.fn.now()
    };
    if (updatedBy) {
      updateData.updated_by = updatedBy;
    }
    if (status === 'acknowledged') {
      updateData.acknowledged_at = this.db.fn.now();
    }
    return this.db('transmittal_forms')
      .where({ id })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
  }
}

module.exports = new TransmittalModel();
