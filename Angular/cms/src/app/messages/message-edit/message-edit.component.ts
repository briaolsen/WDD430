import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
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

  constructor(private messageService: MessageService, private contactService: ContactService) { }

  ngOnInit(): void {
    
  }

  onSendMessage() {
    const sub = this.inputSubject.nativeElement.value;
    const msg = this.inputMsgText.nativeElement.value;
    const currentSender: Contact = this.contactService.getContact("101");
    const msgId = this.messageService.getMaxId() + 1 + "";
    const newMessage = new Message(msgId, sub, msg, currentSender);
    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear() {
    this.inputSubject.nativeElement.value = ' ';
    this.inputMsgText.nativeElement.value = ' ';
  }

}
