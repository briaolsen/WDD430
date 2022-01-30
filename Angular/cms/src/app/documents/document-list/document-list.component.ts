import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [

    new Document(110, 'CIT 110 - Introduction to Excel','This course is an introduction to the use of spreadsheets in business. Emphasis is on learning spreadsheet literacy concepts and a popular spreadsheet application to solve business problems.', 'https://content.byui.edu/file/ed921ffc-9c7a-4d8b-9bcf-2472c2375f10/4/syllabus.html', null), 

    new Document(111, 'CIT 111 - Introduction to Databases', 'This course covers the basic elements of database management systems. It introduces students to the concepts of logical and physical relationships in a data model and the concepts of inner and outer joins. Students will use a computer aided software engineering (CASE) tool to design, create, and query a database.', 'https://content.byui.edu/file/1986b367-1608-4d0c-8542-fa926064b6e2/3/syllabus.html', null),

    new Document(160, 'CIT 160 - Introduction to Programming', 'This course is an introduction to the basic concepts of computers and information technology. Students will learn the basics of computer hardware and the binary and hexadecimal number systems, design algorithms to solve simple computing problems, and will write computer programs using Boolean logic, control structures, and functions.', 'https://content.byui.edu/file/1f068cba-9736-46d6-b9ae-2dfd9c97dd1f/6/syllabus.html', null),

    new Document(260, 'CIT 260 - Object Oriented Programming', 'This course is an introduction to object oriented programming using the Java programming language. Students will write computer programs using primitive data types, control structures, Java Swing classes, and objects. Students will read and draw UML class diagrams and will use Java swing to write programs with a graphical user interface.', 'https://content.byui.edu/file/22c0260d-e1b7-43a2-8903-8d8f948041ee/4/syllabus.html', null),

    new Document(360, 'CIT 360 - Object Oriented Development', 'Students in this course use object-oriented concepts and technologies to develop client-server applications. These client-server applications will use technologies such as Java, servlets, Android, Android Room, Firebase Real-time Database, Hibernate, and JSON.', 'https://content.byui.edu/integ/gen/0ccf5446-544c-43b4-91f5-96aed15e8c7c/0/CIT%20360%20-%20Syllabus.html', null)

  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

}
