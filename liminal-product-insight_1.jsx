import React, { useEffect, useRef, useState } from "react";

const FONT_IMPORT = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,900&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
`;

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

function Story({ place, dates, text, dotColor }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        paddingLeft: "36px",
        paddingBottom: "48px",
        borderLeft: "2px solid #d6d3d1",
        transition: "opacity 700ms ease-out, transform 700ms ease-out",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "-9px",
          top: "6px",
          width: "16px",
          height: "16px",
          borderRadius: "9999px",
          border: "2px solid #fafaf9",
          backgroundColor: dotColor,
        }}
      />
      <h3
        className="text-xl sm:text-2xl text-stone-900 mb-1"
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
      >
        {place}
      </h3>
      <p
        className="text-xs text-stone-500 mb-3"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {dates}
      </p>
      <p className="text-base leading-relaxed text-stone-800 max-w-xl">
        {text}
      </p>
    </div>
  );
}

export default function ProductInsight() {
  return (
    <div
      className="w-full min-h-screen bg-stone-50 text-stone-900"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{FONT_IMPORT}</style>

      {/* Header */}
      <div className="max-w-2xl mx-auto px-6 sm:px-10 pt-14 pb-8">
        <p
          className="text-xs text-stone-500 mb-6"
          style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.2em" }}
        >
          SINDHU YAMSANI
        </p>
        <h1
          className="text-3xl sm:text-4xl leading-tight text-stone-900"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}
        >
          The part of this job I think is hardest isn&rsquo;t the research or
          the roadmaps.
        </h1>
        <h1
          className="text-3xl sm:text-4xl leading-tight text-red-900 mt-1"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}
        >
          It&rsquo;s telling a founder who&rsquo;s already had a huge exit
          that they&rsquo;re wrong, and getting them to actually hear it.
        </h1>
      </div>

      {/* Argument */}
      <div className="max-w-2xl mx-auto px-6 sm:px-10 pb-10">
        <p className="text-base leading-relaxed text-stone-700 max-w-xl">
          Nobody hands a first-year apprentice that kind of credibility. I
          don&rsquo;t think it&rsquo;s earned by being confident either.
          It&rsquo;s earned by what you put on the table before you say what
          you think. I&rsquo;ve had to do this twice already, in rooms with a
          lot more on the line for me than a startup apprenticeship.
        </p>
      </div>

      {/* Stories */}
      <div className="max-w-2xl mx-auto px-6 sm:px-10 pb-14">
        <Story
          place="Johns Hopkins Hospital"
          dates="Aug&ndash;Oct 2025"
          text={
            <>
              I was a grad student telling surgeons how to run their OR.
              Nobody in that room owed me anything. So before I said a word
              about what should change, I put 20+ interviews and the actual
              turnover numbers on the table, a 33% cut, roughly 200 more
              surgeries a year, and let people argue with the data instead of
              with me.
            </>
          }
          dotColor="#a8a29e"
        />
        <Story
          place="Checkpoint Surgical"
          dates="Oct&ndash;Dec 2025"
          text={
            <>
              I had to tell clinical and commercial teams whether to
              greenlight a new market for a medical device. Same approach:
              11+ interviews synthesized into what was actually stopping
              adoption, before I said go or no-go.
            </>
          }
          dotColor="#57534e"
        />
        <Story
          place="Liminal"
          dates="what I'd bring"
          text={
            <>
              I&rsquo;d use the same approach with a founder. Bring what I
              found first, then say what I think. Let them argue with the
              evidence, not with me.
            </>
          }
          dotColor="#7f1d1d"
        />
      </div>

      {/* Example */}
      <div className="max-w-2xl mx-auto px-6 sm:px-10 pb-16">
        <p className="text-base leading-relaxed text-stone-700 max-w-xl mb-6">
          Concretely, that's the difference between saying:
        </p>
        <p className="text-lg text-stone-500 italic max-w-xl mb-4">
          &ldquo;I think we should cut this feature.&rdquo;
        </p>
        <p className="text-lg text-stone-900 max-w-xl">
          and saying: &ldquo;8 of 11 people I talked to pointed at a different
          problem, not this one. Here's what they said.&rdquo;
        </p>
        <p className="text-base leading-relaxed text-stone-700 max-w-xl mt-6">
          The first one asks someone to trust my taste. The second one just
          asks them to look at what I looked at.
        </p>
      </div>
    </div>
  );
}
