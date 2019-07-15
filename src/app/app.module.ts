import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

import { AppComponent }                     from './app.component';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter }      from 'angular-calendar';
import { adapterFactory }                   from 'angular-calendar/date-adapters/date-fns';
import { SchedulesDashboardComponent }      from './components/schedules-dashboard/schedules-dashboard.component';
import { ScheduleComponent }                from './components/schedule/schedule.component';
import { ScheduleAdderComponent }           from './components/schedule-adder/schedule-adder.component';
import { CalendarsListComponent }           from './components/calendars-list/calendars-list.component';
import { CalendarComponent }                from './components/calendar/calendar.component';
import { AddedClassesComponent }            from './components/schedule-group/added-classes.component';
import { DayTimePickerComponent }           from './components/day-time-picker/day-time-picker.component';
import { MatSelectModule }                  from '@angular/material/select';
import { FlexLayoutModule }                 from '@angular/flex-layout';
import { MccTimerPickerModule }             from 'material-community-components';
import { MatCardModule, MatInputModule }    from '@angular/material';
import { MatButtonModule }                  from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchedulesGroupState }              from './states/schedules/schedules.state';
import { SchedulePermutationsState }        from './states/schedule-permutations/schedule-permutations.state';
import { NgxsModule }                       from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule }    from '@ngxs/devtools-plugin';
import { MatIconModule }                    from '@angular/material/icon';
import { CreatedClassComponent }            from './components/created-class/created-class.component';

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
  MatIconModule,
  MatCardModule,
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
  SchedulesGroupState,
  SchedulePermutationsState
];

const NGXS_IMPORTS = [
  NgxsModule.forRoot(STATES),
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
    AddedClassesComponent,
    DayTimePickerComponent,
    CreatedClassComponent
  ],
  imports: [
    ...ANGULAR_MODULES,
    ...MATERIAL_MODULES,
    ...OTHER_MODULES,
    ...NGXS_IMPORTS,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

