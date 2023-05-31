'use client';

import { LogInIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { SignInDialog } from './SignInDialog';
import { Button } from '@/components/ui/Button';

export function ProfileButton() {
    const session = useSession();

    return <>
        {session.status === 'loading' && <Button>
            <LogInIcon className="inline w-5 h-5 mr-2 fill-secondary" />
            Loading
        </Button>}

        {session.status !== 'loading' && session.data?.user && <Link href="/">
            <Button>
                <UserIcon className="inline w-5 h-5 mr-2 fill-secondary" />
                Profile
            </Button>
        </Link>}

        {session.status !== 'loading' && !session.data?.user && <SignInDialog>
            <Button>
                <LogInIcon className="inline w-5 h-5 mr-2 fill-secondary" />
                Sign in
            </Button>
        </SignInDialog>}
    </>;
}
