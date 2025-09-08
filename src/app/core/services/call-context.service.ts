import { Injectable } from '@angular/core';
import { Call } from '@stream-io/video-client';

@Injectable({ providedIn: 'root' })
export class CallContextService {
  private call: Call | null = null;

  setCall(call: Call) {
    this.call = call;
  }

  getCall(): Call | null {
    return this.call;
  }
}
