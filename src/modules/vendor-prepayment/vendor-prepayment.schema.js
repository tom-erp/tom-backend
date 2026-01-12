/**
 * VendorPrepayment Schema
 * Table: vendor_prepayments
 * 
 * This file contains the database schema definition for the vendor_prepayments table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'vendor_prepayments';

const CREATE_TABLE = `CREATE TABLE vendor_prepayments (
    id SERIAL PRIMARY KEY,
    prepayment_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., PREPAY-YYYY-XXX
    po_id INTEGER NOT NULL REFERENCES purchase_orders(id) ON DELETE RESTRICT,
    vendor_id INTEGER NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
    prepayment_date DATE NOT NULL,
    prepayment_amount DECIMAL(15,2) NOT NULL,
    prepayment_percentage DECIMAL(5,2), -- Percentage of PO value
    currency VARCHAR(3) DEFAULT 'SGD',
    payment_method VARCHAR(50) CHECK (payment_method IN (
        'bank_transfer', 'cheque', 'cash', 'online_portal'
    )),
    bank_reference VARCHAR(100),
    payment_reference VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN (
        'pending', 'approved', 'paid', 'adjusted', 'cancelled'
    )),
    adjusted_against_bill BOOLEAN DEFAULT FALSE,
    vendor_bill_id INTEGER REFERENCES vendor_bills(id) ON DELETE SET NULL,
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
CREATE INDEX idx_vendor_prepayments_prepayment_number ON vendor_prepayments(prepayment_number);
CREATE INDEX idx_vendor_prepayments_po_id ON vendor_prepayments(po_id);
CREATE INDEX idx_vendor_prepayments_vendor_id ON vendor_prepayments(vendor_id);
CREATE INDEX idx_vendor_prepayments_status ON vendor_prepayments(status);
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
