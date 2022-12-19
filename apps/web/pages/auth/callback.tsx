import { Validate } from '@owenii/common';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Loading } from '#/components/Display/Loading';

export default () => {
    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            const url = new URL(router.asPath, 'http://localhost');
            const id = url.searchParams.get('uid') ?? '';
            const token = url.searchParams.get('token') ?? '';

            if (Validate.ObjectId.test(id) && token) {
                localStorage.setItem('owenii.uid', id);
                localStorage.setItem('owenii.token', token);

                let backTo = localStorage.getItem('owenii.back_to') ?? '/games';
                if (backTo.startsWith('/auth/callback')) backTo = '/games';
                localStorage.removeItem('owenii.back_to');

                router.reload();
                void router.push(backTo);
            } else {
                void router.push('/');
            }
        }
    }, [router.isReady]);

    return <Loading />;
};