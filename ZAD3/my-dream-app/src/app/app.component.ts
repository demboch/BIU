import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }

  .button {
    background-color: #6a00ff;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    float: right;
    cursor: pointer;
    border-radius: 5px;
}

.sort {
  cursor: pointer;
  padding:10px;
  border-radius: 10px;
  background-color: #6a00ff; 
  font-size: 20px;
  font-weight: bold;
  transition: all .2s ease-in-out;
  color: white;
  margin-left: 20px;
}

.sort:hover {
transform: scale(1.1);
}

  .guns {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 20em;
  }
  .guns li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .guns li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .guns li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .guns .text {
    position: relative;
    top: -3px;
  }
  .guns .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: black;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }

.like{
  left: 120px;
  position: relative;
  top: -6px;
  float: right;
  margin-top: 8px;
  margin-right: 10px;
}

`]


})
export class AppComponent {

    title = 'List of guns';
    guns = GUNS;
    gun: Gun = {id: 1,name: 'M4-A1', like:0};
    selectedGun: Gun = this.gun;

    licznik(gun: Gun): void {
        gun.like++;
     }

    onSelect(gun: Gun): void {
       this.selectedGun = gun;
  }

  onSort():void{
    function compare(a,b) {
      if (a.like < b.like)
        return 1;
      if (a.like > b.like)
        return -1;
      return 0;
    }

    GUNS.sort(compare);
  }
  
}
export class Gun {
  id: number;
  name: string;
  like: number;
}
const GUNS: Gun[] = [
  { id: 1, name: 'M4-A1', like:0 },
  { id: 2, name: 'AK-47', like:0 },
  { id: 3, name: 'RPG', like:0 },
  { id: 4, name: 'Glock', like:0 },
  { id: 5, name: 'Desert Eagle', like:0 },
  { id: 6, name: 'PKM', like:0 },
  { id: 7, name: 'MP5', like:0 },
  { id: 8, name: 'Uzi', like:0 },
  { id: 9, name: 'Fal', like:0 },
  { id: 10, name: 'Dragunov SWD', like:0 }
];


