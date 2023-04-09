import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BarcodeFormat } from "@zxing/library";
import Swal from "sweetalert2";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"],
})
export class InicioComponent {
  titulo: String = "Hello";

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;
  camara: boolean = true;

  qrResultString: string[] = [];

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  qrCodeOne: string = null;
  qrCodeTwo: string = null;
  estudiante = {
    idx: 0,
    nombre: "John David",
    apellido: "Guerrero Córdoba",
    codigo: "20171157616",
  };

  constructor() {
    this.qrCodeOne = "John David Guerrero Córdoba";
    this.qrCodeTwo = "https://gaitana.usco.edu.co/sgd/";
  }

  lectura() {
    let audio = new Audio();
    audio.src = "../assets/lectura.mp3";
    audio.load();
    audio.play();
  }

  error() {
    let audio = new Audio();
    audio.src = "../assets/error.mp3";
    audio.load();
    audio.play();
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString.push(resultString);
    console.log("Longitud", this.qrResultString.length);
    if (this.qrResultString.length < 2) {
      console.log("Longitud", this.qrResultString.length);
      if (resultString === "https://gaitana.usco.edu.co/sgd/") {
        this.mensajeError();
        this.error();
        setTimeout(() => {
          this.camara = false;
        }, 9000);
      } else {
        this.mensajeRealizado();
        this.lectura();
        setTimeout(() => {
          this.camara = false;
        }, 9000);
      }
    } else {
      console.log('**',this.qrResultString);
      console.log(
        this.qrResultString[this.qrResultString.length - 2],
        "---",
        resultString
      );
      if (
        this.qrResultString[this.qrResultString.length - 2] !== resultString
      ) {
        if (resultString === "https://gaitana.usco.edu.co/sgd/") {
          this.mensajeError();
          this.error();
          setTimeout(() => {
            this.camara = false;
          }, 9000);
        } else {
          this.mensajeRealizado();
          this.lectura();
          setTimeout(() => {
            this.camara = false;
          }, 9000);
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Mismo QR",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    this.titulo = this.qrResultString[this.qrResultString.length];
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find((x) => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  mensajeRealizado() {
    Swal.fire({
      icon: "success",
      title: "Proceso Realizado",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  mensajeError() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Ocurrio Un Error!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
