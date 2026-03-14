import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const analyzeAgingImage = async (imageUrl: string) => {
  const fallback = {
    detections: [
      { label: "crack", confidence: 0.85, severity: "medium" },
      { label: "browning", confidence: 0.92, severity: "low" }
    ],
    summary: "Simulated analysis: Minor surface degradation detected.",
    recommendedAction: "maintenance"
  };

  if (isQuotaExhausted) return fallback;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageUrl.split(",")[1],
          },
        },
        {
          text: "Analyze this mycelium architectural surface for aging features: crack, erosion, browning, peeling, perforation. Return a JSON object with 'detections' array, each item having 'label', 'confidence' (0-1), and 'severity' (low, medium, high). Also provide a 'summary' and 'recommendedAction' (maintenance or architect_consultation).",
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });
    return JSON.parse(response.text || "{}");
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    if (errorMsg.includes("429") || errorMsg.includes("RESOURCE_EXHAUSTED")) {
      isQuotaExhausted = true;
    }
    console.error("AI Analysis failed:", error);
    return fallback;
  }
};

export const getArchitectAdvice = async (issueDescription: string, residentNeed: string) => {
  const fallback = {
    restore: { title: "Structural Reinforcement", description: "Injecting fresh mycelium spores into the existing grid." },
    redesign: { title: "Bio-Balcony Conversion", description: "Opening the wall to create a semi-permeable breathing space." }
  };

  if (isQuotaExhausted) return fallback;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `As an architect specializing in mycelium buildings, provide two design proposals for this issue: ${issueDescription}. Resident needs: ${residentNeed}. 
      Return JSON with 'restore' (object with title, description) and 'redesign' (object with title, description).`,
      config: {
        responseMimeType: "application/json",
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    if (errorMsg.includes("429") || errorMsg.includes("RESOURCE_EXHAUSTED")) {
      isQuotaExhausted = true;
    }
    console.error("Architect AI failed:", error);
    return fallback;
  }
};

export const getChatResponse = async (history: { sender: string; content: string }[], currentRole: string) => {
  const fallback = "I've received your message and will get back to you shortly.";
  
  if (isQuotaExhausted) return fallback;

  try {
    const otherRole = currentRole === 'RESIDENT' ? 'ARCHITECT' : 'RESIDENT';
    const context = history.map(m => `${m.sender}: ${m.content}`).join('\n');
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are acting as the ${otherRole} in a conversation with a ${currentRole} about a mycelium building maintenance issue.
      Context of previous messages:
      ${context}
      
      Provide a brief, professional, and contextually relevant reply as the ${otherRole}. Keep it under 50 words.`,
    });
    
    return response.text || "I understand. Let me look into that further.";
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    if (errorMsg.includes("429") || errorMsg.includes("RESOURCE_EXHAUSTED")) {
      isQuotaExhausted = true;
    }
    console.error("Chat AI failed:", error);
    return fallback;
  }
};

let isQuotaExhausted = false;

export const generateCameraFeed = async (prompt: string, retries = 2) => {
  const fallbackUrl = `https://picsum.photos/seed/${encodeURIComponent(prompt + 'gothic-cathedral-stone')}/800/450?grayscale`;
  
  if (isQuotaExhausted) {
    return fallbackUrl;
  }

  for (let i = 0; i <= retries; i++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: [{ text: `Ultra-realistic architectural façade photograph of a ${prompt} in London in a detailed Gothic architectural style. The image emphasizes the rough, weathered texture of ancient stonework and heavy masonry. It features characteristic Gothic multi-light windows with intricate stone tracery and deep openings. The walls are thick and imposing, showing natural aging, moss growth, and organic decay of the stone materials. Exposed ancient wooden structural beams and timber reinforcements are integrated into the stone façade. Street-level view focusing on architectural details and material decay. Surrounded by traditional London masonry buildings under a moody, overcast sky. Documentary architectural photography, ultra-detailed textures, cinematic realism. No people, no vehicles, no aerial view.` }],
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      throw new Error("No image data returned");
    } catch (error: any) {
      const errorMsg = error?.message || String(error);
      
      if (errorMsg.includes("429") || errorMsg.includes("RESOURCE_EXHAUSTED")) {
        console.warn("Gemini API Quota Exhausted. Switching to fallback mode.");
        isQuotaExhausted = true;
        return fallbackUrl;
      }

      console.error(`Image generation attempt ${i + 1} failed:`, errorMsg);

      if (i === retries) {
        return fallbackUrl;
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
    }
  }
  return fallbackUrl;
};

export const generateMapBackground = async (retries = 2) => {
  const fallbackUrl = `https://picsum.photos/seed/military-map-aerial/1200/800?grayscale`;
  
  if (isQuotaExhausted) {
    return fallbackUrl;
  }

  for (let i = 0; i <= retries; i++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: [{ text: "A highly detailed bird's-eye view map of a military community. The architecture is realistic, imposing, and functional, featuring thick concrete walls, barracks, command centers, and fortified perimeters. The buildings show a clear sense of age with weathered textures, rust, and organic overgrowth in some areas. The layout is a dense urban grid with specialized military structures integrated into the fabric. The style is documentary architectural photography, ultra-realistic, with a muted, authoritative color palette. 16:9 aspect ratio, top-down perspective. The image should look like a high-resolution satellite or aerial photograph of a secure military installation with aged, brutalist architectural features." }],
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      throw new Error("No image data returned");
    } catch (error: any) {
      const errorMsg = error?.message || String(error);
      
      if (errorMsg.includes("429") || errorMsg.includes("RESOURCE_EXHAUSTED")) {
        console.warn("Gemini API Quota Exhausted for Map. Switching to fallback mode.");
        isQuotaExhausted = true;
        return fallbackUrl;
      }

      console.error(`Map generation attempt ${i + 1} failed:`, errorMsg);

      if (i === retries) {
        return fallbackUrl;
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
    }
  }
  return fallbackUrl;
};
