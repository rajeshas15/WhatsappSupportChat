import { ApiProperty } from "@nestjs/swagger";

export interface ChatSessionVM {
    inputValue: string;
    inputType: 'chat' | 'voice' | 'text';
    outputType: 'chat' | 'text' | 'audio';
    sessionId: string;
}

export class ChatSessionViewModel implements ChatSessionVM {
    @ApiProperty({
        description: 'The user message',
        example: 'Hello'
    })
    inputValue: string;

    @ApiProperty({
        description: 'The user message type',
        example: 'chat'
    })
    inputType: 'chat';

    @ApiProperty({
        description: 'The RAG message type',
        example: 'chat'
    })
    outputType: 'chat';

    @ApiProperty({
        description: 'The user session is',
        example: 'session123'
    })
    sessionId: string;

    public toPayload(): Record<string, any> {
        return {
            input_value: this.inputValue,
            input_type: this.inputType,
            output_type: this.outputType,
            session_id: 'session_' + Math.random().toString(36).substring(2, 10),
        };
    }
}
