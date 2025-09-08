import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-meeting-room',
  standalone: true,
  imports: [],
  templateUrl: './meeting-room.component.html',
  styleUrls: ['./meeting-room.component.scss']
})
export class MeetingRoomComponent {
  @Input() callId!: string;
}
