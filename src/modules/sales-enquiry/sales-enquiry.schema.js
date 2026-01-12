/**
 * SalesEnquiry Schema
 * Table: sales_enquiries
 * 
 * This file contains the database schema definition for the sales_enquiries table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'sales_enquiries';

const CREATE_TABLE = `CREATE TABLE sales_enquiries (
    id SERIAL PRIMARY KEY,
    enquiry_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., ENQ-YYYY-XXX
    client_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    enquiry_source VARCHAR(50), -- 'email', 'website', 'phone', 'referral', etc.
    subject VARCHAR(255),
    project_type VARCHAR(100), -- 'MEP Prefabrication', 'Manpower Supply', 'Material Supply', 'Installation'
    project_scope TEXT,
    location VARCHAR(255),
    estimated_start_date DATE,
    estimated_end_date DATE,
    budget DECIMAL(15,2),
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN (
        'new', 'under_review', 'quoted', 'negotiation', 'won', 'lost'
    )),
    assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_sales_enquiries_enquiry_number ON sales_enquiries(enquiry_number);
CREATE INDEX idx_sales_enquiries_client_id ON sales_enquiries(client_id);
CREATE INDEX idx_sales_enquiries_status ON sales_enquiries(status);
CREATE INDEX idx_sales_enquiries_assigned_to ON sales_enquiries(assigned_to);
CREATE INDEX idx_sales_enquiries_created_at ON sales_enquiries(created_at);
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
