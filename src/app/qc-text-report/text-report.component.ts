import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, RenderComponentType } from '@angular/core';
import { now } from 'moment';
import { DataSource } from '@angular/cdk/table';
import { TextInput } from '../models/text-input';
import { DatePicker } from '@syncfusion/ej2-angular-calendars';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'text-report',
  templateUrl: './text-report.component.html',
  styleUrls: ['./text-report.component.css']
})
export class TextComponent implements OnInit {
  @ViewChild('startDatePicker', { static: false })
  public startDatePicker: DatePicker;
  @ViewChild('endDatePicker', { static: false })
  public endDatePicker: DatePicker;
  public sdate: Date;
  public edate: Date;
  public dateFormat: string = 'M/d/yyyy';
  public startDateHdr: Date;
  public endDateHdr: Date;
  public maxDate: Date = new Date();
  public showDateRangeOrderError: boolean = false;
  public showDateRangeWithin35DaysError: boolean = false;
  public showStartDateFutureError: boolean = false;
  public showEndDateFutureError: boolean = false;
  public inputForm: NgForm;

  public model = new TextInput();
  submitted = false;
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  constructor() {
  }

  async ngOnInit() {
    await this.SetLookupData();
  }
  public onCreated(e: any): void {
    this.clearFormValues();
  }

  onSave() {
    if (this.verifyEntries()) {
      this.updateReportHeader();
      this.updateReport();
    }
  }
  verifyEntries() {
    return true;
  }
  updateReportHeader() {

  }
  updateReport() {

  }
  clearFormValues() {
    this.sdate = null;
    this.edate = null;
  }
  doDelete() {
    this.clearFormValues()
  }
  onChange($event) {
    // Validate Required fields
    // If Validates, enable Submit Button
  }
  /**
   * Calls validateDate() which passes the date through the necessary validations
   * @param $event The change event passed by the browser
   */
  onDateChange($event) {
    this.validateDate($event);
  }

  /** validateDate()
   *  Calls the various date validations and sets show error variables appropriately
   *  @param $event Accepts the event of the date change
   *  @returns True if all date validations return true, otherwise returns False.
   */
  validateDate($event) {
    return (this.isDateRangeValid());
  }

  /** isDateRangeValid()
   *  Checks range between sdate (start date) and edate (end date) for validity and sets show error
   *  flags appropriately.
   *  @returns True if range is valid, otherwise returns False.
   */
  isDateRangeValid() {
    this.showDateRangeOrderError = !this.isDateRangeOrdered();
    this.showDateRangeWithin35DaysError = !this.isDateRangeWithin35Days()
    return (!this.showDateRangeOrderError && !this.showDateRangeWithin35DaysError);
  }

  /** isDateRangeOrdered()
   *  If both sdate (start date) and edate(end date) have values, checks to make sure
   *  sdate is equal or before edate.
   *  @returns True if sdate is equal or before edate, otherwise returns False.
   */
  isDateRangeOrdered() {
    if (this.edate == null || this.sdate == null) {
      return true;
    } else {
      return (this.edate >= this.sdate);
    }
  }

  /** isDateRangeWithin35Days()
   * Checks to be sure there are no more than 35 days between sdate (start date) and edate (end date)
   * @returns True if there are 35 days or less between sdate and edate
   */
  isDateRangeWithin35Days() {
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
    const validRangeInDays = 35;
    if (this.edate == null || this.sdate == null) {
      return true;
    } else {
      return (Math.round((this.edate.getTime() - this.sdate.getTime()) / oneDayInMilliseconds) <= validRangeInDays);
    }
  }

  /**
   * Retrieves the lookup data (ex: static drop down list data) from the service.
   */
  async SetLookupData() {
  }
}
