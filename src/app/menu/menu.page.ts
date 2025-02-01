import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone:false,
})
export class MenuPage implements OnInit {

  constructor(
    private menu: MenuController,
    private navCtlr: NavController,
    private storage: Storage
  ) { }

  ngOnInit() {
  }
  closeMenu(){
    this.menu.close();
  }
  logout(){
    this.storage.remove("isUserLoggedIn")
    this.navCtlr.navigateRoot("/login");
  }
}
