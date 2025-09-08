import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Call } from '@stream-io/video-client';
import { StreamVideoClientService } from '../../../../core/services/stream-video-client.service';

@Component({
  selector: 'app-meeting-setup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meeting-setup.component.html',
  styleUrls: ['./meeting-setup.component.scss']
})
export class MeetingSetupComponent implements OnInit, OnDestroy {
  @Input() callId!: string;
  @Input() onJoin!: () => void;

  @ViewChild('videoPreview', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  
  private call: Call | null = null;
  isMicCamToggledOn = false;
  hasPermissionError = false;
  private currentStream: MediaStream | null = null;  // Add this line
  private videoTrack: MediaStreamTrack | null = null;
  private audioTrack: MediaStreamTrack | null = null;

  constructor(private clientService: StreamVideoClientService) {}

  async ngOnInit() {
    try {
      // Request permissions first
      await this.requestPermissions();
      
      if (this.callId) {
        this.call = await this.clientService.getCall(this.callId);
      }
      await this.startVideoPreview();
      await this.applyMediaState();
    } catch (err) {
      console.error('Error in ngOnInit:', err);
      this.hasPermissionError = true;
    }
  }

  ngOnDestroy() {
    this.stopVideoPreview();
  }

  toggleMicCam() {
    this.isMicCamToggledOn = !this.isMicCamToggledOn;
    this.updateMediaTracks();
  }

  private async updateMediaTracks() {
    if (!this.currentStream) return;

    try {
      // Handle video track
      if (this.videoTrack) {
        this.videoTrack.enabled = !this.isMicCamToggledOn;
      }

      // Handle audio track
      if (this.audioTrack) {
        this.audioTrack.enabled = !this.isMicCamToggledOn;
      }

      // Update call state if available
      if (this.call) {
        if (this.isMicCamToggledOn) {
          await Promise.all([
            this.call.camera.disable(),
            this.call.microphone.disable()
          ]);
        } else {
          await Promise.all([
            this.call.camera.enable(),
            this.call.microphone.enable()
          ]);
        }
      }
    } catch (err) {
      console.error('Error updating media tracks:', err);
    }
  }

  private async requestPermissions() {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    } catch (err) {
      console.error('Permission error:', err);
      throw new Error('Camera and microphone permissions are required');
    }
  }

  private async startVideoPreview() {
    if (!this.videoElement) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: true 
      });
      
      this.currentStream = stream;
      
      // Store individual tracks
      this.videoTrack = stream.getVideoTracks()[0];
      this.audioTrack = stream.getAudioTracks()[0];
      
      const video = this.videoElement.nativeElement;
      video.srcObject = stream;
      video.muted = true; // Ensure preview is muted
      await video.play();
      
    } catch (err) {
      console.error('Error starting video preview:', err);
      throw err;
    }
  }

  private async applyMediaState() {
    if (!this.call) return;

    try {
      if (this.isMicCamToggledOn) {
        await Promise.all([
          this.call.camera.disable(),
          this.call.microphone.disable()
        ]);
      } else {
        await Promise.all([
          this.call.camera.enable(),
          this.call.microphone.enable()
        ]);
      }
    } catch (err) {
      console.error('Error applying media state:', err);
    }
  }

  private stopVideoPreview() {
    try {
      if (this.videoTrack) {
        this.videoTrack.stop();
        this.videoTrack = null;
      }
      if (this.audioTrack) {
        this.audioTrack.stop();
        this.audioTrack = null;
      }
      if (this.currentStream) {
        this.currentStream.getTracks().forEach(track => track.stop());
        this.currentStream = null;
      }
      if (this.videoElement?.nativeElement) {
        this.videoElement.nativeElement.srcObject = null;
      }
    } catch (err) {
      console.error('Error stopping video preview:', err);
    }
  }

  async onReady() {
    await this.applyMediaState();
    if (this.onJoin) this.onJoin();
  }
}
