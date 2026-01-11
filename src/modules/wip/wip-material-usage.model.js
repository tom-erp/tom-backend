/**
 * WIP Material Usage Model
 * Table: wip_material_usage
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class WIPMaterialUsageModel extends BaseModel {
  constructor() {
    super('wip_material_usage', db);
  }

  /**
   * Find material usage by WIP
   */
  async findByWIP(wipId) {
    return this.db('wip_material_usage')
      .where({ wip_id: wipId });
  }

  /**
   * Find material usage by item
   */
  async findByItem(wipId, itemId) {
    return this.db('wip_material_usage')
      .where({ wip_id: wipId, item_id: itemId })
      .first();
  }

  /**
   * Create multiple material usage records for a WIP
   */
  async createBulk(wipId, materialUsage) {
    const recordsToInsert = materialUsage.map(usage => ({
      wip_id: wipId,
      item_id: usage.item_id || null,
      item_code: usage.item_code,
      item_description: usage.item_description || null,
      planned_quantity: usage.planned_quantity || null,
      used_quantity: usage.used_quantity,
      unit_of_measure: usage.unit_of_measure || null,
      threshold_percentage: usage.threshold_percentage || null,
      threshold_alert_triggered: usage.threshold_alert_triggered || false,
      notes: usage.notes || null
    }));

    return this.db('wip_material_usage')
      .insert(recordsToInsert)
      .returning('*');
  }

  /**
   * Delete all material usage for a WIP
   */
  async deleteByWIP(wipId) {
    return this.db('wip_material_usage')
      .where({ wip_id: wipId })
      .del();
  }

  /**
   * Update used quantity
   */
  async updateUsedQuantity(id, usedQuantity) {
    return this.db('wip_material_usage')
      .where({ id })
      .update({
        used_quantity: usedQuantity,
        updated_at: this.db.fn.now()
      })
      .returning('*');
  }

  /**
   * Mark threshold alert as triggered
   */
  async markThresholdAlert(id) {
    return this.db('wip_material_usage')
      .where({ id })
      .update({
        threshold_alert_triggered: true,
        updated_at: this.db.fn.now()
      })
      .returning('*');
  }
}

module.exports = new WIPMaterialUsageModel();
