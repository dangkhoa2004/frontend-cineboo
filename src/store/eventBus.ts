import { reactive } from 'vue';

interface EventBusEvents {
    [key: string]: (...args: any[]) => void;
}

const EventBus = reactive<{
    events: EventBusEvents;
}>({
    events: {}
});

export default EventBus;