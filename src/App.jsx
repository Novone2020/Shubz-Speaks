import React, { useState, useEffect } from 'react';
import "./App.css";

const App = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [text, setText] = useState('Hello! I love JavaScript 👍');
  const msg = new SpeechSynthesisUtterance();

  useEffect(() => {
    const populateVoices = () => {
      const voicesList = speechSynthesis.getVoices().filter(voice => voice.lang.includes('en'));
      setVoices(voicesList);
    };
    populateVoices();
    speechSynthesis.addEventListener('voiceschanged', populateVoices);
    return () => speechSynthesis.removeEventListener('voiceschanged', populateVoices);
  }, []);

  const handleVoiceChange = (e) => {
    setSelectedVoice(e.target.value);
    msg.voice = voices.find(voice => voice.name === e.target.value);
    toggle(false);
  };

  const toggle = (startOver = true) => {
    speechSynthesis.cancel();
    if (startOver) {
      msg.text = text;
      msg.rate = rate;
      msg.pitch = pitch;
      speechSynthesis.speak(msg);
    }
  };

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    if (name === 'rate') setRate(value);
    if (name === 'pitch') setPitch(value);
    toggle(false);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="voiceinator">
      <h1><strong> Sumone Speaks [ bit.ly/shubzspeaks ]</strong></h1>
      <select name="voice" value={selectedVoice} onChange={handleVoiceChange}>
        <option value="">Select A Voice</option>
        {voices.map((voice, index) => (
          <option key={index} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>

      <label htmlFor="rate" className='increase-font'>Rate:</label>
      <input
        name="rate"
        type="range"
        min="0"
        max="3"
        value={rate}
        step="0.1"
        onChange={handleOptionChange}
      />

      <label htmlFor="pitch"  className='increase-font'>Pitch:</label>
      <input
        name="pitch"
        type="range"
        min="0"
        max="2"
        value={pitch}
        step="0.1"
        onChange={handleOptionChange}
      />
      <textarea name="text" value={text} onChange={handleTextChange} />

      <button onClick={() => toggle(true)} className='increase-font'>Speak</button>
      <button onClick={() => toggle(false)} className='increase-font'>Stop!</button>
    </div>
  );
};

export default App;
