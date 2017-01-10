import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  title = 'List of guns';
  guns = GUNS;
  gun: Gun = {id: 1,name: 'M4-A1', like: 0, likes: false};
  selectedGun: Gun = this.gun;

  like(gun: Gun): void { 
   if(gun.likes != true)
   {
      gun.like++;
      gun.likes = true;
    }  
  }

  unlike(gun: Gun): void { 
    if (gun.like >= 1 && gun.likes != false)
    {
      gun.like--;
      gun.likes = false;
    }
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
  likes: boolean;
}
const GUNS: Gun[] = [
  { id: 1, name: 'M4-A1', like:Math.floor((Math.random() * 100) + 1), likes: false},
  { id: 2, name: 'AK-47', like:Math.floor((Math.random() * 100) + 1), likes: false},
  { id: 3, name: 'RPG', like:Math.floor((Math.random() * 100) + 1), likes: false},
  { id: 4, name: 'Glock', like:Math.floor((Math.random() * 100) + 1), likes: false},
  { id: 5, name: 'Desert Eagle', like:Math.floor((Math.random() * 100) + 1), likes: false},
  { id: 6, name: 'PKM', like:Math.floor((Math.random() * 100) + 1), likes: false},
  { id: 7, name: 'MP5', like:Math.floor((Math.random() * 100) + 1), likes: false},
  { id: 8, name: 'Uzi', like:Math.floor((Math.random() * 100) + 1), likes: false},
  { id: 9, name: 'Fal', like:Math.floor((Math.random() * 100) + 1), likes: false},
  { id: 10, name: 'Dragunov SWD', like:Math.floor((Math.random() * 100) + 1), likes: false}
];

