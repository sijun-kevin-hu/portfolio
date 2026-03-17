export const EASE_OUT_EXPO = [0.2, 0.88, 0.23, 1];

export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.12
        }
    }
};

export const itemVariants = {
    hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.62,
            ease: EASE_OUT_EXPO
        }
    }
};
