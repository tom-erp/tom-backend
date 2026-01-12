/**
 * VendorPayment Schema
 * Table: vendor_payments
 * 
 * This file contains the database schema definition for the vendor_payments table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'vendor_payments';

const CREATE_TABLE = `CREATE TABLE vendor_payments (
    id SERIAL PRIMARY KEY,
    payment_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., VPAY-YYYY-XXX
    vendor_id INTEGER NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50), -- 'bank_transfer', 'cheque', 'online_gateway', 'cash'
    reference_number VARCHAR(100),
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN (
        'scheduled', 'processed', 'paid', 'cancelled', 'failed'
    )),
    bank_account VARCHAR(100),
    cheque_number VARCHAR(50),
    notes TEXT,
    processed_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_vendor_payments_payment_number ON vendor_payments(payment_number);
CREATE INDEX idx_vendor_payments_vendor_id ON vendor_payments(vendor_id);
CREATE INDEX idx_vendor_payments_payment_date ON vendor_payments(payment_date);
CREATE INDEX idx_vendor_payments_status ON vendor_payments(status);
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
