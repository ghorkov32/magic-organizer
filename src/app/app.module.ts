import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SchedulesDashboardComponent } from './components/schedules-dashboard/schedules-dashboard.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleAdderComponent } from './components/schedule-adder/schedule-adder.component';
import { CalendarsListComponent } from './components/calendars-list/calendars-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ScheduleGroupComponent } from './components/schedule-group/schedule-group.component';
import { DayTimePickerComponent } from './components/day-time-picker/day-time-picker.component';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MccTimerPickerModule } from 'material-community-components';
import { MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SchedulesDashboardComponent,
    ScheduleComponent,
    ScheduleAdderComponent,
    CalendarsListComponent,
    CalendarComponent,
    ScheduleGroupComponent,
    DayTimePickerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    MatSelectModule,
    MccTimerPickerModule,
    FlexLayoutModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

