export function chooseWelcomeVoice(
  voices: readonly SpeechSynthesisVoice[],
): SpeechSynthesisVoice | undefined {
  return (
    voices.find(
      (voice) =>
        voice.lang === 'en-US' && voice.name.toLowerCase().includes('male'),
    ) ??
    voices.find(
      (voice) => voice.lang === 'en-US' && voice.name.includes('Google'),
    ) ??
    voices[0]
  );
}
