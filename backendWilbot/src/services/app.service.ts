import { Injectable } from '@nestjs/common';
import { DATASTAX_LangFlow_API } from 'src/default/keyvalues';
import { ChatSessionViewModel } from 'src/view-models/rag.vm';
import axios from 'axios';
import { ResultSection } from 'src/helper/ragflow.interface';


@Injectable()
export class AppService {
  async callAgenticRagFlow(ChatSessionVM: ChatSessionViewModel): Promise<ResultSection> {
    console.log(`Inputs for Rag Flow : ${JSON.stringify(ChatSessionVM)}`);
    try {
      const payload = {
        "input_value": ChatSessionVM.inputValue,
        "output_type": ChatSessionVM.outputType ?? "chat",
        "input_type": ChatSessionVM.inputType ?? "chat",
        "session_id": ChatSessionVM.sessionId ?? "user_1"
      };

      console.log(`Payloads of the Rag Flow: ${JSON.stringify(payload)} `);
      const response = await axios.post(DATASTAX_LangFlow_API, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.API_AUTH_KEY} `
        },
        timeout:1000 * 60 * 10
      });

      let finalMessage;
      response?.data?.['outputs'].forEach(block => {
        block.outputs.forEach(output => {
          output.messages.forEach(msg => {
            finalMessage = msg
          });
        });
      });
      console.log(`Results: ${JSON.stringify(finalMessage)} `);
      return finalMessage;
    } catch (error) {
      console.error('API call failed:', error);
      return error.message
    }
  }
}
