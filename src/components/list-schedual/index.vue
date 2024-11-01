<template>
    <div class="schedual-list-calendar">
        <div class="schedual-list-date-display">
            <div class="schedual-list-day">{{ dayNumber }}</div>
            <div class="schedual-list-details">
                <div class="schedual-list-weekday">{{ weekdayName }}</div>
                <div class="schedual-list-month-year">{{ monthYear }}</div>
            </div>
        </div>
        <div class="schedual-list-see-month">
            <h3>Lịch tháng</h3>
            <a href="#">Xem tất cả</a>
        </div>
        <hr class="schedual-list-split-date">
        <div class="schedual-list-calendar-days">
            <ul>
                <li v-for="(day, index) in daysAround" :key="index"
                    :class="{ today: day.isToday, active: index === 3 }">
                    {{ day.short }}<br>{{ day.date }}
                </li>
            </ul>
        </div>
        <div class="schedual-list-container">
            <div class="schedual-list-header">
                <h2>Thời gian</h2>
                <button class="schedual-list-sort-btn">
                    <i class="fas fa-sort"></i>
                </button>
            </div>
            <div class="schedual-list-timeline">
                <div class="schedual-list-timeline-item">
                    <div class="schedual-list-time">
                        8:15<br>9:30
                    </div>
                    <div class="schedual-list-event-card schedual-list-orange">
                        <div class="schedual-list-event-header">
                            <h4>Họp kiểm thử IT</h4>
                            <span class="schedual-list-event-type">Cuộc họp</span>
                        </div>
                        <div class="schedual-list-event-details">
                            <p class="schedual-list-location">
                                <i class="fas fa-location-dot"></i> Văn phòng IT
                            </p>
                            <p class="schedual-list-person">
                                <img class="schedual-list-avatar" src="@/assets/img/avt.jpg" alt="Đăng Khoa" />
                                Đăng Khoa
                            </p>
                        </div>
                    </div>
                </div>
                <div class="schedual-list-timeline-item">
                    <div class="schedual-list-time">
                        13:15<br>14:45
                    </div>
                    <div class="schedual-list-event-card schedual-list-grey">
                        <div class="schedual-list-event-header">
                            <h4>Traning Intern</h4>
                            <span class="schedual-list-event-type">Đào tạo</span>
                        </div>
                        <div class="schedual-list-event-details">
                            <p class="schedual-list-location">
                                <i class="fas fa-location-dot"></i> Văn phòng chính
                            </p>
                            <p class="schedual-list-person">
                                <img class="schedual-list-avatar" src="@/assets/img/avt.jpg" alt="Hữu Trần" />
                                Hữu Trần
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        const now = new Date();

        return {
            now,
            dayNumber: now.getDate(),
            weekdayName: this.getWeekdayName(now.getDay()),
            monthYear: this.getMonthYear(now),
            daysAround: this.getDaysAround(now),
        };
    },
    methods: {
        getWeekdayName(dayIndex) {
            const weekdays = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
            return weekdays[dayIndex];
        },
        getMonthYear(date) {
            const months = [
                "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
                "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
            ];
            return `${months[date.getMonth()]} ${date.getFullYear()}`;
        },
        getDaysAround(now) {
            const daysOfWeek = [
                "Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"
            ];
            const shortDays = ["Su", "M", "Tue", "Wed", "Th", "Fr", "Sa"];
            const daysAround = [];

            for (let i = -3; i <= 3; i++) {
                const newDate = new Date(now);
                newDate.setDate(now.getDate() + i);

                const dayObj = {
                    short: shortDays[newDate.getDay()],
                    date: newDate.getDate(),
                    isToday: i === 0
                };

                daysAround.push(dayObj);
            }

            return daysAround;
        }
    }
};
</script>

<style src="./assets/styles.css" scoped></style>