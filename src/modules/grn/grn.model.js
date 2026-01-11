/**
 * GRN (Goods Received Note) Model
 * Table: goods_received_notes
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class GRNModel extends BaseModel {
  constructor() {
    super('goods_received_notes', db);
  }

  /**
   * Find GRNs by PO
   */
  async findByPO(poId) {
    return this.db('goods_received_notes')
      .where({ po_id: poId })
      .orderBy('received_date', 'desc');
  }

  /**
   * Find GRN by GRN number
   */
  async findByGRNNumber(grnNumber) {
    return this.db('goods_received_notes')
      .where({ grn_number: grnNumber })
      .first();
  }

  /**
   * Find GRNs by status
   */
  async findByStatus(status) {
    return this.db('goods_received_notes')
      .where({ status })
      .orderBy('received_date', 'desc');
  }

  /**
   * Find GRNs by received date range
   */
  async findByDateRange(startDate, endDate) {
    return this.db('goods_received_notes')
      .whereBetween('received_date', [startDate, endDate])
      .orderBy('received_date', 'desc');
  }

  /**
   * Update status
   */
  async updateStatus(id, status) {
    return this.db('goods_received_notes')
      .where({ id })
      .update({
        status,
        updated_at: this.db.fn.now()
      })
      .returning('*');
  }

  /**
   * Find GRN with items
   */
  async findWithItems(id) {
    const grn = await this.findById(id);
    if (!grn) return null;

    const items = await this.db('grn_items')
      .where({ grn_id: id });

    return {
      ...grn,
      items
    };
  }
}

module.exports = new GRNModel();
