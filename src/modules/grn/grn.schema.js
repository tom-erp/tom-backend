/**
 * Grn Schema
 * Table: grn_items
 * 
 * This file contains the database schema definition for the grn_items table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'grn_items';

const CREATE_TABLE = `CREATE TABLE grn_items (
    id SERIAL PRIMARY KEY,
    grn_id INTEGER NOT NULL REFERENCES goods_received_notes(id) ON DELETE CASCADE,
    po_item_id INTEGER NOT NULL REFERENCES purchase_order_items(id) ON DELETE RESTRICT,
    received_quantity DECIMAL(10,2) NOT NULL,
    accepted_quantity DECIMAL(10,2),
    rejected_quantity DECIMAL(10,2) DEFAULT 0,
    condition_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_grn_items_grn_id ON grn_items(grn_id);
CREATE INDEX idx_grn_items_po_item_id ON grn_items(po_item_id);
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
