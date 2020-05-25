import { Component, OnInit } from '@angular/core';
import {Calender} from "../../calender";
import {CalenderHttpService} from "../calender-service.service";

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  termine: Calender[];

  test: string = "hallo";

  titel: string = "Hallo Angular"

  link: string = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"



  constructor(private service: CalenderHttpService) { }

  ngOnInit() {

    this.service.getAppointments().subscribe(response => this.termine = response)

  }

}
