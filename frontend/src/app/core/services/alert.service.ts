import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  progressBar: boolean = false;
  timeOut: number = 3000;

  constructor(
    private toastrService: ToastrService,
  ) { }
  success(message: string, title: string, timeOut?: number, progressBar?: boolean): void {
    this.toastrService.success(message, title, {
      timeOut: timeOut ? timeOut : this.timeOut,
      progressBar: progressBar ? progressBar : this.progressBar,
    });
  }
  error(message: string, title: string, timeOut?: number, progressBar?: boolean): void {
    this.toastrService.error(message, title, {
      timeOut: timeOut ? timeOut : this.timeOut,
      progressBar: progressBar ? progressBar : this.progressBar,
    });
  }

  info(message: string, title: string, timeOut?: number, progressBar?: boolean): void {
    this.toastrService.info(message, title, {
      timeOut: timeOut ? timeOut : this.timeOut,
      progressBar: progressBar ? progressBar : this.progressBar,
    });
  }
  warning(message: string, title: string, timeOut?: number, progressBar?: boolean): void {
    this.toastrService.warning(message, title, {
      timeOut: timeOut ? timeOut : this.timeOut,
      progressBar: progressBar ? progressBar : this.progressBar,
    });
  }

}
