// دالة التحقق من الهوية وحماية الصفحة[span_2](start_span)[span_2](end_span)
function checkAuth() {
    if (sessionStorage.getItem("adminAuthed") === "true") return true;
    
    let password = prompt("الرجاء إدخال كلمة مرور الإدارة لرؤية لوحة التحكم:");
    if (password === "12345") {
        sessionStorage.setItem("adminAuthed", "true");
        return true;
    } else {
        alert("كلمة المرور غير صحيحة!");
        document.body.innerHTML = "<h2 style='text-align:center; color:#ff4d4d; margin-top:100px; font-family:sans-serif;'>عذراً، غير مسموح لك بالدخول ⛔</h2>";
        return false;
    }
}

// التبديل بين أقسام لوحة الإدارة عبر الشريط السفلي[span_3](start_span)[span_3](end_span)
function switchAdminTab(tabName, btnElement) {
  document.querySelectorAll('.admin-section').forEach(sec => sec.classList.remove('active'));
  document.querySelectorAll('.admin-bottom-nav .nav-item').forEach(btn => btn.classList.remove('active'));

  let targetSection = document.getElementById(`section-${tabName}`);
  if (targetSection) targetSection.classList.add('active');
  if (btnElement) btnElement.classList.add('active');

  // جلب البيانات الخاصة بالقسم عند فتحه[span_4](start_span)[span_4](end_span)
  if (tabName === 'orders') fetchOrders();
  if (tabName === 'support') fetchCustomerSupportMessages();
  if (tabName === 'reviews') fetchDeliveryReviews();
}

function refreshCurrentSection() {
  if (document.getElementById('section-orders').classList.contains('active')) fetchOrders();
  else if (document.getElementById('section-support').classList.contains('active')) fetchCustomerSupportMessages();
  else if (document.getElementById('section-reviews').classList.contains('active')) fetchDeliveryReviews();
  else alert("تم حفظ الإعدادات بنجاح!");
}

// 1. قسم الطلبات الرئيسية[span_5](start_span)[span_5](end_span)
function fetchOrders() {
  if (!checkAuth()) return; 
  let container = document.getElementById("adminOrdersList");
  if(!container) return;
  container.innerHTML = '<div class="loading">جاري تحديث الطلبات...</div>';

  fetch('/.netlify/functions/get-orders')
  .then(response => response.json())
  .then(data => {
    let orders = Array.isArray(data) ? data : (data.orders || []);
    renderAdminOrders(orders);
  })
  .catch(error => {
    console.error(error);
    container.innerHTML = '<div class="loading" style="color:#ff4d4d;">حدث خطأ أثناء جلب الطلبات.</div>';
  });
}

function renderAdminOrders(orders) {
  let container = document.getElementById("adminOrdersList");
  if (!container) return;
  if (!orders || orders.length === 0) {
    container.innerHTML = '<div class="loading">لا توجد طلبات واردة حالياً.</div>';
    return;
  }

  container.innerHTML = orders.map((o) => {
    let parsedItems = [];
    try {
      parsedItems = typeof o.items === 'string' ? JSON.parse(o.items) : (Array.isArray(o.items) ? o.items : []);
    } catch(e) { parsedItems = []; }

    let itemsHtml = parsedItems.map(item => `
      <div style="display:flex; justify-content:space-between; margin-bottom:5px; border-bottom:1px dashed #444; padding-bottom:3px; font-size:13px;">
        <span>🍔 ${item.name || 'وجبة'} × ${item.qty || item.quantity || 1}</span>
        <span style="color:#ff4d4d;">${((Number(item.price)||0) * (Number(item.qty || item.quantity || 1))).toLocaleString('en-US')} ل.س</span>
      </div>
    `).join('');

    let displayId = o.id ? String(o.id) : Date.now().toString();
    let shortId = displayId.length >= 6 ? displayId.slice(-6) : displayId;
    let customerName = o.customerName || o.customer_name || 'غير متوفر';
    let customerPhone = o.customerPhone || o.customer_phone || 'غير متوفر';
    let customerLocation = o.customerLocation || o.customer_location || 'غير متوفر';

    return `
      <div class="card-box">
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #333; padding-bottom:5px;">
          <span style="font-weight:bold; color:#ff4d4d;">طلب #${shortId}</span>
          <span style="color:#aaa; font-size:12px;">📅 ${o.date || o.created_at || 'قريباً'}</span>
        </div>
        <div style="font-size:13px; margin-bottom:10px; line-height:1.5;">
          <p><strong>👤 الزبون:</strong> ${customerName}</p>
          <p><strong>📞 الموبايل:</strong> <a href="tel:${customerPhone}" style="color:#ff4d4d; text-decoration:none;">${customerPhone}</a></p>
          <p><strong>📍 العنوان:</strong> ${customerLocation}</p>
        </div>
        <div style="background:#1a1a1a; padding:8px; border-radius:6px; margin-bottom:10px;">
          <strong style="font-size:12px; color:#aaa; display:block; margin-bottom:4px;">🛒 الوجبات:</strong>
          ${itemsHtml}
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="font-weight:bold; color:#ff4d4d; font-size:15px;">الإجمالي: ${(Number(o.total)||0).toLocaleString('en-US')} ل.س</div>
          <select onchange="updateOrderStatus('${displayId}', this.value)" style="background:#333; color:#fff; border:1px solid #444; padding:6px; border-radius:6px; font-family:'Cairo',sans-serif; font-weight:bold;">
            <option value="قيد المراجعة ⏳" ${o.status === 'قيد المراجعة ⏳' ? 'selected' : ''}>قيد المراجعة ⏳</option>
            <option value="جاري التجهيز 🔥" ${o.status === 'جاري التجهيز 🔥' ? 'selected' : ''}>جاري التجهيز 🔥</option>
            <option value="في طريق التوصيل 🛵" ${o.status === 'في طريق التوصيل 🛵' ? 'selected' : ''}>في طريق التوصيل 🛵</option>
            <option value="تم التوصيل ✅" ${o.status === 'تم التوصيل ✅' ? 'selected' : ''}>تم التوصيل ✅</option>
            <option value="ملغي ❌" ${o.status === 'ملغي ❌' ? 'selected' : ''}>ملغي ❌</option>
          </select>
        </div>
      </div>
    `;
  }).join('');
}

