import { defineStore } from 'pinia';

export const useAboutSectionStore = defineStore('aboutSection', {
    state: () => ({
        isHidden: false,
        imageSrc: 'https://cdn.galaxycine.vn/media/2024/11/7/kraven-the-hunter-500_1730972945631.jpg',
        imageAlt: 'Joker Image',
        title: localStorage.getItem('title') || 'PHIM HOT',
        tagline: localStorage.getItem('tagline') || 'Kraven - Thợ Săn Thủ Lĩnh',
        description:
            localStorage.getItem('description') ||
            'Kraven the Hunter là câu chuyện đầy khốc liệt và hoành tráng về sự hình thành của một trong những phản diện biểu tượng nhất của Marvel - kẻ thù truyền kiếp của Spiderman. Aaron Taylor-Johnson đảm nhận vai Kraven, một người đàn ông có người cha mafia vô cùng tàn nhẫn, Nikolai Kravinoff (Russell Crowe) - người đã đưa anh vào con đường báo thù với những hệ quả tàn khốc. Điều này thúc đẩy anh không chỉ trở thành thợ săn vĩ đại nhất thế giới, mà còn là một trong những nhân vật đáng sợ nhất.',
        buttonText: 'Xem Thêm',
        buttonLink: '/phim/joker-2024',
        customClass: '',
    }),

    actions: {
        updateTitle(newTitle: string) {
            console.log('Updating title:', newTitle); // Debug log
            this.title = newTitle;
            localStorage.setItem('title', newTitle); // Save to localStorage
        },
        updateTagline(newTagline: string) {
            console.log('Updating tagline:', newTagline); // Debug log
            this.tagline = newTagline;
            localStorage.setItem('tagline', newTagline); // Save to localStorage
        },
        updateDescription(newDescription: string) {
            console.log('Updating description:', newDescription); // Debug log
            this.description = newDescription;
            localStorage.setItem('description', newDescription); // Save to localStorage
        },
        toggleVisibility() {
            this.isHidden = !this.isHidden;
        },
    },
});
// aboutSectionStore.ts