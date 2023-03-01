import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messages: string[] = []

  constructor() { }

  public log(msg: string){
    this.messages.push(msg)
  }

  public clear(){
    this.messages = [];
  }
}
