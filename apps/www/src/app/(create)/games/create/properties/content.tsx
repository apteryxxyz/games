'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Source } from '@qwaroo/data-sources';
import { useRouter } from 'next/navigation';
import type { ServerActionError } from 'next-sa/client';
import { executeServerAction } from 'next-sa/client';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import ClipLoader from 'react-spinners/ClipLoader';
import z from 'zod';
import { POST_validateProperties } from '../actions';
import { useCreate } from '../context';
import { AlertDialog } from '@/components/AlertDialog';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Form } from '@/components/Form';
import { Input } from '@/components/Input';
import { useToast } from '@/hooks/useToast';

interface ContentProps {
    source: Source.Entity;
}

export default function Content(props: ContentProps) {
    const create = useCreate();
    if (!create?.setSource || !create.setProperties) throw new Error('Missing context');
    if (!create.source && create.setSource) create.setSource(props.source);

    const router = useRouter();
    const { toast } = useToast();
    const [isValidating, setValidating] = useState(false);
    const [isAlertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const propertiesSchema = buildSchema(props.source);
    const propertiesForm = useForm<z.infer<typeof propertiesSchema>>({
        resolver: zodResolver(propertiesSchema),
        defaultValues: create.properties ?? {},
    });

    const onSubmit = useCallback(async () => {
        const properties = propertiesForm.getValues();
        const input = { slug: props.source.slug, properties };

        setValidating(true);
        await executeServerAction(POST_validateProperties, input)
            .then(message => {
                setAlertMessage(message);
                setAlertOpen(true);
            })
            .catch((error: ServerActionError) =>
                toast({
                    title: 'Inputted properties are invalid!',
                    description: error.message,
                    variant: 'destructive',
                })
            )
            .finally(() => setValidating(false));
    }, []);

    return <Card>
        <Card.Header>
            <Card.Title>Choose your source options</Card.Title>
        </Card.Header>

        <Card.Content>
            <Form {...propertiesForm}>
                <form
                    className="flex flex-col gap-6"
                    onSubmit={propertiesForm.handleSubmit(onSubmit)}
                >
                    {Object.entries(props.source.properties).map(([key, value]) => <Form.Field
                        key={key}
                        control={propertiesForm.control}
                        name={key}
                        render={({
                            field,
                        }) => <Form.Item className="space-y-0 flex flex-col lg:flex-row gap-6">
                            <div className="lg:w-1/3">
                                <Form.Label className="block">{value.name}</Form.Label>
                                <Form.Description>
                                    {value.description || 'No description, yet...'}
                                </Form.Description>
                            </div>

                            <div className="flex-grow">
                                <Form.Control>
                                    {/* TODO: Support numbers and booleans */}
                                    <Input type="text" {...field} />
                                </Form.Control>
                                <Form.Message />
                            </div>
                        </Form.Item>}
                    />)}

                    <Button type="submit" disabled={isValidating} className="flex gap-2 ml-auto">
                        {isValidating && <ClipLoader size={16} color="#000" />}
                        Continue
                    </Button>
                </form>
            </Form>

            <AlertDialog open={isAlertOpen} onOpenChange={setAlertOpen}>
                <AlertDialog.Content>
                    <AlertDialog.Header>
                        <AlertDialog.Title>Do you wish to continue?</AlertDialog.Title>
                        {alertMessage && <AlertDialog.Description>
                            {alertMessage}
                        </AlertDialog.Description>}
                    </AlertDialog.Header>

                    <AlertDialog.Footer>
                        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                        <AlertDialog.Action
                            onClick={() => {
                                create.setProperties(propertiesForm.getValues());
                                router.push('/games/create/details');
                            }}
                        >
                            Continue
                        </AlertDialog.Action>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </Card.Content>
    </Card>;
}

// NOTE: Not the biggest fan of this, but it works for now
function buildSchema(source: Source.Entity) {
    const entries = Object.entries(source.properties).map(([key, value]) => {
        let zod: z.ZodTypeAny;

        if (value.type === 'string') {
            let innerZod = z.string();
            if ('minimum' in value && value.minimum !== undefined)
                innerZod = innerZod.min(value.minimum, {
                    message: `Must be at least ${value.minimum} characters`,
                });
            if ('maximum' in value && value.maximum !== undefined)
                innerZod = innerZod.max(value.maximum, {
                    message: `Must be at most ${value.maximum} characters`,
                });
            zod = innerZod;
        }
        //
        else if (value.type === 'number') {
            let innerZod = z.number();
            if ('minimum' in value && value.minimum !== undefined)
                innerZod = innerZod.min(value.minimum, {
                    message: `Must be greater than or equal to ${value.minimum}`,
                });
            if ('maximum' in value && value.maximum !== undefined)
                innerZod = innerZod.max(value.maximum, {
                    message: `Must be less than or equal to ${value.maximum}`,
                });
            zod = innerZod;
        }
        //
        else zod = z.boolean();

        if ('options' in value && value.options !== undefined) {
            const values = value.options.map(option => option.value);
            zod = zod.transform(value => {
                if (value === undefined) return undefined;
                else if (values.includes(value)) return value;
                else throw new Error('Invalid value');
            });
        }

        if (!value.required) zod = zod.optional();

        return [key, zod];
    });

    return z.object(Object.fromEntries(entries));
}