import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'Ecommerce';
  currentComponent: string = 'login'; // Component inicial que se muestra
  
  constructor() {}

  showComponent(component: string): void {
    console.log(component);
    this.currentComponent = component;
  }

}
