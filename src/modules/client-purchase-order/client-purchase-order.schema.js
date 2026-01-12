/**
 * ClientPurchaseOrder Schema
 * Table: client_purchase_orders
 * 
 * This file contains the database schema definition for the client_purchase_orders table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'client_purchase_orders';

const CREATE_TABLE = `CREATE TABLE client_purchase_orders (
    id SERIAL PRIMARY KEY,
    client_po_number VARCHAR(50) UNIQUE NOT NULL, -- Client's PO number
    internal_po_number VARCHAR(50) UNIQUE NOT NULL, -- Internal reference (e.g., CPO-YYYY-XXX)
    quotation_id INTEGER REFERENCES sales_quotations(id) ON DELETE SET NULL,
    enquiry_id INTEGER REFERENCES sales_enquiries(id) ON DELETE SET NULL,
    client_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
    po_date DATE NOT NULL,
    received_date DATE,
    project_site VARCHAR(255),
    project_scope TEXT,
    total_value DECIMAL(15,2) NOT NULL,
    tax_percentage DECIMAL(5,2) DEFAULT 0,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'received' CHECK (status IN (
        'received', 'under_review', 'validated', 'acknowledged', 'approved', 'rejected', 'converted'
    )),
    validation_status VARCHAR(50), -- 'complete', 'incomplete', 'discrepancy'
    acknowledgement_sent BOOLEAN DEFAULT FALSE,
    acknowledgement_date DATE,
    duplicate_flag BOOLEAN DEFAULT FALSE,
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    rejected_reason TEXT,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_client_pos_client_po_number ON client_purchase_orders(client_po_number);
CREATE INDEX idx_client_pos_internal_po_number ON client_purchase_orders(internal_po_number);
CREATE INDEX idx_client_pos_quotation_id ON client_purchase_orders(quotation_id);
CREATE INDEX idx_client_pos_client_id ON client_purchase_orders(client_id);
CREATE INDEX idx_client_pos_project_id ON client_purchase_orders(project_id);
CREATE INDEX idx_client_pos_status ON client_purchase_orders(status);
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
