/**
 * Document Schema
 * Table: documents
 * 
 * This file contains the database schema definition for the documents table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'documents';

const CREATE_TABLE = `CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    document_type VARCHAR(100) NOT NULL, -- 'enquiry_attachment', 'quotation', 'po', 'invoice', 'bill', etc.
    entity_type VARCHAR(50) NOT NULL, -- 'sales_enquiry', 'quotation', 'purchase_order', etc.
    entity_id INTEGER NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    document_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50),
    file_size BIGINT,
    uploaded_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_documents_entity ON documents(entity_type, entity_id);
CREATE INDEX idx_documents_document_type ON documents(document_type);
CREATE INDEX idx_documents_uploaded_by ON documents(uploaded_by);
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
