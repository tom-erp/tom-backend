const fs = require('fs');
const path = require('path');

// Read schemas.js content
const content = fs.readFileSync('./src/schemas.js', 'utf8');

// Extract schema blocks
const pattern = /(\w+):\s*\{\s*table:\s*['"]([^'"]+)['"],\s*createTable:\s*`([^`]+)`,\s*createIndexes:\s*`([^`]+)`/gs;
const schemaBlocks = [];
let match;

while ((match = pattern.exec(content)) !== null) {
  schemaBlocks.push({
    key: match[1],
    table: match[2],
    createTable: match[3].trim(),
    createIndexes: match[4].trim()
  });
}

// Table to module mapping (using main table for each module)
const tableToModule = {
  'organizations': 'organization',
  'users': 'user',
  'items': 'item',
  'sales_enquiries': 'sales-enquiry',
  'sales_quotations': 'sales-quotation',
  'sales_quotation_items': 'sales-quotation',
  'sales_orders': 'sales-order',
  'sales_order_items': 'sales-order',
  'projects': 'project',
  'project_tasks': 'project-task',
  'project_schedules': 'project-schedule',
  'wip': 'wip',
  'wip_material_usage': 'wip',
  'purchase_requests': 'purchase-request',
  'purchase_request_items': 'purchase-request',
  'purchase_orders': 'purchase-order',
  'purchase_order_items': 'purchase-order',
  'vendor_bills': 'vendor-bill',
  'vendor_bill_items': 'vendor-bill',
  'vendor_payments': 'vendor-payment',
  'vendor_payment_allocations': 'vendor-payment',
  'vendor_prepayments': 'vendor-prepayment',
  'delivery_orders': 'delivery-order',
  'delivery_order_items': 'delivery-order',
  'customer_invoices': 'customer-invoice',
  'customer_invoice_items': 'customer-invoice',
  'customer_payments': 'customer-payment',
  'customer_payment_allocations': 'customer-payment',
  'client_purchase_orders': 'client-purchase-order',
  'client_po_items': 'client-purchase-order',
  'grn': 'grn',
  'grn_items': 'grn',
  'item_receipts': 'item-receipt',
  'item_receipt_items': 'item-receipt',
  'communication_logs': 'communication-log',
  'rate_cards': 'rate-card',
  'vouchers': 'voucher',
  'transmittals': 'transmittal',
  'attendance': 'attendance',
  'documents': 'document',
  'notifications': 'notification',
  'timesheets': 'timesheet',
  'vendors': 'vendor'
};

// Group by module (use the main table schema)
const moduleMainSchema = {};
schemaBlocks.forEach(schema => {
  const module = tableToModule[schema.table] || schema.table.replace(/_/g, '-');
  // Use first/main table for each module
  if (!moduleMainSchema[module] || schema.table === module.replace(/-/g, '_')) {
    moduleMainSchema[module] = schema;
  }
});

// Function to generate schema file content
function generateSchemaFile(schema, moduleName) {
  const tableName = schema.table;
  const className = moduleName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  
  return `/**
 * ${className} Schema
 * Table: ${tableName}
 * 
 * This file contains the database schema definition for the ${tableName} table.
 * Used for reference, validation, and documentation purposes.
 */

const TABLE_NAME = '${tableName}';

const CREATE_TABLE = \`${schema.createTable}\`;

const CREATE_INDEXES = \`
${schema.createIndexes}
\`;

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
`;
}

// Create schema files
let created = 0;
let skipped = 0;

Object.keys(moduleMainSchema).sort().forEach(module => {
  const schema = moduleMainSchema[module];
  const moduleDir = path.join('./src/modules', module);
  const schemaFile = path.join(moduleDir, `${module}.schema.js`);
  
  // Check if module directory exists
  if (!fs.existsSync(moduleDir)) {
    console.log(`⚠️  Module directory not found: ${moduleDir}`);
    skipped++;
    return;
  }
  
  // Generate and write schema file
  const fileContent = generateSchemaFile(schema, module);
  fs.writeFileSync(schemaFile, fileContent, 'utf8');
  console.log(`✅ Created: ${schemaFile}`);
  created++;
});

console.log(`\n✅ Created ${created} schema files`);
if (skipped > 0) {
  console.log(`⚠️  Skipped ${skipped} modules (directory not found)`);
}
