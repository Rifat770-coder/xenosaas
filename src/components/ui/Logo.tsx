export default function Logo() {
  return (
    <a className="logo" href="#home" aria-label="XenoSaas home">
      <svg
        width="30"
        height="32"
        viewBox="0 0 30 32"
        fill="none"
        aria-hidden="true"
      >
        <path d="M2 3h9l17 26h-9L2 3Z" fill="currentColor" />
        <path
          d="m20 3-6 9 5 7L29 3h-9ZM10 29l6-9-5-7L1 29h9Z"
          fill="currentColor"
        />
      </svg>
      <span>
        Xeno<span className="logo-light">Saas</span>
        <span className="logo-dot">.</span>
      </span>
    </a>
  );
}
