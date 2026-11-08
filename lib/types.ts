// Chat history as stored in KV. Tool parts keep the `args`/`result` fields the
// app has always saved; lib/chat/actions.tsx maps them to the AI SDK message
// shape (`input`/`output`) when the history is sent to the model.
export type ToolCallPart = {
  type: 'tool-call'
  toolCallId: string
  toolName: string
  args: unknown
}

export type ToolResultPart = {
  type: 'tool-result'
  toolCallId: string
  toolName: string
  result: unknown
}

export type Message = { id: string } & (
  | { role: 'system'; content: string }
  | { role: 'user'; content: string }
  | { role: 'assistant'; content: string | ToolCallPart[] }
  | { role: 'tool'; content: ToolResultPart[] }
)

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export interface Session {
  user: {
    id: string
    email: string
  }
}

export interface AuthResult {
  type: string
  message: string
}

export interface User extends Record<string, any> {
  id: string
  email: string
  password: string
  salt: string
}
