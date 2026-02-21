"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial:
      "GatePass cleared our Lagos festival gate in record time. Over 8,000 people checked in, zero fake tickets.",
    by: "Chidera – Festival Director, Lagos Block Party",
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=80",
  },
  {
    tempId: 1,
    testimonial:
      "Before GatePass we used paper lists and wristbands. Now every ticket is a QR code and our entry lanes actually move.",
    by: "Segun – Venue Manager, Abuja Concert Hall",
    imgSrc: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=160&q=80",
  },
  {
    tempId: 2,
    testimonial:
      "The Mobile Scanner app saved my team on show day. Even new volunteers were verifying tickets in minutes.",
    by: "Ini – Head of Operations, Port Harcourt Live",
    imgSrc: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=160&q=80",
  },
  {
    tempId: 3,
    testimonial:
      "GatePass analytics tells me in real time how many people are inside, which gate is busy, and how sales are tracking.",
    by: "Amaka – Event Producer, Mainland Nights",
    imgSrc: "https://images.unsplash.com/photo-1544723795-3fb0b90cff2f?auto=format&fit=crop&w=160&q=80",
  },
  {
    tempId: 4,
    testimonial:
      "We accept both card and crypto without stress. Settlements are clear, and reconciling payouts is finally straightforward.",
    by: "Femi – Finance Lead, AfroTech Expo",
    imgSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80",
  },
  {
    tempId: 5,
    testimonial:
      "Our campus events used to have long queues. With GatePass, students scan and walk in. No more arguments at the gate.",
    by: "Zainab – Student Union Events, UNILAG",
    imgSrc: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=160&q=80",
  },
  {
    tempId: 6,
    testimonial:
      "Vendors love that their staff badges and access are in one system. I can revoke a pass in seconds if there’s an issue.",
    by: "Kunle – Vendor Manager, Street Food Carnival",
    imgSrc: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=160&q=80",
  },
  {
    tempId: 7,
    testimonial:
      "As an attendee, I just open my phone and the QR is there. No printing, no searching email at the gate.",
    by: "Tomi – Regular GatePass attendee, Lagos",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
  },
  {
    tempId: 8,
    testimonial:
      "We run multi-city tours, and GatePass keeps all tickets, scanners, and reports in one place for the entire team.",
    by: "Seyi – Tour Manager, Live in Naija Series",
    imgSrc: "https://images.unsplash.com/photo-1531891570158-e71b35a485bc?auto=format&fit=crop&w=160&q=80",
  },
  {
    tempId: 9,
    testimonial:
      "GatePass feels built for African events. It respects how we sell, scan, and settle, without forcing a foreign process.",
    by: "Ngozi – Founder, City Lights Entertainment",
    imgSrc: "https://images.unsplash.com/photo-1525130413817-d45c1d127c42?auto=format&fit=crop&w=160&q=80",
  },
] as const;

type Testimonial = (typeof testimonials)[number];

interface TestimonialCardProps {
  position: number;
  testimonial: Testimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;
  const depth = Math.abs(position);
  const scale = 1 - Math.min(depth / SQRT_5000 + depth * 0.05, 0.25);

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 sm:p-8 transition-all duration-500 ease-in-out rounded-3xl bg-background/80 backdrop-blur",
        isCenter
          ? "z-10 bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/30"
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath:
          "polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)",
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
          scale(${scale})
        `,
        boxShadow: isCenter
          ? "0px 18px 40px rgba(15, 23, 42, 0.8)"
          : "0px 8px 22px rgba(15, 23, 42, 0.5)",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          top: 0,
          right: "56px",
          width: "46px",
          height: "46px",
        }}
      />
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full overflow-hidden border border-border bg-background/80">
            <img
              src={testimonial.imgSrc}
              alt={testimonial.by}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-sm font-medium leading-tight">
            <p className="text-xs uppercase tracking-wide opacity-70">
              Testimonial
            </p>
            <p>{testimonial.by}</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed">{testimonial.testimonial}</p>
      </div>
    </div>
  );
};

export function StaggerTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardSize, setCardSize] = useState(320);

  useEffect(() => {
    const resize = () => {
      const w = window.innerWidth;
      if (w < 640) setCardSize(260);
      else if (w < 1024) setCardSize(300);
      else setCardSize(340);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const handleMove = (steps: number) => {
    setActiveIndex((prev) => {
      const len = testimonials.length;
      return (prev + steps + len) % len;
    });
  };

  const visible = testimonials
    .map((t, index) => {
      let pos = index - activeIndex;
      const half = testimonials.length / 2;
      if (pos > half) pos -= testimonials.length;
      if (pos < -half) pos += testimonials.length;
      return { t, pos };
    })
    .filter(({ pos }) => Math.abs(pos) <= 2);

  return (
    <div className="w-full">
      <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-center py-8 sm:py-12">
        <div className="relative w-full h-[360px] sm:h-[420px]">
          {visible.map(({ t, pos }) => (
            <TestimonialCard
              key={t.tempId}
              position={pos}
              testimonial={t}
              handleMove={handleMove}
              cardSize={cardSize}
            />
          ))}
        </div>
        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => handleMove(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground hover:bg-background"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => handleMove(1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground hover:bg-background"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
