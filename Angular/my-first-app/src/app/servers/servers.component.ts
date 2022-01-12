import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  // template: `
  // <app-server></app-server>
  // <app-server></app-server>`,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName='TestServer';
  serverCreated = false;
  servers = ['Testserver', 'Testserver 2'];

  username='';

  buttonClicked = true;
  clicks = [];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    } ,2000)
   }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
    this.servers.push(this.serverName);
  }

  onUpdateServerName(event: Event) {
    this.serverName= (<HTMLInputElement>event.target).value;
  }

  onResetUsername() {
    this.username= "";
  }

  onDisplayClick() {
    this.buttonClicked = !this.buttonClicked;
    this.clicks.push(this.clicks.length + 1);
  }

  getBackgroundColor(click: Number) {
    return click > 4 ? 'blue' : 'transparent';
  }

}
