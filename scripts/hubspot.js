#!/usr/bin/env node

/**
 * HubSpot API connector for OpenClaw
 * Requires HUBSPOT_ACCESS_TOKEN in environment
 */

const https = require('https');
const { URL } = require('url');

const HUBSPOT_BASE_URL = 'https://api.hubapi.com';

class HubSpotAPI {
  constructor() {
    this.token = process.env.HUBSPOT_ACCESS_TOKEN;
    if (!this.token) {
      throw new Error('HUBSPOT_ACCESS_TOKEN environment variable is required');
    }
  }

  async request(path, options = {}) {
    const url = new URL(path, HUBSPOT_BASE_URL);
    
    const requestOptions = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method: options.method || 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    return new Promise((resolve, reject) => {
      const req = https.request(requestOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = data ? JSON.parse(data) : {};
            if (res.statusCode >= 400) {
              reject(new Error(`HTTP ${res.statusCode}: ${parsed.message || data}`));
            } else {
              resolve(parsed);
            }
          } catch (err) {
            reject(new Error(`Failed to parse response: ${err.message}`));
          }
        });
      });

      req.on('error', reject);
      
      if (options.body) {
        req.write(JSON.stringify(options.body));
      }
      
      req.end();
    });
  }

  // Search contacts
  async searchContacts(query, limit = 10) {
    const searchBody = {
      query,
      limit,
      properties: ['firstname', 'lastname', 'email', 'company', 'phone', 'hs_lead_status']
    };

    return this.request('/crm/v3/objects/contacts/search', {
      method: 'POST',
      body: searchBody
    });
  }

  // Search companies
  async searchCompanies(query, limit = 10) {
    const searchBody = {
      query,
      limit,
      properties: ['name', 'domain', 'industry', 'city', 'state', 'country', 'phone']
    };

    return this.request('/crm/v3/objects/companies/search', {
      method: 'POST',
      body: searchBody
    });
  }

  // Search deals
  async searchDeals(query, limit = 10) {
    const searchBody = {
      query,
      limit,
      properties: ['dealname', 'amount', 'dealstage', 'pipeline', 'closedate', 'hs_deal_stage_probability']
    };

    return this.request('/crm/v3/objects/deals/search', {
      method: 'POST',
      body: searchBody
    });
  }

  // Get contact by ID
  async getContact(contactId) {
    return this.request(`/crm/v3/objects/contacts/${contactId}?properties=firstname,lastname,email,company,phone,hs_lead_status,createdate,lastmodifieddate`);
  }

  // Get company by ID
  async getCompany(companyId) {
    return this.request(`/crm/v3/objects/companies/${companyId}?properties=name,domain,industry,city,state,country,phone,createdate,lastmodifieddate`);
  }

  // Get deal by ID
  async getDeal(dealId) {
    return this.request(`/crm/v3/objects/deals/${dealId}?properties=dealname,amount,dealstage,pipeline,closedate,hs_deal_stage_probability,createdate,lastmodifieddate`);
  }

  // Create a note on a contact/company/deal
  async createNote(objectType, objectId, noteBody) {
    const note = {
      properties: {
        hs_note_body: noteBody,
        hs_timestamp: Date.now()
      },
      associations: [
        {
          to: {
            id: objectId
          },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: this.getAssociationTypeId(objectType)
            }
          ]
        }
      ]
    };

    return this.request('/crm/v3/objects/notes', {
      method: 'POST',
      body: note
    });
  }

  // Create a task
  async createTask(title, description, dueDate, objectType, objectId) {
    const task = {
      properties: {
        hs_task_subject: title,
        hs_task_body: description,
        hs_task_status: 'NOT_STARTED',
        hs_task_type: 'TODO',
        ...(dueDate && { hs_timestamp: new Date(dueDate).getTime() })
      },
      associations: objectId ? [
        {
          to: {
            id: objectId
          },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: this.getTaskAssociationTypeId(objectType)
            }
          ]
        }
      ] : []
    };

    return this.request('/crm/v3/objects/tasks', {
      method: 'POST',
      body: task
    });
  }

  getAssociationTypeId(objectType) {
    const types = {
      'contact': 202,
      'company': 190,
      'deal': 214
    };
    return types[objectType] || 202;
  }

  getTaskAssociationTypeId(objectType) {
    const types = {
      'contact': 204,
      'company': 192,
      'deal': 216
    };
    return types[objectType] || 204;
  }

  // Get account info
  async getAccountInfo() {
    return this.request('/integrations/v1/me');
  }

  // Email operations
  async getEmailTemplates(limit = 50) {
    return this.request(`/marketing/v3/emails?limit=${limit}`);
  }

  async getEmailTemplate(emailId) {
    return this.request(`/marketing/v3/emails/${emailId}`);
  }

  async createEmailDraft(emailData) {
    const email = {
      name: emailData.name || 'Draft Email',
      subject: emailData.subject || '',
      from: {
        fromName: emailData.fromName || 'Milwaukee Hard Money',
        replyTo: emailData.replyTo || 'mhm@fstreetgroup.com'
      },
      content: {
        styleSettings: {
          backgroundColor: '#EAF0F6',
          primaryFont: 'Arial, sans-serif',
          primaryFontColor: '#3f5465',
          primaryFontSize: 15.0
        },
        flexAreas: {
          main: {
            sections: [
              {
                columns: [{
                  id: 'column-0-1',
                  widgets: ['module-0-1-1'],
                  width: 12
                }],
                id: 'section-0',
                style: {
                  backgroundColor: '#ffffff',
                  backgroundType: 'CONTENT',
                  paddingBottom: '20px',
                  paddingTop: '20px'
                }
              }
            ]
          }
        },
        widgets: {
          'module-0-1-1': {
            body: {
              html: emailData.htmlContent || '<p>Draft email content</p>',
              module_id: 1155639,
              path: '@hubspot/rich_text',
              hs_enable_module_padding: true
            },
            id: 'module-0-1-1',
            type: 'module',
            name: 'module-0-1-1'
          }
        }
      },
      emailTemplateMode: 'DRAG_AND_DROP',
      type: 'REGULAR_EMAIL',
      isPublished: false,
      isAb: false
    };

    return this.request('/marketing/v3/emails', {
      method: 'POST',
      body: email
    });
  }

  async sendEmail(emailId, sendData) {
    const payload = {
      emailId: emailId,
      message: sendData.message || '',
      sendImmediately: sendData.sendImmediately !== false,
      from: sendData.from || {},
      replyTo: sendData.replyTo || '',
      recipients: sendData.recipients || []
    };

    return this.request('/marketing/v3/emails/send', {
      method: 'POST',
      body: payload
    });
  }

  async cloneEmail(sourceEmailId, newName) {
    return this.request(`/marketing/v3/emails/${sourceEmailId}/clone`, {
      method: 'POST',
      body: { name: newName }
    });
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const action = args[0];

  try {
    const hubspot = new HubSpotAPI();

    switch (action) {
      case 'test':
        const info = await hubspot.getAccountInfo();
        console.log(JSON.stringify(info, null, 2));
        break;

      case 'search-contacts':
        if (!args[1]) {
          console.error('Usage: hubspot.js search-contacts <query> [limit]');
          process.exit(1);
        }
        const contactResults = await hubspot.searchContacts(args[1], parseInt(args[2]) || 10);
        console.log(JSON.stringify(contactResults, null, 2));
        break;

      case 'search-companies':
        if (!args[1]) {
          console.error('Usage: hubspot.js search-companies <query> [limit]');
          process.exit(1);
        }
        const companyResults = await hubspot.searchCompanies(args[1], parseInt(args[2]) || 10);
        console.log(JSON.stringify(companyResults, null, 2));
        break;

      case 'search-deals':
        if (!args[1]) {
          console.error('Usage: hubspot.js search-deals <query> [limit]');
          process.exit(1);
        }
        const dealResults = await hubspot.searchDeals(args[1], parseInt(args[2]) || 10);
        console.log(JSON.stringify(dealResults, null, 2));
        break;

      case 'get-contact':
        if (!args[1]) {
          console.error('Usage: hubspot.js get-contact <contactId>');
          process.exit(1);
        }
        const contact = await hubspot.getContact(args[1]);
        console.log(JSON.stringify(contact, null, 2));
        break;

      case 'get-company':
        if (!args[1]) {
          console.error('Usage: hubspot.js get-company <companyId>');
          process.exit(1);
        }
        const company = await hubspot.getCompany(args[1]);
        console.log(JSON.stringify(company, null, 2));
        break;

      case 'get-deal':
        if (!args[1]) {
          console.error('Usage: hubspot.js get-deal <dealId>');
          process.exit(1);
        }
        const deal = await hubspot.getDeal(args[1]);
        console.log(JSON.stringify(deal, null, 2));
        break;

      case 'create-note':
        if (!args[1] || !args[2] || !args[3]) {
          console.error('Usage: hubspot.js create-note <objectType> <objectId> <noteBody>');
          console.error('Example: hubspot.js create-note contact 12345 "Follow up needed"');
          process.exit(1);
        }
        const noteResult = await hubspot.createNote(args[1], args[2], args[3]);
        console.log(JSON.stringify(noteResult, null, 2));
        break;

      case 'create-task':
        if (!args[1] || !args[2]) {
          console.error('Usage: hubspot.js create-task <title> <description> [dueDate] [objectType] [objectId]');
          console.error('Example: hubspot.js create-task "Call prospect" "Follow up on demo" "2024-01-15" contact 12345');
          process.exit(1);
        }
        const taskResult = await hubspot.createTask(args[1], args[2], args[3], args[4], args[5]);
        console.log(JSON.stringify(taskResult, null, 2));
        break;

      case 'list-email-templates':
        const templates = await hubspot.getEmailTemplates(parseInt(args[1]) || 10);
        console.log(JSON.stringify(templates, null, 2));
        break;

      case 'get-email-template':
        if (!args[1]) {
          console.error('Usage: hubspot.js get-email-template <emailId>');
          process.exit(1);
        }
        const template = await hubspot.getEmailTemplate(args[1]);
        console.log(JSON.stringify(template, null, 2));
        break;

      case 'create-email-draft':
        if (!args[1] || !args[2]) {
          console.error('Usage: hubspot.js create-email-draft <subject> <htmlContent> [name] [fromName] [replyTo]');
          console.error('Example: hubspot.js create-email-draft "Follow up" "<p>Thanks for your interest!</p>" "Follow Up Email"');
          process.exit(1);
        }
        const draftResult = await hubspot.createEmailDraft({
          subject: args[1],
          htmlContent: args[2],
          name: args[3],
          fromName: args[4],
          replyTo: args[5]
        });
        console.log(JSON.stringify(draftResult, null, 2));
        break;

      case 'clone-email':
        if (!args[1] || !args[2]) {
          console.error('Usage: hubspot.js clone-email <sourceEmailId> <newName>');
          console.error('Example: hubspot.js clone-email 42594391084 "My New Email"');
          process.exit(1);
        }
        const cloneResult = await hubspot.cloneEmail(args[1], args[2]);
        console.log(JSON.stringify(cloneResult, null, 2));
        break;

      default:
        console.error('Available commands:');
        console.error('  test                                 - Test connection');
        console.error('  search-contacts <query> [limit]     - Search contacts');
        console.error('  search-companies <query> [limit]    - Search companies');
        console.error('  search-deals <query> [limit]        - Search deals');
        console.error('  get-contact <id>                     - Get contact by ID');
        console.error('  get-company <id>                     - Get company by ID');
        console.error('  get-deal <id>                        - Get deal by ID');
        console.error('  create-note <type> <id> <body>      - Create note on object');
        console.error('  create-task <title> <desc> [due]    - Create task');
        console.error('  list-email-templates [limit]        - List email templates');
        console.error('  get-email-template <id>             - Get email template by ID');
        console.error('  create-email-draft <subj> <html>    - Create email draft');
        console.error('  clone-email <id> <name>             - Clone existing email');
        process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { HubSpotAPI };