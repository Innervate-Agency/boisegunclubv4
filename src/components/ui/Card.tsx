export default function Card({
    children,
    className = '',
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
}) {
    return (
        <div
            className={`bg-kent-slate-gray border border-don-gray/10 rounded-lg p-6 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}