import { Text } from '@/components/typography/Text/text';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface ICountDownProps {
  onReset?: () => void;
  buttonText?: string;
}

export const CountDown = ({ buttonText, onReset }: ICountDownProps) => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    // Function to handle the countdown logic
    const interval = setInterval(() => {
      // Decrease seconds if greater than 0
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      // When seconds reach 0, decrease minutes if greater than 0
      if (seconds === 0) {
        if (minutes === 0) {
          // Stop the countdown when both minutes and seconds are 0
          clearInterval(interval);
        } else {
          // Reset seconds to 59 and decrease minutes by 1
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000); // Run this effect every 1000ms (1 second)

    return () => {
      // Cleanup: stop the interval when the component unmounts
      clearInterval(interval);
    };
  }, [minutes, seconds]); // Re-run this effect whenever 'seconds' changes

  const resetPressed = () => {
    if (onReset) onReset();
    setMinutes(1);
    setSeconds(30);
  };

  return (
    <div className="flex space-x-2 items-center">
      <Button
        onClick={resetPressed}
        size="sm"
        variant="link"
        disabled={minutes > 0 || seconds > 0}
        className="px-0 font-medium"
      >
        {buttonText ? buttonText : 'Resend Code'}
      </Button>
      {minutes > 0 || seconds > 0 ? (
        <Text fontSize="text-sm" textColor="text-grey-300">
          ( {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds})
        </Text>
      ) : null}
    </div>
  );
};
