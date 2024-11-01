import { isLoggedIn } from '@/api/authService';
import type { Directive, DirectiveBinding } from 'vue';

export const auth: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding<string | Array<string>>) {
        const { value } = binding;

        if (!isLoggedIn()) {
            el.parentNode?.removeChild(el);
        }
    },
};
