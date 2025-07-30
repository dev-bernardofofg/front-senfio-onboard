import { AnimatePresence, easeOut, motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggeredFadeProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  initialDelay?: number;
  variant?: "default" | "wrapper" | "page" | "slide-up" | "slide-down" | "scale" | "cards" | "content" | "contentWithPagination";
  isLoading?: boolean;
  loadingContent?: ReactNode;
}

const variants = {
  default: {
    containerClass: "",
    initial: { opacity: 0, y: -4 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: easeOut }
  },
  wrapper: {
    containerClass: "overflow-hidden",
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: easeOut }
  },
  page: {
    containerClass: "overflow-hidden max-h-[calc(100dvh-1rem)] h-screen p-3 bg-card rounded-lg border border-border",
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: easeOut }
  },
  content: {
    containerClass: "overflow-y-auto max-h-[calc(100dvh-6rem)] h-screen",
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: easeOut }
  },
  contentWithPagination: {
    containerClass: "overflow-y-auto max-h-[calc(100dvh-13rem)] h-fit",
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: easeOut }
  },
  "slide-up": {
    containerClass: "overflow-hidden",
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: easeOut }
  },
  "slide-down": {
    containerClass: "overflow-hidden",
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: easeOut }
  },
  scale: {
    containerClass: "",
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: easeOut }
  },
  cards: {
    containerClass: "contents",
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: easeOut }
  }
};

export const StaggeredFade = ({
  children,
  className = "",
  staggerDelay = 0.2,
  duration,
  initialDelay = 0.1,
  variant = "default",
  isLoading,
  loadingContent
}: StaggeredFadeProps) => {
  const selectedVariant = variants[variant];
  const finalDuration = duration || selectedVariant.transition.duration;
  const containerClassName = `${className} ${selectedVariant.containerClass}`.trim();

  // Variante especial para cards com loading
  if (variant === "cards") {
    return (
      <div className={containerClassName}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="contents"
            >
              {Array.isArray(loadingContent) ? (
                loadingContent.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    {item}
                  </motion.div>
                ))
              ) : (
                loadingContent
              )}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="contents"
            >
              {Array.isArray(children) ? (
                children.map((child, index) => (
                  <motion.div
                    key={index}
                    initial={selectedVariant.initial}
                    animate={selectedVariant.animate}
                    transition={{
                      ...selectedVariant.transition,
                      duration: finalDuration,
                      delay: initialDelay + (index * staggerDelay)
                    }}
                  >
                    {child}
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={selectedVariant.initial}
                  animate={selectedVariant.animate}
                  transition={{
                    ...selectedVariant.transition,
                    duration: finalDuration,
                    delay: initialDelay
                  }}
                >
                  {children}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div
            key={index}
            initial={selectedVariant.initial}
            animate={selectedVariant.animate}
            transition={{
              ...selectedVariant.transition,
              duration: finalDuration,
              delay: initialDelay + (index * staggerDelay)
            }}
            className="w-full"
          >
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div
          initial={selectedVariant.initial}
          animate={selectedVariant.animate}
          transition={{
            ...selectedVariant.transition,
            duration: finalDuration,
            delay: initialDelay
          }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}; 