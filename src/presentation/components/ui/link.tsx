import { PropsWithChildren } from 'react';

import NLink, { LinkProps as NLinkProps } from 'next/link';

import { cn } from '@shared/utils';

type LinkProps = NLinkProps &
  PropsWithChildren & {
    href: string;
    className?: string;
  };

function Link({ className, children, ...props }: LinkProps) {
  return (
    <NLink
      type="button"
      className={cn(
        'text-sm text-gray-600 hover:text-gray-800 hover:underline',
        className,
      )}
      {...props}
    >
      {children}
    </NLink>
  );
}

export { Link };
