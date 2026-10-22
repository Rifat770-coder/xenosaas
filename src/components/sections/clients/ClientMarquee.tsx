"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import { Pause, Play } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { clients, type Client } from "@/data/clients";
import styles from "./ClientMarquee.module.css";

function Logo({ client, index }: { client: Client; index: number }) {
  return <>
    {client.logo ? <Image className={styles.logoImage} src={client.logo} alt={`${client.name} logo`} width={140} height={40} /> :
      <svg className={styles.mark} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        {index % 4 === 0 && <><path d="m8 10 12 20 12-20M8 30l12-20 12 20" /><path d="M12 20h16" /></>}
        {index % 4 === 1 && <><rect x="8" y="8" width="24" height="24" rx="7" transform="rotate(12 20 20)" /><path d="m15 21 5-8 5 8-5 7-5-7Z" /></>}
        {index % 4 === 2 && <><path d="m8 25 8-10 8 10 8-10M8 31h24" /><circle cx="28" cy="9" r="3" /></>}
        {index % 4 === 3 && <><ellipse cx="20" cy="20" rx="15" ry="7" transform="rotate(-35 20 20)" /><ellipse cx="20" cy="20" rx="15" ry="7" transform="rotate(35 20 20)" /><circle cx="20" cy="20" r="3" /></>}
      </svg>}
    <span className={styles.clientName}>{client.name}</span>
    {client.category && <small>{client.category}</small>}
    {client.isPlaceholder && <span className={styles.demo}>DEMO</span>}
  </>;
}

export default function ClientMarquee() {
  const scope = useRef<HTMLDivElement>(null);
  const active = useInView(scope, { amount: .05 });
  const [paused, setPaused] = useState(false);
  return <div ref={scope} className={styles.marquee} data-active={active} data-paused={paused}>
    <div className={styles.controls}>
      <span><i /> PARTNERSHIPS, IN MOTION</span>
      <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play logo animation" : "Pause logo animation"} aria-pressed={paused}>
        {paused ? <Play size={13} /> : <Pause size={13} />}<span>{paused ? "Play" : "Pause"}</span>
      </button>
    </div>
    {[0, 1].map(row => {
      const ordered = row === 0 ? clients : [...clients].reverse();
      // Eight cards per group exceed the site's widest container. Each group
      // includes its trailing gap, so half of the two-group track is exact.
      const sequence = [...ordered, ...ordered];
      return <ScrollReveal key={row} distance={16} delay={.1 + row * .14}>
        <div className={styles.viewport} role="region" aria-label={`Demonstration client logos, row ${row + 1}`} tabIndex={0}>
          <div className={`${styles.track} ${row === 1 ? styles.reverse : ""}`}>
            {[0, 1].map(copy => <div className={styles.group} key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {sequence.map((client, index) => {
                const duplicate = copy === 1 || index >= ordered.length;
                const content = <Logo client={client} index={clients.findIndex(item => item.id === client.id)} />;
                const props = { className: styles.card, "data-repeat": index >= ordered.length, "aria-hidden": duplicate ? true as const : undefined };
                return client.website ? <a {...props} key={`${client.id}-${index}`} href={client.website} tabIndex={duplicate ? -1 : undefined}>{content}</a> : <div {...props} key={`${client.id}-${index}`}>{content}</div>;
              })}
            </div>)}
          </div>
        </div>
      </ScrollReveal>;
    })}
  </div>;
}
