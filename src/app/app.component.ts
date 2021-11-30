import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'axa';
  url = true;

  constructor(
    private router:Location,
    private route: Router
  ) {
    route.events.subscribe((val) => {
      // see also
      this.getURL();
  });
  }

  ngOnInit(): void {
    this.getURL();
  }

  getURL(): void {
    if(this.router.path() === '/login'){
      this.url = false;
    }else{
      this.url = true;
    }
  }
}
