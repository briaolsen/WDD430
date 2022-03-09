import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.getMessages();
  }

  getMaxId(): number {
    let maxId = 0;

    for(let messages of this.messages) {
      let currentId = parseInt(messages.id);
      if(currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessages(): Message[] {
    this.http
      .get('https://wdd430-cms-2fbd3-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messageChangedEvent.next(this.messages.slice());
      },
        (error: any) => {
          console.log(error);
        }
      );
      return this.messages.slice();
  }

  storeMessages() {
    let jsonMessages = JSON.stringify(this.messages);
    const header = new HttpHeaders().set('content-type', 'application/json');
    this.http.put('https://wdd430-cms-2fbd3-default-rtdb.firebaseio.com/messages.json', jsonMessages, {headers: header})
    .subscribe( response => {
      console.log(response);
      this.messageChangedEvent.next(this.messages.slice());
    });
  }

  getMessage(id: string) {
    for (let message of this.messages) {
      if(message.id === id) {
        return message;
      }
    }
    return null;
  }
  
  addMessage(message: Message) {
    this.messages.push(message);
    console.log(message);
    this.storeMessages();
  }
}
