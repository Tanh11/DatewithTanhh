// --- Danh sách ngày bận của bạn (Định dạng: YYYY-MM-DD) ---
// Hãy thay đổi các ngày này theo lịch bận thực tế của bạn
const busyDates = [
    "2026-08-22",
    "2026-06-20",
    "2026-07-01",
    "2026-12-25"
];

// Lưu trữ dữ liệu chọn lựa của người dùng
const userData = {
    date: "",
    activity: "",
    details: {}
};

// Cấu hình danh sách câu hỏi động theo từng hoạt động
const activityQuestions = {
    "Dinner": [
        { id: "city", label: "Thành phố/Khu vực muốn đi 🏙️", placeholder: "Ví dụ: Hà Nội, TP.HCM..." },
        { id: "cuisine", label: "Món ăn muốn thưởng thức 🍜", placeholder: "Ví dụ: Món Nhật, Đồ nướng, Sushi..." },
        { id: "dresscode", label: "Gợi ý Dresscode/Phong cách mặc 👗", placeholder: "Ví dụ: Thanh lịch, Năng động..." }
    ],
    "Coffee": [
        { id: "city", label: "Thành phố/Khu vực 🏙️", placeholder: "Ví dụ: Quận 1, Tây Hồ..." },
        { id: "vibe", label: "Kiểu quán cafe yêu thích ☕", placeholder: "Ví dụ: Yêu tĩnh, Yên bình, View đẹp..." },
        { id: "drink", label: "Đồ uống ưa thích 🍹", placeholder: "Ví dụ: Matcha latte, Cafe sữa..." },
        { id: "dresscode", label: "Dresscode 👗", placeholder: "Ví dụ: Thoải mái, Xinh xắn..." }
    ],
    "Picnic": [
        { id: "city", label: "Thành phố/Địa điểm picnic 🌿", placeholder: "Ví dụ: Công viên, Bãi cỏ..." },
        { id: "food", label: "Thức ăn/Đồ uống mang theo 🧺", placeholder: "Ví dụ: Bánh mì, Trái cây, Trà trái cây..." },
        { id: "activity", label: "Hoạt động muốn làm 🎨", placeholder: "Ví dụ: Đọc sách, Chụp ảnh, Nghe nhạc..." }
    ],
    "Arcade": [
        { id: "city", label: "Thành phố/Trung tâm giải trí 🕹️", placeholder: "Ví dụ: Vincom, AEON Mall..." },
        { id: "game", label: "Trò chơi muốn thử 🎯", placeholder: "Ví dụ: Gắp thú, Bắn cung, Đua xe..." },
        { id: "food", label: "Ăn nhẹ sau khi chơi 🍦", placeholder: "Ví dụ: Kem, Trà sữa..." }
    ],
    "Beach": [
        { id: "city", label: "Thành phố biển 🌊", placeholder: "Ví dụ: Đà Nẵng, Vũng Tàu, Nha Trang..." },
        { id: "time", label: "Thời điểm đi biển 🌅", placeholder: "Ví dụ: Ngắm bình minh, Hoàng hôn..." },
        { id: "dresscode", label: "Dresscode 🩱", placeholder: "Ví dụ: Đồ đi biển, Maxi..." }
    ],
    "Surprise Me": [
        { id: "city", label: "Thành phố bạn muốn đến 🏙️", placeholder: "Ví dụ: Đà Lạt, Hà Nội..." },
        { id: "dresscode", label: "Dresscode/Phong cách ưa thích 👗", placeholder: "Ví dụ: Giữ bí mật nhưng mặc ấm nhé..." }
    ]
};

