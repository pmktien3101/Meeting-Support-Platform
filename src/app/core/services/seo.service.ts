import { Injectable, inject, PLATFORM_ID, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

export interface SeoMetaData {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly defaultMeta: Required<SeoMetaData> = {
    title: 'Meeting Support Platform',
    description: 'Professional meeting support platform for teams',
    keywords: 'meeting, support, collaboration',
    ogTitle: 'Meeting Support Platform',
    ogDescription: 'Professional meeting support platform for teams',
    ogImage: '',
    ogUrl: '',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Meeting Support Platform',
    twitterDescription: 'Professional meeting support platform for teams',
    twitterImage: '',
    canonicalUrl: ''
  };

  constructor() {
    // Only subscribe to router events in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd)
      ).subscribe(() => {
        if (typeof window !== 'undefined') {
          this.setCanonicalUrl(window.location.href);
        }
      });
    }
  }

  setTitle(title: string): void {
    this.title.setTitle(title ? `${title} - ${this.defaultMeta.title}` : this.defaultMeta.title);
  }

  setDescription(desc: string): void {
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ name: 'twitter:description', content: desc });
  }

  setSeoData(data: SeoMetaData): void {
    const meta = { ...this.defaultMeta, ...data };

    this.setTitle(meta.title);
    this.setDescription(meta.description);
    this.meta.updateTag({ name: 'keywords', content: meta.keywords });
    this.meta.updateTag({ property: 'og:title', content: meta.ogTitle });
    this.meta.updateTag({ property: 'og:image', content: meta.ogImage });
    this.meta.updateTag({ property: 'og:url', content: meta.ogUrl });
    this.meta.updateTag({ name: 'twitter:card', content: meta.twitterCard });
    this.meta.updateTag({ name: 'twitter:title', content: meta.twitterTitle });
    this.meta.updateTag({ name: 'twitter:image', content: meta.twitterImage });

    if (meta.canonicalUrl) this.setCanonicalUrl(meta.canonicalUrl);
  }

  setCanonicalUrl(url: string): void {
    // Only execute in browser environment
    if (!isPlatformBrowser(this.platformId) || typeof document === 'undefined') {
      return;
    }

    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
  }

  resetToDefault(): void {
    this.setSeoData(this.defaultMeta);
  }
}