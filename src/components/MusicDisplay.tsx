import React, { useState, useRef } from 'react';
import '../css/MusicDisplay.css';
import playButton from '../media/img/buttonPlay.png';
import pauseButton from '../media/img/Pause1.png';

import audioFile1 from '../media/musiques/0.mp3';
import audioFile2 from '../media/musiques/1.mp3';

interface MusicDisplayProps {
  imageUrl: string;
  title: string;
  author: string;
  musicToPlay: number;
  onPlay: (musicToPlay: number) => void;
  isPlaying: boolean;
}

function MusicDisplay({
  imageUrl,
  title,
  author,
  musicToPlay,
  onPlay,
  isPlaying,
}: MusicDisplayProps): JSX.Element {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [localIsPlaying, setLocalIsPlaying] = useState(false);

  const handlePlayClick = () => {
    if (onPlay) {
      onPlay(musicToPlay);
    }

    if (audioRef.current) {
      if (localIsPlaying) {
        audioRef.current.pause();
      } else {
        // Mettez en pause toutes les autres balises audio
        const allAudioElements = document.querySelectorAll(".audio-player");
        allAudioElements.forEach((element) => {
          if (element !== audioRef.current) {
            const otherAudioRef = element as HTMLAudioElement;
            otherAudioRef.pause();
            const pauseIcon = element.parentElement?.querySelector('.ButtonPauseIcon') as HTMLImageElement | null;
            if (pauseIcon) {
              pauseIcon.src = playButton;
              pauseIcon.alt = "button play";
              pauseIcon.className = "ButtonPlayIcon";
            }
          }
        });

        audioRef.current.play();
      }
      setLocalIsPlaying(!localIsPlaying);
    }
  }

  // Utilisez audioFile1 si musicToPlay est 0, sinon utilisez audioFile2
  const audioFile = musicToPlay === 0 ? audioFile1 : audioFile2;

  return (
    <>
      <section className="App-musicDisplay">
        <img src={imageUrl} className='App-logoSong' alt="logo header" />
        <p>{title}</p>
        <p>{author}</p>
        <p>DURATION</p>
        <button onClick={handlePlayClick} data-musicid={musicToPlay} className="ButtonPlay">
          {localIsPlaying ? (
            <img src={pauseButton} className='ButtonPauseIcon' alt="button pause" />
          ) : (
            <img src={playButton} className='ButtonPlayIcon' alt="button play" />
          )}
        </button>
        <audio ref={audioRef} data-musicid={musicToPlay} className="audio-player">
          <source src={audioFile} type="audio/mpeg" />
        </audio>
      </section>
    </>
  );
}

export default MusicDisplay;
