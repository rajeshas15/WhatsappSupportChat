
export interface ChatResponse {
  session_id: string;
  outputs: OutputWrapper[];
}

export interface OutputWrapper {
  inputs: InputSection;
  outputs: DetailedOutput[];
}

export interface InputSection {
  input_value: string;
}

export interface DetailedOutput {
  results: ResultSection;
  artifacts: ArtifactSection;
  outputs: OutputSection;
  logs: LogSection;
  messages: MessageItem[];
  timedelta: any;
  duration: any;
  component_display_name: string;
  component_id: string;
  used_frozen_result: boolean;
}

export interface ResultSection {
  message: MessageContent;
}

export interface MessageContent {
  text_key: string;
  data: MessageData;
  default_value: string;
  text: string;
  sender: string;
  sender_name: string;
  files: any[];
  session_id: string;
  timestamp: string;
  flow_id: string;
  error: boolean;
  edit: boolean;
  properties: MessageProperties;
  category: string;
  content_blocks: ContentBlock[];
}

export interface MessageData extends Omit<MessageContent, 'data'> {}

export interface MessageProperties {
  text_color: string | null;
  background_color: string | null;
  edited: boolean;
  source: SourceInfo;
  icon: string;
  allow_markdown: boolean;
  positive_feedback: any;
  state: string;
  targets: any[];
}

export interface SourceInfo {
  id: string | null;
  display_name: string | null;
  source: string | null;
}

export interface ContentBlock {
  title: string;
  contents: ContentItem[];
  allow_markdown: boolean;
  media_url: string | null;
}

export interface ContentItem {
  type: string;
  duration: number;
  header: HeaderInfo;
  text: string;
}

export interface HeaderInfo {
  title: string;
  icon: string;
}

export interface ArtifactSection {
  message: string;
  sender: string;
  sender_name: string;
  files: any[];
  type: string;
}

export interface OutputSection {
  message: {
    message: string;
    type: string;
  };
}

export interface LogSection {
  message: any[];
}

export interface MessageItem {
  message: string;
  sender: string;
  sender_name: string;
  session_id: string;
  stream_url: string | null;
  component_id: string;
  files: any[];
  type: string;
}
