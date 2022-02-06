import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') inputSubject: ElementRef;
  @ViewChild('msgText') inputMsgText: ElementRef;
  currentSender = '2';

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const sub = this.inputSubject.nativeElement.value;
    const msg = this.inputMsgText.nativeElement.value;
    const newMessage = new Message(Math.random()*1000+"", sub, msg, this.currentSender);
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.inputSubject.nativeElement.value = ' ';
    this.inputMsgText.nativeElement.value = ' ';
  }

}
