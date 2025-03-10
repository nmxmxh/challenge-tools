import { usePresence } from "framer-motion";

export function useLayoutAnims(inOrOut: "in" | "out") {
  const transition = { type: "spring", stiffness: 500, damping: 60, mass: 1 };
  const [isPresent, safeToRemove] = usePresence();

  const animations = {
    layout: true,
    initial: inOrOut,
    animate: isPresent ? "in" : "out",
    variants: {
      in: { opacity: 1 },
      out: { opacity: 0, zIndex: -1 },
    },
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition,
  };

  return { animations };
}
