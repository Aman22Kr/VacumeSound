// Intentionally blank square, reserved for a video thumbnail/link. No third-party embed.
export default function VideoBlank({ label = 'Video placeholder' }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="aspect-square w-full border border-ink/15 bg-sand-deep dark:border-sand/15 dark:bg-ink-soft"
    />
  );
}
