import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  dashboardme: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private storage: Storage,
    private auth: AuthProvider, ) {
    this.storage.get('me').then((val: any) => {
      this.get_dashboard(val.token)
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  get_dashboard(token) {
    console.clear()
    this.auth.getDash(token).subscribe((res: any) => {
      if (res.status) {
        this.storage.set('me', res.message);
        console.log(res.message)
        this.dashboardme = res.message;
      }
    })
  }

  updateProfile() {
    console.log(this.dashboardme)
    this.auth.updateUser(this.dashboardme).subscribe((res: any) => {
      console.log(res);
      this.presentToast(res.message);
    })
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  resendEmailVerification() {
    this.auth.resendEmail(this.dashboardme.token ).subscribe((res: any) => {
      console.log(res);
      this.presentToast(res.message);
    })
  }
}
