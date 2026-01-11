/**
 * Project Schedule Model
 * Table: project_schedules
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class ProjectScheduleModel extends BaseModel {
  constructor() {
    super('project_schedules', db);
  }

  /**
   * Find schedules by project
   */
  async findByProject(projectId) {
    return this.db('project_schedules')
      .where({ project_id: projectId })
      .whereNull('deleted_at')
      .orderBy('schedule_date', 'asc');
  }

  /**
   * Find schedules by date range
   */
  async findByDateRange(projectId, startDate, endDate) {
    return this.db('project_schedules')
      .where({ project_id: projectId })
      .whereBetween('schedule_date', [startDate, endDate])
      .whereNull('deleted_at')
      .orderBy('schedule_date', 'asc');
  }

  /**
   * Find schedules by status
   */
  async findByStatus(projectId, status) {
    return this.db('project_schedules')
      .where({ project_id: projectId, status })
      .whereNull('deleted_at')
      .orderBy('schedule_date', 'asc');
  }

  /**
   * Find schedules by assigned user
   */
  async findByAssignedTo(projectId, assignedTo) {
    return this.db('project_schedules')
      .where({ project_id: projectId, assigned_to: assignedTo })
      .whereNull('deleted_at')
      .orderBy('schedule_date', 'asc');
  }

  /**
   * Find delayed schedules
   */
  async findDelayed(projectId) {
    return this.db('project_schedules')
      .where({ project_id: projectId, status: 'delayed' })
      .whereNull('deleted_at')
      .orderBy('schedule_date', 'asc');
  }

  /**
   * Update status
   */
  async updateStatus(id, status) {
    const updateData = {
      status,
      updated_at: this.db.fn.now()
    };
    if (status === 'completed') {
      updateData.actual_end_date = this.db.fn.now();
      updateData.progress_percentage = 100;
    }
    if (status === 'in_progress' && !updateData.actual_start_date) {
      updateData.actual_start_date = this.db.fn.now();
    }
    return this.db('project_schedules')
      .where({ id })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
  }

  /**
   * Update progress
   */
  async updateProgress(id, progressPercentage) {
    return this.db('project_schedules')
      .where({ id })
      .whereNull('deleted_at')
      .update({
        progress_percentage: progressPercentage,
        updated_at: this.db.fn.now()
      })
      .returning('*');
  }
}

module.exports = new ProjectScheduleModel();
