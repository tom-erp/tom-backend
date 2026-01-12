/**
 * SalesOrder Schema
 * Table: sales_orders
 * 
 * This file contains the database schema definition for the sales_orders table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'sales_orders';

const CREATE_TABLE = `CREATE TABLE sales_orders (
    id SERIAL PRIMARY KEY,
    sales_order_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., SO-YYYY-XXX
    quotation_id INTEGER REFERENCES sales_quotations(id) ON DELETE SET NULL,
    client_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL, -- Auto-created
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    delivery_date DATE,
    payment_terms VARCHAR(50), -- 'Net 30', 'Net 45', 'Net 60'
    retention_percentage DECIMAL(5,2) DEFAULT 0,
    subtotal DECIMAL(15,2) NOT NULL DEFAULT 0,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
        'draft', 'submitted', 'approved', 'active', 'completed', 'cancelled'
    )),
    contract_reference VARCHAR(100),
    notes TEXT,
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_sales_orders_sales_order_number ON sales_orders(sales_order_number);
CREATE INDEX idx_sales_orders_quotation_id ON sales_orders(quotation_id);
CREATE INDEX idx_sales_orders_client_id ON sales_orders(client_id);
CREATE INDEX idx_sales_orders_project_id ON sales_orders(project_id);
CREATE INDEX idx_sales_orders_status ON sales_orders(status);
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
