import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  people: any = [];
  tempPeople: any = [];
  temp: any = [];
  boolAge: boolean = true;

  constructor(public navCtrl: NavController, public restProvider: RestProvider,private toastCtrl: ToastController) {
    this.getNameGender('?inc=gender,name,dob,picture&results=10');
  }

  getNameGender(query: string) {
    let result: any = [];

    this.restProvider.getPeople(query).then(data => {
      // Lorsque je reçois l'objet de cette API, je le reçois sous forme de Object.results.attributs
      // Je crée donc une variable result pour stocker les data avant d'attribuer this.people = result.results
      // Le tout afin de pouvoir récupérer mon objet sous forme de Object.attributs
      result = data;
      this.people = result.results;

    });
  }

  getAge(birthdate) {
    var date_people = new Date(birthdate);
    // var date_people = new Date(this.people[0].dob);
    var now = new Date();
    var agePeople = now.getFullYear() - date_people.getFullYear();
    return agePeople;
  }

  classByAge() {
    this.tempPeople = this.people;

    if (this.boolAge == true) {
      this.people.sort(function (a, b) {
        let aa =  parseInt(a.dob.substr(0, 4), 0);
        let bb =  parseInt(b.dob.substr(0, 4), 0);        
        return bb - aa;
      })
  } else {
    this.people.sort(function (a, b) {
      let aa =  parseInt(a.dob.substr(0, 4), 0);
      let bb =  parseInt(b.dob.substr(0, 4), 0);        
      return aa - bb;
    })  
  }
    this.boolAge = !this.boolAge;
    this.ageToast("People sorted by age");
  }

  ageToast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
