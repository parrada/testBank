import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentConfig } from '../../environment/environmentConfig';
import { User } from '../../models/user.model';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) { 
  }

  getRegisteredUsers() {
    return this.http.get(environmentConfig.API).pipe(response => {
      return response
    })
  }

  newUser(user : User) {
    return this.http.post(environmentConfig.API, user).pipe(response => {
      return response
    })
  }

}
