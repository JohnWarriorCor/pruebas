import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  qrCodeOne: string = null;
  qrCodeTwo: string = null;
  estudiante =
    {
      idx : 0,
      nombre: 'John David',
      apellido: 'Guerrero Córdoba',
      codigo: '20171157616',
    };

  constructor() {
    this.qrCodeOne = JSON.stringify(this.estudiante);
    this.qrCodeTwo = "https://gaitana.usco.edu.co/sgd/";
  }

  ngOnInit() {
  }

}
