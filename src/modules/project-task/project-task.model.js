/**
 * Project Task Model
 * Table: project_tasks
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class ProjectTaskModel extends BaseModel {
  constructor() {
    super('project_tasks', db);
  }

  /**
   * Find tasks by project
   */
  async findByProject(projectId) {
    return this.db('project_tasks')
      .where({ project_id: projectId })
      .whereNull('deleted_at')
      .orderBy('sequence', 'asc');
  }

  /**
   * Find tasks by parent task
   */
  async findByParentTask(parentTaskId) {
    return this.db('project_tasks')
      .where({ parent_task_id: parentTaskId })
      .whereNull('deleted_at')
      .orderBy('sequence', 'asc');
  }

  /**
   * Find root tasks (no parent)
   */
  async findRootTasks(projectId) {
    return this.db('project_tasks')
      .where({ project_id: projectId })
      .whereNull('parent_task_id')
      .whereNull('deleted_at')
      .orderBy('sequence', 'asc');
  }

  /**
   * Find tasks by status
   */
  async findByStatus(projectId, status) {
    return this.db('project_tasks')
      .where({ project_id: projectId, status })
      .whereNull('deleted_at')
      .orderBy('sequence', 'asc');
  }

  /**
   * Find tasks by assigned user
   */
  async findByAssignedTo(assignedTo) {
    return this.db('project_tasks')
      .where({ assigned_to: assignedTo })
      .whereNull('deleted_at')
      .orderBy('planned_start_date', 'asc');
  }

  /**
   * Find tasks by type
   */
  async findByType(projectId, taskType) {
    return this.db('project_tasks')
      .where({ project_id: projectId, task_type: taskType })
      .whereNull('deleted_at')
      .orderBy('sequence', 'asc');
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
    return this.db('project_tasks')
      .where({ id })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
  }

  /**
   * Update progress
   */
  async updateProgress(id, progressPercentage) {
    return this.db('project_tasks')
      .where({ id })
      .whereNull('deleted_at')
      .update({
        progress_percentage: progressPercentage,
        updated_at: this.db.fn.now()
      })
      .returning('*');
  }
}

module.exports = new ProjectTaskModel();
