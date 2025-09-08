// stream-video-client.service.ts
import { Injectable } from '@angular/core';
import { StreamVideoClient, Call } from '@stream-io/video-client';

@Injectable({
  providedIn: 'root',
})
export class StreamVideoClientService {
  private client: StreamVideoClient | null = null;

  init(apiKey: string, user: { id: string; name: string; image?: string }, token: string) {
    this.client = new StreamVideoClient({ apiKey, user, token });
  }

  async createMeeting(values: {
    id?: string;
    title: string;
    description?: string;
    startsAt?: Date;
    duration?: number;
    members?: string[];
  }): Promise<Call> {
    if (!this.client) throw new Error('Stream client not initialized');

    const id = values.id || crypto.randomUUID();
    const call = this.client.call('default', id);

    await call.getOrCreate({
      data: {
        starts_at: values.startsAt?.toISOString() || new Date().toISOString(),
        custom: {
          title: values.title,
          description: values.description || 'Instant meeting',
          duration: values.duration,
          members: values.members,
        },
      },
    });

    return call;
  }
  
  async getCall(callId: string): Promise<Call | null> {
    if (!this.client) throw new Error('Stream client not initialized');

    const { calls } = await this.client.queryCalls({
      filter_conditions: {
        id: callId,
      },
    });

    return calls.length > 0 ? calls[0] : null;
  }
}
