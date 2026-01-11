/**
 * Rate Card Model
 * Table: rate_cards
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class RateCardModel extends BaseModel {
  constructor() {
    super('rate_cards', db);
  }

  /**
   * Find rate cards by project
   */
  async findByProject(projectId) {
    return this.db('rate_cards')
      .where({ project_id: projectId })
      .whereNull('deleted_at')
      .orderBy('effective_date', 'desc');
  }

  /**
   * Find active rate cards
   */
  async findActive() {
    return this.db('rate_cards')
      .where({ status: 'active' })
      .whereNull('deleted_at')
      .orderBy('effective_date', 'desc');
  }

  /**
   * Find rate card by code
   */
  async findByCode(rateCardCode) {
    return this.db('rate_cards')
      .where({ rate_card_code: rateCardCode })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find rate cards by category
   */
  async findByCategory(category) {
    return this.db('rate_cards')
      .where({ category })
      .whereNull('deleted_at')
      .orderBy('effective_date', 'desc');
  }

  /**
   * Find rate cards effective for a date
   */
  async findEffectiveForDate(effectiveDate) {
    return this.db('rate_cards')
      .where('effective_date', '<=', effectiveDate)
      .where(function() {
        this.whereNull('expiry_date')
          .orWhere('expiry_date', '>=', effectiveDate);
      })
      .where({ status: 'active' })
      .whereNull('deleted_at')
      .orderBy('effective_date', 'desc');
  }

  /**
   * Update status
   */
  async updateStatus(id, status) {
    return this.db('rate_cards')
      .where({ id })
      .whereNull('deleted_at')
      .update({
        status,
        updated_at: this.db.fn.now()
      })
      .returning('*');
  }
}

module.exports = new RateCardModel();
