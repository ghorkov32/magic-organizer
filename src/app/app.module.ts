import { BrowserModule }               from '@angular/platform-browser';
import { LOCALE_ID, NgModule }         from '@angular/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { AppComponent }                                    from './app.component';
import { BrowserAnimationsModule }                         from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter }                     from 'angular-calendar';
import { adapterFactory }                                  from 'angular-calendar/date-adapters/date-fns';
import { SchedulesDashboardComponent }                     from './components/schedules-dashboard/schedules-dashboard.component';
import { ScheduleComponent }                               from './components/shared/schedule/schedule.component';
import { ScheduleAdderComponent }                          from './components/schedules-dashboard/schedule-adder/schedule-adder.component';
import { CalendarsListComponent }                          from './components/calendar/calendars-list/calendars-list.component';
import { CalendarDashboardComponent }                      from './components/calendar/calendar-dashboard.component';
import { AddedClassesComponent }                           from './components/schedules-dashboard/added-classes/added-classes.component';
import { DayTimePickerComponent }                          from './components/schedules-dashboard/schedule-adder/day-time-picker/day-time-picker.component';
import { MatSelectModule }                                 from '@angular/material/select';
import { FlexLayoutModule }                                from '@angular/flex-layout';
import { MatCardModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { MatButtonModule }                                 from '@angular/material/button';
import { FormsModule, ReactiveFormsModule }                from '@angular/forms';
import { SchedulesGroupState }                             from './states/schedules/schedules.state';
import { SchedulePermutationsState }                       from './states/schedule-permutations/schedule-permutations.state';
import { NgxsModule }                                      from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule }                   from '@ngxs/devtools-plugin';
import { MatIconModule }                                   from '@angular/material/icon';
import { CreatedClassComponent }                           from './components/schedules-dashboard/added-classes/created-class/created-class.component';
import { NgxsStoragePluginModule }                         from '@ngxs/storage-plugin';
import { DayOfTheWeekPipe }                                from './pipes/day-of-the-week.pipe';
import { NgxsSelectSnapshotModule }                        from '@ngxs-labs/select-snapshot';
import { ScrollingModule }                                 from '@angular/cdk/scrolling';
import { CalendarViewComponent }                           from './components/calendar/calendars-list/calendar-view/calendar-view.component';
import { ServiceWorkerModule }                             from '@angular/service-worker';
import { environment }                                     from '../environments/environment';
import { registerLocaleData }                              from '@angular/common';
import localeFr                                            from '@angular/common/locales/fr';
import localeDe                                            from '@angular/common/locales/de';
import localeEs                                            from '@angular/common/locales/es';
import localeIt                                            from '@angular/common/locales/it';
import localePt                                            from '@angular/common/locales/pt';
import localeRu                                            from '@angular/common/locales/ru';
import localeEn                                            from '@angular/common/locales/en';
import { LanguageSelectComponent }                         from './components/language-select/language-select.component';

// Locale registration for languages
registerLocaleData(localeFr, 'fr');
registerLocaleData(localeDe, 'de');
registerLocaleData(localeEs, 'es');
registerLocaleData(localeIt, 'it');
registerLocaleData(localePt, 'pt');
registerLocaleData(localeRu, 'ru');
registerLocaleData(localeEn, 'en');

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
  MatToolbarModule,
];

const OTHER_MODULES = [
  CalendarModule.forRoot({
    provide: DateAdapter,
    useFactory: adapterFactory
  }),
  FlexLayoutModule,
  CalendarModule.forRoot({
    provide: DateAdapter,
    useFactory: adapterFactory
  }),
  NgxMaterialTimepickerModule
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
    CalendarViewComponent,
    LanguageSelectComponent
  ],
  imports: [
    ...ANGULAR_MODULES,
    ...MATERIAL_MODULES,
    ...OTHER_MODULES,
    ...NGXS_IMPORTS,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  //Hacky locale provider. Provides locale as the URL defined in language
  providers: [{
    provide: LOCALE_ID,
    useValue: environment.production ? window.location.href.match('\/([a-z][a-z])\/')[1] : 'en'
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

