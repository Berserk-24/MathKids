import clickSound from '../assets/buttons.mp3';

export default function SoundButton({ onClick, children, ...props }) {
  const handleClick = (e) => {
    const audio = new Audio(clickSound);
    audio.volume = 0.7;
    audio.play();
    if (onClick) onClick(e);
  };

  return (
    <button {...props} onClick={handleClick}>
      {children}
    </button>
  );
}
