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
  
  sortAndSend() {
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
    this.contactListChangedEvent.next([...this.contacts]);
  }

  getContacts(): Contact[] {
    this.http
      .get<Contact[]>('http://localhost:3000/contacts')
      .subscribe(
        (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.sortAndSend();
      },
        (error: any) => {
          console.log(error);
        }
      );
    return this.contacts.slice();
  }

  // storeContacts() {
  //   let jsonContacts = JSON.stringify(this.contacts);
  //   const header = new HttpHeaders().set('content-type', 'application/json');
  //   this.http.put('https://wdd430-cms-2fbd3-default-rtdb.firebaseio.com/contacts.json', jsonContacts, {headers: header})
  //   .subscribe( response => {
  //     console.log(response);
  //     this.contactListChangedEvent.next(this.contacts.slice());
  //   });
  // }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if(contact.id === id) {
        return contact
      }
    }
    return null;
  }

  // deleteContact(contact: Contact) {
  //   if(!contact) {
  //     return;
  //   }
  //   const pos = this.contacts.indexOf(contact);
  //   if(pos < 0) {
  //     return;
  //   }
  //   this.contacts.splice(pos, 1);
  //   this.storeContacts();
  // }

  deleteContact(contact: Contact) {
  
    if (!contact) {
      return;
    }
  
    const pos = this.contacts.indexOf(contact);
  
    if (pos < 0) {
      return;
    }
  
    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  // addContact(newContact: Contact) {
  //   if(!newContact) {
  //     return;
  //   }

  //   this.maxContactId++;
  //   newContact.id = '' + this.maxContactId;
  //   this.contacts.push(newContact);
  //   this.storeContacts();
  // }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    // make sure id of the new Contact is empty
    contact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new contact to contacts
          this.contacts.push(responseData.contact);
          this.sortAndSend();
        }
      );
  }

  // updateContact(originalContact: Contact, newContact: Contact) {
  //   if(!newContact || !originalContact) {
  //     return;
  //   }

  //   const pos = this.contacts.indexOf(originalContact);
  //   if (pos < 0) {
  //     return;
  //   }

  //   newContact.id = originalContact.id;
  //   this.contacts[pos] = newContact;
  //   this.storeContacts();
  // }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
  
    const pos = this.contacts.indexOf(originalContact);
  
    if (pos < 0) {
      return;
    }
  
    // set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;
    //newContact._id = originalContact._id;
  
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
    newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      );
  }

}
