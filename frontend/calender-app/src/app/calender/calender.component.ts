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


  constructor(private service: CalenderHttpService) { }

  ngOnInit() {

    this.service.getAppointments().subscribe(response => this.termine = response)

  }

}
