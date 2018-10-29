import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, observable, Subscriber, Subscription } from 'rxjs';
import { retry, map , filter} from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;  // sirve para terminar la subscripcion

  constructor() {


    this.subscription = this.regresaObservable()
      // .pipe(
      // retry(2)) // realiza el intento cuando hay algun fallo
      .subscribe(
      numero => { console.log('subs: ' , numero); },
      error => console.error('Error en el Obs: ', error ),
      () => console.log( 'El observador termino!')
    );
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      let intervalo = setInterval( () => {

        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        // if ( contador === 5 ) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   observer.error('Auxilio');
        // }

      }, 500 );
    }).pipe(
      map( resp => {  // el operador map transforma la informacion a devolver
        return resp.valor;
      }),
      filter( (valor, index) => {
        // console.log('Filter', valor, index);
        if ( (valor % 2) === 1 ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
