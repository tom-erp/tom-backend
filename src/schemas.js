/**
 * Database Schemas
 * All CREATE TABLE statements extracted from DATABASE_ARCHITECTURE.md
 * 
 * This file contains all 48 table schemas for reference and can be used for:
 * - Database migration reference
 * - Model validation
 * - Schema documentation
 * 
 * @module schemas
 */

const schemas = {
  organizations: {
    table: 'organizations',
    createTable: `CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('client', 'vendor', 'both')),
    registration_number VARCHAR(100),
    tax_id VARCHAR(100),
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Singapore',
    postal_code VARCHAR(20),
    payment_terms VARCHAR(50), -- e.g., 'Net 30', 'Net 45', 'Net 60'
    credit_limit DECIMAL(15,2),
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`,
    createIndexes: `CREATE INDEX idx_organizations_code ON organizations(code);
CREATE INDEX idx_organizations_type ON organizations(type);
CREATE INDEX idx_organizations_status ON organizations(status);
CREATE INDEX idx_organizations_deleted_at ON organizations(deleted_at) WHERE deleted_at IS NULL;`
  },
  users: {
    table: 'users',
    createTable: `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN (
        'admin', 'sales_executive', 'sales_manager', 'project_manager',
        'procurement_officer', 'site_engineer', 'finance_officer',
        'qc_officer', 'workshop_supervisor', 'hr_officer'
    )),
    organization_id INTEGER REFERENCES organizations(id) ON DELETE SET NULL,
    phone VARCHAR(20),
    department VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    last_login_at TIMESTAMP WITH TIME ZONE,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`,
    createIndexes: `CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_organization_id ON users(organization_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_deleted_at ON users(deleted_at) WHERE deleted_at IS NULL;`
  },
  items: {
    table: 'items',
    createTable: `CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100), -- e.g., 'Material', 'Equipment', 'Service', 'Manpower'
    sub_category VARCHAR(100),
    unit_of_measure VARCHAR(20), -- e.g., 'PCS', 'KG', 'M', 'M2', 'HRS'
    standard_rate DECIMAL(15,2),
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'obsolete')),
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`,
    createIndexes: `CREATE INDEX idx_items_code ON items(code);
CREATE INDEX idx_items_category ON items(category);
CREATE INDEX idx_items_status ON items(status);`
  },
  sales_enquiries: {
    table: 'sales_enquiries',
    createTable: `CREATE TABLE sales_enquiries (
    id SERIAL PRIMARY KEY,
    enquiry_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., ENQ-YYYY-XXX
    client_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    enquiry_source VARCHAR(50), -- 'email', 'website', 'phone', 'referral', etc.
    subject VARCHAR(255),
    project_type VARCHAR(100), -- 'MEP Prefabrication', 'Manpower Supply', 'Material Supply', 'Installation'
    project_scope TEXT,
    location VARCHAR(255),
    estimated_start_date DATE,
    estimated_end_date DATE,
    budget DECIMAL(15,2),
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN (
        'new', 'under_review', 'quoted', 'negotiation', 'won', 'lost'
    )),
    assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`,
    createIndexes: `CREATE INDEX idx_sales_enquiries_enquiry_number ON sales_enquiries(enquiry_number);
CREATE INDEX idx_sales_enquiries_client_id ON sales_enquiries(client_id);
CREATE INDEX idx_sales_enquiries_status ON sales_enquiries(status);
CREATE INDEX idx_sales_enquiries_assigned_to ON sales_enquiries(assigned_to);
CREATE INDEX idx_sales_enquiries_created_at ON sales_enquiries(created_at);`
  },
  sales_quotations: {
    table: 'sales_quotations',
    createTable: `CREATE TABLE sales_quotations (
    id SERIAL PRIMARY KEY,
    quotation_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., QUO-YYYY-XXX
    enquiry_id INTEGER NOT NULL REFERENCES sales_enquiries(id) ON DELETE RESTRICT,
    client_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    version_number INTEGER DEFAULT 1,
    subject VARCHAR(255),
    validity_period_days INTEGER DEFAULT 30,
    valid_until DATE,
    subtotal DECIMAL(15,2) NOT NULL DEFAULT 0,
    tax_percentage DECIMAL(5,2) DEFAULT 0,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
        'draft', 'submitted', 'under_review', 'approved', 'sent', 'accepted', 'rejected', 'expired'
    )),
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`,
    createIndexes: `CREATE INDEX idx_sales_quotations_quotation_number ON sales_quotations(quotation_number);
CREATE INDEX idx_sales_quotations_enquiry_id ON sales_quotations(enquiry_id);
CREATE INDEX idx_sales_quotations_client_id ON sales_quotations(client_id);
CREATE INDEX idx_sales_quotations_status ON sales_quotations(status);`
  },
  sales_quotation_items: {
    table: 'sales_quotation_items',
    createTable: `CREATE TABLE sales_quotation_items (
    id SERIAL PRIMARY KEY,
    quotation_id INTEGER NOT NULL REFERENCES sales_quotations(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(id) ON DELETE SET NULL,
    item_code VARCHAR(50),
    item_description VARCHAR(255) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_of_measure VARCHAR(20),
    unit_price DECIMAL(15,2) NOT NULL,
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    discount_amount DECIMAL(15,2) DEFAULT 0,
    line_total DECIMAL(15,2) NOT NULL,
    sequence INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    createIndexes: `CREATE INDEX idx_sales_quotation_items_quotation_id ON sales_quotation_items(quotation_id);
CREATE INDEX idx_sales_quotation_items_item_id ON sales_quotation_items(item_id);`
  },
  sales_orders: {
    table: 'sales_orders',
    createTable: `CREATE TABLE sales_orders (
    id SERIAL PRIMARY KEY,
    sales_order_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., SO-YYYY-XXX
    quotation_id INTEGER REFERENCES sales_quotations(id) ON DELETE SET NULL,
    client_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL, -- Auto-created
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    delivery_date DATE,
    payment_terms VARCHAR(50), -- 'Net 30', 'Net 45', 'Net 60'
    retention_percentage DECIMAL(5,2) DEFAULT 0,
    subtotal DECIMAL(15,2) NOT NULL DEFAULT 0,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
        'draft', 'submitted', 'approved', 'active', 'completed', 'cancelled'
    )),
    contract_reference VARCHAR(100),
    notes TEXT,
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`,
    createIndexes: `CREATE INDEX idx_sales_orders_sales_order_number ON sales_orders(sales_order_number);
CREATE INDEX idx_sales_orders_quotation_id ON sales_orders(quotation_id);
CREATE INDEX idx_sales_orders_client_id ON sales_orders(client_id);
CREATE INDEX idx_sales_orders_project_id ON sales_orders(project_id);
CREATE INDEX idx_sales_orders_status ON sales_orders(status);`
  },
  sales_order_items: {
    table: 'sales_order_items',
    createTable: `CREATE TABLE sales_order_items (
    id SERIAL PRIMARY KEY,
    sales_order_id INTEGER NOT NULL REFERENCES sales_orders(id) ON DELETE CASCADE,
    quotation_item_id INTEGER REFERENCES sales_quotation_items(id) ON DELETE SET NULL,
    item_id INTEGER REFERENCES items(id) ON DELETE SET NULL,
    item_code VARCHAR(50),
    item_description VARCHAR(255) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_of_measure VARCHAR(20),
    unit_price DECIMAL(15,2) NOT NULL,
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    discount_amount DECIMAL(15,2) DEFAULT 0,
    line_total DECIMAL(15,2) NOT NULL,
    sequence INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    createIndexes: `CREATE INDEX idx_sales_order_items_sales_order_id ON sales_order_items(sales_order_id);
CREATE INDEX idx_sales_order_items_quotation_item_id ON sales_order_items(quotation_item_id);
CREATE INDEX idx_sales_order_items_item_id ON sales_order_items(item_id);`
  },
  projects: {
    table: 'projects',
    createTable: `CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    project_code VARCHAR(50) UNIQUE NOT NULL, -- e.g., PJT-YYYY-ClientCode-XXX
    project_name VARCHAR(255) NOT NULL,
    sales_order_id INTEGER REFERENCES sales_orders(id) ON DELETE SET NULL,
    client_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    project_type VARCHAR(100), -- 'MEP Prefabrication', 'Manpower Supply', 'Material Supply', 'Installation'
    site_location VARCHAR(255),
    start_date DATE,
    end_date DATE,
    estimated_budget DECIMAL(15,2),
    actual_budget DECIMAL(15,2),
    currency VARCHAR(3) DEFAULT 'SGD',
    project_manager_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
        'draft', 'approved', 'active', 'in_progress', 'on_hold', 'completed', 'cancelled'
    )),
    description TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT check_dates CHECK (end_date IS NULL OR end_date >= start_date)
);`,
    createIndexes: `CREATE INDEX idx_projects_project_code ON projects(project_code);
CREATE INDEX idx_projects_sales_order_id ON projects(sales_order_id);
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_project_manager_id ON projects(project_manager_id);
CREATE INDEX idx_projects_status ON projects(status);`
  },
  project_budget_categories: {
    table: 'project_budget_categories',
    createTable: `CREATE TABLE project_budget_categories (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL, -- 'Materials', 'Labor', 'Equipment', 'Services', 'Overhead'
    allocated_budget DECIMAL(15,2) NOT NULL DEFAULT 0,
    committed_budget DECIMAL(15,2) DEFAULT 0, -- Sum of approved PRs
    spent_budget DECIMAL(15,2) DEFAULT 0, -- Sum of paid bills
    currency VARCHAR(3) DEFAULT 'SGD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, category)
);`,
    createIndexes: `CREATE INDEX idx_project_budget_categories_project_id ON project_budget_categories(project_id);`
  },
  purchase_requests: {
    table: 'purchase_requests',
    createTable: `CREATE TABLE purchase_requests (
    id SERIAL PRIMARY KEY,
    pr_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., PRF-YYYY-PJT-XXX
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE RESTRICT,
    requestor_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    request_type VARCHAR(50) DEFAULT 'project' CHECK (request_type IN ('project', 'department')),
    category VARCHAR(100), -- 'Materials', 'Equipment', 'Services', 'Manpower'
    justification TEXT,
    required_date DATE,
    deadline_date DATE, -- Approval deadline (2 working days)
    subtotal DECIMAL(15,2) DEFAULT 0,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
        'draft', 'submitted', 'under_review', 'approved', 'rejected', 'converted_to_po'
    )),
    current_approver_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    rejected_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    rejected_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`,
    createIndexes: `CREATE INDEX idx_purchase_requests_pr_number ON purchase_requests(pr_number);
CREATE INDEX idx_purchase_requests_project_id ON purchase_requests(project_id);
CREATE INDEX idx_purchase_requests_requestor_id ON purchase_requests(requestor_id);
CREATE INDEX idx_purchase_requests_status ON purchase_requests(status);
CREATE INDEX idx_purchase_requests_deadline_date ON purchase_requests(deadline_date);`
  },
  purchase_request_items: {
    table: 'purchase_request_items',
    createTable: `CREATE TABLE purchase_request_items (
    id SERIAL PRIMARY KEY,
    pr_id INTEGER NOT NULL REFERENCES purchase_requests(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(id) ON DELETE SET NULL,
    item_code VARCHAR(50),
    item_description VARCHAR(255) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_of_measure VARCHAR(20),
    estimated_unit_price DECIMAL(15,2),
    line_total DECIMAL(15,2),
    budget_category VARCHAR(100),
    sequence INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    createIndexes: `CREATE INDEX idx_purchase_request_items_pr_id ON purchase_request_items(pr_id);
CREATE INDEX idx_purchase_request_items_item_id ON purchase_request_items(item_id);`
  },
  vendors: {
    table: 'vendors',
    createTable: `CREATE TABLE vendors (
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
);`,
    createIndexes: `CREATE INDEX idx_vendors_vendor_code ON vendors(vendor_code);
CREATE INDEX idx_vendors_organization_id ON vendors(organization_id);
CREATE INDEX idx_vendors_status ON vendors(status);`
  },
  purchase_orders: {
    table: 'purchase_orders',
    createTable: `CREATE TABLE purchase_orders (
    id SERIAL PRIMARY KEY,
    po_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., PO-YYYY-ProjectID-XXX
    pr_id INTEGER REFERENCES purchase_requests(id) ON DELETE SET NULL,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE RESTRICT,
    vendor_id INTEGER NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    delivery_date DATE,
    payment_terms VARCHAR(50),
    subtotal DECIMAL(15,2) NOT NULL DEFAULT 0,
    tax_percentage DECIMAL(5,2) DEFAULT 0,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
        'draft', 'submitted', 'approved', 'sent', 'partially_received', 'received', 'closed', 'cancelled'
    )),
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`,
    createIndexes: `CREATE INDEX idx_purchase_orders_po_number ON purchase_orders(po_number);
CREATE INDEX idx_purchase_orders_pr_id ON purchase_orders(pr_id);
CREATE INDEX idx_purchase_orders_project_id ON purchase_orders(project_id);
CREATE INDEX idx_purchase_orders_vendor_id ON purchase_orders(vendor_id);
CREATE INDEX idx_purchase_orders_status ON purchase_orders(status);`
  },
  purchase_order_items: {
    table: 'purchase_order_items',
    createTable: `CREATE TABLE purchase_order_items (
    id SERIAL PRIMARY KEY,
    po_id INTEGER NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(id) ON DELETE SET NULL,
    item_code VARCHAR(50),
    item_description VARCHAR(255) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_of_measure VARCHAR(20),
    unit_price DECIMAL(15,2) NOT NULL,
    line_total DECIMAL(15,2) NOT NULL,
    received_quantity DECIMAL(10,2) DEFAULT 0,
    pending_quantity DECIMAL(10,2) GENERATED ALWAYS AS (quantity - received_quantity) STORED,
    sequence INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    createIndexes: `CREATE INDEX idx_purchase_order_items_po_id ON purchase_order_items(po_id);
CREATE INDEX idx_purchase_order_items_item_id ON purchase_order_items(item_id);`
  },
  goods_received_notes: {
    table: 'goods_received_notes',
    createTable: `CREATE TABLE goods_received_notes (
    id SERIAL PRIMARY KEY,
    grn_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., GRN-YYYY-XXX
    po_id INTEGER NOT NULL REFERENCES purchase_orders(id) ON DELETE RESTRICT,
    received_date DATE NOT NULL DEFAULT CURRENT_DATE,
    received_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'received' CHECK (status IN ('received', 'inspected', 'rejected')),
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    createIndexes: `CREATE INDEX idx_grn_grn_number ON goods_received_notes(grn_number);
CREATE INDEX idx_grn_po_id ON goods_received_notes(po_id);
CREATE INDEX idx_grn_received_date ON goods_received_notes(received_date);`
  },
  grn_items: {
    table: 'grn_items',
    createTable: `CREATE TABLE grn_items (
    id SERIAL PRIMARY KEY,
    grn_id INTEGER NOT NULL REFERENCES goods_received_notes(id) ON DELETE CASCADE,
    po_item_id INTEGER NOT NULL REFERENCES purchase_order_items(id) ON DELETE RESTRICT,
    received_quantity DECIMAL(10,2) NOT NULL,
    accepted_quantity DECIMAL(10,2),
    rejected_quantity DECIMAL(10,2) DEFAULT 0,
    condition_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    createIndexes: `CREATE INDEX idx_grn_items_grn_id ON grn_items(grn_id);
CREATE INDEX idx_grn_items_po_item_id ON grn_items(po_item_id);`
  },
  vendor_bills: {
    table: 'vendor_bills',
    createTable: `CREATE TABLE vendor_bills (
    id SERIAL PRIMARY KEY,
    bill_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., VB-YYYY-XXX
    po_id INTEGER NOT NULL REFERENCES purchase_orders(id) ON DELETE RESTRICT,
    grn_id INTEGER REFERENCES goods_received_notes(id) ON DELETE SET NULL,
    vendor_id INTEGER NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
    invoice_number VARCHAR(100) NOT NULL, -- Vendor's invoice number
    invoice_date DATE NOT NULL,
    due_date DATE,
    subtotal DECIMAL(15,2) NOT NULL DEFAULT 0,
    tax_percentage DECIMAL(5,2) DEFAULT 0,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    paid_amount DECIMAL(15,2) DEFAULT 0,
    balance_amount DECIMAL(15,2) GENERATED ALWAYS AS (total_amount - paid_amount) STORED,
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
        'draft', 'submitted', 'approved', 'paid', 'partially_paid', 'overdue', 'cancelled'
    )),
    document_path VARCHAR(500), -- Tax invoice document
    match_status VARCHAR(50), -- 'matched', 'pending', 'discrepancy'
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(po_id, invoice_number) -- Prevent duplicate invoices for same PO
);`,
    createIndexes: `CREATE INDEX idx_vendor_bills_bill_number ON vendor_bills(bill_number);
CREATE INDEX idx_vendor_bills_po_id ON vendor_bills(po_id);
CREATE INDEX idx_vendor_bills_vendor_id ON vendor_bills(vendor_id);
CREATE INDEX idx_vendor_bills_status ON vendor_bills(status);
CREATE INDEX idx_vendor_bills_due_date ON vendor_bills(due_date);
CREATE INDEX idx_vendor_bills_invoice_number ON vendor_bills(invoice_number);`
  },
  vendor_bill_items: {
    table: 'vendor_bill_items',
    createTable: `CREATE TABLE vendor_bill_items (
    id SERIAL PRIMARY KEY,
    bill_id INTEGER NOT NULL REFERENCES vendor_bills(id) ON DELETE CASCADE,
    po_item_id INTEGER REFERENCES purchase_order_items(id) ON DELETE SET NULL,
    item_description VARCHAR(255) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL,
    line_total DECIMAL(15,2) NOT NULL,
    sequence INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    createIndexes: `CREATE INDEX idx_vendor_bill_items_bill_id ON vendor_bill_items(bill_id);
CREATE INDEX idx_vendor_bill_items_po_item_id ON vendor_bill_items(po_item_id);`
  },
  vendor_payments: {
    table: 'vendor_payments',
    createTable: `CREATE TABLE vendor_payments (
    id SERIAL PRIMARY KEY,
    payment_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., VPAY-YYYY-XXX
    vendor_id INTEGER NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50), -- 'bank_transfer', 'cheque', 'online_gateway', 'cash'
    reference_number VARCHAR(100),
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN (
        'scheduled', 'processed', 'paid', 'cancelled', 'failed'
    )),
    bank_account VARCHAR(100),
    cheque_number VARCHAR(50),
    notes TEXT,
    processed_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    createIndexes: `CREATE INDEX idx_vendor_payments_payment_number ON vendor_payments(payment_number);
CREATE INDEX idx_vendor_payments_vendor_id ON vendor_payments(vendor_id);
CREATE INDEX idx_vendor_payments_payment_date ON vendor_payments(payment_date);
CREATE INDEX idx_vendor_payments_status ON vendor_payments(status);`
  },
  vendor_payment_allocations: {
    table: 'vendor_payment_allocations',
    createTable: `CREATE TABLE vendor_payment_allocations (
    id SERIAL PRIMARY KEY,
    payment_id INTEGER NOT NULL REFERENCES vendor_payments(id) ON DELETE CASCADE,
    bill_id INTEGER NOT NULL REFERENCES vendor_bills(id) ON DELETE RESTRICT,
    allocated_amount DECIMAL(15,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(payment_id, bill_id)
);`,
    createIndexes: `CREATE INDEX idx_vendor_payment_allocations_payment_id ON vendor_payment_allocations(payment_id);
CREATE INDEX idx_vendor_payment_allocations_bill_id ON vendor_payment_allocations(bill_id);`
  },
  delivery_orders: {
    table: 'delivery_orders',
    createTable: `CREATE TABLE delivery_orders (
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
);`,
    createIndexes: `CREATE INDEX idx_delivery_orders_do_number ON delivery_orders(do_number);
CREATE INDEX idx_delivery_orders_project_id ON delivery_orders(project_id);
CREATE INDEX idx_delivery_orders_client_id ON delivery_orders(client_id);
CREATE INDEX idx_delivery_orders_status ON delivery_orders(status);
CREATE INDEX idx_delivery_orders_delivery_date ON delivery_orders(delivery_date);`
  },
  delivery_order_items: {
    table: 'delivery_order_items',
    createTable: `CREATE TABLE delivery_order_items (
    id SERIAL PRIMARY KEY,
    do_id INTEGER NOT NULL REFERENCES delivery_orders(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(id) ON DELETE SET NULL,
    item_code VARCHAR(50),
    item_description VARCHAR(255) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_of_measure VARCHAR(20),
    sequence INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    createIndexes: `CREATE INDEX idx_delivery_order_items_do_id ON delivery_order_items(do_id);
CREATE INDEX idx_delivery_order_items_item_id ON delivery_order_items(item_id);`
  },
  delivery_order_documents: {
    table: 'delivery_order_documents',
    createTable: `CREATE TABLE delivery_order_documents (
    id SERIAL PRIMARY KEY,
    do_id INTEGER NOT NULL REFERENCES delivery_orders(id) ON DELETE CASCADE,
    document_type VARCHAR(100), -- 'delivery_note', 'photo', 'signature', 'other'
    document_path VARCHAR(500) NOT NULL,
    document_name VARCHAR(255),
    uploaded_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    createIndexes: `CREATE INDEX idx_delivery_order_documents_do_id ON delivery_order_documents(do_id);`
  },
  customer_invoices: {
    table: 'customer_invoices',
    createTable: `CREATE TABLE customer_invoices (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., INV-YYYY-ClientCode-XXX
    sales_order_id INTEGER REFERENCES sales_orders(id) ON DELETE SET NULL,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE RESTRICT,
    client_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    do_id INTEGER REFERENCES delivery_orders(id) ON DELETE SET NULL,
    invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE,
    payment_terms VARCHAR(50), -- 'Net 30', 'Net 45', 'Net 60'
    subtotal DECIMAL(15,2) NOT NULL DEFAULT 0,
    tax_percentage DECIMAL(5,2) DEFAULT 0,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    retention_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    paid_amount DECIMAL(15,2) DEFAULT 0,
    balance_amount DECIMAL(15,2) GENERATED ALWAYS AS (total_amount - paid_amount) STORED,
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
        'draft', 'approved', 'sent', 'partially_paid', 'paid', 'overdue', 'cancelled'
    )),
    sent_at TIMESTAMP WITH TIME ZONE,
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`,
    createIndexes: `CREATE INDEX idx_customer_invoices_invoice_number ON customer_invoices(invoice_number);
CREATE INDEX idx_customer_invoices_sales_order_id ON customer_invoices(sales_order_id);
CREATE INDEX idx_customer_invoices_project_id ON customer_invoices(project_id);
CREATE INDEX idx_customer_invoices_client_id ON customer_invoices(client_id);
CREATE INDEX idx_customer_invoices_do_id ON customer_invoices(do_id);
CREATE INDEX idx_customer_invoices_status ON customer_invoices(status);
CREATE INDEX idx_customer_invoices_due_date ON customer_invoices(due_date);`
  },
  customer_invoice_items: {
    table: 'customer_invoice_items',
    createTable: `CREATE TABLE customer_invoice_items (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER NOT NULL REFERENCES customer_invoices(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(id) ON DELETE SET NULL,
    item_code VARCHAR(50),
    item_description VARCHAR(255) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_of_measure VARCHAR(20),
    unit_price DECIMAL(15,2) NOT NULL,
    line_total DECIMAL(15,2) NOT NULL,
    sequence INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    createIndexes: `CREATE INDEX idx_customer_invoice_items_invoice_id ON customer_invoice_items(invoice_id);
CREATE INDEX idx_customer_invoice_items_item_id ON customer_invoice_items(item_id);`
  },
  customer_payments: {
    table: 'customer_payments',
    createTable: `CREATE TABLE customer_payments (
    id SERIAL PRIMARY KEY,
    payment_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., CPAY-YYYY-XXX
    client_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50), -- 'bank_transfer', 'cheque', 'online_gateway', 'cash', 'paynow'
    reference_number VARCHAR(100),
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'received' CHECK (status IN (
        'received', 'verified', 'reconciled', 'disputed', 'refunded'
    )),
    bank_account VARCHAR(100),
    cheque_number VARCHAR(50),
    receipt_number VARCHAR(50),
    notes TEXT,
    verified_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    verified_at TIMESTAMP WITH TIME ZONE,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    createIndexes: `CREATE INDEX idx_customer_payments_payment_number ON customer_payments(payment_number);
CREATE INDEX idx_customer_payments_client_id ON customer_payments(client_id);
CREATE INDEX idx_customer_payments_payment_date ON customer_payments(payment_date);
CREATE INDEX idx_customer_payments_status ON customer_payments(status);`
  },
  customer_payment_allocations: {
    table: 'customer_payment_allocations',
    createTable: `CREATE TABLE customer_payment_allocations (
    id SERIAL PRIMARY KEY,
    payment_id INTEGER NOT NULL REFERENCES customer_payments(id) ON DELETE CASCADE,
    invoice_id INTEGER NOT NULL REFERENCES customer_invoices(id) ON DELETE RESTRICT,
    allocated_amount DECIMAL(15,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(payment_id, invoice_id)
);`,
    createIndexes: `CREATE INDEX idx_customer_payment_allocations_payment_id ON customer_payment_allocations(payment_id);
CREATE INDEX idx_customer_payment_allocations_invoice_id ON customer_payment_allocations(invoice_id);`
  },
  timesheets: {
    table: 'timesheets',
    createTable: `CREATE TABLE timesheets (
    id SERIAL PRIMARY KEY,
    timesheet_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., TS-YYYY-XXX
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE RESTRICT,
    do_id INTEGER REFERENCES delivery_orders(id) ON DELETE SET NULL,
    work_date DATE NOT NULL,
    supervisor_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    total_hours DECIMAL(5,2) DEFAULT 0,
    total_cost DECIMAL(15,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
        'draft', 'submitted', 'approved', 'locked', 'rejected'
    )),
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    locked_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, work_date, do_id) -- One timesheet per project/date/DO
);`,
    createIndexes: `CREATE INDEX idx_timesheets_timesheet_number ON timesheets(timesheet_number);
CREATE INDEX idx_timesheets_project_id ON timesheets(project_id);
CREATE INDEX idx_timesheets_work_date ON timesheets(work_date);
CREATE INDEX idx_timesheets_status ON timesheets(status);`
  },
  timesheet_entries: {
    table: 'timesheet_entries',
    createTable: `CREATE TABLE timesheet_entries (
    id SERIAL PRIMARY KEY,
    timesheet_id INTEGER NOT NULL REFERENCES timesheets(id) ON DELETE CASCADE,
    worker_name VARCHAR(255) NOT NULL,
    worker_id VARCHAR(50), -- External worker ID
    task_code VARCHAR(50),
    task_description VARCHAR(255),
    shift_type VARCHAR(50), -- 'day', 'night', 'overtime'
    hours_worked DECIMAL(5,2) NOT NULL,
    rate_per_hour DECIMAL(15,2),
    line_total DECIMAL(15,2),
    sequence INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    createIndexes: `CREATE INDEX idx_timesheet_entries_timesheet_id ON timesheet_entries(timesheet_id);`
  },
  documents: {
    table: 'documents',
    createTable: `CREATE TABLE documents (
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
);`,
    createIndexes: `CREATE INDEX idx_documents_entity ON documents(entity_type, entity_id);
CREATE INDEX idx_documents_document_type ON documents(document_type);
CREATE INDEX idx_documents_uploaded_by ON documents(uploaded_by);`
  },
  notifications: {
    table: 'notifications',
    createTable: `CREATE TABLE notifications (
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
);`,
    createIndexes: `CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);`
  },
  audit_logs: {
    table: 'audit_logs',
    createTable: `CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL, -- 'create', 'update', 'delete', 'approve', 'reject'
    entity_type VARCHAR(50) NOT NULL,
    entity_id INTEGER NOT NULL,
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    createIndexes: `CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);`
  },
  system_settings: {
    table: 'system_settings',
    createTable: `CREATE TABLE system_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    type VARCHAR(50) DEFAULT 'string' CHECK (type IN ('string', 'number', 'boolean', 'json')),
    updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    createIndexes: `CREATE INDEX idx_system_settings_key ON system_settings(key);`
  },
  client_purchase_orders: {
    table: 'client_purchase_orders',
    createTable: `CREATE TABLE client_purchase_orders (
    id SERIAL PRIMARY KEY,
    client_po_number VARCHAR(50) UNIQUE NOT NULL, -- Client's PO number
    internal_po_number VARCHAR(50) UNIQUE NOT NULL, -- Internal reference (e.g., CPO-YYYY-XXX)
    quotation_id INTEGER REFERENCES sales_quotations(id) ON DELETE SET NULL,
    enquiry_id INTEGER REFERENCES sales_enquiries(id) ON DELETE SET NULL,
    client_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    po_date DATE NOT NULL,
    received_date DATE,
    project_site VARCHAR(255),
    project_scope TEXT,
    total_value DECIMAL(15,2) NOT NULL,
    tax_percentage DECIMAL(5,2) DEFAULT 0,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'SGD',
    status VARCHAR(50) DEFAULT 'received' CHECK (status IN (
        'received', 'under_review', 'validated', 'acknowledged', 'approved', 'rejected', 'converted'
    )),
    validation_status VARCHAR(50), -- 'complete', 'incomplete', 'discrepancy'
    acknowledgement_sent BOOLEAN DEFAULT FALSE,
    acknowledgement_date DATE,
    duplicate_flag BOOLEAN DEFAULT FALSE,
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    rejected_reason TEXT,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`,
    createIndexes: `CREATE INDEX idx_client_pos_client_po_number ON client_purchase_orders(client_po_number);
CREATE INDEX idx_client_pos_internal_po_number ON client_purchase_orders(internal_po_number);
CREATE INDEX idx_client_pos_quotation_id ON client_purchase_orders(quotation_id);
CREATE INDEX idx_client_pos_client_id ON client_purchase_orders(client_id);
CREATE INDEX idx_client_pos_status ON client_purchase_orders(status);`
  },
  client_purchase_order_items: {
    table: 'client_purchase_order_items',
    createTable: `CREATE TABLE client_purchase_order_items (
    id SERIAL PRIMARY KEY,
    client_po_id INTEGER NOT NULL REFERENCES client_purchase_orders(id) ON DELETE CASCADE,
    quotation_item_id INTEGER REFERENCES sales_quotation_items(id) ON DELETE SET NULL,
    item_id INTEGER REFERENCES items(id) ON DELETE SET NULL,
    item_code VARCHAR(50),
    item_description VARCHAR(255) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_of_measure VARCHAR(20),
    unit_price DECIMAL(15,2) NOT NULL,
    line_total DECIMAL(15,2) NOT NULL,
    sequence INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    createIndexes: `CREATE INDEX idx_client_po_items_client_po_id ON client_purchase_order_items(client_po_id);
CREATE INDEX idx_client_po_items_quotation_item_id ON client_purchase_order_items(quotation_item_id);
CREATE INDEX idx_client_po_items_item_id ON client_purchase_order_items(item_id);`
  },
  communication_logs: {
    table: 'communication_logs',
    createTable: `CREATE TABLE communication_logs (
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
);`,
    createIndexes: `CREATE INDEX idx_communication_logs_entity ON communication_logs(entity_type, entity_id);
CREATE INDEX idx_communication_logs_type ON communication_logs(communication_type);
CREATE INDEX idx_communication_logs_date ON communication_logs(communication_date);`
  },
  rate_cards: {
    table: 'rate_cards',
    createTable: `CREATE TABLE rate_cards (
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
);`,
    createIndexes: `CREATE INDEX idx_rate_cards_code ON rate_cards(rate_card_code);
CREATE INDEX idx_rate_cards_trade ON rate_cards(trade);
CREATE INDEX idx_rate_cards_status ON rate_cards(status);
CREATE INDEX idx_rate_cards_dates ON rate_cards(effective_from, effective_to);`
  },
  vouchers: {
    table: 'vouchers',
    createTable: `CREATE TABLE vouchers (
    id SERIAL PRIMARY KEY,
    voucher_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., VCH-YYYY-XXX
    voucher_date DATE NOT NULL,
    vendor_id INTEGER REFERENCES vendors(id) ON DELETE SET NULL,
    vendor_bill_id INTEGER REFERENCES vendor_bills(id) ON DELETE SET NULL,
    direct_bill_id INTEGER, -- For direct bills (if separate table exists)
    po_id INTEGER REFERENCES purchase_orders(id) ON DELETE SET NULL,
    project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN (
        'bank_transfer', 'cheque', 'cash', 'online_portal', 'credit_card'
    )),
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'SGD',
    bank_reference VARCHAR(100),
    payment_reference VARCHAR(100),
    payment_date DATE,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN (
        'pending', 'approved', 'paid', 'cancelled'
    )),
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    paid_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    paid_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`,
    createIndexes: `CREATE INDEX idx_vouchers_voucher_number ON vouchers(voucher_number);
CREATE INDEX idx_vouchers_vendor_id ON vouchers(vendor_id);
CREATE INDEX idx_vouchers_vendor_bill_id ON vouchers(vendor_bill_id);
CREATE INDEX idx_vouchers_po_id ON vouchers(po_id);
CREATE INDEX idx_vouchers_status ON vouchers(status);
CREATE INDEX idx_vouchers_voucher_date ON vouchers(voucher_date);`
  },
  transmittal_forms: {
    table: 'transmittal_forms',
    createTable: `CREATE TABLE transmittal_forms (
    id SERIAL PRIMARY KEY,
    transmittal_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., TRF-YYYY-XXX
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE RESTRICT,
    transmittal_date DATE NOT NULL,
    transmittal_type VARCHAR(50) CHECK (transmittal_type IN (
        'production', 'qa_qc', 'design', 'material', 'document'
    )),
    from_department VARCHAR(100),
    to_department VARCHAR(100),
    subject VARCHAR(255),
    description TEXT,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
        'draft', 'sent', 'received', 'acknowledged', 'completed'
    )),
    acknowledged_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`,
    createIndexes: `CREATE INDEX idx_transmittal_forms_transmittal_number ON transmittal_forms(transmittal_number);
CREATE INDEX idx_transmittal_forms_project_id ON transmittal_forms(project_id);
CREATE INDEX idx_transmittal_forms_status ON transmittal_forms(status);
CREATE INDEX idx_transmittal_forms_date ON transmittal_forms(transmittal_date);`
  },
  item_receipts: {
    table: 'item_receipts',
    createTable: `CREATE TABLE item_receipts (
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
);`,
    createIndexes: `CREATE INDEX idx_item_receipts_receipt_number ON item_receipts(receipt_number);
CREATE INDEX idx_item_receipts_po_id ON item_receipts(po_id);
CREATE INDEX idx_item_receipts_receipt_status ON item_receipts(receipt_status);
CREATE INDEX idx_item_receipts_do_required ON item_receipts(do_required);`
  },
  item_receipt_items: {
    table: 'item_receipt_items',
    createTable: `CREATE TABLE item_receipt_items (
    id SERIAL PRIMARY KEY,
    item_receipt_id INTEGER NOT NULL REFERENCES item_receipts(id) ON DELETE CASCADE,
    po_item_id INTEGER REFERENCES purchase_order_items(id) ON DELETE SET NULL,
    item_id INTEGER REFERENCES items(id) ON DELETE SET NULL,
    item_code VARCHAR(50),
    item_description VARCHAR(255) NOT NULL,
    ordered_quantity DECIMAL(10,2) NOT NULL,
    received_quantity DECIMAL(10,2) NOT NULL,
    unit_of_measure VARCHAR(20),
    condition_status VARCHAR(50), -- 'good', 'damaged', 'defective'
    notes TEXT,
    sequence INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    createIndexes: `CREATE INDEX idx_item_receipt_items_receipt_id ON item_receipt_items(item_receipt_id);
CREATE INDEX idx_item_receipt_items_po_item_id ON item_receipt_items(po_item_id);`
  },
  attendance: {
    table: 'attendance',
    createTable: `CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    attendance_date DATE NOT NULL,
    employee_id INTEGER REFERENCES users(id) ON DELETE SET NULL, -- If employees are users
    worker_id VARCHAR(50), -- External worker ID for non-employees
    worker_name VARCHAR(255) NOT NULL,
    project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
    site_location VARCHAR(255),
    shift_type VARCHAR(50), -- 'day', 'night', 'overtime'
    shift_start_time TIME,
    shift_end_time TIME,
    check_in_time TIMESTAMP WITH TIME ZONE,
    check_out_time TIMESTAMP WITH TIME ZONE,
    hours_worked DECIMAL(5,2),
    overtime_hours DECIMAL(5,2) DEFAULT 0,
    attendance_status VARCHAR(50) DEFAULT 'present' CHECK (attendance_status IN (
        'present', 'absent', 'late', 'early_leave', 'half_day', 'on_leave'
    )),
    attendance_type VARCHAR(50) CHECK (attendance_type IN (
        'daily_wage', 'monthly_salary'
    )),
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(attendance_date, worker_id, project_id)
);`,
    createIndexes: `CREATE INDEX idx_attendance_date ON attendance(attendance_date);
CREATE INDEX idx_attendance_worker_id ON attendance(worker_id);
CREATE INDEX idx_attendance_project_id ON attendance(project_id);
CREATE INDEX idx_attendance_status ON attendance(attendance_status);
CREATE INDEX idx_attendance_type ON attendance(attendance_type);`
  },
  project_schedules: {
    table: 'project_schedules',
    createTable: `CREATE TABLE project_schedules (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    schedule_date DATE NOT NULL,
    milestone VARCHAR(255),
    task_description TEXT,
    planned_start_date DATE,
    planned_end_date DATE,
    actual_start_date DATE,
    actual_end_date DATE,
    status VARCHAR(50) DEFAULT 'planned' CHECK (status IN (
        'planned', 'in_progress', 'completed', 'delayed', 'cancelled'
    )),
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`,
    createIndexes: `CREATE INDEX idx_project_schedules_project_id ON project_schedules(project_id);
CREATE INDEX idx_project_schedules_schedule_date ON project_schedules(schedule_date);
CREATE INDEX idx_project_schedules_status ON project_schedules(status);`
  },
  work_in_progress: {
    table: 'work_in_progress',
    createTable: `CREATE TABLE work_in_progress (
    id SERIAL PRIMARY KEY,
    wip_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., WIP-YYYY-XXX
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE RESTRICT,
    milestone_id INTEGER, -- Reference to project milestone/task
    activity_type VARCHAR(100), -- 'prefabrication', 'installation', 'assembly', etc.
    activity_description TEXT,
    progress_date DATE NOT NULL,
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'in_progress' CHECK (status IN (
        'in_progress', 'completed', 'on_hold', 'delayed'
    )),
    material_usage_tracked BOOLEAN DEFAULT FALSE,
    threshold_alert_triggered BOOLEAN DEFAULT FALSE,
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`,
    createIndexes: `CREATE INDEX idx_wip_wip_number ON work_in_progress(wip_number);
CREATE INDEX idx_wip_project_id ON work_in_progress(project_id);
CREATE INDEX idx_wip_status ON work_in_progress(status);
CREATE INDEX idx_wip_progress_date ON work_in_progress(progress_date);`
  },
  wip_material_usage: {
    table: 'wip_material_usage',
    createTable: `CREATE TABLE wip_material_usage (
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
);`,
    createIndexes: `CREATE INDEX idx_wip_material_usage_wip_id ON wip_material_usage(wip_id);
CREATE INDEX idx_wip_material_usage_item_id ON wip_material_usage(item_id);`
  },
  project_tasks: {
    table: 'project_tasks',
    createTable: `CREATE TABLE project_tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    task_code VARCHAR(50),
    task_name VARCHAR(255) NOT NULL,
    task_description TEXT,
    task_type VARCHAR(50), -- 'milestone', 'task', 'deliverable', 'checkpoint'
    parent_task_id INTEGER REFERENCES project_tasks(id) ON DELETE SET NULL,
    planned_start_date DATE,
    planned_end_date DATE,
    actual_start_date DATE,
    actual_end_date DATE,
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'planned' CHECK (status IN (
        'planned', 'in_progress', 'completed', 'on_hold', 'cancelled'
    )),
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
    estimated_hours DECIMAL(10,2),
    actual_hours DECIMAL(10,2),
    sequence INTEGER DEFAULT 1,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`,
    createIndexes: `CREATE INDEX idx_project_tasks_project_id ON project_tasks(project_id);
CREATE INDEX idx_project_tasks_parent_task_id ON project_tasks(parent_task_id);
CREATE INDEX idx_project_tasks_status ON project_tasks(status);
CREATE INDEX idx_project_tasks_assigned_to ON project_tasks(assigned_to);`
  },
  vendor_prepayments: {
    table: 'vendor_prepayments',
    createTable: `CREATE TABLE vendor_prepayments (
    id SERIAL PRIMARY KEY,
    prepayment_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., PREPAY-YYYY-XXX
    po_id INTEGER NOT NULL REFERENCES purchase_orders(id) ON DELETE RESTRICT,
    vendor_id INTEGER NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
    prepayment_date DATE NOT NULL,
    prepayment_amount DECIMAL(15,2) NOT NULL,
    prepayment_percentage DECIMAL(5,2), -- Percentage of PO value
    currency VARCHAR(3) DEFAULT 'SGD',
    payment_method VARCHAR(50) CHECK (payment_method IN (
        'bank_transfer', 'cheque', 'cash', 'online_portal'
    )),
    bank_reference VARCHAR(100),
    payment_reference VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN (
        'pending', 'approved', 'paid', 'adjusted', 'cancelled'
    )),
    adjusted_against_bill BOOLEAN DEFAULT FALSE,
    vendor_bill_id INTEGER REFERENCES vendor_bills(id) ON DELETE SET NULL,
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    paid_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    paid_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);`,
    createIndexes: `CREATE INDEX idx_vendor_prepayments_prepayment_number ON vendor_prepayments(prepayment_number);
CREATE INDEX idx_vendor_prepayments_po_id ON vendor_prepayments(po_id);
CREATE INDEX idx_vendor_prepayments_vendor_id ON vendor_prepayments(vendor_id);
CREATE INDEX idx_vendor_prepayments_status ON vendor_prepayments(status);`
  },
};

/**
 * Get schema for a specific table
 * @param {string} tableName - Name of the table
 * @returns {Object|null} Schema object with createTable and createIndexes
 */
function getSchema(tableName) {
  return schemas[tableName] || null;
}

/**
 * Get all table names
 * @returns {string[]} Array of table names
 */
function getAllTableNames() {
  return Object.keys(schemas);
}

/**
 * Get full SQL for creating a table (CREATE TABLE + INDEXES)
 * @param {string} tableName - Name of the table
 * @returns {string|null} Complete SQL statement
 */
function getFullSQL(tableName) {
  const schema = getSchema(tableName);
  if (!schema) return null;
  return `${schema.createTable};

${schema.createIndexes}`;
}

module.exports = {
  schemas,
  getSchema,
  getAllTableNames,
  getFullSQL
};
