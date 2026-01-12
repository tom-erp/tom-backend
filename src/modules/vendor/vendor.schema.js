/**
 * Vendor Schema
 * Table: vendors
 * 
 * This file contains the database schema definition for the vendors table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'vendors';

const CREATE_TABLE = `CREATE TABLE vendors (
    id SERIAL PRIMARY KEY,
    vendor_code VARCHAR(50) UNIQUE NOT NULL,
    organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    vendor_type VARCHAR(50), -- 'Material Supplier', 'Service Provider', 'Equipment Rental', etc.
    payment_terms VARCHAR(50), -- 'Net 30', 'Net 60', 'Net 90'
    credit_limit DECIMAL(15,2),
    currency VARCHAR(3) DEFAULT 'SGD',
    rating DECIMAL(3,2), -- 0.00 to 5.00
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blacklisted')),
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(vendor_code)
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_vendors_vendor_code ON vendors(vendor_code);
CREATE INDEX idx_vendors_organization_id ON vendors(organization_id);
CREATE INDEX idx_vendors_status ON vendors(status);
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
