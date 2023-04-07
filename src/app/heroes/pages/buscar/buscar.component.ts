import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component( {
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
} )
export class BuscarComponent {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor ( private heroesService: HeroesService ) { }

  buscando() {
    this.heroesService.getSugerencias( this.termino.trim() )
      .subscribe( heroes => this.heroes = heroes );
  }

  opcionSeleccionada( e: MatAutocompleteSelectedEvent ) {

    if ( !e.option.value ) {

      this.heroeSeleccionado = undefined;
      return;
    };

    const heroe: Heroe = e.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroePorId( heroe.id! ).subscribe( heroe => this.heroeSeleccionado = heroe );
  }
}
