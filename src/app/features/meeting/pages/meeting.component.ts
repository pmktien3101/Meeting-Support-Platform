// meeting.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MeetingSetupComponent } from '../components/meeting-setup/meeting-setup.component';
import { MeetingRoomComponent } from '../components/meeting-room/meeting-room.component';
import { StreamThemeComponent } from '../components/theme/stream-theme.component';
import { StreamVideoClientService } from '../../../core/services/stream-video-client.service';
import { CallContextService } from '../../../core/services/call-context.service';

@Component({
  selector: 'app-meeting',
  standalone: true,
  imports: [CommonModule, MeetingSetupComponent, MeetingRoomComponent, StreamThemeComponent],
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
})
export class MeetingComponent implements OnInit {
  callId: string | null = null;
  isSetupComplete = false;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private clientService: StreamVideoClientService,
    private callContext: CallContextService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.callId = params['callId'];
      if (this.callId) {
        this.isLoading = true;
        const call = await this.clientService.getCall(this.callId);
        if (call) this.callContext.setCall(call);
        this.isLoading = false;
      }
    });
  }

  markSetupComplete = () => {
    this.isSetupComplete = true;
  };
}
