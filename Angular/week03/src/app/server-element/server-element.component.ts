import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated //Emulated is the default, also None, ShadowDom (Native)
})

export class ServerElementComponent
  implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input('srvElement') element: {type: string, name: string, content: string};
  @Input() name: string;
  @ViewChild('heading', {static: true}) header: ElementRef;
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef;

  constructor() { 
    console.log('contructor called!');
  }

  ngOnInit(): void {
    console.log('onInit called!');
    console.log("Text Content of Header: " + this.header.nativeElement.textContent);
    console.log("Text Content of Paragraph: " + this.paragraph.nativeElement.textContent);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('OnChanges called!');
    console.log(changes);
  }

  ngDoCheck() {
    console.log('DoCheck called!');
  }

  ngAfterContentInit(): void {
      console.log("AfterInit called!");
  }

  ngAfterContentChecked(): void {
      console.log('AfterContentChecked called!');
  }

  ngAfterViewChecked(): void {
    console.log('AfterViewChecked called!');
  }

  ngAfterViewInit(): void {
    console.log('AfterViewInit called!');
    console.log("Text Content of Header: " + this.header.nativeElement.textContent);
    console.log("Text Content of Paragraph: " + this.paragraph.nativeElement.textContent);
  }

  ngOnDestroy(): void {
    console.log('OnDestroy called!');
  }

}
