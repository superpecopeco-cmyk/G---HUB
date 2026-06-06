const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// บรรทัดสำคัญ: บังคับให้ Express รู้จักสไตล์และสคริปต์ในโฟลเดอร์ public
app.use(express.static(path.join(__dirname, 'public')));

// เมื่อเปิดหน้าแรก http://localhost:3000 ให้เรียกใช้ไฟล์ index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});