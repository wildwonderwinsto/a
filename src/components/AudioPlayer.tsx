import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Default to a file placed in the public directory if it exists
  useEffect(() => {
    setAudioUrl("/theme.mp3");
  }, []);

  const togglePlay = () => {
    if (!hasInteracted) setHasInteracted(true);
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Safe manual play on user click
        audioRef.current.volume = 0.4;
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((e) => {
            console.error("Error playing audio. The file might not exist yet.", e);
            setIsPlaying(false);
          });
      }
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        {...(audioUrl ? { src: audioUrl } : {})}
        loop
        preload="auto"
      />
      
      <motion.div 
        className="fixed bottom-6 right-6 z-50 flex items-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-border bg-background p-1"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <AnimatePresence>
          {!hasInteracted && (
            <motion.div 
              className="absolute -top-14 right-0 bg-primary text-background font-bold px-3 py-2 text-sm rounded shadow-lg animate-bounce whitespace-nowrap after:content-[''] after:absolute after:top-full after:right-4 after:border-4 after:border-transparent after:border-t-primary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              UNMUTE THE CHAOS!
            </motion.div>
          )}

          {isPlaying && (
            <motion.div 
              className="px-3"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
            >
              <div className="flex items-center gap-2">
                <Music size={14} className="text-primary animate-pulse" />
                <span className="font-display uppercase text-xs tracking-widest text-[#a3a3a3] whitespace-nowrap overflow-hidden">
                  Bad Friends Theme 
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={togglePlay}
          className="h-10 w-10 flex relative items-center justify-center bg-surface hover:bg-primary hover:text-background transition-colors focus-visible:outline-2 focus-visible:outline-primary"
          aria-label={isPlaying ? "Pause theme song" : "Play theme song"}
        >
          {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </motion.div>
    </>
  );
}
