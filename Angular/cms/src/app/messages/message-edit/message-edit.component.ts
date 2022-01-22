import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') inputSubject: ElementRef;
  @ViewChild('msgText') inputMsgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = 'Briana Olsen';

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const sub = this.inputSubject.nativeElement.value;
    const msg = this.inputMsgText.nativeElement.value;
    const newMessage = new Message(123456, sub, msg, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.inputSubject.nativeElement.value = ' ';
    this.inputMsgText.nativeElement.value = ' ';
  }

}
