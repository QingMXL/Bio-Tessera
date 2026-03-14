import { generateCameraFeed } from './services/geminiService';
import { MOCK_POINTS } from './mockData';
import { MonitoringPoint } from './types';

class CameraStore {
  private feeds: Record<string, string | null> = {};
  private loading: Record<string, boolean> = {};
  private subscribers: ((feeds: Record<string, string | null>) => void)[] = [];

  constructor() {
    // Initialize with nulls
    MOCK_POINTS.forEach(p => {
      this.feeds[p.id] = null;
    });
  }

  subscribe(callback: (feeds: Record<string, string | null>) => void) {
    this.subscribers.push(callback);
    callback(this.feeds);
    return () => {
      this.subscribers = this.subscribers.filter(s => s !== callback);
    };
  }

  private notify() {
    this.subscribers.forEach(s => s(this.feeds));
  }

  async loadFeed(pointId: string, name: string) {
    if (this.feeds[pointId] || this.loading[pointId]) return;

    // Check if a local thumbnail is defined in mock data
    const point = MOCK_POINTS.find(p => p.id === pointId);
    if (point?.thumbnail) {
      // In a real app, we'd check if the file actually exists on the server.
      // For now, we'll assume if it's defined, we want to try using it.
      this.feeds[pointId] = point.thumbnail;
      this.notify();
      return;
    }

    this.loading[pointId] = true;
    try {
      const imageUrl = await generateCameraFeed(name);
      this.feeds[pointId] = imageUrl;
      this.notify();
    } catch (error) {
      console.error(`Store failed to load feed for ${pointId}:`, error);
    } finally {
      this.loading[pointId] = false;
    }
  }

  async loadAll() {
    const points = MOCK_POINTS;
    for (const point of points) {
      await this.loadFeed(point.id, point.name);
      // Stagger to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  }

  getFeeds() {
    return this.feeds;
  }
}

export const cameraStore = new CameraStore();
