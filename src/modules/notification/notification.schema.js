/**
 * Notification Schema
 * Table: notifications
 * 
 * This file contains the database schema definition for the notifications table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'notifications';

const CREATE_TABLE = `CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    notification_type VARCHAR(100), -- 'enquiry_assigned', 'quotation_ready', 'pr_approved', etc.
    title VARCHAR(255) NOT NULL,
    message TEXT,
    entity_type VARCHAR(50),
    entity_id INTEGER,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
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
