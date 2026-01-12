/**
 * Work in Progress (WIP) Model
 * Table: work_in_progress
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class WIPModel extends BaseModel {
  constructor() {
    super('work_in_progress', db);
  }

  /**
   * Find WIPs by project
   */
  async findByProject(projectId) {
    return this.db('work_in_progress')
      .where({ project_id: projectId })
      .whereNull('deleted_at')
      .orderBy('progress_date', 'desc');
  }

  /**
   * Find WIP by WIP number
   */
  async findByWIPNumber(wipNumber) {
    return this.db('work_in_progress')
      .where({ wip_number: wipNumber })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find WIPs by status
   */
  async findByStatus(projectId, status) {
    return this.db('work_in_progress')
      .where({ project_id: projectId, status })
      .whereNull('deleted_at')
      .orderBy('progress_date', 'desc');
  }

  /**
   * Find WIPs by activity type
   */
  async findByActivityType(projectId, activityType) {
    return this.db('work_in_progress')
      .where({ project_id: projectId, activity_type: activityType })
      .whereNull('deleted_at')
      .orderBy('progress_date', 'desc');
  }

  /**
   * Find WIPs by milestone
   */
  async findByMilestone(projectId, milestoneId) {
    return this.db('work_in_progress')
      .where({ project_id: projectId, milestone_id: milestoneId })
      .whereNull('deleted_at')
      .orderBy('progress_date', 'desc');
  }

  /**
   * Find WIPs with material usage tracked
   */
  async findWithMaterialUsage(projectId) {
    return this.db('work_in_progress')
      .where({ project_id: projectId, material_usage_tracked: true })
      .whereNull('deleted_at')
      .orderBy('progress_date', 'desc');
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
    if (status === 'completed') {
      updateData.progress_percentage = 100;
    }
    return this.db('work_in_progress')
      .where({ id })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
  }

  /**
   * Update progress percentage
   */
  async updateProgress(id, progressPercentage) {
    return this.db('work_in_progress')
      .where({ id })
      .whereNull('deleted_at')
      .update({
        progress_percentage: progressPercentage,
        updated_at: this.db.fn.now()
      })
      .returning('*');
  }

  /**
   * Mark material usage as tracked
   */
  async markMaterialUsageTracked(id) {
    return this.db('work_in_progress')
      .where({ id })
      .whereNull('deleted_at')
      .update({
        material_usage_tracked: true,
        updated_at: this.db.fn.now()
      })
      .returning('*');
  }

  /**
   * Find WIP by ID with material usage details
   */
  async findByIdWithMaterialUsage(id) {
    const wip = await this.findById(id);
    if (!wip) return null;

    const materialUsage = await this.db('wip_material_usage')
      .where({ wip_id: id });

    return {
      ...wip,
      material_usage: materialUsage
    };
  }
}

module.exports = new WIPModel();
