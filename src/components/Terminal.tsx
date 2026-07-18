import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../config/languageConfig';
import {
  terminalContent,
  type TerminalCommandId,
} from '../content/terminal';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

type OutputLine = {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
};

const EN_COMMAND_IDS: TerminalCommandId[] = [
  'help',
  'whoami',
  'skills',
  'projects',
  'contact',
  'coffee',
  'clear',
];

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const { lang } = useLanguage();
  const content = terminalContent[lang];

  const [history, setHistory] = useState<OutputLine[]>([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [booted, setBooted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const bootTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearBootTimers = () => {
    bootTimersRef.current.forEach(clearTimeout);
    bootTimersRef.current = [];
  };

  const runBoot = () => {
    clearBootTimers();
    setHistory([]);
    setBooted(false);
    let delay = 0;
    content.boot.forEach((line, i) => {
      const t = setTimeout(() => {
        setHistory((prev) => [...prev, { type: 'system', content: line }]);
      }, delay);
      bootTimersRef.current.push(t);
      delay += i === 0 ? 300 : 120;
    });
    const done = setTimeout(() => {
      setBooted(true);
      inputRef.current?.focus();
    }, delay + 100);
    bootTimersRef.current.push(done);
  };

  // Boot sequence on open; re-boot when language changes while open
  useEffect(() => {
    if (isOpen) {
      runBoot();
    } else {
      clearBootTimers();
      setBooted(false);
      setHistory([]);
      setInput('');
    }
    return () => clearBootTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: re-boot on lang while open
  }, [isOpen, lang]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const resolveCommand = (raw: string): TerminalCommandId | null => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return null;

    // Accept English command names in both languages
    if ((EN_COMMAND_IDS as string[]).includes(cmd)) {
      return cmd as TerminalCommandId;
    }

    const fromAlias = content.aliases[raw.trim()] ?? content.aliases[cmd];
    if (fromAlias) return fromAlias;

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    const displayCmd = raw;
    const newHistory: OutputLine[] = [
      ...history,
      { type: 'input', content: displayCmd },
    ];

    const resolved = resolveCommand(raw);

    if (resolved === 'clear') {
      setHistory([]);
      setInput('');
      setCmdHistory((prev) => [raw, ...prev]);
      setHistoryIndex(-1);
      return;
    }

    if (resolved) {
      const lines = content.commands[resolved];
      lines.forEach((line) => {
        newHistory.push({ type: 'output', content: line });
      });
    } else {
      newHistory.push({
        type: 'error',
        content: content.notFound(raw),
      });
    }

    setHistory(newHistory);
    setCmdHistory((prev) => [raw, ...prev]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(newIndex);
      setInput(cmdHistory[newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? '' : cmdHistory[newIndex]);
    }
  };

  const getLineStyle = (type: string) => {
    const base = {
      fontFamily: 'SF Mono, Fira Code, Monaco, monospace',
      fontSize: '12px',
      lineHeight: '1.7',
      whiteSpace: 'pre' as const,
    };
    switch (type) {
      case 'input':
        return { ...base, color: '#F4F2ED' };
      case 'output':
        return { ...base, color: 'rgba(244, 242, 237, 0.65)' };
      case 'error':
        return { ...base, color: '#FF7B7B' };
      case 'system':
        return { ...base, color: 'rgba(188, 148, 99, 0.8)' };
      default:
        return { ...base, color: 'rgba(244, 242, 237, 0.5)' };
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        backgroundColor: 'rgba(10, 10, 9, 0.85)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 40px)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'all' : 'none',
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="terminal-window"
        style={{
          width: '100%',
          maxWidth: '680px',
          height: 'min(520px, 80vh)',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal title bar — traffic lights stay LTR */}
        <div
          className="terminal-bar"
          dir="ltr"
          style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}
        >
          {/* Traffic light buttons */}
          <button
            onClick={onClose}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#FF5F57',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            aria-label={content.closeAria}
          />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FEBC2E', flexShrink: 0 }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28C840', flexShrink: 0 }} />

          {/* Title */}
          <div style={{ flex: 1, textAlign: 'center', marginInlineEnd: '40px' }}>
            <span
              style={{
                fontFamily: 'SF Mono, Fira Code, monospace',
                fontSize: '11px',
                color: 'rgba(244, 242, 237, 0.35)',
                letterSpacing: '0.08em',
              }}
            >
              {content.windowTitle}
            </span>
          </div>
        </div>

        {/* Output area */}
        <div
          ref={outputRef}
          className="terminal-output"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 20px 8px',
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, index) => (
            <div key={index} style={getLineStyle(line.type)}>
              {line.type === 'input' ? (
                <span>
                  <span style={{ color: 'var(--accent)' }}>{'> '}</span>
                  {line.content}
                </span>
              ) : (
                line.content
              )}
            </div>
          ))}
        </div>

        {/* Input area */}
        <form
          onSubmit={handleSubmit}
          dir="ltr"
          style={{
            borderTop: '1px solid rgba(244, 242, 237, 0.06)',
            padding: '12px 20px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'SF Mono, Fira Code, monospace',
              fontSize: '12px',
              color: 'var(--accent)',
              flexShrink: 0,
            }}
          >
            {'>'}
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={content.placeholder}
            disabled={!booted}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              fontFamily: 'SF Mono, Fira Code, monospace',
              fontSize: '12px',
              color: '#F4F2ED',
              letterSpacing: '0.02em',
              caretColor: 'var(--accent)',
            }}
          />
          <span
            className="cursor-blink"
            style={{
              display: 'inline-block',
              width: '7px',
              height: '14px',
              backgroundColor: 'var(--accent)',
              opacity: 0.7,
              verticalAlign: 'middle',
            }}
          />
        </form>
      </div>
    </div>
  );
}
