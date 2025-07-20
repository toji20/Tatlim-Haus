import { useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui/button';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';
import '@/styles/header.css';


interface Props {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <Button onClick={onClickSignIn} variant="outline" className="auth-btn flex items-center gap-1">
          <User size={16} className='auth-btn-svg'/>
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="auth-btn flex items-center gap-2">
            <CircleUser size={18} className='auth-btn-svg'/>
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
