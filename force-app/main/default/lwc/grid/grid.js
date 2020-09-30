import { LightningElement } from 'lwc';

export default class Grid extends LightningElement {
  offering = 20;
  buying = 20;
  offeringList = [];
  buyingList = [];
  greeting = 'World';
  connectedCallback(){
    while(this.offering >0){
      this.offeringList.push(1);
      this.offering--;
      this.buyingList.push(1);
      
    }
  }
  
  changeHandler(event) {
    this.greeting = event.target.value;
  }
}