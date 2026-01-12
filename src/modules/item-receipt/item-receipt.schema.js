/**
 * ItemReceipt Schema
 * Table: item_receipts
 * 
 * This file contains the database schema definition for the item_receipts table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'item_receipts';

const CREATE_TABLE = `CREATE TABLE item_receipts (
    id SERIAL PRIMARY KEY,
    receipt_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., IR-YYYY-XXX
    po_id INTEGER NOT NULL REFERENCES purchase_orders(id) ON DELETE RESTRICT,
    receipt_date DATE NOT NULL,
    received_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    warehouse_location VARCHAR(255),
    receipt_status VARCHAR(50) DEFAULT 'received' CHECK (receipt_status IN (
        'received', 'partial', 'complete', 'rejected'
    )),
    do_required BOOLEAN DEFAULT TRUE, -- YES/NO decision point from workflow
    do_created BOOLEAN DEFAULT FALSE,
    do_id INTEGER REFERENCES delivery_orders(id) ON DELETE SET NULL,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_item_receipts_receipt_number ON item_receipts(receipt_number);
CREATE INDEX idx_item_receipts_po_id ON item_receipts(po_id);
CREATE INDEX idx_item_receipts_receipt_status ON item_receipts(receipt_status);
CREATE INDEX idx_item_receipts_do_required ON item_receipts(do_required);
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
