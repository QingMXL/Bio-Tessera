# BIO-TESSERA: Mycelium Management System

![BIO-TESSERA Banner](https://github.com/QingMXL/Bio-Tessera/blob/main/assets/Bio-Tessera%20Community%20Scene.jpg)

**BIO-TESSERA** is an AI-assisted management platform designed for the monitoring, maintenance, and long-term evolution of mycelium-based architectural structures. The system connects residents, facility managers, and architects through a shared digital interface that supports the observation, analysis, and repair of living building materials.

By integrating computer vision, environmental sensing, and collaborative design workflows, BIO-TESSERA enables the management of bio-based architecture as a dynamic material ecosystem rather than a static building envelope.

## 🌿 Overview

As architecture increasingly incorporates bio-based materials, new management tools are required to monitor their performance and transformation over time. Unlike conventional construction materials, mycelium composites continue to evolve after fabrication, responding to environmental conditions such as humidity, light exposure, and microbial activity.

BIO-TESSERA provides a digital platform for tracking these changes and coordinating maintenance strategies. The system allows users to observe surface conditions, detect structural risks, and generate repair or redesign proposals through AI-assisted analysis.

The platform functions not only as a monitoring dashboard but also as a collaborative infrastructure for the stewardship of living architecture.

## ✨ Key Features

- **Real-time Monitoring**: Live (AI-simulated) camera feeds display critical sectors of mycelium-based structures, allowing continuous observation of façade conditions and structural zones.
- **AI Surface Analysis**: Users can upload photographs of mycelium surfaces. The system analyzes the images to detect:
- cracking  
- erosion  
- browning  
- biological perforation  
- surface deformation  
- **Interactive Mapping**: An AI-generated site map visualizes monitoring locations and highlights risk zones. This enables spatial tracking of façade conditions across an entire building or neighborhood.
- **Collaborative Dialogue**: BIO-TESSERA provides a communication interface where residents, maintenance teams, and architects can exchange information, report issues, and discuss design responses.
- **Automated Design Proposals**: AI-generated "Restore" vs. "Redesign" plans based on structural health evaluations.
- **Material Lab**: Tracks the growth cycles and health conditions of new mycelium batches prepared for repair and replacement.
- **Alert Center**: Centralized alert management for structural warnings and surface deterioration events, with severity classification and monitoring history.

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
