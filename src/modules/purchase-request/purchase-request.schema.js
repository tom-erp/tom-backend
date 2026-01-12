/**
 * PurchaseRequest Schema
 * Table: purchase_requests
 * 
 * This file contains the database schema definition for the purchase_requests table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'purchase_requests';

const CREATE_TABLE = `CREATE TABLE purchase_requests (
    id SERIAL PRIMARY KEY,
    pr_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., PRF-YYYY-PJT-XXX
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE RESTRICT,
    requestor_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    request_type VARCHAR(50) DEFAULT 'project' CHECK (request_type IN ('project', 'department')),
    category VARCHAR(100), -- 'Materials', 'Equipment', 'Services', 'Manpower'
    justification TEXT,
    required_date DATE,
    deadline_date DATE, -- Approval deadline (2 working days)
    subtotal DECIMAL(15,2) DEFAULT 0,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
        'draft', 'submitted', 'under_review', 'approved', 'rejected', 'converted_to_po'
    )),
    current_approver_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    rejected_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    rejected_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_purchase_requests_pr_number ON purchase_requests(pr_number);
CREATE INDEX idx_purchase_requests_project_id ON purchase_requests(project_id);
CREATE INDEX idx_purchase_requests_requestor_id ON purchase_requests(requestor_id);
CREATE INDEX idx_purchase_requests_status ON purchase_requests(status);
CREATE INDEX idx_purchase_requests_deadline_date ON purchase_requests(deadline_date);
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
