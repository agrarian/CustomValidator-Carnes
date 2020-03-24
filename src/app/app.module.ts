import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { TextComponent } from './qc-text-report/text-report.component';
import { EnvironmentService } from './services/environment.service';
import { WinAuthInterceptorService } from './services/winauthinterceptor.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { HomeComponent } from './home/home.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DateNotFutureValidator } from './validators/date-not-future';
import { EndDateNotBeforeStartDateValidator } from './validators/enddate-not-before-startdate';
import { DeactivateGuardService } from './services/deactivate-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {path: '#', component: HomeComponent},
  { path: 'text-report', canDeactivate: [DeactivateGuardService], component: TextComponent }
];


export function getEnvironmentSettings(envServ : EnvironmentService) {
  return () => envServ.getEnvSettingsAsync(true);
}

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    HomeComponent,
    DateNotFutureValidator,
    EndDateNotBeforeStartDateValidator
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DatePickerModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatTreeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })
  ],
  providers: [EnvironmentService,
    FormBuilder, DatePipe,
    DeactivateGuardService
    ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WinAuthInterceptorService,
      deps: [EnvironmentService],
      multi: true
    },
    {
      // We only want to get the environment settings when the app starts so we take advantage of the
      // APP_INITIALIZER provider: https://www.intertech.com/Blog/angular-4-tutorial-run-code-during-app-initialization/
      provide: APP_INITIALIZER,
      useFactory: getEnvironmentSettings,
      deps: [EnvironmentService],
      // "multi = true" essentially means that if there already injections for this provider (either custom or default) then keep using them too
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
