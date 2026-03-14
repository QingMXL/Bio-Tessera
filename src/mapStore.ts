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

    // Check for local asset first
    const localMapPath = '/assets/site_map_aerial.jpg';
    
    this.loading = true;
    try {
      // In this specific environment, we'll try to use the local path.
      // If you haven't uploaded it yet, the image might show as broken,
      // so we'll stick to AI generation for now but allow easy override.
      const imageUrl = await generateMapBackground();
      this.background = imageUrl;
      this.notify();
    } catch (error) {
      console.error("Store failed to load map background:", error);
    } finally {
      this.loading = false;
    }
  }

  getBackground() {
    return this.background;
  }
}

export const mapStore = new MapStore();
