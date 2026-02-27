import React, { useEffect, useState } from 'react';

interface LocalizedTimeProps {
  utcTime: string;
  utcDate: string;
}

const LocalizedTime: React.FC<LocalizedTimeProps> = ({ utcTime, utcDate }) => {
  const [localized, setLocalized] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Convert "YYYY-MM-DD HH:mm:ss" to ISO "YYYY-MM-DDTHH:mm:ssZ"
      const dateStr = utcDate.replace(' ', 'T') + 'Z';
      const date = new Date(dateStr);

      if (isNaN(date.getTime())) return;

      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Don't show if user is already in UTC to avoid redundancy
      if (userTimeZone === 'UTC' || userTimeZone === 'Etc/UTC') return;

      const formatted = new Intl.DateTimeFormat(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      }).format(date);

      setLocalized(formatted);
    } catch (err) {
      console.error('Error localizing time:', err);
    }
  }, [utcDate]);

  return (
    <>
      {utcTime} UTC
      {localized && <span> ({localized})</span>}
    </>
  );
};

export default LocalizedTime;
