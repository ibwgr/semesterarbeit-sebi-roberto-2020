import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Calender} from "../calender";

@Injectable({
  providedIn: 'root'
})
export class CalenderHttpService {


  constructor(private service: HttpClient) {

  }


  private readonly url = 'http://localhost:3000';

  getAppointments(): Observable<Calender[]>{
    return this.service.get<Calender[]>(this.url + '/events')
  }



}
