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
  
  sortAndSend() {
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
    this.documentListChangedEvent.next([...this.documents]);
  }

  getDocuments() {
    this.http
      .get<Document[]>('http://localhost:3000/documents')
      .subscribe(
        (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.sortAndSend();        
      },
        (error: any) => {
          console.log(error);
        }
      );
      return this.documents.slice();
  }

  // storeDocuments() {
  //   let jsonDocuments = JSON.stringify(this.documents);
  //   const header = new HttpHeaders().set('content-type', 'application/json');
  //   this.http.put('https://wdd430-cms-2fbd3-default-rtdb.firebaseio.com/documents.json', jsonDocuments, {headers: header})
  //   .subscribe( response => {
  //     console.log(response);
  //     this.documentListChangedEvent.next(this.documents.slice());
  //   });
  // }

  getDocument(id: string){
    for (let document of this.documents) {
      if(document.id === id) {
        return document
      }
    }
    return null;
  }

  // deleteDocument(document: Document) {
  //   if(!document) {
  //     return;
  //   }
  //   const pos = this.documents.indexOf(document);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.documents.splice(pos, 1);
  //   this.storeDocuments();
  // }

  
  deleteDocument(document: Document) {
  
    if (!document) {
      return;
    }
  
    const pos = this.documents.findIndex(d => d.id === document.id);
  
    if (pos < 0) {
      return;
    }
  
    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
  
  // addDocument(newDocument: Document) {
  //   if(!newDocument) {
  //     return;
  //   }

  //   this.maxDocumentId++;
  //   newDocument.id = '' + this.maxDocumentId;
  //   this.documents.push(newDocument);
  //   this.storeDocuments();
  // }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

//   updateDocument(originalDocument: Document, newDocument: Document) {
//     if(!newDocument || !originalDocument) {
//       return;
//     }

//     const pos = this.documents.indexOf(originalDocument);
//     if (pos < 0) {
//       return;
//     }

//     newDocument.id = originalDocument.id;
//     this.documents[pos] = newDocument;
//     this.storeDocuments();
//   }
// }


  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
  
    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
  
    if (pos < 0) {
      return;
    }
  
    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    //newDocument._id = originalDocument._id;
  
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }
  
}