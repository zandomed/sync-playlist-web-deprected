import { ComponentProps, useMemo, useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: ComponentProps<'input'>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordInput = useMemo(() => type === 'password', [type]);

  return (
    <div className="relative">
      <input
        type={isPasswordInput && showPassword ? 'text' : type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'h-12 placeholder:text-gray-400',
          { 'pr-12': isPasswordInput },
          className,
        )}
        {...props}
      />
      {isPasswordInput && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-400 transition-colors duration-200 hover:text-gray-600"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  );
}

export { Input };
