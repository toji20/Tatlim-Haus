import { Minus, Plus } from 'lucide-react';
import { CountButtonProps } from './count-button';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface IconButtonProps {
  size?: CountButtonProps['size'];
  disabled?: boolean;
  type?: 'plus' | 'minus';
  onClick?: () => void;
}

export const CountIconButton: React.FC<IconButtonProps> = ({
  size = 'sm',
  disabled,
  type,
  onClick,
}) => {
  return (
    <Button
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={cn(
        'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400',
        size === 'sm' ? 'w-[17px] h-[17px] rounded-[100%]' : 'w-[38px] h-[38px] rounded-md',
      )}>
      {type === 'plus' ? (
        <Plus className={size === 'sm' ? 'h-3' : 'h-4'} />
      ) : (
        <Minus className={size === 'sm' ? 'h-3' : 'h-4'} />
      )}
    </Button>
  );
};