// Hàm chuyển trang
function goToPage(pageIndex) {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, i) => {
        if (i === pageIndex - 1) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Điều hướng ban đầu
    document.getElementById('start-btn').addEventListener('click', () => goToPage(2));
    document.getElementById('yes-btn').addEventListener('click', () => goToPage(3));

    // 2. Nút "No" chạy né tránh
    const noBtn = document.getElementById('no-btn');
    noBtn.addEventListener('mouseover', () => {
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        const maxWidth = containerRect.width - btnRect.width;
        const maxHeight = containerRect.height - btnRect.height;

        const randomX = Math.random() * maxWidth;
        const randomY = Math.random() * maxHeight;

        noBtn.style.position = 'absolute';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
    });

    // 3. Xử lý Chọn Ngày (Kiểm tra ngày bận)
    const dateInput = document.getElementById('date-input');
    const dateErrorMsg = document.getElementById('date-error-msg');

    // Thiết lập ngày tối thiểu là ngày hôm nay
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    document.getElementById('date-next-btn').addEventListener('click', () => {
        const selectedDate = dateInput.value;

        if (!selectedDate) {
            dateErrorMsg.textContent = "Bạn chưa chọn ngày kìa! 📅";
            return;
        }

        if (busyDates.includes(selectedDate)) {
            dateErrorMsg.textContent = "Ui rất tiếc, ngày này mình bận mất rồi! Bạn chọn ngày khác nhé 🥺";
            return;
        }

        // Ngày hợp lệ
        dateErrorMsg.textContent = "";
        
        // Định dạng lại ngày để hiển thị đẹp hơn
        const dateObj = new Date(selectedDate);
        userData.date = dateObj.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        goToPage(4);
    });

    // 4. Xử lý Chọn Hoạt Động
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach(card => {
        card.addEventListener('click', () => {
            activityCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            userData.activity = card.getAttribute('data-activity');
        });
    });

    document.getElementById('activity-next-btn').addEventListener('click', () => {
        if (!userData.activity) {
            alert("Hãy chọn 1 hoạt động bạn thích nhé! 💕");
            return;
        }

        // Tạo câu hỏi động dựa trên hoạt động đã chọn
        renderDynamicQuestions(userData.activity);
        goToPage(5);
    });

    // 5. Hàm tạo form câu hỏi động
    function renderDynamicQuestions(activityKey) {
        const container = document.getElementById('dynamic-inputs');
        const title = document.getElementById('pref-title');
        container.innerHTML = '';

        title.textContent = activityKey === "Surprise Me" 
            ? "Surprise Me! ✨" 
            : `Một chút thông tin về ${activityKey} 💭`;

        const questions = activityQuestions[activityKey] || [];

        questions.forEach(q => {
            const group = document.createElement('div');
            group.className = 'input-group';

            const label = document.createElement('label');
            label.textContent = q.label;

            const input = document.createElement('input');
            input.type = 'text';
            input.id = `input-${q.id}`;
            input.placeholder = q.placeholder;

            group.appendChild(label);
            group.appendChild(input);
            container.appendChild(group);
        });
    }

    // 6. Xử lý Form Sở Thích -> Kết Quả
    const prefForm = document.getElementById('preferences-form');
    prefForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const questions = activityQuestions[userData.activity] || [];
        userData.details = {};

        questions.forEach(q => {
            const inputVal = document.getElementById(`input-${q.id}`).value;
            userData.details[q.label] = inputVal || "Tùy bạn chọn 😉";
        });

        renderResultPage();
        goToPage(6);
    });

    // 7. Renders Kết quả cuối cùng
    function renderResultPage() {
        document.getElementById('result-date').textContent = userData.date;
        
        const cityVal = userData.details["Thành phố/Khu vực muốn đi 🏙️"] || 
                        userData.details["Thành phố/Khu vực 🏙️"] || 
                        userData.details["Thành phố/Địa điểm picnic 🌿"] || 
                        userData.details["Thành phố/Trung tâm giải trí 🕹️"] || 
                        userData.details["Thành phố biển 🌊"] || 
                        userData.details["Thành phố bạn muốn đến 🏙️"] || "";

        document.getElementById('result-activity-location').textContent = 
            `${userData.activity} ${cityVal ? `(Tại ${cityVal})` : ''}`;

        const detailsContainer = document.getElementById('result-details');
        detailsContainer.innerHTML = '';

        for (const [key, value] of Object.entries(userData.details)) {
            const p = document.createElement('p');
            p.innerHTML = `<strong>${key}:</strong> ${value}`;
            detailsContainer.appendChild(p);
        }
    }

    // 8. Nút Sao chép kết quả
    document.getElementById('copy-btn').addEventListener('click', () => {
        let textToCopy = `✨ Lịch Hẹn Của Chúng Ta ✨\n`;
        textToCopy += `🗓️ Ngày: ${userData.date}\n`;
        textToCopy += `🎈 Hoạt động: ${userData.activity}\n`;
        textToCopy += `-------------------\n`;
        for (const [key, value] of Object.entries(userData.details)) {
            textToCopy += `${key}: ${value}\n`;
        }

        navigator.clipboard.writeText(textToCopy).then(() => {
            alert("Đã sao chép lịch hẹn! Bạn có thể dán và gửi qua tin nhắn cho người ấy nhé 💖");
        });
    });

    // 9. Hiệu ứng trái tim rơi
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        
        document.querySelector('.falling-hearts').appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 350);
});