import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient ) { 
    this.getDocuments();
    
  }

  getMaxId(): number {
    let maxId = 0;

    for(let document of this.documents) {
      let currentId = parseInt(document.id);
      if(currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }
  
  getDocuments() {
    this.http
      .get<Document[]>('https://wdd430-cms-2fbd3-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => {
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
        this.documentListChangedEvent.next(this.documents.slice());
      },
        (error: any) => {
          console.log(error);
        }
      );
      return this.documents.slice();
  }

  storeDocuments() {
    let jsonDocuments = JSON.stringify(this.documents);
    const header = new HttpHeaders().set('content-type', 'application/json');
    this.http.put('https://wdd430-cms-2fbd3-default-rtdb.firebaseio.com/documents.json', jsonDocuments, {headers: header})
    .subscribe( response => {
      console.log(response);
      this.documentListChangedEvent.next(this.documents.slice());
    });
  }

  getDocument(id: string){
    for (let document of this.documents) {
      if(document.id === id) {
        return document
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if(!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  addDocument(newDocument: Document) {
    if(!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = '' + this.maxDocumentId;
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if(!newDocument || !originalDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }
}