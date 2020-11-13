import { Component, OnDestroy, OnInit } from '@angular/core';
import { VoiceSearchModalService } from "../../service/voice-search-modal.service";
import { VoiceRecognitionService } from "../../service/voice-recognition.service";
import {
  CANCEL_COMMANDS,
  CONFIRM_COMMANDS,
} from "../../core/constants/voice-search.constants";

@Component({
  selector: 'app-product-voice-search-modal',
  templateUrl: './product-voice-search-modal.component.html',
  styleUrls: ['./product-voice-search-modal.component.css']
})
export class ProductVoiceSearchModalComponent implements OnInit, OnDestroy {
  text;

  constructor(
    private voiceSearchModalService: VoiceSearchModalService,
    public voiceRecognitionService: VoiceRecognitionService
  ) {
    this.voiceRecognitionService.init();
    this.voiceRecognitionService.text$.subscribe(text => {
      if (!text || this.text === text) return;
      this.text = text.toLowerCase();

      if (CANCEL_COMMANDS.includes(this.text)) {
        this.hideModal();
        return this.voiceSearchModalService.emitCancel(this.text);
      }

      if (CONFIRM_COMMANDS.includes(this.text)) {
        this.hideModal();
        return this.voiceSearchModalService.emitConfirm(this.text);
      }
    })
  }

  ngOnInit(): void {
    this.voiceRecognitionService.start();
  }

  ngOnDestroy(): void {
    this.voiceRecognitionService.stop();
  }

  hideModal(): void {
    this.voiceSearchModalService.hide();
    this.voiceRecognitionService.stop();
  }
}
