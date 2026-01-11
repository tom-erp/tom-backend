/**
 * Attendance Model
 * Table: attendance
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class AttendanceModel extends BaseModel {
  constructor() {
    super('attendance', db);
  }

  /**
   * Find attendance by employee and date
   */
  async findByEmployeeAndDate(employeeId, attendanceDate) {
    return this.db('attendance')
      .where({ employee_id: employeeId, attendance_date: attendanceDate })
      .first();
  }

  /**
   * Find attendance by project
   */
  async findByProject(projectId) {
    return this.db('attendance')
      .where({ project_id: projectId })
      .orderBy('attendance_date', 'desc');
  }

  /**
   * Find attendance by date range
   */
  async findByDateRange(startDate, endDate) {
    return this.db('attendance')
      .whereBetween('attendance_date', [startDate, endDate])
      .orderBy('attendance_date', 'desc');
  }

  /**
   * Find attendance by employee
   */
  async findByEmployee(employeeId, startDate = null, endDate = null) {
    const query = this.db('attendance')
      .where({ employee_id: employeeId });
    
    if (startDate && endDate) {
      query.whereBetween('attendance_date', [startDate, endDate]);
    }
    
    return query.orderBy('attendance_date', 'desc');
  }

  /**
   * Find attendance by status
   */
  async findByStatus(status) {
    return this.db('attendance')
      .where({ status })
      .orderBy('attendance_date', 'desc');
  }

  /**
   * Find present employees for a date
   */
  async findPresentByDate(attendanceDate) {
    return this.db('attendance')
      .where({ attendance_date: attendanceDate, status: 'present' });
  }

  /**
   * Find absent employees for a date
   */
  async findAbsentByDate(attendanceDate) {
    return this.db('attendance')
      .where({ attendance_date: attendanceDate, status: 'absent' });
  }

  /**
   * Mark attendance
   */
  async markAttendance(employeeId, attendanceDate, status, projectId = null, notes = null) {
    // Check if already exists
    const existing = await this.findByEmployeeAndDate(employeeId, attendanceDate);
    
    if (existing) {
      return this.db('attendance')
        .where({ id: existing.id })
        .update({
          status,
          project_id: projectId,
          notes,
          updated_at: this.db.fn.now()
        })
        .returning('*');
    } else {
      return this.db('attendance')
        .insert({
          employee_id: employeeId,
          attendance_date: attendanceDate,
          status,
          project_id: projectId,
          notes,
          created_at: this.db.fn.now(),
          updated_at: this.db.fn.now()
        })
        .returning('*');
    }
  }
}

module.exports = new AttendanceModel();