function updateOrderStatus(orderId, newStatus) {
  fetch('/.netlify/functions/update-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId: orderId, newStatus: newStatus })
  })
  .then(res => {
    if (!res.ok) throw new Error("فشل التحديث");
    alert("✅ تم تحديث حالة الطلب بنجاح!");
  })
  .catch(err => { console.error(err); alert("❌ حدث خطأ أثناء التحديث."); });
}

// 2. خدمة العملاء (ربط الرسائل واستعراضها والرد عليها مع تحديث العداد الأحمر للإدارة)[span_6](start_span)[span_6](end_span)
function fetchCustomerSupportMessages() {
  let container = document.getElementById("adminSupportList");
  if(!container) return;
  container.innerHTML = `<div class="loading">جاري جلب رسائل العملاء...</div>`;

  fetch('/.netlify/functions/support-messages')
  .then(res => res.json())
  .then(data => {
    let messages = Array.isArray(data) ? data : (data.messages || []);
    
    let unreadCount = 0;
    let grouped = {};
    messages.forEach(m => {
      let phone = m.customerPhone || 'unknown';
      if (!grouped[phone]) grouped[phone] = { name: m.customerName || 'عميل', messages: [] };
      grouped[phone].messages.push(m);
    });

    Object.keys(grouped).forEach(phone => {
      let clientMsgs = grouped[phone].messages;
      let lastMsg = clientMsgs[clientMsgs.length - 1];
      if (lastMsg && lastMsg.sender === 'customer') {
        unreadCount++;
      }
    });

    let adminBadge = document.getElementById('adminSupportBadge');
    if (adminBadge) {
      if (unreadCount > 0) {
        adminBadge.style.display = 'inline-block';
        adminBadge.innerText = unreadCount;
      } else {
        adminBadge.style.display = 'none';
      }
    }

    if (messages.length === 0) {
      container.innerHTML = `<div class="card-box" style="text-align:center; color:#aaa;">لا توجد رسائل دعم فني واردة حالياً من الزبائن.</div>`;
      return;
    }

    container.innerHTML = Object.keys(grouped).map(phone => {
      let client = grouped[phone];
      return `
        <div class="card-box" style="border-left: 4px solid #ff4d4d;">
          <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
            <strong>👤 ${client.name} (${phone})</strong>
            <a href="tel:${phone}" style="color:#ff4d4d; font-size:12px; text-decoration:none;">📞 اتصال</a>
          </div>
          <div style="background:#111; padding:10px; border-radius:8px; max-height:150px; overflow-y:auto; margin-bottom:10px; font-size:13px;">
            ${client.messages.map(m => `
              <div style="margin-bottom:6px; text-align:${m.sender === 'admin' ? 'right' : 'left'};">
                <span style="background:${m.sender === 'admin' ? '#800000' : '#333'}; padding:5px 10px; border-radius:6px; display:inline-block;">
                  ${m.sender === 'admin' ? '👑 الإدارة: ' : '🛒 العميل: '}${m.message}
                </span>
              </div>
            `).join('')}
          </div>
          <div style="display:flex; gap:5px;">
            <input type="text" id="replyInput_${phone}" placeholder="اكتب رد الإدارة..." style="flex:1; padding:8px; background:#222; border:1px solid #444; color:#fff; border-radius:6px; font-family:'Cairo',sans-serif;">
            <button class="btn" onclick="sendAdminReply('${phone}', '${client.name}')">إرسال</button>
          </div>
        </div>
      `;
    }).join('');
  })
  .catch(err => {
    console.error(err);
    container.innerHTML = `<div class="loading" style="color:#ff4d4d;">حدث خطأ أثناء جلب الرسائل.</div>`;
  });
}

