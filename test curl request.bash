
curl -X POST http://localhost:3000/api/chatwoot \
  -H "Content-Type: application/json" \
  -d '{
    "event": "automation_event.conversation_created",
    "additional_attributes": {
      "browser": {
        "device_name": "Unknown",
        "browser_name": "Chrome",
        "platform_name": "Windows",
        "browser_version": "136.0.0.0",
        "platform_version": "10.0"
      },
      "referer": "https://pluxnet.co.za/terms-conditions/",
      "initiated_at": {
        "timestamp": "Thu May 15 2025 21:14:13 GMT+0200 (South Africa Standard Time)"
      },
      "browser_language": "en"
    },
    "can_reply": true,
    "channel": "Channel::WebWidget",
    "contact_inbox": {
      "id": 180,
      "contact_id": 4,
      "inbox_id": 3,
      "source_id": "239a4135-0f7b-4fd5-b108-17f84e596aef",
      "created_at": "2025-05-15T19:10:40.449Z",
      "updated_at": "2025-05-15T19:11:08.459Z",
      "hmac_verified": false,
      "pubsub_token": "wfTzyNgmiE8YagFL3m4JU8Fi"
    },
    "id": 207,
    "inbox_id": 3,
    "messages": [
      {
        "id": 654,
        "content": "**Hello! 👋 You’re chatting with PluxNet Fibre.**\nWe’re here to help with any questions about your internet connection, billing, or upgrades.\nLet us know how we can assist you today!",
        "account_id": 2,
        "inbox_id": 3,
        "conversation_id": 207,
        "message_type": 3,
        "created_at": 1747336268,
        "updated_at": "2025-05-15T19:11:08.856Z",
        "private": false,
        "status": "sent",
        "content_type": "text",
        "processed_message_content": "**Hello! 👋 You’re chatting with PluxNet Fibre.**\nWe’re here to help with any questions about your internet connection, billing, or upgrades.\nLet us know how we can assist you today!"
      }
    ],
    "labels": [],
    "meta": {
      "sender": {
        "additional_attributes": {},
        "custom_attributes": {},
        "email": "charles@mbvit.co.za",
        "id": 4,
        "identifier": null,
        "name": "Charles Rossouw",
        "phone_number": "+276853805",
        "thumbnail": "",
        "blocked": false,
        "type": "contact"
      },
      "assignee": {
        "id": 1,
        "name": "Helpdesk",
        "available_name": "Helpdesk",
        "avatar_url": "",
        "type": "user",
        "availability_status": null,
        "thumbnail": ""
      },
      "team": null,
      "hmac_verified": false
    },
    "status": "open",
    "custom_attributes": {
      "address": "PLuxNet Office Jbh...."
    },
    "snoozed_until": null,
    "unread_count": 1,
    "first_reply_created_at": null,
    "priority": null,
    "waiting_since": 1747336268,
    "agent_last_seen_at": 0,
    "contact_last_seen_at": 0,
    "last_activity_at": 1747336268,
    "timestamp": 1747336268,
    "created_at": 1747336268,
    "updated_at": 1747336268.676807
  }'