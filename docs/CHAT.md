# Chat System

## Overview

The chat system provides real-time communication between users and AI/human support agents. It includes WebSocket-based messaging, role-based access control, human takeover support, and comprehensive accessibility features.

## Quick Start

### 1. Environment Setup

Add to your `.env.local`:

```bash
NEXT_PUBLIC_CHAT_SOCKET_URL=http://localhost:3001
NEXT_PUBLIC_CHAT_ENABLED=true
NEXT_PUBLIC_CHAT_ANALYTICS_ENABLED=true
```

### 2. Using the Chat

The chat is automatically available via the floating button in the bottom-right corner. You can also programmatically control it:

```tsx
import { useChat } from '@/hooks/useChat';

function MyComponent() {
  const { openChat, sendMessage } = useChat();

  const handleHelpClick = () => {
    openChat({ currentPage: 'booking', rideId: '123' });
  };

  return <button onClick={handleHelpClick}>Get Help</button>;
}
```

## Architecture

### Core Components

- **ChatSocket** - WebSocket client with reconnection logic
- **chat.store** - Zustand state management
- **chat.lifecycle** - Conversation lifecycle manager
- **ChatProvider** - React provider component

### UI Components

- **ChatLauncher** - Floating chat button
- **ChatContainer** - Main chat interface
- **MessageList** - Scrollable message display
- **MessageBubble** - Individual message component
- **ChatInput** - Message input with validation
- **TypingIndicator** - Animated typing indicator
- **QuickReplies** - Action buttons

## Features

### Role-Based Access

The chat automatically adapts based on user role:

- **Riders**: Book rides, track rides, cancel rides
- **Drivers**: Go online, view earnings, driver support
- **Anonymous**: Sign up, log in prompts

### Human Takeover

When an agent takes over:
- Input placeholder changes
- System message appears
- Ownership indicator updates
- Analytics event tracked

### Accessibility

- Full keyboard navigation
- Screen reader support
- ARIA labels and live regions
- Focus management
- Escape key to close

### Analytics

Tracks events:
- Chat opened/closed
- Messages sent/received
- Quick replies clicked
- Agent escalation
- Errors

## Backend Requirements

The backend WebSocket server must support:

### Events (Incoming)

- `chat:send_message` - User sends message
- `chat:start_conversation` - Start new conversation
- `chat:resume_conversation` - Resume existing conversation
- `chat:close_conversation` - Close conversation
- `chat:typing_start` - User starts typing
- `chat:typing_stop` - User stops typing

### Events (Outgoing)

- `chat:message_received` - New message from bot/agent
- `chat:ownership_changed` - Ownership transfer (AI ↔ AGENT)
- `chat:typing_indicator` - Bot/agent typing status
- `chat:conversation_started` - Conversation created
- `chat:conversation_resumed` - Conversation resumed
- `chat:error` - Error occurred

### Message Format

```typescript
{
  id: string;
  conversationId: string;
  type: 'USER_MESSAGE' | 'BOT_MESSAGE' | 'AGENT_MESSAGE' | 'SYSTEM_MESSAGE' | 'ERROR_MESSAGE';
  content: string;
  timestamp: number;
  sender: {
    id: string;
    name: string;
    role: string;
  };
  quickReplies?: Array<{
    id: string;
    label: string;
    value: string;
    type?: 'primary' | 'secondary' | 'danger';
  }>;
}
```

## Customization

### Disable Chat

Set `NEXT_PUBLIC_CHAT_ENABLED=false` in `.env.local`

### Customize Colors

Edit `ChatContainer.tsx` and `MessageBubble.tsx` for color schemes.

### Add Custom Quick Replies

Modify `role-guards.ts` to add role-specific quick replies.

## Troubleshooting

### Chat not appearing

1. Check `NEXT_PUBLIC_CHAT_ENABLED` is `true`
2. Verify `ChatProvider` is in your app layout
3. Check browser console for errors

### Connection issues

1. Verify `NEXT_PUBLIC_CHAT_SOCKET_URL` is correct
2. Check backend WebSocket server is running
3. Look for CORS issues in browser console

### Messages not sending

1. Check user is authenticated
2. Verify conversation is started
3. Check message length limits
