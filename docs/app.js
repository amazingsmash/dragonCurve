const { createApp } = Vue;

function middlePoint(a, b, up) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const c = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    let m = { x: -dy / 2, y: dx / 2 };
    if (!up) {
        m.x *= -1;
        m.y *= -1;
    }
    return { x: c.x + m.x, y: c.y + m.y };
}

function computeDragon(iterations) {
    let pts = [{ x: 0.1, y: 0.5 }, { x: 0.9, y: 0.5 }];
    for (let it = 0; it < iterations; it++) {
        const newPts = [];
        let up = true;
        for (let i = 0; i < pts.length - 1; i++) {
            const a = pts[i];
            const b = pts[i + 1];
            const m = middlePoint(a, b, up);
            up = !up;
            newPts.push(a, m);
        }
        newPts.push(pts[pts.length - 1]);
        pts = newPts;
    }
    return pts;
}

createApp({
    data() {
        return {
            progress: 0,
            playing: false,
            intervalId: null,
            points: [],
            ctx: null,
        };
    },
    mounted() {
        const canvas = document.getElementById('viewer');
        this.ctx = canvas.getContext('2d');
        const resize = () => {
            canvas.width = this.$el.clientWidth;
            canvas.height = this.$el.clientHeight - document.getElementById('controls').offsetHeight;
            this.draw();
        };
        window.addEventListener('resize', resize);
        resize();
        this.points = computeDragon(15);
        this.draw();
    },
    methods: {
        draw() {
            const ctx = this.ctx;
            if (!ctx) return;
            const canvas = ctx.canvas;
            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#40c4ff';
            ctx.lineWidth = 2;
            const count = Math.floor(this.points.length * (this.progress / 100));
            if (count < 2) return;
            ctx.beginPath();
            ctx.moveTo(this.points[0].x * canvas.width, this.points[0].y * canvas.height);
            for (let i = 1; i < count; i++) {
                const p = this.points[i];
                ctx.lineTo(p.x * canvas.width, p.y * canvas.height);
            }
            ctx.stroke();
        },
        togglePlay() {
            if (this.playing) {
                clearInterval(this.intervalId);
                this.playing = false;
            } else {
                this.playing = true;
                this.intervalId = setInterval(() => {
                    if (this.progress >= 100) {
                        clearInterval(this.intervalId);
                        this.playing = false;
                    } else {
                        this.progress += 1;
                        this.draw();
                    }
                }, 1000);
            }
        }
    }
}).mount('#app');
