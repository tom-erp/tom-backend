/**
 * DeliveryOrder Schema
 * Table: delivery_orders
 * 
 * This file contains the database schema definition for the delivery_orders table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'delivery_orders';

const CREATE_TABLE = `CREATE TABLE delivery_orders (
    id SERIAL PRIMARY KEY,
    do_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., DO-YYYY-PJT-XXX
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE RESTRICT,
    po_id INTEGER REFERENCES purchase_orders(id) ON DELETE SET NULL,
    client_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    delivery_date DATE NOT NULL,
    delivery_address TEXT,
    contact_person VARCHAR(255),
    contact_phone VARCHAR(20),
    driver_name VARCHAR(255),
    vehicle_number VARCHAR(50),
    status VARCHAR(50) DEFAULT 'generated' CHECK (status IN (
        'generated', 'approved', 'dispatched', 'delivered', 'acknowledged', 'rejected'
    )),
    acknowledged_by VARCHAR(255), -- Customer representative
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    acknowledgment_signature VARCHAR(500), -- E-signature or image path
    notes TEXT,
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_delivery_orders_do_number ON delivery_orders(do_number);
CREATE INDEX idx_delivery_orders_project_id ON delivery_orders(project_id);
CREATE INDEX idx_delivery_orders_client_id ON delivery_orders(client_id);
CREATE INDEX idx_delivery_orders_status ON delivery_orders(status);
CREATE INDEX idx_delivery_orders_delivery_date ON delivery_orders(delivery_date);
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
