/**
 * Timesheet Entry Model
 * Table: timesheet_entries
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class TimesheetEntryModel extends BaseModel {
  constructor() {
    super('timesheet_entries', db);
  }

  /**
   * Find entries by timesheet
   */
  async findByTimesheet(timesheetId) {
    return this.db('timesheet_entries')
      .where({ timesheet_id: timesheetId })
      .orderBy('sequence', 'asc');
  }

  /**
   * Find entries by worker
   */
  async findByWorker(timesheetId, workerName) {
    return this.db('timesheet_entries')
      .where({ timesheet_id: timesheetId, worker_name: workerName });
  }

  /**
   * Create multiple entries for a timesheet
   */
  async createBulk(timesheetId, entries) {
    const entriesToInsert = entries.map((entry, index) => ({
      timesheet_id: timesheetId,
      worker_name: entry.worker_name,
      worker_id: entry.worker_id || null,
      task_code: entry.task_code || null,
      task_description: entry.task_description || null,
      shift_type: entry.shift_type || 'day',
      hours_worked: entry.hours_worked,
      rate_per_hour: entry.rate_per_hour || null,
      line_total: entry.hours_worked * (entry.rate_per_hour || 0),
      sequence: entry.sequence || index + 1
    }));

    return this.db('timesheet_entries')
      .insert(entriesToInsert)
      .returning('*');
  }

  /**
   * Delete all entries for a timesheet
   */
  async deleteByTimesheet(timesheetId) {
    return this.db('timesheet_entries')
      .where({ timesheet_id: timesheetId })
      .del();
  }

  /**
   * Update line total (recalculate)
   */
  async updateLineTotal(id, hoursWorked, ratePerHour) {
    const lineTotal = hoursWorked * ratePerHour;
    return this.db('timesheet_entries')
      .where({ id })
      .update({
        hours_worked: hoursWorked,
        rate_per_hour: ratePerHour,
        line_total: lineTotal
      })
      .returning('*');
  }
}

module.exports = new TimesheetEntryModel();
