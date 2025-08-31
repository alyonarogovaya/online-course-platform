function Spinner() {
  return (
    <span role="status" aria-label="Loading" className="inline-block">
      <svg
        className="animate-spin text-blue-600 block"
        style={{ width: "40px", height: "40px", animationDuration: "1.5s" }}
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="false"
        focusable="false"
      >
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="5" strokeOpacity="0.15" />
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="90 150"
        />
      </svg>
    </span>
  );
};


export default Spinner;