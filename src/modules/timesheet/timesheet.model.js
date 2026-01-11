/**
 * Timesheet Model
 * Table: timesheets
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class TimesheetModel extends BaseModel {
  constructor() {
    super('timesheets', db);
  }

  /**
   * Find timesheets by project
   */
  async findByProject(projectId) {
    return this.db('timesheets')
      .where({ project_id: projectId })
      .orderBy('work_date', 'desc');
  }

  /**
   * Find timesheets by DO
   */
  async findByDO(doId) {
    return this.db('timesheets')
      .where({ do_id: doId })
      .orderBy('work_date', 'desc');
  }

  /**
   * Find timesheet by work date and project
   */
  async findByWorkDate(projectId, workDate, doId = null) {
    const query = this.db('timesheets')
      .where({ project_id: projectId, work_date: workDate });
    
    if (doId) {
      query.where({ do_id: doId });
    } else {
      query.whereNull('do_id');
    }
    
    return query.first();
  }

  /**
   * Find timesheet by timesheet number
   */
  async findByTimesheetNumber(timesheetNumber) {
    return this.db('timesheets')
      .where({ timesheet_number: timesheetNumber })
      .first();
  }

  /**
   * Find timesheets by status
   */
  async findByStatus(status) {
    return this.db('timesheets')
      .where({ status })
      .orderBy('work_date', 'desc');
  }

  /**
   * Find timesheets by supervisor
   */
  async findBySupervisor(supervisorId) {
    return this.db('timesheets')
      .where({ supervisor_id: supervisorId })
      .orderBy('work_date', 'desc');
  }

  /**
   * Find pending approval timesheets
   */
  async findPendingApproval() {
    return this.db('timesheets')
      .where({ status: 'submitted' })
      .orderBy('work_date', 'desc');
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
    if (status === 'approved') {
      updateData.approved_at = this.db.fn.now();
      updateData.approved_by = updatedBy;
    }
    if (status === 'locked') {
      updateData.locked_at = this.db.fn.now();
    }
    return this.db('timesheets')
      .where({ id })
      .update(updateData)
      .returning('*');
  }

  /**
   * Update totals from entries
   */
  async updateTotals(id) {
    const totals = await this.db('timesheet_entries')
      .where({ timesheet_id: id })
      .select(
        this.db.raw('SUM(hours_worked) as total_hours'),
        this.db.raw('SUM(line_total) as total_cost')
      )
      .first();

    return this.db('timesheets')
      .where({ id })
      .update({
        total_hours: totals.total_hours || 0,
        total_cost: totals.total_cost || 0,
        updated_at: this.db.fn.now()
      })
      .returning('*');
  }

  /**
   * Find timesheet with entries
   */
  async findWithEntries(id) {
    const timesheet = await this.findById(id);
    if (!timesheet) return null;

    const entries = await this.db('timesheet_entries')
      .where({ timesheet_id: id })
      .orderBy('sequence', 'asc');

    return {
      ...timesheet,
      entries
    };
  }
}

module.exports = new TimesheetModel();
