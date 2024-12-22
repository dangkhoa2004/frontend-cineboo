<template>
<div>
    <div v-show="loadingMessage" class="message">{{ loadingMessage }}</div>
    <canvas ref="canvas" v-show="!loadingMessage"></canvas>
    <div id="output" v-if="outputVisible">
        <div id="outputMessage" v-show="!codeDetected">Không tìm thấy mã QR.</div>
        <div v-show="codeDetected" class="qr-result">
            <b>Dữ liệu:</b> <span>{{ qrData }}</span>
        </div>
    </div>
</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import jsQR from 'jsqr';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
    setup() {
        const loadingMessage = ref('🎥 Không thể truy cập vào luồng video (vui lòng đảm bảo rằng webcam đã được bật)');
        const qrData = ref('');
        const codeDetected = ref(false);
        const outputVisible = ref(false);
        const canvas = ref(null);
        const router = useRouter();

        const drawLine = (canvasContext, begin, end, color) => {
            canvasContext.beginPath();
            canvasContext.moveTo(begin.x, begin.y);
            canvasContext.lineTo(end.x, end.y);
            canvasContext.lineWidth = 4;
            canvasContext.strokeStyle = color;
            canvasContext.stroke();
        };

        const startQRScanner = () => {
            const video = document.createElement('video');
            const canvasElement = canvas.value;
            const canvasContext = canvasElement.getContext('2d');

            navigator.mediaDevices
                .getUserMedia({ video: { facingMode: 'environment' } })
                .then((stream) => {
                    video.srcObject = stream;
                    video.setAttribute('playsinline', true);
                    video.play();

                    const tick = async () => {
                        if (video.readyState === video.HAVE_ENOUGH_DATA) {
                            loadingMessage.value = '';
                            outputVisible.value = true;

                            canvasElement.height = video.videoHeight;
                            canvasElement.width = video.videoWidth;
                            canvasContext.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
                            const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
                            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                                inversionAttempts: 'dontInvert',
                            });

                            if (code) {
                                drawLine(canvasContext, code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58');
                                drawLine(canvasContext, code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58');
                                drawLine(canvasContext, code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58');
                                drawLine(canvasContext, code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58');
                                qrData.value = code.data;
                                codeDetected.value = true;
                            } else {
                                codeDetected.value = false;
                            }
                        }

                        if (!codeDetected.value) {
                            requestAnimationFrame(tick);
                        } else {
                            router.push({ name: 'xac-nhan-in-ve', query: { MaHoaDon: qrData.value } });
                        }
                    };
                    tick();
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Không thể truy cập vào luồng video (vui lòng đảm bảo rằng webcam đã được bật)',
                    });
                });
        };

        onMounted(() => {
            startQRScanner();
        });

        return {
            loadingMessage,
            qrData,
            codeDetected,
            outputVisible,
            canvas,
        };
    },
};
</script>

<style scoped>
body {
    font-family: 'Roboto', sans-serif;
    color: #333;
    max-width: 640px;
    margin: 0 auto;
    position: relative;
    background-color: #f9f9f9;
}

h1 {
    margin: 10px 0;
    font-size: 36px;
    text-align: center;
    color: #4CAF50;
}

.message {
    text-align: center;
    padding: 20px;
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 20px;
    margin-bottom: 20px;
}

canvas {
    display: block;
    margin: 0 auto;
    max-width: 100%;
}

#output {
    margin-top: 20px;
    background: #fff;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.qr-result {
    font-size: 16px;
    color: #333;
    line-height: 1.6;
}

#outputMessage {
    text-align: center;
    color: #f44336;
    font-weight: bold;
}
</style>