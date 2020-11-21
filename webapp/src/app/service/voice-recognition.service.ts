import { Injectable } from '@angular/core';
import { LANGUAGE_CODE } from "../core/constants/common.constants";
import { BehaviorSubject } from "rxjs";

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

  recognition = new webkitSpeechRecognition();
  stopped = false;
  public text = '';
  private tempWords;
  private isListening = false;

  textSubject = new BehaviorSubject<string>(null);
  text$ = this.textSubject.asObservable();

  constructor() {}

  init(): void {
    this.text = '';
    this.recognition.interimResults = true;
    // this.recognition.continuous = true;
    this.recognition.lang = LANGUAGE_CODE.EN;

    this.recognition.addEventListener('result', e => {
      const transcript = Array.from(e.results)
        .map(results => results[0])
        .map(result => result.transcript)
        .join('');
      this.tempWords = transcript;
      this.text = transcript;
      if (!transcript) this.text = 'Try again...';
      this.textSubject.next(this.text);
      console.log("TRANS", transcript);
    })

    this.recognition.onstart = () => this.isListening = true;

    this.recognition.onend = () => this.isListening = false;

    this.recognition.onerror = () => this.isListening = false;
  }

  start(): void {
    this.recognition.start();
    this.stopped = false;

    console.log('==== RECOGNITION STARTED ====');

    this.recognition.addEventListener('end', condition => {
      if (this.stopped) {
        this.recognition.stop();
        console.log('==== RECOGNITION ENDED ====');
      } else {
        this.wordConcat();
        this.recognition.start();
      }
    })
  }

  stop(): void {
    this.stopped = true;
    this.wordConcat();
    this.recognition.stop();
    console.log('==== RECOGNITION ENDED by stop() ====');
  }

  wordConcat(): void {
    if (!this.tempWords) {
      this.text = 'Sorry. What you say?';
      return;
    }
    this.text += ` ${this.tempWords}.`;
    this.tempWords = '';
  }

  getText(): string {
    return this.text;
  }
}
