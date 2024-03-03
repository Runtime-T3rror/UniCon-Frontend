import { Component, OnInit } from '@angular/core';
import { TimetableService } from 'src/app/services/timetable/timetable.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css'],
})
export class TimetableComponent implements OnInit {
  day: number = 0;
  days: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  data: any = null;
  constructor(private timetable: TimetableService) {}
  ngOnInit(): void {
    this.timetable.fetchTT().subscribe((response) => {
      this.data = response;
    });
  }
  convertTime(timeString: string) {
    const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
    if (!timeRegex.test(timeString)) {
      throw new Error(
        'Invalid time format. Please provide a time in HH:MM:SS format.'
      );
    }

    // Extract hours and minutes
    const [hours, minutes] = timeString.split(':');

    return `${hours}:${minutes}`;
  }
}
