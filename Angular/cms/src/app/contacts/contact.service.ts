import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;
  

  constructor(private http: HttpClient) { 
    this.getContacts();
  }
  
  getMaxId(): number {
    let maxId = 0;

    for(let contact of this.contacts) {
      let currentId = parseInt(contact.id);
      if(currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  getContacts(): Contact[] {
    this.http
      .get<Contact[]>('https://wdd430-cms-2fbd3-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => {
          let na = a.name.toLowerCase();
          let nb = b.name.toLowerCase();
          if(na < nb) {
            return -1;
          }
          if(na > nb) {
            return 1;
          }
          return 0;
        });
        this.contactListChangedEvent.next(this.contacts.slice());
      },
        (error: any) => {
          console.log(error);
        }
      );
    return this.contacts.slice();
  }

  storeContacts() {
    let jsonContacts = JSON.stringify(this.contacts);
    const header = new HttpHeaders().set('content-type', 'application/json');
    this.http.put('https://wdd430-cms-2fbd3-default-rtdb.firebaseio.com/contacts.json', jsonContacts, {headers: header})
    .subscribe( response => {
      console.log(response);
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if(contact.id === id) {
        return contact
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if(!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if(pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  addContact(newContact: Contact) {
    if(!newContact) {
      return;
    }

    this.maxContactId++;
    newContact.id = '' + this.maxContactId;
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if(!newContact || !originalContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

}
