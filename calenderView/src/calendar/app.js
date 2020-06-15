import 'regenerator-runtime/runtime'

import {CalenderService} from "./calenderService.js";
import {CalenderBody} from "./calenderBody.js";
import {CalendarMapper} from "./calendarMapper.js";



let service = new CalenderService();
let mapper = new CalendarMapper(service);

new CalenderBody(service, mapper)
