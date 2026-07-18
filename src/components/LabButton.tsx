import { useLanguage } from '../config/languageConfig';
import { labButtonContent } from '../content/labButton';

interface LabButtonProps {
  visible: boolean;
  onClick: () => void;
}

export default function LabButton({ visible, onClick }: LabButtonProps) {
  const { lang } = useLanguage();
  const copy = labButtonContent[lang];

  return (
    <div
      className="fixed bottom-8 z-90"
      style={{
        insetInlineEnd: '2rem',
        pointerEvents: visible ? 'all' : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={copy.aria}
        className="btn-primary shadow-[0_16px_40px_-20px_rgba(188,148,99,0.7)]"
      >
        {copy.label}
      </button>
    </div>
  );
}
