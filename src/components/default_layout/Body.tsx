import React, { useState, useEffect } from 'react';
import '../../css/Body.css';
import MusicDisplay from '../MusicDisplay';

function Body(): JSX.Element {
    const url = "https://mehtify.garon1.repl.co/musics";
    const [data, setData] = useState<any[]>([]); // Vous pouvez spécifier un type plus précis que `any[]` pour `data` si vous avez des types définis.
    const [currentPlayingMusic, setCurrentPlayingMusic] = useState<number | null>(null);

    const handlePlay = (musicToPlay: number) => {
        if (currentPlayingMusic !== musicToPlay) {
            // Mettre en pause la musique en cours
            if (currentPlayingMusic) {
                const audioElement = document.getElementById("audio-player-" + currentPlayingMusic);
                if (audioElement) {
                    (audioElement as HTMLAudioElement).pause();
                }
            }
            setCurrentPlayingMusic(musicToPlay);
        }
    };

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then((fetchedData: any) => {
                setData(fetchedData); // Vous pouvez spécifier un type plus précis pour `fetchedData`.
            })
            .catch(error => console.error("Erreur lors de la récupération des données :", error));
    }, []);

    return (
        <div className="App-body"> {/* Utilisez une div à la place de body pour contenir vos éléments JSX. */}
            {data.map((musicData) => (
                <MusicDisplay
                    key={musicData.id}
                    imageUrl={musicData.imageUrl}
                    title={musicData.title}
                    author={musicData.author}
                    musicToPlay={musicData.id}
                    onPlay={handlePlay}
                    isPlaying={currentPlayingMusic === musicData.id}
                />
            ))}
        </div>
    );
}

export default Body;
