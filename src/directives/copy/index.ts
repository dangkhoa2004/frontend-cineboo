import { DirectiveBinding } from 'vue';

const copyTextDirective = {
  beforeMount(el: HTMLElement) {
    el.addEventListener('dblclick', () => {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(el);
      selection?.removeAllRanges();
      selection?.addRange(range);

      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'Sao chép' : 'Sao chép thất bại';
        console.log(msg);
      } catch (err) {
        console.error('Unable to copy', err);
      }

      selection?.removeAllRanges();
    });
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener('dblclick', () => { });
  }
};

export default copyTextDirective;

/* thêm v-copy-text để sử dụng */