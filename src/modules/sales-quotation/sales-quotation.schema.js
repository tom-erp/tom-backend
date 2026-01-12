/**
 * SalesQuotation Schema
 * Table: sales_quotations
 * 
 * This file contains the database schema definition for the sales_quotations table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'sales_quotations';

const CREATE_TABLE = `CREATE TABLE sales_quotations (
    id SERIAL PRIMARY KEY,
    quotation_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., QUO-YYYY-XXX
    enquiry_id INTEGER NOT NULL REFERENCES sales_enquiries(id) ON DELETE RESTRICT,
    client_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    version_number INTEGER DEFAULT 1,
    subject VARCHAR(255),
    validity_period_days INTEGER DEFAULT 30,
    valid_until DATE,
    subtotal DECIMAL(15,2) NOT NULL DEFAULT 0,
    tax_percentage DECIMAL(5,2) DEFAULT 0,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
        'draft', 'submitted', 'under_review', 'approved', 'sent', 'accepted', 'rejected', 'expired'
    )),
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_sales_quotations_quotation_number ON sales_quotations(quotation_number);
CREATE INDEX idx_sales_quotations_enquiry_id ON sales_quotations(enquiry_id);
CREATE INDEX idx_sales_quotations_client_id ON sales_quotations(client_id);
CREATE INDEX idx_sales_quotations_status ON sales_quotations(status);
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
