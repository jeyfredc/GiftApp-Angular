import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  /* ViewChild sirve para poder obtener la referencia de un elemento, en este caso sera la
  de la funcion searchTag en el template */

  //ViewChild y ElementRef deben ser importados de angular, puede ser que aparezca una opcion de React y no es valida
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  //Para llamar un servicio hay que importarlo y llamarlo dentro del constructor para que este disponible dentro del componente
  //Este se va a utilizar para poder utilizarlo en la funcion searchTag
  constructor( private gifsService: GifsService ){}

  searchTag(){
    //Se obtiene la referencia del elemento html
    const newTag = this.tagInput.nativeElement.value;
    // console.log({newTag});
    this.gifsService.searchTag(newTag)



    // Luego para limpiar la caja

    this.tagInput.nativeElement.value = ''
  }
}
