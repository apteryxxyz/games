import { Game, User } from '@owenii/database';

export default async () => {
    const user = await User.create({
        displayName: 'Apteryx',
        avatarUrl: 'https://picsum.photos/300/300?random=1',
    });

    await Game.create({
        creatorId: user.id,
        sourceSlug: 'hol.gta-fandom',
        sourceOptions: {
            fandomUrl: 'https://gta.fandom.com/wiki/Weapons_in_GTA_Online',
            shouldCheckImages: true,
        },
        mode: 'higher-or-lower',
        title: 'GTA Online Weapon Prices',
        shortDescription: 'Which GTA Online Weapon is more expensive?',
        longDescription:
            'Can you guess which GTA Online Weapon is more expensive? Find out in this edition of the classic Higher or Lower guessing game!',
        thumbnailUrl:
            'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2019/01/gta-online-lasers.jpg',
        categories: ['Gaming'],
        data: {
            verb: 'costs',
            noun: 'dollars',
            prefix: '$',
            higher: 'More',
            lower: 'Less',
        },
    });

    await Game.create({
        creatorId: user.id,
        sourceSlug: 'hol.gta-fandom',
        sourceOptions: {
            fandomUrl: 'https://gta.fandom.com/wiki/Vehicles_in_GTA_Online',
            shouldCheckImages: true,
        },
        mode: 'higher-or-lower',
        title: 'GTA Online Vehicle Prices',
        shortDescription: 'Which GTA Online Vehicle is more expensive?',
        longDescription:
            'Can you guess which GTA Online Vehicle is more expensive? Find out in this edition of the classic Higher or Lower guessing game!',
        thumbnailUrl:
            'https://d.newsweek.com/en/full/907847/gta-online-deluxo.jpg',
        categories: ['Gaming'],
        data: {
            verb: 'costs',
            noun: 'dollars',
            prefix: '$',
            higher: 'More',
            lower: 'Less',
        },
    });

    await Game.create({
        creatorId: user.id,
        sourceSlug: 'hol.yt-channel',
        sourceOptions: {
            channelIds: ['UCV6mNrW8CrmWtcxWfQXy11g'],
        },
        mode: 'higher-or-lower',
        title: 'DarkViperAU Video Views',
        shortDescription:
            'Which of GTA speedrunner DarkViperAUs videos has more views?',
        longDescription:
            'Can you guess which of GTA speedrunner DarkViperAUs videos has more views? Find out in this edition of the classic Higher or Lower guessing game!',
        thumbnailUrl:
            'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cd5a5964-649b-424c-b83d-6aff2736807c/dec6qdy-29ca9b08-861c-4337-b085-3dab7d836ffa.png/v1/fill/w_1280,h_1280,q_80,strp/darkviperau_fanart_celebrating_500k_subs_by_doragonroudo_dec6qdy-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2NkNWE1OTY0LTY0OWItNDI0Yy1iODNkLTZhZmYyNzM2ODA3Y1wvZGVjNnFkeS0yOWNhOWIwOC04NjFjLTQzMzctYjA4NS0zZGFiN2Q4MzZmZmEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Jr-iHA0_AaomirGEv4Uv2gArcoBGUQM6LvyCR9X4YRM',
        categories: ['Content Creator'],
        data: {
            verb: 'has',
            noun: 'views',
            higher: 'More',
            lower: 'Less',
        },
    });

    await Game.create({
        creatorId: user.id,
        sourceSlug: 'hol.wikipedia',
        sourceOptions: {
            wikipediaUrl:
                'https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population',
            imageSearchQuery: 'pretty photo of {}',
            skipRows: 3,
            displayColumn: 2,
            valueColumn: 3,
        },
        mode: 'higher-or-lower',
        title: 'Countries by Population',
        shortDescription: 'Which country has a larger population?',
        longDescription:
            'Can youo guess which country has a larger population? Find out in this edition of the classic Higher or Lower guessing game!',
        thumbnailUrl:
            'https://images.hindustantimes.com/img/2022/07/11/1600x900/world_population_day_1657518647952_1657518648163.jpg',
        categories: ['Geography'],
        data: {
            verb: 'has',
            noun: 'people',
            higher: 'More',
            lower: 'Less',
        },
    });

    await Game.create({
        creatorId: user.id,
        sourceSlug: 'hol.wikipedia',
        sourceOptions: {
            wikipediaUrl:
                'https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_area',
            imageSearchQuery: 'pretty photo of {}',
            skipRows: 3,
            displayColumn: 2,
            valueColumn: 3,
        },
        mode: 'higher-or-lower',
        title: 'Countries by Land Area',
        shortDescription: 'Which country has a larger land area?',
        longDescription:
            'Can you guess which country has a larger land area? Find out in this edition of the classic Higher or Lower guessing game!',
        thumbnailUrl:
            'https://www.worldatlas.com/r/w1200/upload/4d/54/9c/shutterstock-1037535631-min.jpg',
        categories: ['Geography'],
        data: {
            verb: 'has',
            noun: 'land area',
            suffix: 'km²',
            higher: 'Larger',
            lower: 'Smaller',
        },
    });

    await Game.create({
        creatorId: user.id,
        sourceSlug: 'hol.wikipedia',
        sourceOptions: {
            wikipediaUrl:
                'https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)',
            imageSearchQuery: 'pretty photo of {}',
            skipRows: 3,
            displayColumn: 2,
            valueColumn: 4,
        },
        mode: 'higher-or-lower',
        title: 'Countries by GDP',
        shortDescription: 'Which country has a larger GDP?',
        longDescription:
            'Can you guess which country has a larger GDP? Find out in this edition of the classic Higher or Lower guessing game!',
        thumbnailUrl:
            'https://cloudfront-us-east-2.images.arcpublishing.com/reuters/IPA2VSYNHBKFJE3HXTZKE5NNHI.jpg',
        categories: ['Geography'],
        data: {
            verb: 'has',
            noun: 'GDP',
            prefix: '$',
            suffix: ' million',
            higher: 'Higher',
            lower: 'Lower',
        },
    });
};