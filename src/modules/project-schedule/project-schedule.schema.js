/**
 * ProjectSchedule Schema
 * Table: project_schedules
 * 
 * This file contains the database schema definition for the project_schedules table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'project_schedules';

const CREATE_TABLE = `CREATE TABLE project_schedules (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    schedule_date DATE NOT NULL,
    milestone VARCHAR(255),
    task_description TEXT,
    planned_start_date DATE,
    planned_end_date DATE,
    actual_start_date DATE,
    actual_end_date DATE,
    status VARCHAR(50) DEFAULT 'planned' CHECK (status IN (
        'planned', 'in_progress', 'completed', 'delayed', 'cancelled'
    )),
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_project_schedules_project_id ON project_schedules(project_id);
CREATE INDEX idx_project_schedules_schedule_date ON project_schedules(schedule_date);
CREATE INDEX idx_project_schedules_status ON project_schedules(status);
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
