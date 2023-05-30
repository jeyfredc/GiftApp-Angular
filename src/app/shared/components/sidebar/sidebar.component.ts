import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor( private gifsService: GifsService ){}

  //De esta forma se obtiene lo que viene del servicio gifsService
  get tags(){
    return this.gifsService.tagsHistory
  }

  searchTag(tag:string):void {
    // console.log({tag});
    this.gifsService.searchTag(tag)
  }

}
