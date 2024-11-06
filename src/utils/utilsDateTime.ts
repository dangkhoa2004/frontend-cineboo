export const formatDate = (date: string | Date): string => {
    return new Date(date).toLocaleDateString("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit" });
  };
  
  export const formatTime = (date: string | Date): string => {
    const time = new Date(date);
    return `${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`;
  };
  
  export const getDayOfWeek = (date: string | Date): string => {
    const dayNames = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    return dayNames[new Date(date).getDay()];
  };
  