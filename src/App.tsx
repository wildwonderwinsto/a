/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import HeroSection from "./components/HeroSection";
import ConceptSection from "./components/ConceptSection";
import TechSection from "./components/TechSection";
import OriginSection from "./components/OriginSection";
import WaitlistSection from "./components/WaitlistSection";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AudioPlayer />
      <main className="flex-1">
        <HeroSection />
        <ConceptSection />
        <TechSection />
        <WaitlistSection />
        <OriginSection />
      </main>
      <Footer />
    </div>
  );
}
