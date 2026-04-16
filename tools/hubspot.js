/**
 * HubSpot tool functions for OpenClaw agent
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const SCRIPT_PATH = '/Users/mark/.openclaw/workspace/scripts/hubspot.js';

class HubSpotTool {
  async searchContacts(query, limit = 5) {
    try {
      const { stdout } = await execAsync(`node "${SCRIPT_PATH}" search-contacts "${query}" ${limit}`);
      return JSON.parse(stdout);
    } catch (error) {
      throw new Error(`HubSpot contact search failed: ${error.message}`);
    }
  }

  async searchCompanies(query, limit = 5) {
    try {
      const { stdout } = await execAsync(`node "${SCRIPT_PATH}" search-companies "${query}" ${limit}`);
      return JSON.parse(stdout);
    } catch (error) {
      throw new Error(`HubSpot company search failed: ${error.message}`);
    }
  }

  async searchDeals(query, limit = 5) {
    try {
      const { stdout } = await execAsync(`node "${SCRIPT_PATH}" search-deals "${query}" ${limit}`);
      return JSON.parse(stdout);
    } catch (error) {
      throw new Error(`HubSpot deal search failed: ${error.message}`);
    }
  }

  async getContact(contactId) {
    try {
      const { stdout } = await execAsync(`node "${SCRIPT_PATH}" get-contact ${contactId}`);
      return JSON.parse(stdout);
    } catch (error) {
      throw new Error(`HubSpot get contact failed: ${error.message}`);
    }
  }

  async getCompany(companyId) {
    try {
      const { stdout } = await execAsync(`node "${SCRIPT_PATH}" get-company ${companyId}`);
      return JSON.parse(stdout);
    } catch (error) {
      throw new Error(`HubSpot get company failed: ${error.message}`);
    }
  }

  async getDeal(dealId) {
    try {
      const { stdout } = await execAsync(`node "${SCRIPT_PATH}" get-deal ${dealId}`);
      return JSON.parse(stdout);
    } catch (error) {
      throw new Error(`HubSpot get deal failed: ${error.message}`);
    }
  }

  async createNote(objectType, objectId, noteBody) {
    try {
      const { stdout } = await execAsync(`node "${SCRIPT_PATH}" create-note "${objectType}" "${objectId}" "${noteBody}"`);
      return JSON.parse(stdout);
    } catch (error) {
      throw new Error(`HubSpot create note failed: ${error.message}`);
    }
  }

  async createTask(title, description, dueDate, objectType, objectId) {
    try {
      const cmd = `node "${SCRIPT_PATH}" create-task "${title}" "${description}"` +
        (dueDate ? ` "${dueDate}"` : '') +
        (objectType ? ` "${objectType}"` : '') +
        (objectId ? ` "${objectId}"` : '');
      
      const { stdout } = await execAsync(cmd);
      return JSON.parse(stdout);
    } catch (error) {
      throw new Error(`HubSpot create task failed: ${error.message}`);
    }
  }

  async testConnection() {
    try {
      const { stdout } = await execAsync(`node "${SCRIPT_PATH}" test`);
      return JSON.parse(stdout);
    } catch (error) {
      throw new Error(`HubSpot connection test failed: ${error.message}`);
    }
  }

  // Email operations
  async getEmailTemplates(limit = 10) {
    try {
      const { stdout } = await execAsync(`node "${SCRIPT_PATH}" list-email-templates ${limit}`);
      return JSON.parse(stdout);
    } catch (error) {
      throw new Error(`HubSpot list email templates failed: ${error.message}`);
    }
  }

  async getEmailTemplate(emailId) {
    try {
      const { stdout } = await execAsync(`node "${SCRIPT_PATH}" get-email-template ${emailId}`);
      return JSON.parse(stdout);
    } catch (error) {
      throw new Error(`HubSpot get email template failed: ${error.message}`);
    }
  }

  async createEmailDraft(subject, htmlContent, name, fromName, replyTo) {
    try {
      const cmd = `node "${SCRIPT_PATH}" create-email-draft "${subject}" "${htmlContent}"` +
        (name ? ` "${name}"` : '') +
        (fromName ? ` "${fromName}"` : '') +
        (replyTo ? ` "${replyTo}"` : '');
      
      const { stdout } = await execAsync(cmd);
      return JSON.parse(stdout);
    } catch (error) {
      throw new Error(`HubSpot create email draft failed: ${error.message}`);
    }
  }

  async cloneEmail(sourceEmailId, newName) {
    try {
      const { stdout } = await execAsync(`node "${SCRIPT_PATH}" clone-email ${sourceEmailId} "${newName}"`);
      return JSON.parse(stdout);
    } catch (error) {
      throw new Error(`HubSpot clone email failed: ${error.message}`);
    }
  }

  // Helper methods for common workflows
  async findContactByEmail(email) {
    const results = await this.searchContacts(email, 1);
    return results.results?.[0] || null;
  }

  async findCompanyByDomain(domain) {
    const results = await this.searchCompanies(domain, 1);
    return results.results?.[0] || null;
  }

  async findEmailByName(name) {
    const templates = await this.getEmailTemplates(50);
    return templates.results?.find(email => 
      email.name.toLowerCase().includes(name.toLowerCase())
    ) || null;
  }

  formatContact(contact) {
    const props = contact.properties || {};
    return {
      id: contact.id,
      name: `${props.firstname || ''} ${props.lastname || ''}`.trim(),
      email: props.email,
      company: props.company,
      phone: props.phone,
      leadStatus: props.hs_lead_status,
      url: `https://app.hubspot.com/contacts/14544408/record/0-1/${contact.id}`
    };
  }

  formatCompany(company) {
    const props = company.properties || {};
    return {
      id: company.id,
      name: props.name,
      domain: props.domain,
      industry: props.industry,
      location: [props.city, props.state, props.country].filter(Boolean).join(', '),
      phone: props.phone,
      url: `https://app.hubspot.com/contacts/14544408/record/0-2/${company.id}`
    };
  }

  formatDeal(deal) {
    const props = deal.properties || {};
    return {
      id: deal.id,
      name: props.dealname,
      amount: props.amount,
      stage: props.dealstage,
      pipeline: props.pipeline,
      closeDate: props.closedate,
      probability: props.hs_deal_stage_probability,
      url: `https://app.hubspot.com/contacts/14544408/record/0-3/${deal.id}`
    };
  }

  formatEmail(email) {
    return {
      id: email.id,
      name: email.name,
      subject: email.subject,
      state: email.state,
      type: email.type,
      isPublished: email.isPublished,
      fromName: email.from?.fromName,
      replyTo: email.from?.replyTo,
      createdAt: email.createdAt,
      updatedAt: email.updatedAt,
      url: `https://app.hubspot.com/email-marketing/14544408/email/${email.id}`
    };
  }
}

module.exports = { HubSpotTool };