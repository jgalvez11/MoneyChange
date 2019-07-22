import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { ToastController } from '@ionic/angular';
import { CurrencyPipe } from '@angular/common';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  response: any;
  value: any;

  constructor(
    private currencyService: CurrencyService,
    private toastCtrl: ToastController,
    private cp: CurrencyPipe
  ) {
  }

  ngOnInit() {

  }

  onSubmit() {
    this.currencyService.getCurrency()
      .subscribe(data => {
        console.log(data);
        if (data.code) {
          this.presentToast(data.info);
        } else {
          this.response = this.value.split('€')[1] * data.USD;
          this.convert('USD', '$');
        }
      }, error => {
        this.presentToast(Constants.CORS_PROBLEM);
      });
  }

  async presentToast(info: string) {
    const toast = await this.toastCtrl.create({
      message: info,
      mode: 'ios',
      position: 'bottom',
      duration: 4000
    });

    toast.present();
  }

  convert(symbol: string, display: string) {
    if (display === '€') {
      if (this.value && this.value.includes('€')) {
        this.value = this.value.split('€')[1];
      }
      if (this.value && this.value.includes(',')) {
        this.value = this.value.replace(',', '');
      }
      this.value = this.cp.transform(this.value, symbol, 'symbol-narrow', '1.0-4');
    } else {
      this.response = this.cp.transform(this.response, symbol, 'symbol-narrow', '1.0-4');
    }
  }
}
