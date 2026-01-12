/**
 * CommunicationLog Schema
 * Table: communication_logs
 * 
 * This file contains the database schema definition for the communication_logs table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'communication_logs';

const CREATE_TABLE = `CREATE TABLE communication_logs (
    id SERIAL PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL, -- 'sales_enquiry', 'quotation', 'sales_order', 'project', etc.
    entity_id INTEGER NOT NULL,
    communication_type VARCHAR(50) NOT NULL CHECK (communication_type IN (
        'call', 'meeting', 'email', 'sms', 'whatsapp', 'note', 'follow_up'
    )),
    subject VARCHAR(255),
    description TEXT,
    communication_date TIMESTAMP WITH TIME ZONE,
    direction VARCHAR(20) CHECK (direction IN ('inbound', 'outbound', 'internal')),
    contact_person VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    logged_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_communication_logs_entity ON communication_logs(entity_type, entity_id);
CREATE INDEX idx_communication_logs_type ON communication_logs(communication_type);
CREATE INDEX idx_communication_logs_date ON communication_logs(communication_date);
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
