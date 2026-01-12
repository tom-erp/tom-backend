/**
 * CustomerInvoice Schema
 * Table: customer_invoices
 * 
 * This file contains the database schema definition for the customer_invoices table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'customer_invoices';

const CREATE_TABLE = `CREATE TABLE customer_invoices (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., INV-YYYY-ClientCode-XXX
    sales_order_id INTEGER REFERENCES sales_orders(id) ON DELETE SET NULL,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE RESTRICT,
    client_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    do_id INTEGER REFERENCES delivery_orders(id) ON DELETE SET NULL,
    invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE,
    payment_terms VARCHAR(50), -- 'Net 30', 'Net 45', 'Net 60'
    subtotal DECIMAL(15,2) NOT NULL DEFAULT 0,
    tax_percentage DECIMAL(5,2) DEFAULT 0,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    retention_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    paid_amount DECIMAL(15,2) DEFAULT 0,
    balance_amount DECIMAL(15,2) GENERATED ALWAYS AS (total_amount - paid_amount) STORED,
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
        'draft', 'approved', 'sent', 'partially_paid', 'paid', 'overdue', 'cancelled'
    )),
    sent_at TIMESTAMP WITH TIME ZONE,
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_customer_invoices_invoice_number ON customer_invoices(invoice_number);
CREATE INDEX idx_customer_invoices_sales_order_id ON customer_invoices(sales_order_id);
CREATE INDEX idx_customer_invoices_project_id ON customer_invoices(project_id);
CREATE INDEX idx_customer_invoices_client_id ON customer_invoices(client_id);
CREATE INDEX idx_customer_invoices_do_id ON customer_invoices(do_id);
CREATE INDEX idx_customer_invoices_status ON customer_invoices(status);
CREATE INDEX idx_customer_invoices_due_date ON customer_invoices(due_date);
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
