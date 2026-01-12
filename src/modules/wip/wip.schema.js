/**
 * Wip Schema
 * Table: wip_material_usage
 * 
 * This file contains the database schema definition for the wip_material_usage table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'wip_material_usage';

const CREATE_TABLE = `CREATE TABLE wip_material_usage (
    id SERIAL PRIMARY KEY,
    wip_id INTEGER NOT NULL REFERENCES work_in_progress(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(id) ON DELETE SET NULL,
    item_code VARCHAR(50),
    item_description VARCHAR(255) NOT NULL,
    quantity_used DECIMAL(10,2) NOT NULL,
    unit_of_measure VARCHAR(20),
    source_type VARCHAR(50), -- 'inventory', 'purchase_order', 'po_reference'
    source_reference VARCHAR(100), -- PO number, inventory reference, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_wip_material_usage_wip_id ON wip_material_usage(wip_id);
CREATE INDEX idx_wip_material_usage_item_id ON wip_material_usage(item_id);
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
