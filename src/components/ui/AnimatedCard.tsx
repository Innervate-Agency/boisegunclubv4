import { motion } from 'framer-motion';
import Card from './Card';

export default function AnimatedCard({
    children,
    className = '',
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className={className} {...props}>
                {children}
            </Card>
        </motion.div>
    );
}
