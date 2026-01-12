/**
 * Project Schema
 * Table: projects
 * 
 * This file contains the database schema definition for the projects table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'projects';

const CREATE_TABLE = `CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    project_code VARCHAR(50) UNIQUE NOT NULL, -- e.g., PJT-YYYY-ClientCode-XXX
    project_name VARCHAR(255) NOT NULL,
    sales_order_id INTEGER REFERENCES sales_orders(id) ON DELETE SET NULL,
    client_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    project_type VARCHAR(100), -- 'MEP Prefabrication', 'Manpower Supply', 'Material Supply', 'Installation'
    site_location VARCHAR(255),
    start_date DATE,
    end_date DATE,
    estimated_budget DECIMAL(15,2),
    actual_budget DECIMAL(15,2),
    currency VARCHAR(3) DEFAULT 'SGD',
    project_manager_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
        'draft', 'approved', 'active', 'in_progress', 'on_hold', 'completed', 'cancelled'
    )),
    description TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT check_dates CHECK (end_date IS NULL OR end_date >= start_date)
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_projects_project_code ON projects(project_code);
CREATE INDEX idx_projects_sales_order_id ON projects(sales_order_id);
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_project_manager_id ON projects(project_manager_id);
CREATE INDEX idx_projects_status ON projects(status);
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
