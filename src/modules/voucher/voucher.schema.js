/**
 * Voucher Schema
 * Table: vouchers
 * 
 * This file contains the database schema definition for the vouchers table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'vouchers';

const CREATE_TABLE = `CREATE TABLE vouchers (
    id SERIAL PRIMARY KEY,
    voucher_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., VCH-YYYY-XXX
    voucher_date DATE NOT NULL,
    vendor_id INTEGER REFERENCES vendors(id) ON DELETE SET NULL,
    vendor_bill_id INTEGER REFERENCES vendor_bills(id) ON DELETE SET NULL,
    direct_bill_id INTEGER, -- For direct bills (if separate table exists)
    po_id INTEGER REFERENCES purchase_orders(id) ON DELETE SET NULL,
    project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN (
        'bank_transfer', 'cheque', 'cash', 'online_portal', 'credit_card'
    )),
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'SGD',
    bank_reference VARCHAR(100),
    payment_reference VARCHAR(100),
    payment_date DATE,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN (
        'pending', 'approved', 'paid', 'cancelled'
    )),
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    paid_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    paid_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_vouchers_voucher_number ON vouchers(voucher_number);
CREATE INDEX idx_vouchers_vendor_id ON vouchers(vendor_id);
CREATE INDEX idx_vouchers_vendor_bill_id ON vouchers(vendor_bill_id);
CREATE INDEX idx_vouchers_po_id ON vouchers(po_id);
CREATE INDEX idx_vouchers_status ON vouchers(status);
CREATE INDEX idx_vouchers_voucher_date ON vouchers(voucher_date);
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
