import { LightningElement } from 'lwc';

export default class Grid extends LightningElement {
  offering = 5;
  buying = 5;
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
  renderedCallback(){
    this.sizeChanger();
  }
  
  changeHandler(event) {
    this.greeting = event.target.value;
  }
  sizeChanger(){
    this.container = this.template.querySelector('[data-id="container"]');
    if(this.offeringList.length == 1 && this.buyingList.length == 1){
      this.container.style.zoom = "2.5";
      this.template.querySelector('[data-id="header"]').style.width = "55%";
      this.template.querySelector('[data-id="card-container"]').style.marginLeft = "10%";
      this.template.querySelector('[data-id="left-container"]').style.paddingTop = "15% ";
    }
    else if(this.offeringList.length == 2 && this.buyingList.length == 2){
      this.container.style.zoom = "1.8";
      this.template.querySelector('[data-id="header"]').style.width = "55%";
      this.template.querySelector('[data-id="left-container"]').style.paddingTop = "10% ";
      
    }
    else if(this.offeringList.length == 3 && this.buyingList.length == 3){
      this.container.style.zoom = "1.2";
      this.template.querySelector('[data-id="header"]').style.width = "55%";
    }
  }
  
}