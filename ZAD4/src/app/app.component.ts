import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  title = 'List of guns';
  guns = GUNS;
  gun: Gun = {id: 1,name: 'M4-A1', country: 'Ameryka', like: 0, likes: false};
  selectedGun: Gun = this.gun;

  isForm: number = 1;

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

  showForm(): void{
    this.isForm*=-1;
  }

  addGun(event):void{
		this.guns.push(new Gun(this.guns.length+1, event.bron.name, event.bron.country, event.bron.like));
			console.log(event);
		//	this.clearData();
	}
}

export class Gun {
  id: number;
  name: string;
  country: string;
  like: number;
  likes: boolean;

  constructor (id, name, country, like){
    this.id = id;
    this.name = name;
    this.country = country;
    this.like = like;
    this.like = 0;
  }
}
  

const GUNS: Gun[] = [
  { id: 1, name: 'M4-A1', country: 'Ameryka', like:Math.floor((Math.random() * 100) + 1), likes: false},
  { id: 2, name: 'AK-47', country: 'Rosja', like:Math.floor((Math.random() * 100) + 1), likes: false},
  { id: 3, name: 'RPG', country: 'Rosja', like:Math.floor((Math.random() * 100) + 1), likes: false},
  { id: 4, name: 'Glock', country: 'Austria', like:Math.floor((Math.random() * 100) + 1), likes: false},
  { id: 5, name: 'Desert Eagle', country: 'Ameryka', like:Math.floor((Math.random() * 100) + 1), likes: false},
  { id: 6, name: 'PKM', country: 'ZSRR', like:Math.floor((Math.random() * 100) + 1), likes: false},
  { id: 7, name: 'MP5', country: 'Niemcy', like:Math.floor((Math.random() * 100) + 1), likes: false},
  { id: 8, name: 'Uzi',  country: 'Izrael', like:Math.floor((Math.random() * 100) + 1), likes: false},
  { id: 9, name: 'Fal',  country: 'Belgia', like:Math.floor((Math.random() * 100) + 1), likes: false},
  { id: 10, name: 'Dragunov SWD',  country: 'Rosja', like:Math.floor((Math.random() * 100) + 1), likes: false}
];




