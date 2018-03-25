import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class GlobalProvider {

  public isOpen = false;

  constructor(public http: HttpClient) {
    console.log('Hello GlobalProvider Provider');
  }

  public isOpened() : boolean {
    return this.isOpen;
  }

}
