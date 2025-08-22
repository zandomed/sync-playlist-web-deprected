import { useEffect, useState } from 'react';

export const useAppleDevice = () => {
  const [isAppleDevice, setIsAppleDevice] = useState(false);

  useEffect(() => {
    const detectAppleDevice = () => {
      if (typeof navigator === 'undefined') return false;

      const userAgent = navigator.userAgent.toLowerCase();
      const platform = navigator.platform?.toLowerCase() || '';

      // Check for iOS devices
      const isIOS =
        /iphone|ipad|ipod/.test(userAgent) || /iphone|ipad|ipod/.test(platform);

      // Check for macOS
      const isMacOS =
        /macintosh|macintel|mac os x/.test(userAgent) || /mac/.test(platform);

      // Modern iPad detection (iOS 13+)
      const isModernIPad =
        navigator.maxTouchPoints > 1 &&
        /mac/.test(platform) &&
        'ontouchend' in document;

      return isIOS || isMacOS || isModernIPad;
    };

    setIsAppleDevice(detectAppleDevice());
  }, []);

  return { isAppleDevice };
};
