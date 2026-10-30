import { ComponentType } from 'discord-api-types/v10';

import { serializeReply } from '#reply/serializeReply';

import type { ReplyResponse } from '@seedcord/types';
import type {
    APIComponentInContainer,
    APIContainerComponent,
    APIMessageTopLevelComponent
} from 'discord-api-types/v10';

export function firstJson(reply: ReplyResponse): APIMessageTopLevelComponent | undefined {
    return serializeReply(reply, 'test').components[0];
}

export function containerOf(reply: ReplyResponse): APIContainerComponent {
    const json = firstJson(reply);
    if (json?.type !== ComponentType.Container) throw new Error('expected a container');
    return json;
}

export function textLines(container: APIContainerComponent): string[] {
    return container.components.reduce<string[]>((acc, part: APIComponentInContainer) => {
        if (part.type === ComponentType.TextDisplay) acc.push(part.content);
        return acc;
    }, []);
}
