import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

import { AppComponent }                     from './app.component';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter }      from 'angular-calendar';
import { adapterFactory }                from 'angular-calendar/date-adapters/date-fns';
import { SchedulesDashboardComponent }   from './components/schedules-dashboard/schedules-dashboard.component';
import { ScheduleComponent }             from './components/shared/schedule/schedule.component';
import { ScheduleAdderComponent }        from './components/schedules-dashboard/schedule-adder/schedule-adder.component';
import { CalendarsListComponent }        from './components/calendar/calendars-list/calendars-list.component';
import { CalendarDashboardComponent }    from './components/calendar/calendar-dashboard.component';
import { AddedClassesComponent }         from './components/schedules-dashboard/added-classes/added-classes.component';
import { DayTimePickerComponent }        from './components/schedules-dashboard/schedule-adder/day-time-picker/day-time-picker.component';
import { MatSelectModule }               from '@angular/material/select';
import { FlexLayoutModule }              from '@angular/flex-layout';
import { MccTimerPickerModule }          from 'material-community-components';
import { MatCardModule, MatInputModule } from '@angular/material';
import { MatButtonModule }                  from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchedulesGroupState }              from './states/schedules/schedules.state';
import { SchedulePermutationsState }        from './states/schedule-permutations/schedule-permutations.state';
import { NgxsModule }                       from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule }    from '@ngxs/devtools-plugin';
import { MatIconModule }                    from '@angular/material/icon';
import { CreatedClassComponent }            from './components/schedules-dashboard/added-classes/created-class/created-class.component';
import { NgxsStoragePluginModule }          from '@ngxs/storage-plugin';
import { DayOfTheWeekPipe }                 from './pipes/day-of-the-week.pipe';
import { NgxsSelectSnapshotModule }         from '@ngxs-labs/select-snapshot';
import { ScrollingModule }                  from '@angular/cdk/scrolling';
import { CalendarViewComponent }            from './components/calendar/calendars-list/calendar-view/calendar-view.component';
import { ServiceWorkerModule }              from '@angular/service-worker';
import { environment }                      from '../environments/environment';

const ANGULAR_MODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  ScrollingModule
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
  CalendarModule.forRoot({
    provide: DateAdapter,
    useFactory: adapterFactory
  })
];

const STATES = [
  SchedulesGroupState,
  SchedulePermutationsState
];

const NGXS_IMPORTS = [
  NgxsModule.forRoot(STATES),
  NgxsReduxDevtoolsPluginModule.forRoot(),
  NgxsStoragePluginModule.forRoot(),
  NgxsSelectSnapshotModule.forRoot()
];

@NgModule({
  declarations: [
    AppComponent,
    SchedulesDashboardComponent,
    ScheduleComponent,
    ScheduleAdderComponent,
    CalendarsListComponent,
    CalendarDashboardComponent,
    AddedClassesComponent,
    DayTimePickerComponent,
    CreatedClassComponent,
    DayOfTheWeekPipe,
    CalendarViewComponent
  ],
  imports: [
    ...ANGULAR_MODULES,
    ...MATERIAL_MODULES,
    ...OTHER_MODULES,
    ...NGXS_IMPORTS,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

