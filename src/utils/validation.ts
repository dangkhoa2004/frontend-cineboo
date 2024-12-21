// utils/validation.ts
export function validateUsername(username: string): string | null {
    if (!username) return 'Tên người dùng là bắt buộc.';
    if (username.length < 3) return 'Tên người dùng phải có ít nhất 3 ký tự.';
    return null;
}

export function validatePassword(password: string): string | null {
    if (!password) return 'Mật khẩu là bắt buộc.';
    if (password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự.';
    return null;
}

export function validateEmail(email: string): string | null {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email là bắt buộc.';
    if (!regex.test(email)) return 'Email không hợp lệ.';
    return null;
}

export function validatePhoneNumber(phoneNumber: string): string | null {
    const regex = /^\d{10,11}$/;
    if (!phoneNumber) return 'Số điện thoại là bắt buộc.';
    if (!regex.test(phoneNumber)) return 'Số điện thoại không hợp lệ.';
    return null;
}

export function validateRequiredField(field: string | null | undefined, fieldName: string): string | null {
    if (!field) return `${fieldName} là bắt buộc.`;
    return null;
}

export function validateDate(date: string): string | null {
    if (!date) return 'Ngày sinh là bắt buộc.';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return 'Ngày sinh không hợp lệ.';
    const currentDate = new Date();
    if (parsedDate > currentDate) return 'Ngày sinh không được vượt quá ngày hiện tại.';
    return null;
}

export function validateNumber(value: number, min: number, max: number): string | null {
    if (value < min || value > max) {
        return `Giá trị phải nằm trong khoảng từ ${min} đến ${max}.`;
    }
    return null;
}

export function validateUrl(url: string): string | null {
    const regex = /^(http|https):\/\/[^ "]+$/;
    return regex.test(url) ? null : 'Đường dẫn không hợp lệ.';
}

export function validateMovieTitle(title: string): string | null {
    return validateRequiredField(title, 'Tên phim') || (title.length < 3 ? 'Tên phim phải có ít nhất 3 ký tự.' : null);
}

export function validateMovieImage(image: string): string | null {
    return validateUrl(image) || validateRequiredField(image, 'Ảnh phim');
}

export function validateActors(actors: string): string | null {
    return validateRequiredField(actors, 'Diễn viên');
}

export function validateReleaseYear(year: number): string | null {
    if (!year || isNaN(year)) return 'Năm phát hành là bắt buộc.';
    const currentYear = new Date().getFullYear();
    if (year < currentYear) return 'Năm phát hành không được nhỏ hơn năm hiện tại.';
    return null;
}

export function validateDescription(description: string): string | null {
    return validateRequiredField(description, 'Nội dung mô tả');
}

export function validateTrailer(trailer: string): string | null {
    return validateUrl(trailer) || validateRequiredField(trailer, 'Trailer');
}

export function validateReleaseDate(releaseDate: string): string | null {
    return validateDate(releaseDate) || (new Date(releaseDate) > new Date() ? 'Ngày ra mắt không được vượt quá ngày hiện tại.' : null);
}

export function validateDuration(duration: number): string | null {
    return duration && duration > 0 ? null : 'Thời lượng phải là một số dương.';
}

export function validateCountry(country: string): string | null {
    return validateRequiredField(country, 'Quốc gia');
}

export function validateContent(content: string): string | null {
    return validateRequiredField(content, 'Nội dung');
}

export function validateRating(rating: number): string | null {
    return rating >= 1 && rating <= 10 ? null : 'Điểm đánh giá phải từ 1 đến 10.';
}

export function validateGenres(genres: string[]): string | null {
    return genres.length > 0 ? null : 'Vui lòng chọn ít nhất một thể loại phim.';
}

export function validateAgeLimit(ageLimit: string | null): string | null {
    return ageLimit ? null : 'Vui lòng chọn độ tuổi phim.';
}