# TOM System - Workflow & Process Flow Documentation (Based on Workflow PDF)

## Overview
This document describes the complete workflow and process flows for the Tech Onshore MEP-Prefabricators (TOM) system based on the official workflow diagrams.

## Main Workflow Types

### 1. Customer-Direct Owner Job's (Fabrication Workflow)

```
Enquiry from client by email
    ↓
Enquiry Review form
    ↓
Quotation
    ↓
Client PO
    ↓
    ├─→ NO → Stop workflow
    └─→ YES → Continue
    ↓
Sales Order
    ↓
Project ID Creation
    ↓
Purchase Request Form
    ↓
Work progress start
    ↓
Transmittal form to production & QA/QC
    ↓
Delivery Order (DO)
    ↓
Invoice
    ↓
Project Schedule
    ↓
CLOSE
    ↓
Payment Acceptance
```

**Note:** In Fabrication workflow:
- Project Schedule appears AFTER Invoice
- CLOSE happens BEFORE Payment Acceptance
- Parallel supplier process: PO → BILL → Payment (runs concurrently)

---

### 2. Manpower Supply Workflow

```
Enquiry from client by email
    ↓
Enquiry Review form
    ↓
Quotation
    ↓
Client PO
    ↓
    ├─→ NO → Stop workflow
    └─→ YES → Continue
    ↓
Project ID Creation
    ↓
Purchase Request Form
    ↓
Delivery Order (DO)
    ↓
Invoice
    ↓
Timesheet
    ↓
Payment Acceptance
    ↓
CLOSE
```

**Note:** After Client PO, if NO → Stop workflow
**Note:** Timesheet comes AFTER Invoice (not before) for Manpower Supply

---

### 3. Material Supply Workflow

```
Enquiry from client by email
    ↓
Enquiry Review form
    ↓
Quotation
    ↓
Client PO
    ↓
    ├─→ NO → Stop workflow
    └─→ YES → Continue
    ↓
Project ID Creation
    ↓
Purchase Request Form
    ↓
Delivery Order (DO)
    ↓
CLOSE
    ↓
Invoice
    ↓
Payment Acceptance
```

**Note:** After Client PO, if NO → Stop workflow
**Note:** **CRITICAL:** In Material Supply, CLOSE happens IMMEDIATELY AFTER DO (before Invoice!)
**Note:** This is unique to Material Supply - CLOSE comes before Invoice, unlike other workflows
**Note:** No Work progress, Timesheet, or Sales Order in Material Supply flow

---

### 4. Supplier Process: PO to Bill (Purchase Requisition Flow)

```
Purchase Requisition (PR)
    ↓
PR confirmation
    ↓
PO Acceptance
    ↓
Item Receipt
    ↓
    ├─→ NO → Continue to Voucher Preparation
    └─→ YES → DO → Voucher Preparation
    ↓
Voucher Preparation
    ↓
Payment (Bank Transfer)
    ↓
BILL
    ↓
Bill Approved by Accounts team
    ↓
    ├─→ NO → CLOSE
    └─→ YES → CLOSE
```

**Note:** Item Receipt has YES/NO decision point
**Note:** DO is created only if Item Receipt is YES
**Note:** Both paths (YES and NO) eventually lead to Voucher Preparation → Payment → BILL

---

### 5. Vendor Prepayment Workflow

```
Purchase Requisition (PR)
    ↓
PR confirmation
    ↓
PO Acceptance
    ↓
Vendor Prepayment
    ↓
    ├─→ YES → Payment DO → CLOSE
    └─→ NO → Continue
    ↓
Item Receipt
    ↓
Voucher Preparation
    ↓
Payment (Bank Transfer)
    ↓
BILL
    ↓
Bill Approved by Finance team
    ↓
    ├─→ NO → CLOSE
    └─→ YES → CLOSE
```

**Note:** Vendor Prepayment decision comes immediately after PO Acceptance
**Note:** If Vendor Prepayment is YES → Payment DO → CLOSE (prepayment processed, workflow ends)
**Note:** If NO, continues with normal flow: Item Receipt → Voucher Preparation → Payment → BILL → Approval → CLOSE

---

### 6. Direct Bill Process

```
Direct Bill Process
    ↓
Voucher Preparation
    ↓
Payment (Bank Transfer)
    ↓
BILL
    ↓
Bill Approved by Finance team
    ↓
    ├─→ NO → CLOSE
    └─→ YES → CLOSE
```

**Note:** Direct Bill bypasses PR → PO → Item Receipt flow
**Note:** Goes directly to Voucher Preparation → Payment → BILL

---

### 7. Payroll Process

```
Generate Attendance
    ↓
Attendance Data (based on Shift timing)
    ↓
    ├─→ Daily Wages (Foreigners)
    │       ↓
    │   Payment (Bank Transfer)
    │
    └─→ Payroll Monthly (Foreigners & Local)
            ↓
        Payment (Bank Transfer)
```

**Note:** Payroll has two separate paths:
- **Daily Wages** for Foreigners only → Payment
- **Monthly Payroll** for Foreigners & Local workers → Payment
**Note:** Both paths process Attendance Data but with different payment schedules

---

## Key Decision Points in Workflows

### 1. Client PO Decision
- **Location:** After Quotation
- **Outcomes:**
  - YES → Continue to Sales Order / Project ID Creation
  - NO → Stop workflow (Enquiry lost/rejected)

### 2. Item Receipt Decision
- **Location:** After PO Acceptance
- **Outcomes:**
  - YES → Continue to DO creation
  - NO → Skip DO, go to Voucher Preparation

