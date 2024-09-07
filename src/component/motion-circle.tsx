"use client"

import { motion } from "framer-motion"

const IconCircle = () => {
  return (
    <motion.svg
      className="z-1 absolute left-0 top-0"
      width="80"
      height="80"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "50% 50%" }}
    >
      <motion.rect
        x="2"
        y="2"
        width="96"
        height="96"
        rx="48"
        stroke="#0090FF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="15 15"
      />
    </motion.svg>
  )
}

export { IconCircle }
