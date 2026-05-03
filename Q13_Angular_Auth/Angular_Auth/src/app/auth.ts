
import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})

export class AuthService
{
  register(user: any) {
    localStorage.setItem('user', JSON.stringify(user) || '{}');
  }
  
  login(username: String, password: String): boolean{
    
    const data = JSON.parse(localStorage.getItem('user') || '{}');

    return data.username == username && data.password == password;

  }
  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}  


