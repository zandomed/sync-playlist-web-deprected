import 'react';

declare module 'react' {
  interface DialogHTMLAttributes {
    closedby?: 'any' | 'closerequest';
  }
}
