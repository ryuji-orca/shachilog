const shimmer = (w?: number | `${number}`, h?: number | `${number}`) => {
  return `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#15192d" offset="20%" />
      <stop stop-color="#131620" offset="50%" />
      <stop stop-color="#15192d" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#15192d" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`
}

const toBase64 = (str: string) => {
  return typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str)
}

export { shimmer, toBase64 }
