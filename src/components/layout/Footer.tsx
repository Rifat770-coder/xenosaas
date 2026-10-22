import Container from "./Container";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import StaggerReveal from "@/components/animations/StaggerReveal";
import { navigation } from "@/data/navigation";
import { services } from "@/data/services";
import { site } from "@/config/site";
import { ArrowUpRight } from "lucide-react";
import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <Container>
        <div className="footer-cta">
          <div>
            <FadeIn distance={20}>
              <div className="eyebrow">
                <span className="tiny-dot" /> YOUR NEXT CHAPTER STARTS HERE
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2>
                Have an idea?
                <br />
                Let’s build something <span>extraordinary.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p>
                Tell us what you’re envisioning. We’ll help bring it to life.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.3}>
            <Button href={site.whatsapp}>Start a project</Button>
          </FadeIn>
        </div>
        <StaggerReveal className="footer-columns">
          <div className="footer-brand">
            <Logo />
            <p>
              Thoughtful design. Intelligent technology.
              <br />
              Meaningful digital experiences.
            </p>
            <span className="footer-location">
              FOR AMBITIOUS BUSINESSES. WITHOUT BOUNDARIES.
            </span>
          </div>
          <div>
            <h3>Explore</h3>
            {navigation.map((n) => (
              <a href={`#${n.id}`} key={n.id}>
                {n.label}
              </a>
            ))}
          </div>
          <div>
            <h3>Our expertise</h3>
            {services.map((s) => (
              <a href="#services" key={s.id}>
                {s.title}
              </a>
            ))}
          </div>
          <div>
            <h3>Let’s connect</h3>
            <a href={site.telephone}>
              {site.phone}
              <ArrowUpRight size={13} />
            </a>
            <a href={site.whatsapp}>
              Chat on WhatsApp
              <ArrowUpRight size={13} />
            </a>
            {site.email ? (
              <a href={`mailto:${site.email}`}>{site.email}</a>
            ) : (
              <span className="config-placeholder">Email · coming soon</span>
            )}
            {site.socials.length ? (
              site.socials.map((s) => (
                <a key={s.label} href={s.url}>
                  {s.label}
                </a>
              ))
            ) : (
              <span className="config-placeholder">
                Social profiles · coming soon
              </span>
            )}
          </div>
        </StaggerReveal>
        <FadeIn className="footer-bottom" delay={0.24}>
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>Made with intention. Built for what’s next.</span>
          <a href="#home">BACK TO TOP ↑</a>
        </FadeIn>
      </Container>
    </footer>
  );
}
