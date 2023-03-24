"use client"
import { useState, useRef } from "react";
import Autoplay from 'embla-carousel-autoplay';
function home() {
    const [ trending, setTrending ] = useState([]);
    const [ cover, setCover ] = useState([]);
    const [ animeWindowUrl, setAnimeWindowUrl ] = useState('');
    const [ animeTitle, setAnimeTitle ] = useState('');
    const [ nativeTitle, setNativeTitle ] = useState('');
    const [ animeDescription, setAnimeDescription ] = useState('');
    const [ animeId, setAnimeId ] = useState('');
    const [ isBackdropOpen, setIsBackdropOpen ] = useState(false);
    const [ pointerEvent, setPointerEvent ] = useState('auto');
    const carousel = useRef();
    const autoplay = useRef(Autoplay({ delay: 5000 }));

  return (
      <div>home</div>
  )
}

export default home