# BIO-TESSERA: Mycelium Management System

![BIO-TESSERA Banner](https://picsum.photos/seed/biotessera/1200/400?grayscale)

**BIO-TESSERA** is a cutting-edge, AI-powered management platform designed for the monitoring, maintenance, and evolution of mycelium-based architectural structures. It bridges the gap between residents, facility managers, and architects to ensure the structural integrity and aesthetic health of living buildings.

## 🌿 Overview

As architectural paradigms shift towards sustainable, living materials, the need for specialized monitoring tools becomes paramount. BIO-TESSERA provides a comprehensive suite of tools to track the "aging" of mycelium facades, analyze surface degradation using computer vision, and facilitate collaborative design for bio-restoration.

## ✨ Key Features

- **Real-time Monitoring**: Live (AI-simulated) camera feeds of critical structural sectors with a specialized Gothic/Brutalist aesthetic.
- **AI Surface Analysis**: Upload images of mycelium surfaces to detect cracks, erosion, browning, and perforation using Gemini AI.
- **Interactive Mapping**: A detailed, AI-generated site map for spatial tracking of monitoring points and risk levels.
- **Collaborative Dialogue**: An AI-facilitated communication channel between residents and architects for maintenance and design discussions.
- **Automated Design Proposals**: AI-generated "Restore" vs. "Redesign" plans based on structural health evaluations.
- **Material Lab**: Track the growth cycles and health of fresh mycelium batches used for repairs.
- **Alert Center**: Centralized management of structural and surface-level alerts with severity tracking.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **AI Engine**: Google Gemini API (`@google/genai`)
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Google Gemini API Key

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/bio-tessera.git
   cd bio-tessera
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open the app**:
   Navigate to `http://localhost:3000` in your browser.

## 📂 Project Structure

- `/src/pages`: Individual application views (Dashboard, Mapping, Dialogue, etc.)
- `/src/components`: Reusable UI components.
- `/src/services`: Gemini AI integration and API logic.
- `/src/stores`: State management for camera feeds and map backgrounds.
- `/public/assets`: Directory for custom architectural photos and site maps.

## 🎨 Customization

To use your own architectural photos instead of AI-generated ones:
1. Place your images in `/public/assets/`.
2. Name them according to the agreed-upon logic (e.g., `camera_p1_north_facade.jpg`).
3. The system will automatically prioritize these local assets.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Developed for the future of living architecture.*
