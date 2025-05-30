import type { Ticket } from "../src/types/ticket"
import { locations } from "../data/locations"
import { technicians } from "../data/technicians"

export const dummyTickets: Ticket[] = [
  {
    id: "TKT-1001",
    title: "Cannot access email account",
    description:
      "User is unable to log into their email account after password reset. They've tried multiple browsers and devices with the same result.",
    status: "Open",
    priority: "High",
    category: "Email Issues",
    team: "IT Support",
    createdAt: "2023-05-01T08:30:00Z",
    updatedAt: "2023-05-01T08:30:00Z",
    customer: {
      id: "CUST-001",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
    },
    assignedAgent: {
      id: "AGT-001",
      name: "Alex Johnson",
      role: "Support Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    location: locations[0],
    activities: [
      {
        id: "act-001",
        type: "creation",
        createdAt: "2023-05-01T08:30:00Z",
        description: "Ticket created",
        user: {
          id: "CUST-001",
          name: "John Smith",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Customer",
        },
      },
    ],
  },
  {
    id: "TKT-1002",
    title: "VPN connection issues",
    description:
      "Remote employee is experiencing intermittent VPN disconnections when working from home. This is affecting their ability to access internal systems.",
    status: "In Progress",
    priority: "Normal",
    category: "Network",
    team: "Network Support",
    createdAt: "2023-05-02T10:15:00Z",
    updatedAt: "2023-05-02T14:20:00Z",
    customer: {
      id: "CUST-002",
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      phone: "+1 (555) 987-6543",
    },
    assignedAgent: {
      id: "AGT-002",
      name: "Miguel Rodriguez",
      role: "Network Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    assignedTechnician: technicians[0],
    location: locations[1],
    activities: [
      {
        id: "act-002",
        type: "creation",
        createdAt: "2023-05-02T10:15:00Z",
        description: "Ticket created",
        user: {
          id: "CUST-002",
          name: "Sarah Williams",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Customer",
        },
      },
      {
        id: "act-003",
        type: "assignment",
        createdAt: "2023-05-02T10:30:00Z",
        description: "Ticket assigned to Miguel Rodriguez",
        user: {
          id: "AGT-005",
          name: "Samantha Lee",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Agent",
        },
      },
      {
        id: "act-004",
        type: "status_change",
        createdAt: "2023-05-02T11:15:00Z",
        description: "Ticket status changed to In Progress",
        user: {
          id: "AGT-002",
          name: "Miguel Rodriguez",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Agent",
        },
      },
      {
        id: "act-005",
        type: "comment",
        createdAt: "2023-05-02T14:20:00Z",
        description: "Added comment",
        note: "Initial troubleshooting completed. VPN client needs to be updated to the latest version. Sent instructions to the user.",
        user: {
          id: "AGT-002",
          name: "Miguel Rodriguez",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Agent",
        },
      },
      {
        id: "act-006",
        type: "technician_assignment",
        createdAt: "2023-05-02T15:30:00Z",
        description: "Assigned technician Jason Miller",
        user: {
          id: "MGR-001",
          name: "Jennifer Parker",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Manager",
        },
      },
      {
        id: "act-007",
        type: "work_log",
        createdAt: "2023-05-02T16:45:00Z",
        description: "Work log entry",
        note: "Checked VPN server logs and found intermittent connection drops. Will need to update the VPN server software and reconfigure client settings.",
        user: {
          id: "TECH-001",
          name: "Jason Miller",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Technician",
        },
      },
    ],
  },
  {
    id: "TKT-1003",
    title: "Software license activation failed",
    description:
      "New employee cannot activate their design software license. Error message states 'Invalid license key' despite using the correct key from our license management system.",
    status: "On Hold",
    priority: "Low",
    category: "Software",
    team: "Software Support",
    createdAt: "2023-05-03T09:45:00Z",
    updatedAt: "2023-05-03T11:30:00Z",
    customer: {
      id: "CUST-003",
      name: "David Chen",
      email: "d.chen@example.com",
      phone: "+1 (555) 234-5678",
    },
    assignedAgent: {
      id: "AGT-003",
      name: "Priya Patel",
      role: "Software Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    location: locations[2],
    activities: [
      {
        id: "act-008",
        type: "creation",
        createdAt: "2023-05-03T09:45:00Z",
        description: "Ticket created",
        user: {
          id: "CUST-003",
          name: "David Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Customer",
        },
      },
      {
        id: "act-009",
        type: "status_change",
        createdAt: "2023-05-03T11:30:00Z",
        description: "Ticket status changed to On Hold",
        note: "Waiting for response from software vendor about license activation issue.",
        user: {
          id: "AGT-003",
          name: "Priya Patel",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Agent",
        },
      },
    ],
  },
  {
    id: "TKT-1004",
    title: "Server outage affecting multiple departments",
    description:
      "Main file server is down, affecting access to shared documents across marketing, sales, and finance departments. Initial investigation shows possible hardware failure.",
    status: "Escalated",
    priority: "Urgent",
    category: "Infrastructure",
    team: "Systems Administration",
    createdAt: "2023-05-04T07:30:00Z",
    updatedAt: "2023-05-04T07:45:00Z",
    customer: {
      id: "CUST-004",
      name: "Emma Johnson",
      email: "e.johnson@example.com",
      phone: "+1 (555) 345-6789",
    },
    assignedAgent: {
      id: "AGT-004",
      name: "Thomas Wilson",
      role: "Systems Administrator",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    assignedTechnician: technicians[3],
    location: locations[5],
    escalatedTo: "mgr-002",
    activities: [
      {
        id: "act-010",
        type: "creation",
        createdAt: "2023-05-04T07:30:00Z",
        description: "Ticket created",
        user: {
          id: "CUST-004",
          name: "Emma Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Customer",
        },
      },
      {
        id: "act-011",
        type: "escalation",
        createdAt: "2023-05-04T07:45:00Z",
        description: "Ticket escalated to IT Operations Manager",
        note: "Critical server outage affecting multiple departments. Requires immediate attention and coordination with hardware vendor.",
        user: {
          id: "AGT-004",
          name: "Thomas Wilson",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Agent",
        },
      },
      {
        id: "act-012",
        type: "technician_assignment",
        createdAt: "2023-05-04T08:15:00Z",
        description: "Assigned technician Sophia Rodriguez",
        user: {
          id: "MGR-002",
          name: "Michael Stevens",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Manager",
        },
      },
      {
        id: "act-013",
        type: "work_log",
        createdAt: "2023-05-04T09:30:00Z",
        description: "Work log entry",
        note: "Initial diagnosis complete. RAID controller has failed. Replacement part has been ordered with expedited shipping. ETA 4 hours. Setting up temporary file access on backup server.",
        user: {
          id: "TECH-004",
          name: "Sophia Rodriguez",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Technician",
        },
      },
    ],
  },
  {
    id: "TKT-1005",
    title: "Printer not connecting to network",
    description:
      "Department printer is not connecting to the network after office relocation. It was working fine before the move. Power cycling and basic troubleshooting has been attempted.",
    status: "In Progress",
    priority: "Normal",
    category: "Hardware",
    team: "IT Support",
    createdAt: "2023-05-05T13:20:00Z",
    updatedAt: "2023-05-05T15:10:00Z",
    customer: {
      id: "CUST-005",
      name: "Robert Taylor",
      email: "r.taylor@example.com",
      phone: "+1 (555) 456-7890",
    },
    assignedAgent: {
      id: "AGT-001",
      name: "Alex Johnson",
      role: "Support Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    assignedTechnician: technicians[7],
    location: locations[3],
    activities: [
      {
        id: "act-014",
        type: "creation",
        createdAt: "2023-05-05T13:20:00Z",
        description: "Ticket created",
        user: {
          id: "CUST-005",
          name: "Robert Taylor",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Customer",
        },
      },
      {
        id: "act-015",
        type: "status_change",
        createdAt: "2023-05-05T13:45:00Z",
        description: "Ticket status changed to In Progress",
        user: {
          id: "AGT-001",
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Agent",
        },
      },
      {
        id: "act-016",
        type: "comment",
        createdAt: "2023-05-05T15:10:00Z",
        description: "Added comment",
        note: "Visited the office and checked the printer. Network settings need to be reconfigured for the new subnet. Will schedule a follow-up visit tomorrow.",
        user: {
          id: "AGT-001",
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Agent",
        },
      },
      {
        id: "act-017",
        type: "technician_assignment",
        createdAt: "2023-05-05T16:00:00Z",
        description: "Assigned technician Emma Wilson",
        user: {
          id: "MGR-001",
          name: "Jennifer Parker",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Manager",
        },
      },
    ],
  },
  {
    id: "TKT-1006",
    title: "New employee onboarding",
    description:
      "Need to set up accounts, permissions, and equipment for new marketing manager starting next Monday. Requires standard software suite plus Adobe Creative Cloud.",
    status: "Open",
    priority: "High",
    category: "Onboarding",
    team: "IT Support",
    createdAt: "2023-05-06T11:00:00Z",
    updatedAt: "2023-05-06T11:00:00Z",
    customer: {
      id: "CUST-006",
      name: "Jennifer Lopez",
      email: "j.lopez@example.com",
      phone: "+1 (555) 567-8901",
    },
    assignedAgent: {
      id: "AGT-005",
      name: "Samantha Lee",
      role: "Onboarding Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    location: locations[0],
    activities: [
      {
        id: "act-018",
        type: "creation",
        createdAt: "2023-05-06T11:00:00Z",
        description: "Ticket created",
        user: {
          id: "CUST-006",
          name: "Jennifer Lopez",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Customer",
        },
      },
    ],
  },
  {
    id: "TKT-1007",
    title: "Data recovery request",
    description:
      "User accidentally deleted an important presentation file. Last backup was from yesterday, but they need the latest version for a meeting tomorrow morning.",
    status: "Resolved",
    priority: "High",
    category: "Data Management",
    team: "Data Recovery",
    createdAt: "2023-05-07T16:45:00Z",
    updatedAt: "2023-05-07T18:30:00Z",
    customer: {
      id: "CUST-007",
      name: "Michael Brown",
      email: "m.brown@example.com",
      phone: "+1 (555) 678-9012",
    },
    assignedAgent: {
      id: "AGT-006",
      name: "Daniel Kim",
      role: "Data Recovery Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    assignedTechnician: technicians[2],
    location: locations[4],
    activities: [
      {
        id: "act-019",
        type: "creation",
        createdAt: "2023-05-07T16:45:00Z",
        description: "Ticket created",
        user: {
          id: "CUST-007",
          name: "Michael Brown",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Customer",
        },
      },
      {
        id: "act-020",
        type: "assignment",
        createdAt: "2023-05-07T16:50:00Z",
        description: "Ticket assigned to Daniel Kim",
        user: {
          id: "AGT-005",
          name: "Samantha Lee",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Agent",
        },
      },
      {
        id: "act-021",
        type: "status_change",
        createdAt: "2023-05-07T17:15:00Z",
        description: "Ticket status changed to In Progress",
        user: {
          id: "AGT-006",
          name: "Daniel Kim",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Agent",
        },
      },
      {
        id: "act-022",
        type: "technician_assignment",
        createdAt: "2023-05-07T17:30:00Z",
        description: "Assigned technician Marcus Johnson",
        user: {
          id: "MGR-003",
          name: "Sarah Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Manager",
        },
      },
      {
        id: "act-023",
        type: "work_log",
        createdAt: "2023-05-07T18:00:00Z",
        description: "Work log entry",
        note: "Used specialized recovery software to restore the deleted presentation from the user's local drive. All slides and content were recovered successfully.",
        user: {
          id: "TECH-003",
          name: "Marcus Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Technician",
        },
      },
      {
        id: "act-024",
        type: "status_change",
        createdAt: "2023-05-07T18:30:00Z",
        description: "Ticket status changed to Resolved",
        note: "Successfully recovered the presentation file from volume shadow copy. File has been restored to the user's desktop and verified by the user.",
        user: {
          id: "AGT-006",
          name: "Daniel Kim",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Agent",
        },
      },
    ],
  },
  {
    id: "TKT-1008",
    title: "Mobile device enrollment issue",
    description:
      "New company phone cannot be enrolled in MDM solution. Device shows 'Enrollment Failed' error when attempting to complete the process.",
    status: "Open",
    priority: "Normal",
    category: "Mobile Devices",
    team: "Mobile Support",
    createdAt: "2023-05-08T09:15:00Z",
    updatedAt: "2023-05-08T09:15:00Z",
    customer: {
      id: "CUST-008",
      name: "Lisa Garcia",
      email: "l.garcia@example.com",
      phone: "+1 (555) 789-0123",
    },
    assignedAgent: {
      id: "AGT-007",
      name: "James Wilson",
      role: "Mobile Device Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    location: locations[7],
    activities: [
      {
        id: "act-025",
        type: "creation",
        createdAt: "2023-05-08T09:15:00Z",
        description: "Ticket created",
        user: {
          id: "CUST-008",
          name: "Lisa Garcia",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Customer",
        },
      },
    ],
  },
  {
    id: "TKT-1009",
    title: "Website displaying 500 error",
    description:
      "Company website is showing 500 Internal Server Error for all visitors. Error appeared approximately 30 minutes ago with no recent deployments or changes.",
    status: "Escalated",
    priority: "Urgent",
    category: "Web Services",
    team: "Web Development",
    createdAt: "2023-05-09T14:30:00Z",
    updatedAt: "2023-05-09T14:45:00Z",
    customer: {
      id: "CUST-009",
      name: "Andrew Martin",
      email: "a.martin@example.com",
      phone: "+1 (555) 890-1234",
    },
    assignedAgent: {
      id: "AGT-008",
      name: "Olivia Thompson",
      role: "Web Developer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    location: locations[6],
    escalatedTo: "mgr-003",
    activities: [
      {
        id: "act-026",
        type: "creation",
        createdAt: "2023-05-09T14:30:00Z",
        description: "Ticket created",
        user: {
          id: "CUST-009",
          name: "Andrew Martin",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Customer",
        },
      },
      {
        id: "act-027",
        type: "escalation",
        createdAt: "2023-05-09T14:45:00Z",
        description: "Ticket escalated to Technical Support Manager",
        note: "Critical website outage affecting all users. Initial investigation shows possible database connectivity issue.",
        user: {
          id: "AGT-008",
          name: "Olivia Thompson",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Agent",
        },
      },
    ],
  },
  {
    id: "TKT-1010",
    title: "Password reset request",
    description:
      "User needs password reset for their account. They are locked out after multiple failed attempts and cannot use the self-service reset tool.",
    status: "Closed",
    priority: "Low",
    category: "Account Management",
    team: "IT Support",
    createdAt: "2023-05-10T10:00:00Z",
    updatedAt: "2023-05-10T10:30:00Z",
    customer: {
      id: "CUST-010",
      name: "Kevin White",
      email: "k.white@example.com",
      phone: "+1 (555) 901-2345",
    },
    assignedAgent: {
      id: "AGT-001",
      name: "Alex Johnson",
      role: "Support Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    location: locations[1],
    activities: [
      {
        id: "act-028",
        type: "creation",
        createdAt: "2023-05-10T10:00:00Z",
        description: "Ticket created",
        user: {
          id: "CUST-010",
          name: "Kevin White",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Customer",
        },
      },
      {
        id: "act-029",
        type: "status_change",
        createdAt: "2023-05-10T10:15:00Z",
        description: "Ticket status changed to In Progress",
        user: {
          id: "AGT-001",
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Agent",
        },
      },
      {
        id: "act-030",
        type: "status_change",
        createdAt: "2023-05-10T10:25:00Z",
        description: "Ticket status changed to Resolved",
        note: "Password has been reset and temporary credentials sent to user's mobile phone.",
        user: {
          id: "AGT-001",
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Agent",
        },
      },
      {
        id: "act-031",
        type: "status_change",
        createdAt: "2023-05-10T10:30:00Z",
        description: "Ticket status changed to Closed",
        note: "User confirmed successful login with new credentials.",
        user: {
          id: "AGT-001",
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Agent",
        },
      },
    ],
  },
]
