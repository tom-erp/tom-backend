/**
 * VendorBill Schema
 * Table: vendor_bills
 * 
 * This file contains the database schema definition for the vendor_bills table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'vendor_bills';

const CREATE_TABLE = `CREATE TABLE vendor_bills (
    id SERIAL PRIMARY KEY,
    bill_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., VB-YYYY-XXX
    po_id INTEGER NOT NULL REFERENCES purchase_orders(id) ON DELETE RESTRICT,
    grn_id INTEGER REFERENCES goods_received_notes(id) ON DELETE SET NULL,
    vendor_id INTEGER NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
    invoice_number VARCHAR(100) NOT NULL, -- Vendor's invoice number
    invoice_date DATE NOT NULL,
    due_date DATE,
    subtotal DECIMAL(15,2) NOT NULL DEFAULT 0,
    tax_percentage DECIMAL(5,2) DEFAULT 0,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    paid_amount DECIMAL(15,2) DEFAULT 0,
    balance_amount DECIMAL(15,2) GENERATED ALWAYS AS (total_amount - paid_amount) STORED,
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
        'draft', 'submitted', 'approved', 'paid', 'partially_paid', 'overdue', 'cancelled'
    )),
    document_path VARCHAR(500), -- Tax invoice document
    match_status VARCHAR(50), -- 'matched', 'pending', 'discrepancy'
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(po_id, invoice_number) -- Prevent duplicate invoices for same PO
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_vendor_bills_bill_number ON vendor_bills(bill_number);
CREATE INDEX idx_vendor_bills_po_id ON vendor_bills(po_id);
CREATE INDEX idx_vendor_bills_vendor_id ON vendor_bills(vendor_id);
CREATE INDEX idx_vendor_bills_status ON vendor_bills(status);
CREATE INDEX idx_vendor_bills_due_date ON vendor_bills(due_date);
CREATE INDEX idx_vendor_bills_invoice_number ON vendor_bills(invoice_number);
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