function sendAdminReply(customerPhone, customerName) {
  let input = document.getElementById(`replyInput_${customerPhone}`);
  if (!input || !input.value.trim()) return;

  let payload = {
    customerPhone: customerPhone,
    customerName: customerName,
    message: input.value.trim(),
    sender: 'admin',
    timestamp: new Date().toISOString()
  };

  fetch('/.netlify/functions/support-messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(() => {
    input.value = '';
    fetchCustomerSupportMessages(); 
  })
  .catch(err => alert("❌ فشل إرسال الرد"));
}

// 3. تقييمات التوصيل (المحدثة لعرض التقييمات في لوحة التحكم)
function fetchDeliveryReviews() {
  let container = document.getElementById("adminReviewsList");
  if(!container) return;
  container.innerHTML = `<div class="loading">جاري جلب تقييمات التوصيل...</div>`;

  fetch('/.netlify/functions/get-ratings')
  .then(res => res.json())
  .then(data => {
    let reviews = Array.isArray(data) ? data : (data.ratings || []);
    
    if (reviews.length === 0) {
      container.innerHTML = `<div class="card-box" style="text-align:center; color:#aaa;">لا توجد تقييمات توصيل مسجلة حتى الآن.</div>`;
      return;
    }

    container.innerHTML = reviews.map(r => `
      <div class="card-box" style="border-right: 4px solid #ffc107; margin-bottom: 10px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
          <strong>👤 ${r.customerName || 'عميل'} (${r.customerPhone || 'بدون رقم'})</strong>
          <span style="color:#ffc107; font-weight:bold;">${'★'.repeat(r.stars || r.rating || 0)} (${r.stars || r.rating || 0}/5)</span>
        </div>
        <p style="font-size:13px; color:#ddd; margin: 5px 0;">💬 ${r.note || r.comment || 'لا توجد ملاحظات إضافية'}</p>
        <small style="color:#888; font-size:11px;">📦 طلب رقم: #${r.orderId ? String(r.orderId).slice(-6) : 'غير متوفر'} | 📅 ${r.date || 'قريباً'}</small>
      </div>
    `).join('');
  })
  .catch(err => {
    console.error(err);
    container.innerHTML = `<div class="loading" style="color:#ff4d4d;">حدث خطأ أثناء جلب التقييمات.</div>`;
  });
}

// 4. الإعدادات[span_7](start_span)[span_7](end_span)
function toggleRestaurantStatus(checkbox) {
  let status = checkbox.checked ? "مغلق" : "مفتوح";
  localStorage.setItem("restaurantClosed", checkbox.checked);
  alert(`⚠️ تم تغيير حالة المطعم إلى: ${status}`);
}

function saveAnnouncement() {
  let text = document.getElementById("announcementInput").value;
  localStorage.setItem("restaurantAnnouncement", text);
  alert("📢 تم حفظ ونشر رسالة التنبيه للزبائن بنجاح!");
}

// التشغيل التلقائي عند التحميل[span_8](start_span)[span_8](end_span)
window.onload = function() {
  if (checkAuth()) {
    fetchOrders();
    setInterval(fetchCustomerSupportMessages, 5000);

    let isClosed = localStorage.getItem("restaurantClosed") === "true";
    let toggleEl = document.getElementById("restaurantStatusToggle");
    if(toggleEl) toggleEl.checked = isClosed;
    
    let savedMsg = localStorage.getItem("restaurantAnnouncement");
    let annEl = document.getElementById("announcementInput");
    if(annEl && savedMsg) annEl.value = savedMsg;
  }
};
