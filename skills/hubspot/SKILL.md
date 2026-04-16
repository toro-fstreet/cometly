---
name: hubspot
description: "HubSpot CRM integration for contacts, companies, deals, notes, and tasks"
requires:
  env: ["HUBSPOT_ACCESS_TOKEN"]
primaryEnv: HUBSPOT_ACCESS_TOKEN
---

# HubSpot CRM Integration

Access HubSpot contacts, companies, deals, and create notes/tasks using the Legacy App token.

## Available Actions

### Search Operations
- **Search contacts**: Find contacts by name, email, or company
- **Search companies**: Find companies by name or domain
- **Search deals**: Find deals by name or stage

### Record Operations
- **Get contact details**: Retrieve full contact information by ID
- **Get company details**: Retrieve full company information by ID  
- **Get deal details**: Retrieve full deal information by ID

### Create Operations
- **Create notes**: Add notes to contacts, companies, or deals
- **Create tasks**: Create tasks with optional associations
- **Create email drafts**: Create draft emails with custom content
- **Clone emails**: Clone existing email templates

### Email Operations
- **List email templates**: Browse existing email templates
- **Get email template**: Retrieve specific email template details

## Usage Examples

```javascript
// Search for contacts
exec(`node scripts/hubspot.js search-contacts "john" 5`)

// Get specific contact details
exec(`node scripts/hubspot.js get-contact 12345`)

// Create a note on a contact
exec(`node scripts/hubspot.js create-note contact 12345 "Follow up call completed"`)

// Create a task
exec(`node scripts/hubspot.js create-task "Follow up" "Call back next week" "2024-01-20" contact 12345`)

// List email templates
exec(`node scripts/hubspot.js list-email-templates 10`)

// Create email draft
exec(`node scripts/hubspot.js create-email-draft "Subject" "<p>Email content</p>" "Draft Name"`)

// Clone existing email
exec(`node scripts/hubspot.js clone-email 42594391084 "New Email Name"`)
```

## Environment Setup

The skill requires `HUBSPOT_ACCESS_TOKEN` to be set in the environment. This should be a Legacy App token with appropriate scopes for CRM operations.

Test the connection:
```bash
node scripts/hubspot.js test
```

## Error Handling

- Invalid tokens return HTTP 401 errors
- Missing required parameters show usage information
- API errors are displayed with HTTP status codes and messages