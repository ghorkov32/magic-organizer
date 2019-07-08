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
import {MatCardModule, MatInputModule} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleFormState } from './states/schedule-form/schedule-form.state';
import { SchedulesGroupState } from './states/schedules/schedules.state';
import { SchedulePermutationsState } from './states/schedule-permutations/schedule-permutations.state';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

const ANGULAR_MODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
];

const MATERIAL_MODULES = [
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
];

const OTHER_MODULES = [
  CalendarModule.forRoot({
    provide: DateAdapter,
    useFactory: adapterFactory
  }),
  MccTimerPickerModule,
  FlexLayoutModule,
];

const STATES = [
  ScheduleFormState,
  SchedulesGroupState,
  SchedulePermutationsState
];

const NGXS_IMPORTS = [
  NgxsModule.forRoot(STATES),
  NgxsFormPluginModule.forRoot(),
  NgxsReduxDevtoolsPluginModule.forRoot()
];

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
    ...ANGULAR_MODULES,
    ...MATERIAL_MODULES,
    ...OTHER_MODULES,
    ...NGXS_IMPORTS,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

