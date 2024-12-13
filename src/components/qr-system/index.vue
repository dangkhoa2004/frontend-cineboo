<template>
<div>
    <div id="loadingMessage">{{ loadingMessage }}</div>
    <canvas ref="canvas" hidden></canvas>
    <div id="output" v-if="outputVisible">
        <div id="outputMessage" v-show="!codeDetected">No QR code detected.</div>
        <div v-show="codeDetected">
            <b>Data:</b> <span>{{ qrData }}</span>
        </div>
    </div>
</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import jsQR from 'jsqr';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const loadingMessage = ref('🎥 Unable to access video stream (please make sure you have a webcam enabled)');
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
                            canvasElement.hidden = false;
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
                                console.log(qrData.value);
                                codeDetected.value = true;
                            } else {
                                codeDetected.value = false;
                            }
                        }

                        if (!codeDetected.value) {
                            requestAnimationFrame(tick);
                        } else {
                            router.push({ name: 'print-ticket-confirm', query: { MaHoaDon: qrData.value } });
                        }
                    };
                    tick();
                })
                .catch((err) => {
                    console.error('Error accessing video stream:', err);
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
    font-family: 'Ropa Sans', sans-serif;
    color: #333;
    max-width: 640px;
    margin: 0 auto;
    position: relative;
}

#githubLink {
    position: absolute;
    right: 0;
    top: 12px;
    color: #2d99ff;
}

h1 {
    margin: 10px 0;
    font-size: 40px;
}

h1 {
    text-align: center;
}

h2 {
    text-align: center;
}

#loadingMessage {
    text-align: center;
    padding: 40px;
    background-color: #eee;
}

#canvas {
    width: 100%;
}

#output {
    margin-top: 20px;
    background: #eee;
    padding: 10px;
    padding-bottom: 0;
}

#output div {
    padding-bottom: 10px;
    word-wrap: break-word;
}

#noQRFound {
    text-align: center;
}
</style>