### 3. Vendor Prepayment Decision
- **Location:** After PO Acceptance
- **Outcomes:**
  - YES → Create Payment DO → CLOSE (prepayment processed)
  - NO → Continue to Item Receipt → Normal Bill flow

### 4. Bill Approval Decisions
- **Accounts Team Approval** (PO to Bill flow)
- **Finance Team Approval** (Vendor Prepayment, Direct Bill, Payroll)
- **Outcomes:**
  - YES → CLOSE
  - NO → CLOSE (with rejection status)

---

## Workflow Differences Between Service Types

### Fabrication vs Manpower vs Material Supply

| Aspect | Fabrication | Manpower Supply | Material Supply |
|--------|-------------|-----------------|-----------------|
| **Sales Order** | ✅ Yes | ❌ No | ❌ No |
| **Work Progress** | ✅ Yes | ❌ No | ❌ No |
| **Transmittal to Production** | ✅ Yes | ❌ No | ❌ No |
| **Project Schedule** | ✅ Yes (after Invoice, before CLOSE) | ❌ No | ❌ No |
| **Timesheet** | ❌ No | ✅ Yes (after Invoice) | ❌ No |
| **CLOSE Position** | After Project Schedule, Before Payment | After Payment Acceptance | After DO, Before Invoice |

### Common Steps (All Customer Workflows):
1. Enquiry from client by email
2. Enquiry Review form
3. Quotation
4. Client PO (decision point)
5. Project ID Creation
6. Purchase Request Form
7. Delivery Order (DO)
8. Invoice
9. Payment Acceptance
10. CLOSE

---

## Supplier/Vendor Workflows

### Standard PO to Bill Flow:
1. Purchase Requisition (PR)
2. PR confirmation
3. PO Acceptance
4. Item Receipt (decision point)
5. DO (if Item Receipt = YES)
6. Voucher Preparation
7. Payment (Bank Transfer)
8. BILL
9. Bill Approval (Accounts team)
10. CLOSE

### Vendor Prepayment Flow:
1. Purchase Requisition (PR)
2. PR confirmation
3. PO Acceptance
4. Vendor Prepayment (decision point)
   - YES → Payment DO → CLOSE
   - NO → Continue
5. Item Receipt
6. Voucher Preparation
7. Payment (Bank Transfer)
8. BILL
9. Bill Approval (Finance team)
10. CLOSE

### Direct Bill Flow:
1. Direct Bill Process
2. Voucher Preparation
3. Payment (Bank Transfer)
4. BILL
5. Bill Approval (Finance team)
6. CLOSE

---

## Payroll Workflow Details

### Daily Wages (Foreigners):
```
Attendance Data (Shift timing)
    ↓
Daily Wages Calculation
    ↓
Payment (Bank Transfer)
```

### Monthly Payroll (Foreigners & Local):
```
Attendance Data (Shift timing)
    ↓
Monthly Payroll Calculation
    ↓
Payment (Bank Transfer)
```

---

## Important Notes from Workflow PDF

1. **Enquiry Review form** is a key step after email enquiry (all customer workflows)
2. **Client PO** is a critical decision point (YES/NO) in all customer workflows
3. **Sales Order** only exists in Fabrication workflow (not in Manpower/Material Supply)
4. **Project ID Creation** happens after Client PO (after Sales Order in Fabrication, directly after Client PO in others)
5. **Work progress start** and **Transmittal form to production & QA/QC** are specific to Fabrication workflow
6. **DO (Delivery Order)** is required before Invoice in all customer workflows
7. **Timesheet** is specific to Manpower Supply workflow and comes AFTER Invoice (not before)
8. **Project Schedule** appears only in Fabrication workflow (after Invoice, before CLOSE)
9. **CLOSE position differs significantly:**
   - Fabrication: After Project Schedule, BEFORE Payment Acceptance
   - Manpower Supply: AFTER Payment Acceptance
   - Material Supply: AFTER DO, BEFORE Invoice (unique!)
10. **Vendor Prepayment** decision happens immediately after PO Acceptance
11. **Item Receipt** has YES/NO decision affecting DO creation (if NO, skip DO and go to Voucher Preparation)
12. **Bill Approval** teams differ:
    - Accounts team: PO to Bill flow
    - Finance team: Vendor Prepayment, Direct Bill, Payroll
13. **Payroll** has two separate processing types: Daily Wages (Foreigners only) and Monthly Payroll (Foreigners & Local)
14. **Direct Bill** bypasses PR → PO → Item Receipt flow entirely

---

## Integration Points

### Customer Workflows → Supplier Workflows:
- Purchase Request Form triggers Supplier Process (PR → PO)
- DO in customer workflow may relate to Item Receipt in supplier workflow

### Supplier Workflows → Customer Workflows:
- PO from supplier process may relate to Purchase Request in customer projects
- Item Receipt enables DO creation in customer workflows

---

## Status Tracking Recommendations

Based on workflows, key statuses to track:

### Enquiry Status:
- New (from email)
- Under Review (Review form)
- Quoted
- Client PO Received / Rejected
- Closed (Won/Lost)

### Project Status:
- Created
- Purchase Request Submitted
- Work Progress Started (Fabrication only)
- Production/QA/QC (Fabrication only)
- DO Generated
- Invoice Sent
- Payment Received
- Closed

### PR/PO Status:
- PR Submitted
- PR Confirmed
- PO Accepted
- Item Receipt (YES/NO)
- DO Generated (if applicable)
- Voucher Prepared
- Payment Processed
- Bill Generated
- Bill Approved/Rejected
- Closed

### Invoice Status:
- Generated (from DO)
- Sent
- Payment Accepted
- Closed

---

This workflow documentation is based on the official TOM Workflow PDF diagrams.
