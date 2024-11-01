<template>
    <section class="movie_checkout_content">
        <div class="header-ticker">
            <p>Cảm ơn bạn đã đặt vé của Cineboo!</p>
        </div>
        <div class="ticket-container">
            <div class="col-1">
                <div class="ticket-info">
                    <p class="status">Xuất vé thành công</p>
                    <h2>Joker: Folie à Deux Điên Có Đôi</h2>
                    <p class="movie-details">138 phút</p>
                    <div class="row-1">
                        <p><span>Ngày:</span> 16/10/2024</p>
                        <p><span>Giờ:</span> 16:20</p>
                        <p><span>Rạp:</span> 6</p>
                    </div>
                    <div class="row-1">
                        <p><span>Vị trí ghế:</span> S13</p>
                        <p><span>Combo:</span> 2</p>
                        <p>Rạp CineBoo Nguyễn Du</p>
                    </div>
                    <p class="address">Tầng 3 TTTM CineBoo Hải Phòng Lê Thánh Tông, Thành phố Hải Phòng</p>
                </div>
            </div>
            <div class="col-1">
                <div class="qr-section">
                    <img src="@/assets/img/qr.png" alt="QR Code">
                    <p>Đưa mã QR cho nhân viên soát vé</p>
                    <div class="ticket-code">
                        <p>Mã vé</p>
                        <span>666155985</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.movie_checkout_content {
    padding: 50px;
}

.header-ticker {
    color: white;
    display: flex;
    gap: 10px;
    background-color: #0abb98;
    padding: 10px;
    border-radius: 8px 8px 0 0px;
    align-items: center;
    text-align: center;
}

.ticket-container {
    justify-content: space-evenly;
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
    background-color: #1e2949;
    color: white;
    border-radius: 0 0 8px 8px;
    padding: 20px;
}

.ticket-info {
    margin-top: 16px;
}

.col-1 .status {
    color: #1abc9c;
    font-size: 16px;
}

.row-1 {
    justify-content: space-between;
    display: flex;
}

.row-1 p {
    padding: 10px;
}

.movie-details {
    color: #ff7675;
}

.ticket-info p {
    font-size: 14px;
    margin: 4px 0;
}

.ticket-info span {
    font-weight: bold;
}

.address {
    color: #b2bec3;
}

.qr-section {
    text-align: center;
    margin-top: 16px;
}

.qr-section img {
    width: 240px;
    height: 240px;
}

.ticket-code {
    margin-top: 8px;
    background-color: #2c3e50;
    padding: 8px;
    border-radius: 8px;
    display: inline-block;
}

.ticket-code span {
    font-size: 18px;
    color: #1abc9c;
    font-weight: bold;
}
</style>