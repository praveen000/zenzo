import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskProvider } from '../../../providers/task/task';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the RejectedTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rejected-task',
  templateUrl: 'rejected-task.html',
})
export class RejectedTaskPage {

 
  task_details_available_list:any;
  task_overview:any=[]
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    private storage: Storage,
    private task: TaskProvider,) {

  	this.storage.get('me').then((val:any)=>{
  		this.getdata(val.token)
  	})

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseTaskPage');
  }

getdata(token){
  	 this.task.getSubmittedList(token,2).subscribe((res:any) => {
    if(res.status){
    this.task_details_available_list = res.message;
    console.log(this.task_details_available_list);
    }
  });


  this.task.getTaskOveriew(token).subscribe((res:any) => {
    console.log(res);
    if(res.status){
    this.task_overview = res.message;   }
  });
  }
  
getArray(arr){
    return Array.isArray(arr);
  }

}