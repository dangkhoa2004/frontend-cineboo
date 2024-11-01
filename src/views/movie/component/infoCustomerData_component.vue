<template>
    <div class="movie_checkout_container">
        <div class="movie_checkout_payment">
            <div class="movie_checkout_payment__title">
                PHƯƠNG THỨC THANH TOÁN
            </div>
            <div class="movie_checkout_payment__types">
                <div class="movie_checkout_payment__type movie_checkout_payment__type--cc active">
                    QR CODE
                </div>
                <div class="movie_checkout_payment__type movie_checkout_payment__type--paypal">
                    VISA
                </div>
                <div class="movie_checkout_payment__type movie_checkout_payment__type--sepa">
                    MOMO
                </div>
                <div class="movie_checkout_payment__type movie_checkout_payment__type--invoice">
                    ZALO PAY
                </div>
            </div>
            <div class="movie_checkout_payment__info">
                <div class="movie_checkout_payment__cc">
                    <div class="movie_checkout_payment__title">
                        THÔNG TIN KHÁCH HÀNG
                    </div>
                    <form>
                        <div class="movie_checkout_form">
                            <div class="movie_checkout_row">
                                <div class="movie_checkout_field">
                                    <div class="movie_checkout_title">Tên khách hàng</div>
                                    <input type="text" class="movie_checkout_input" value="Cao Đăng Khoa"
                                        name="username" id="username" autocomplete="username" />
                                </div>
                                <div class="movie_checkout_field">
                                    <div class="movie_checkout_title">Email khách hàng</div>
                                    <input type="email" class="movie_checkout_input" value="khoacdpp02847@fpt.edu.vn"
                                        name="email" id="email" autocomplete="email" />
                                </div>
                                <div class="movie_checkout_field">
                                    <div class="movie_checkout_title">Số điện thoại</div>
                                    <input type="tel" class="movie_checkout_input" value="0869938981"
                                        name="phone_number" id="phone_number" autocomplete="tel" />
                                </div>
                            </div>
                            <div class="movie_checkout_row">
                                <div class="movie_checkout_field">
                                    <div class="movie_checkout_title">Địa chỉ</div>
                                    <input type="text" class="movie_checkout_input"
                                        value="Số Nhà 4B66, Ngõ 296 Ngô Gia Tự, Phường Cát Bi, Quận Hải An, Hải Phòng"
                                        name="address" id="address" autocomplete="address-line1" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>