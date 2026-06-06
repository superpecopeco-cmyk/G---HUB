document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. ระบบ INTRO SCREEN
    // ==========================================================================
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    if (introScreen && mainContent) {
        setTimeout(() => {
            introScreen.style.opacity = '0';
            introScreen.style.visibility = 'hidden';
            mainContent.classList.add('show');
        }, 3000);
    }

    // ==========================================================================
    // 2. ดักจับปุ่มและส่วนแสดงผลต่างๆ
    // ==========================================================================
    const btnNavHome = document.getElementById('menu-home');
    const btnNavMarketplace = document.getElementById('menu-marketplace');
    const btnCardBuy = document.getElementById('btn-buy-bypass');

    const heroSection = document.querySelector('.hero');
    const statsContainer = document.querySelector('.stats-container');
    const marketplacePage = document.getElementById('marketplace-page');
    const subCategoryPage = document.getElementById('sub-category-page');
    const productDetailPage = document.getElementById('product-detail-page');

    function hideAllSections() {
        if (heroSection) heroSection.style.display = 'none';
        if (statsContainer) statsContainer.classList.add('hidden-page');
        if (marketplacePage) marketplacePage.classList.add('hidden-page');
        if (subCategoryPage) subCategoryPage.classList.add('hidden-page');
        if (productDetailPage) productDetailPage.classList.add('hidden-page');
    }

    // 3. ระบบ Router สลับหน้า
    if (btnCardBuy) {
        btnCardBuy.addEventListener('click', (e) => {
            e.preventDefault();
            hideAllSections();
            if (subCategoryPage) subCategoryPage.classList.remove('hidden-page');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (btnNavHome) {
        btnNavHome.addEventListener('click', (e) => {
            e.preventDefault();
            hideAllSections();
            if (heroSection) heroSection.style.display = 'block';
            if (statsContainer) statsContainer.classList.remove('hidden-page');
            if (marketplacePage) marketplacePage.classList.remove('hidden-page');
            document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
            btnNavHome.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const activateMarketplace = (e) => {
        if(e) e.preventDefault();
        hideAllSections();
        if (marketplacePage) marketplacePage.classList.remove('hidden-page');
        document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
        if (btnNavMarketplace) btnNavMarketplace.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (btnNavMarketplace) btnNavMarketplace.addEventListener('click', activateMarketplace);

    // 4. ระบบกดดูสินค้าและย้อนกลับ
    if (subCategoryPage) {
        subCategoryPage.addEventListener('click', (e) => {
            const btnView = e.target.closest('.btn-view-product');
            if (!btnView) return;
            e.preventDefault();
            const cardBody = btnView.closest('.sub-card-body');
            const card = btnView.closest('.sub-card');
            if (cardBody && card) {
                document.getElementById('detail-title').textContent = cardBody.querySelector('.sub-item-title').textContent;
                document.getElementById('detail-price').textContent = cardBody.querySelector('.sub-item-price').textContent;
                document.getElementById('detail-main-img').src = card.querySelector('.sub-card-img').src;
                hideAllSections();
                if (productDetailPage) productDetailPage.classList.remove('hidden-page');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    const btnBackToSub = document.getElementById('back-to-sub');
    if (btnBackToSub) {
        btnBackToSub.addEventListener('click', (e) => {
            e.preventDefault();
            hideAllSections();
            if (subCategoryPage) subCategoryPage.classList.remove('hidden-page');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================================================
    // 5. ระบบ Modal ชำระเงิน (รวมไว้จุดเดียว)
    // ==========================================================================
    const paymentModal = document.getElementById('payment-modal');
    const buyBtn = document.querySelector('.btn-checkout');
    const closeBtn = document.getElementById('close-modal');

    // เมื่อกดปุ่มสั่งซื้อ ให้เปิด Modal
    if (buyBtn && paymentModal) {
        buyBtn.addEventListener('click', () => { 
            paymentModal.style.display = 'flex'; 
        });
    }

    // เมื่อกดปุ่มปิดใน Modal
    if (closeBtn && paymentModal) {
        closeBtn.addEventListener('click', (e) => { 
            e.stopPropagation(); 
            
            // 1. ปิด Modal
            paymentModal.style.display = 'none'; 
            
            // 2. เด้งไปหน้า Discord
            window.open('https://discord.gg/7tWUrbUs6H', '_blank');
        });
    }

    // ปิด Modal เมื่อคลิกพื้นที่ว่างข้างนอก
    if (paymentModal) {
        paymentModal.addEventListener('click', (e) => { 
            if (e.target === paymentModal) {
                paymentModal.style.display = 'none'; 
            }
        });
    }

    // 6. ระบบ Discord Support
    const btnDiscordSupport = document.getElementById('btn-discord-support');
    if (btnDiscordSupport) {
        btnDiscordSupport.addEventListener('click', () => { window.open('https://discord.gg/7tWUrbUs6H', '_blank'); });
    }
    // เพิ่มส่วนนี้เข้าไปใน script.js (ต่อจากส่วนของ btnDiscordSupport)
    const btnBrowseStore = document.getElementById('btn-browse-store');
    if (btnBrowseStore) {
        btnBrowseStore.addEventListener('click', activateMarketplace);
    }
    // ในส่วนของปุ่มสั่งซื้อสินค้า (สมมติว่าเป็นปุ่มที่มี class 'btn-checkout')
const btnCheckout = document.querySelector('.btn-checkout');
const modalPrice = document.getElementById('modal-price-display'); // จุดที่เราจะเปลี่ยนเลขราคา

if (btnCheckout && paymentModal) {
    btnCheckout.addEventListener('click', () => {
        // 1. ดึงราคาจากหน้าจอรายละเอียดสินค้า (ที่พี่ทำไว้แล้ว)
        const currentPrice = document.getElementById('detail-price').textContent;
        
        // 2. อัปเดตราคาใน Modal
        if (modalPrice) {
            modalPrice.textContent = "ชำระเงิน " + currentPrice;
        }
        
        // 3. เปิด Modal
        paymentModal.style.display = 'flex';
    });
}
});