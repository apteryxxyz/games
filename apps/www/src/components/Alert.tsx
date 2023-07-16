import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/utilities/styling';

const alertVariants = cva(
    'relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11',
    {
        variants: {
            variant: {
                default: 'bg-background text-foreground',
                destructive:
                    'text-destructive border-destructive/50 dark:border-destructive dark:border-3 [&>svg]:text-destructive text-destructive dark:font-semibold',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const AlertRoot = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
/>);
AlertRoot.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => <h5
        ref={ref}
        className={cn('mb-1 font-medium dark:font-bold leading-none tracking-tight', className)}
        {...props}
    />
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
/>);
AlertDescription.displayName = 'AlertDescription';

export const Alert = Object.assign(AlertRoot, {
    Title: AlertTitle,
    Description: AlertDescription,
});

export { AlertRoot, AlertTitle, AlertDescription };