export interface Customer {
  id: string
  name: string
  email: string
  phone: string
}

export interface Agent {
  id: string
  name: string
  role: string
  avatar: string
}

export interface Technician {
  id: string
  name: string
  specialization: string
  avatar: string
  availability: "Available" | "Busy" | "On Leave"
}

export interface Location {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
}

export interface ActivityUser {
  id: string
  name: string
  avatar: string
  role: "Agent" | "Technician" | "Manager" | "Customer" | "System"
}

export interface Activity {
  id: string
  type: "status_change" | "comment" | "assignment" | "escalation" | "creation" | "technician_assignment" | "work_log"
  createdAt: string
  description: string
  note?: string
  user: ActivityUser
}

export type TicketStatus = "Open" | "In Progress" | "On Hold" | "Escalated" | "Resolved" | "Closed"

export type TicketPriority = "Low" | "Normal" | "High" | "Urgent"

export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  category: string
  team: string
  createdAt: string
  updatedAt: string
  customer: Customer
  assignedAgent: Agent
  assignedTechnician?: Technician
  location: Location
  activities?: Activity[]
  escalatedTo?: string
}


export interface ChatwootWebhookEvent {
  event: string;
  id?: number | string;

  // Common to both event types
  content?: string;
  created_at?: string | number;
  message_type?: 'incoming' | 'outgoing' | 'template' | number;
  content_type?: 'text' | 'input_select' | 'cards' | 'form' | string;
  content_attributes?: Record<string, any>;
  source_id?: string | null;

  sender?: {
    id?: number | string;
    name?: string;
    email?: string;
    phone_number?: string;
    thumbnail?: string;
    blocked?: boolean;
    type?: string;
    additional_attributes?: Record<string, any>;
    custom_attributes?: Record<string, any>;
  };

  contact?: {
    id: number | string;
    name?: string;
  };

  conversation?: {
    display_id?: string | number;
    id?: number;
    inbox_id?: number;
    account_id?: number;
    additional_attributes?: {
      browser?: {
        device_name?: string;
        browser_name?: string;
        platform_name?: string;
        browser_version?: string;
        platform_version?: string;
      };
      referer?: string;
      initiated_at?: {
        timestamp?: string;
      } | string;
      browser_language?: string;
      [key: string]: any;
    };
  };

  account?: {
    id: number | string;
    name?: string;
  };

  // Fields specific to `automation_event.conversation_created`
  additional_attributes?: Record<string, any>;
  can_reply?: boolean;
  channel?: string;
  contact_inbox?: {
    id: number;
    contact_id: number;
    inbox_id: number;
    source_id?: string;
    created_at?: string;
    updated_at?: string;
    hmac_verified?: boolean;
    pubsub_token?: string;
  };
  inbox_id?: number;
  messages?: Array<{
    id: number;
    content: string;
    account_id: number;
    inbox_id: number;
    conversation_id: number;
    message_type: number;
    created_at: number;
    updated_at: string;
    private: boolean;
    status: string;
    source_id: string | null;
    content_type: string;
    content_attributes: Record<string, any>;
    sender_type: string | null;
    sender_id: string | number | null;
    external_source_ids: Record<string, any>;
    additional_attributes: Record<string, any>;
    processed_message_content: string;
    sentiment?: Record<string, any>;
    conversation?: Record<string, any>;
  }>;
  labels?: string[];
  meta?: {
    sender?: ChatwootWebhookEvent['sender'];
    assignee?: any;
    team?: any;
    hmac_verified?: boolean;
  };
  status?: string;
  custom_attributes?: Record<string, any>;
  snoozed_until?: string | null;
  unread_count?: number;
  first_reply_created_at?: number | null;
  priority?: string | null;
  waiting_since?: number;
  agent_last_seen_at?: number;
  contact_last_seen_at?: number;
  last_activity_at?: number;
  timestamp?: number;
  updated_at?: number;
}
