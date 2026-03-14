'use client';

// Device mockup colors — these represent physical hardware, not UI tokens
const FRAME_COLOR = '#595959';
const GLASS_COLOR = '#080808';

export default function PhoneFrame({ children }) {
  return (
    <div className="relative" style={{ width: 450, aspectRatio: '450 / 960' }}>
      {/* Metal frame */}
      <div
        className="absolute inset-0 rounded-[76px]"
        style={{ backgroundColor: FRAME_COLOR }}
      />

      {/* Glass panel */}
      <div
        className="absolute rounded-[70px]"
        style={{
          backgroundColor: GLASS_COLOR,
          inset: '0.73% 1.55%',
        }}
      />

      {/* Screen area — clips children into the display region */}
      <div
        className="absolute overflow-clip rounded-[57px] flex flex-col"
        style={{ inset: '2.07% 4.42%' }}
      >
        {children}
      </div>

      {/* Camera dot */}
      <div
        className="absolute pointer-events-none"
        style={{ inset: '4.05% 46.68% 92.84% 46.68%' }}
      >
        <img
          alt=""
          className="absolute block max-w-none size-full"
          src="/3a8f47656b4dc77d6d25ca6dc2559633d4620809.svg"
        />
      </div>
    </div>
  );
}
