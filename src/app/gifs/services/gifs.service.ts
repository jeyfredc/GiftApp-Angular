import { Injectable } from '@angular/core';
/* Metodo utilizado para hacer la peticion al API */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interface/gifs.interface';

const GIPHY_API_KEY = 'BYyzXTK2pNKri3RTLN3elhh7I9L0wQ2I';

//Cuando se trabaja con porvideIn 'root' hace que el servicio este disponible para toda la aplicacion
@Injectable({ providedIn: 'root' })
export class GifsService {
  /* Se crea un elemento de tipo Array con la interface Gif que viene de gifs.interface para poder acceder a todas las propiedades y ayudas que ofrece TypeScript */
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];

  private apiKey: string = GIPHY_API_KEY;
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs/';

  constructor(private http: HttpClient) {
    /* Recarga lo que se haya guardado en el localStorage */
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }
  //Metodo para organizar y filtrar los elementos del buscador, al referir como filtrar no permite tener elementos repetidos
  private organizeHistory(tag: string) {
    //Convierte la capitalizacion en minusculas
    tag = tag.toLowerCase();

    /* Validacion para filtrar elementos repetidos, si esta repetido solo devuelve el valor que ya se tenia antes en la lista */
    /* El metodo includes determina si una matriz incluye un determinado elemento y devuelve true o false */
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    /* Despues de la validación, crea un nuevo arreglo donde pone el elemento seleccionado en el primer lugar utilizando el metodo unshift */

    this._tagsHistory.unshift(tag);
    /* Metodo para mantener solo 10 elementos listados */
    this._tagsHistory = this.tagsHistory.splice(0, 10);

    /* Se llama la funcion de guardado de datos */
    this.saveLocalStorage();
  }
  /* Guardar en localStorage */
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory= JSON.parse(localStorage.getItem('history')!);
    // console.log(this._tagsHistory);
    if(this._tagsHistory.length ===0 )return;
    this.searchTag(this._tagsHistory[0])

  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    /* El metodo organizeHistory se hace a parte para que cada metodo se encargue de hacer lo que tiene que hacer en funcion de su propio nombre */
    this.organizeHistory(tag);
    // //unshift es un metodo para añadir el valor del arreglo al inicio
    // this._tagsHistory.unshift(tag);
    // console.log(this._tagsHistory);
    //parametros de cabecera pora realizar la peticion tipo get
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    /* SearchResponse proviene de gifs.interface que se utiliza para ayudas y tipado propio de TypeScript */
    this.http
      .get<SearchResponse>(`${this.serviceUrl}search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
        console.log(this.gifList);
      });
  }
}
