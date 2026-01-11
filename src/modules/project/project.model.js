/**
 * Project Model
 * Table: projects
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class ProjectModel extends BaseModel {
  constructor() {
    super('projects', db);
  }

  /**
   * Find projects by client
   */
  async findByClient(clientId) {
    return this.db('projects')
      .where({ client_id: clientId })
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
  }

  /**
   * Find projects by status
   */
  async findByStatus(status) {
    return this.db('projects')
      .where({ status })
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
  }

  /**
   * Find projects by project manager
   */
  async findByProjectManager(projectManagerId) {
    return this.db('projects')
      .where({ project_manager_id: projectManagerId })
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
  }

  /**
   * Find project by project code
   */
  async findByProjectCode(projectCode) {
    return this.db('projects')
      .where({ project_code: projectCode })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find active projects
   */
  async findActive() {
    return this.db('projects')
      .whereIn('status', ['planning', 'in_progress', 'on_hold'])
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
  }

  /**
   * Find projects by type
   */
  async findByType(projectType) {
    return this.db('projects')
      .where({ project_type: projectType })
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
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
    return this.db('projects')
      .where({ id })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
  }

  /**
   * Find project with related data (client, manager, etc.)
   */
  async findWithRelations(id) {
    const project = await this.db('projects')
      .leftJoin('organizations as client', 'projects.client_id', 'client.id')
      .leftJoin('users as pm', 'projects.project_manager_id', 'pm.id')
      .where('projects.id', id)
      .whereNull('projects.deleted_at')
      .select(
        'projects.*',
        'client.name as client_name',
        'client.code as client_code',
        'pm.first_name as pm_first_name',
        'pm.last_name as pm_last_name',
        'pm.email as pm_email'
      )
      .first();
    
    return project;
  }

  /**
   * Find projects by sales order
   */
  async findBySalesOrder(salesOrderId) {
    return this.db('projects')
      .where({ sales_order_id: salesOrderId })
      .whereNull('deleted_at')
      .first();
  }
}

module.exports = new ProjectModel();
