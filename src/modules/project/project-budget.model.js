/**
 * Project Budget Model
 * Table: project_budget_categories
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class ProjectBudgetModel extends BaseModel {
  constructor() {
    super('project_budget_categories', db);
  }

  /**
   * Find budgets by project
   */
  async findByProject(projectId) {
    return this.db('project_budget_categories')
      .where({ project_id: projectId })
      .orderBy('category', 'asc');
  }

  /**
   * Find budget by project and category
   */
  async findByProjectAndCategory(projectId, category) {
    return this.db('project_budget_categories')
      .where({ project_id: projectId, category })
      .first();
  }

  /**
   * Update committed budget
   */
  async updateCommittedBudget(projectId, category, amount) {
    return this.db('project_budget_categories')
      .where({ project_id: projectId, category })
      .update({
        committed_budget: this.db.raw('COALESCE(committed_budget, 0) + ?', [amount]),
        updated_at: this.db.fn.now()
      })
      .returning('*');
  }

  /**
   * Update spent budget
   */
  async updateSpentBudget(projectId, category, amount) {
    return this.db('project_budget_categories')
      .where({ project_id: projectId, category })
      .update({
        spent_budget: this.db.raw('COALESCE(spent_budget, 0) + ?', [amount]),
        updated_at: this.db.fn.now()
      })
      .returning('*');
  }

  /**
   * Calculate total budget for project
   */
  async calculateProjectTotal(projectId) {
    const result = await this.db('project_budget_categories')
      .where({ project_id: projectId })
      .sum('allocated_budget as total')
      .first();
    return result ? parseFloat(result.total || 0) : 0;
  }

  /**
   * Calculate total committed for project
   */
  async calculateProjectCommitted(projectId) {
    const result = await this.db('project_budget_categories')
      .where({ project_id: projectId })
      .sum('committed_budget as total')
      .first();
    return result ? parseFloat(result.total || 0) : 0;
  }

  /**
   * Calculate total spent for project
   */
  async calculateProjectSpent(projectId) {
    const result = await this.db('project_budget_categories')
      .where({ project_id: projectId })
      .sum('spent_budget as total')
      .first();
    return result ? parseFloat(result.total || 0) : 0;
  }
}

module.exports = new ProjectBudgetModel();
