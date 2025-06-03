import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ApiTags } from '@nestjs/swagger';
import { ChatSessionViewModel } from 'src/view-models/rag.vm';
import { ResultSection } from 'src/helper/ragflow.interface';

@ApiTags("WilAgent RAG")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post("chat")
  async callAgenticRagFlow(@Body() ChatSessionVM: ChatSessionViewModel): Promise<ResultSection> {
     const result = await this.appService.callAgenticRagFlow(ChatSessionVM);
     return result;
  }
}
