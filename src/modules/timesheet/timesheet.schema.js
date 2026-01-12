/**
 * Timesheet Schema
 * Table: timesheets
 * 
 * This file contains the database schema definition for the timesheets table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'timesheets';

const CREATE_TABLE = `CREATE TABLE timesheets (
    id SERIAL PRIMARY KEY,
    timesheet_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., TS-YYYY-XXX
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE RESTRICT,
    do_id INTEGER REFERENCES delivery_orders(id) ON DELETE SET NULL,
    work_date DATE NOT NULL,
    supervisor_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    total_hours DECIMAL(5,2) DEFAULT 0,
    total_cost DECIMAL(15,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
        'draft', 'submitted', 'approved', 'locked', 'rejected'
    )),
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    locked_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, work_date, do_id) -- One timesheet per project/date/DO
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_timesheets_timesheet_number ON timesheets(timesheet_number);
CREATE INDEX idx_timesheets_project_id ON timesheets(project_id);
CREATE INDEX idx_timesheets_work_date ON timesheets(work_date);
CREATE INDEX idx_timesheets_status ON timesheets(status);
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
