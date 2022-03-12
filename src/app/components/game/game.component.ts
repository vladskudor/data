import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../service/service.service';
import {LogoServiceService} from '../service/logo-service.service';
import {EventManager} from '@angular/platform-browser';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public carOne: any;
  public carTwo: any;
  public carImg1: any;
  public carImg2: any;
  public logoTypes: any;

  public speed1: any = 0;
  public speed2: any = 0;
  public power1: any = 0;
  public power2: any = 0;

  public testCarDrive1: any;
  public testCarDrive2: any;

  public road: any;
  public lightRed: any;
  public lightGreen: any;

  public start: boolean = false;

  public winner: boolean = false;

  constructor(public svc: ServiceService , public logo: LogoServiceService , public eventManager: EventManager) { }

  ngOnInit(): void {
    this.moveCarComputer();
    this.getImage();
  }

  public moveCarComputer(): void{
    const carTest1 = JSON.parse(localStorage.getItem('carTest1'));
    const carTest2 = JSON.parse(localStorage.getItem('carTest2'));
    this.carOne = carTest1[0].name;
    this.carTwo = carTest2[0].name;

    this.eventManager.addGlobalEventListener('window' , 'keyup.enter' , () => {
      if (this.testCarDrive1.style.marginLeft === '90vw'){
        alert('Winnner: ' + this.carOne);
        this.restart();
      }
      this.speed1 = this.speed1 + 2;
      this.testCarDrive1.style.marginLeft = this.speed1 + 'vw';
    });
    this.eventManager.addGlobalEventListener('window' , 'keyup.space' , () => {
      if (this.testCarDrive2.style.marginLeft === '90vw'){
        alert('Winnner: ' + this.carTwo);
        this.restart();
      }
      this.speed2 = this.speed2 + 2;
      this.testCarDrive2.style.marginLeft =  + this.speed2 + 'vw';
    });
  }

  public moveCar1(): void{
    const carTest1 = JSON.parse(localStorage.getItem('carTest1'));
    const carTest2 = JSON.parse(localStorage.getItem('carTest2'));
    this.carOne = carTest1[0].name;
    this.carTwo = carTest2[0].name;
    if (this.testCarDrive2.style.marginLeft === '90vw'){
      alert('Winnner: ' + this.carOne);
      this.restart();
    }
    this.speed1 = this.speed1 + 2;
    this.testCarDrive1.style.marginLeft = this.speed1 + 'vw';
  }

  public moveCar2(): void{
    const carTest1 = JSON.parse(localStorage.getItem('carTest1'));
    const carTest2 = JSON.parse(localStorage.getItem('carTest2'));
    this.carOne = carTest1[0].name;
    this.carTwo = carTest2[0].name;
    if (this.testCarDrive2.style.marginLeft === '90vw'){
      alert('Winnner: ' + this.carTwo);
      this.restart();
    }
    this.speed2 = this.speed2 + 2;
    this.testCarDrive2.style.marginLeft = this.speed2 + 'vw';
  }

  public moveCars(car1 , car2 , road , red , green): void{
    setTimeout(() => {
      // this.start = true;
      this.lightRed.style.background = 'grey';
      this.lightGreen.style.background = 'green';
    } , 3000);
    // if (this.start) {
    this.testCarDrive1 = car1;
    this.testCarDrive2 = car2;
    this.road = road;
    this.lightRed = red;
    this.lightGreen = green;
    // }
  }

  public restart(): void{
    window.location.reload();
  }

  public getImage(): void{
    this.logoTypes = this.logo.logotypes;
    for (let i = 0; i < this.logoTypes.length; i++) {
      if (this.logoTypes[i].name === this.carOne) {
        this.carImg1 = this.logoTypes[i].image.source;
      }
    }

    for (let i = 0; i < this.logoTypes.length; i++) {
      if (this.logoTypes[i].name === this.carTwo) {
        this.carImg2 = this.logoTypes[i].image.source;
      }
    }
    console.log(this.carImg1.logo);
    console.log(this.carImg2.logo);
  }
}
