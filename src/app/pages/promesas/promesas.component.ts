import { Component, OnInit } from '@angular/core';
import { reject } from 'q';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  nombres: string[] = [ 'Jose', 'Carlos', 'Gabriela', 'Alfredo', 'Maria', 'Angelica'];


  constructor() {



    this.contarTres().then(
      mensaje => console.log('Termino: ', mensaje)
    ).catch( error => console.error('Error en la promesa:', error));

    this.FindName('Jose', 'Gabriela')
        .then ( nombre => console.log('Usuario encontrado, nombre:' + nombre))
        .catch ( error => console.log(error));


  }

  ngOnInit() {
  }

  contarTres(): Promise<string> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise( (resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval( () => { // le damos nombre para poder darle un clear y no siga sumando
        contador += 1;
        console.log ( contador );
        if (contador === 3) {
          resolve('OK!');
          // reject ('Simplemente un error');
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

  FindName(...name: string[]): Promise<string[]> {

    // tslint:disable-next-line:no-shadowed-variable
    return new Promise( (resolve, reject) => {
      this.nombres.forEach((element, index) => {
        if ( element === name[index]) {
          resolve(name);
        } else {
          reject('error, el nombre no existe');
        }
      });
    });
   }

}
