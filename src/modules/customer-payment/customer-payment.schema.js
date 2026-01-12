/**
 * CustomerPayment Schema
 * Table: customer_payments
 * 
 * This file contains the database schema definition for the customer_payments table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'customer_payments';

const CREATE_TABLE = `CREATE TABLE customer_payments (
    id SERIAL PRIMARY KEY,
    payment_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., CPAY-YYYY-XXX
    client_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50), -- 'bank_transfer', 'cheque', 'online_gateway', 'cash', 'paynow'
    reference_number VARCHAR(100),
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'received' CHECK (status IN (
        'received', 'verified', 'reconciled', 'disputed', 'refunded'
    )),
    bank_account VARCHAR(100),
    cheque_number VARCHAR(50),
    receipt_number VARCHAR(50),
    notes TEXT,
    verified_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    verified_at TIMESTAMP WITH TIME ZONE,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_customer_payments_payment_number ON customer_payments(payment_number);
CREATE INDEX idx_customer_payments_client_id ON customer_payments(client_id);
CREATE INDEX idx_customer_payments_payment_date ON customer_payments(payment_date);
CREATE INDEX idx_customer_payments_status ON customer_payments(status);
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
