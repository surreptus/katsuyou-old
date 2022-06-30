const supportsSpeech = typeof window.speechSynthesis !== 'undefined'

const synth = window.speechSynthesis;
const voice = synth.getVoices().filter(voice => voice.lang === 'ja-JP')[0]

export function speak(sentence: string) {
  const utterance = new SpeechSynthesisUtterance(sentence)
  utterance.voice = voice
  return synth.speak(utterance);
}
