import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(111111, 'First', 'This is the first message', 'Sender One'),
    new Message(222222, 'Second', 'This is the second message', 'Sender Two'),
    new Message(222222, 'Third', 'This is the third message', 'Sender Three'),
    new Message(222222, 'Fourth', 'This is the fourth message', 'Sender Four'),
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
