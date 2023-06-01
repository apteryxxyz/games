import { AlertCircleIcon } from 'lucide-react';
import { getGame } from './actions';
import { GameCard } from '@/components/game/GameCard';
import { Alert } from '@/components/ui/Alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface PageProps {
    params: { slug: string };
}

export async function generateMetadata({ params: { slug } }: PageProps) {
    const { game } = (await getGame({ slug, recommended: false })) ?? {};
    if (!game)
        return {
            title: 'Game not found',
            description: 'Game not found',
        };

    return {
        title: `${game.title} on Qwaroo`,
        description: game.longDescription,
    };
}

export default async function Page({ params: { slug } }: PageProps) {
    const { game, recommended } = (await getGame({ slug, recommended: true })) ?? {};

    // TODO: Improve the not found handling
    if (!game)
        return <Alert variant="destructive">
            <AlertCircleIcon className="w-5 h-5 mr-2" />
            <Alert.Title>Game was not found</Alert.Title>
            <Alert.Description>"{slug}" is not a valid game slug.</Alert.Description>
        </Alert>;

    return <>
        <h1 className="text-2xl font-bold leading-none tracking-tight pb-6">{game.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 lg:col-span-2 h-fit">
                <Card.Header className="flex-row gap-2 items-center">
                    <Avatar>
                        <AvatarImage src={game.thumbnailUrl} />
                        <AvatarFallback>{game.title.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <Card.Title>{game.title}</Card.Title>
                        <Card.Description>
                            Created by <span className="underline">{game.creator.displayName}</span>
                        </Card.Description>
                    </div>
                </Card.Header>

                <Card.Content>
                    <div className="flex gap-2 flex-wrap">
                        {game.categories.map(category => <Badge key={category}>{category}</Badge>)}
                        <Badge>{game.totalPlays} Plays</Badge>
                    </div>

                    <p className="pt-2">{game.longDescription}</p>
                </Card.Content>
            </Card>

            <section className="col-span-1">
                <h2 className="text-lg font-bold leading-none tracking-tight pb-6">
                    You Might Like
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1">
                    {recommended!.map(game => <GameCard key={game.id} game={game} />)}
                </div>
            </section>
        </div>
    </>;
}