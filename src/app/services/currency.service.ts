import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrency() {
    const headers = {
      'Content-Type': 'application/json'
    };

    return this.http.get(
      environment.URL_CURRENCY_CONVERTER + '?' + Constants.ACCESS_KEY + '=' + environment.KEY_URL_CURRENCY_CONVERTER, { headers })
      .pipe(map((data: any) => {
        if (data.success) {
          localStorage.setItem('timestamp', JSON.stringify(data.timestamp));
          return data.rates;
        } else {
          return data.error;
        }
      }, error => {
        return error;
      }));
  }
}
