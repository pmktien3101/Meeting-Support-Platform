import { Injectable } from '@angular/core';

interface CacheItem<T> {
  data: T;
  expiresAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, CacheItem<any>>();
  private readonly defaultTtl = 5 * 60 * 1000; // 5 minutes

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return item.data;
  }

  set<T>(key: string, data: T, options?: { ttl?: number }): void {
    const ttl = options?.ttl ?? this.defaultTtl;
    this.cache.set(key, { data, expiresAt: Date.now() + ttl });
  }

  remove(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}
