import { generateMapBackground } from './services/geminiService';

class MapStore {
  private background: string | null = null;
  private loading: boolean = false;
  private subscribers: ((background: string | null) => void)[] = [];

  subscribe(callback: (background: string | null) => void) {
    this.subscribers.push(callback);
    callback(this.background);
    return () => {
      this.subscribers = this.subscribers.filter(s => s !== callback);
    };
  }

  private notify() {
    this.subscribers.forEach(s => s(this.background));
  }

  async loadBackground() {
    if (this.background || this.loading) return;

    // Always prefer the local site map image as the mapping basemap.
    // This expects `site_map_aerial.jpg` to be served from `/assets/`.
    const localMapPath = '/assets/site_map_aerial.jpg';

    this.loading = true;
    try {
      this.background = localMapPath;
      this.notify();
    } catch (error) {
      console.error("Store failed to load local map background:", error);
    } finally {
      this.loading = false;
    }
  }

  getBackground() {
    return this.background;
  }
}

export const mapStore = new MapStore();
