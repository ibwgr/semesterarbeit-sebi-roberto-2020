import 'regenerator-runtime/runtime'

import {CalenderContent} from "./calenderContent.js";
import {CalenderBody} from "./calenderBody.js";
import {CalendarMapper} from "./calendarMapper.js";





let mapper = new CalendarMapper();
let view = new CalenderContent();
new CalenderBody(view, mapper)
