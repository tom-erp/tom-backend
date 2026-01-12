/**
 * RateCard Schema
 * Table: rate_cards
 * 
 * This file contains the database schema definition for the rate_cards table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = 'rate_cards';

const CREATE_TABLE = `CREATE TABLE rate_cards (
    id SERIAL PRIMARY KEY,
    rate_card_code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    trade VARCHAR(100) NOT NULL, -- 'electrician', 'pipe_fitter', 'welder', etc.
    skill_level VARCHAR(50), -- 'junior', 'senior', 'supervisor', etc.
    rate_per_hour DECIMAL(15,2) NOT NULL,
    rate_per_day DECIMAL(15,2),
    overtime_rate_per_hour DECIMAL(15,2),
    currency VARCHAR(3) DEFAULT 'SGD',
    effective_from DATE NOT NULL,
    effective_to DATE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`;

const CREATE_INDEXES = `
CREATE INDEX idx_rate_cards_code ON rate_cards(rate_card_code);
CREATE INDEX idx_rate_cards_trade ON rate_cards(trade);
CREATE INDEX idx_rate_cards_status ON rate_cards(status);
CREATE INDEX idx_rate_cards_dates ON rate_cards(effective_from, effective_to);
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
