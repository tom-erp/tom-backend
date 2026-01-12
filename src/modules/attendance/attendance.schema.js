/**
 * Attendance Schema
 * Table: attendance
 * 
 * This file contains the database schema definition for the attendance table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'attendance';

const CREATE_TABLE = `CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    attendance_date DATE NOT NULL,
    employee_id INTEGER REFERENCES users(id) ON DELETE SET NULL, -- If employees are users
    worker_id VARCHAR(50), -- External worker ID for non-employees
    worker_name VARCHAR(255) NOT NULL,
    project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
    site_location VARCHAR(255),
    shift_type VARCHAR(50), -- 'day', 'night', 'overtime'
    shift_start_time TIME,
    shift_end_time TIME,
    check_in_time TIMESTAMP WITH TIME ZONE,
    check_out_time TIMESTAMP WITH TIME ZONE,
    hours_worked DECIMAL(5,2),
    overtime_hours DECIMAL(5,2) DEFAULT 0,
    attendance_status VARCHAR(50) DEFAULT 'present' CHECK (attendance_status IN (
        'present', 'absent', 'late', 'early_leave', 'half_day', 'on_leave'
    )),
    attendance_type VARCHAR(50) CHECK (attendance_type IN (
        'daily_wage', 'monthly_salary'
    )),
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(attendance_date, worker_id, project_id)
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_attendance_date ON attendance(attendance_date);
CREATE INDEX idx_attendance_worker_id ON attendance(worker_id);
CREATE INDEX idx_attendance_project_id ON attendance(project_id);
CREATE INDEX idx_attendance_status ON attendance(attendance_status);
CREATE INDEX idx_attendance_type ON attendance(attendance_type);
`;

/**
 * Column definitions for reference
 * (Extracted from CREATE_TABLE for documentation purposes)
 */
const COLUMNS = {
  // Column definitions would be parsed from CREATE_TABLE if needed
  // This is a placeholder - can be expanded with actual column metadata
};

/**
 * Get full SQL for table creation (including indexes)
 */
const getFullSQL = () => {
  return CREATE_TABLE + CREATE_INDEXES;
};

module.exports = {
  TABLE_NAME,
  CREATE_TABLE,
  CREATE_INDEXES,
  COLUMNS,
  getFullSQL
};
