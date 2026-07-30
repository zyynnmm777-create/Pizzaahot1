// دالة التحقق من الهوية وحماية الصفحة من المتطفلين
function checkAuth() {
    // إذا كان المستخدم قد سجل دخوله بنجاح مسبقاً في هذه الجلسة
    if (sessionStorage.getItem("adminAuthed") === "true") return true;
    
    let password = prompt("الرجاء إدخال كلمة مرور الإدارة لرؤية الطلبات:");
    if (password === "12345") {
        sessionStorage.setItem("adminAuthed", "true");
        return true;
    } else {
        alert("كلمة المرور غير صحيحة!");
        // قفل الشاشة لمنع استعراض عناصر الـ HTML الخلفية
        document.body.innerHTML = "<h2 style='text-align:center; color:#ff4d4d; margin-top:100px; font-family:sans-serif;'>عذراً، غير مسموح لك بالدخول ⛔</h2>";
        return false;
    }
}

// الدالة الأساسية لجلب الطلبات من Netlify Function
function fetchOrders() {
  // الحماية أولاً: إذا فشل التحقق، توقف تماماً ولا تجلب البيانات
  if (!checkAuth()) return; 

  let container = document.getElementById("adminOrdersList");
  if(!container) return;
  container.innerHTML = '<div class="loading">جاري تحديث الطلبات من قاعدة البيانات...</div>';

  fetch('/.netlify/functions/get-orders')
  .then(response => {
    if (!response.ok) throw new Error("فشل في جلب البيانات من الخادم.");
    return response.json();
  })
  .then(data => {
    // التأكد من استخلاص المصفوفة بشكل صحيح مهما كان شكل الـ JSON العائد
    let orders = Array.isArray(data) ? data : (data.orders || []);
    renderAdminOrders(orders);
  })
  .catch(error => {
    console.error(error);
    container.innerHTML = '<div class="loading" style="color:#ff4d4d;">حدث خطأ أثناء جلب الطلبات. تأكد من إعدادات Netlify.</div>';
  });
}

// دالة بناء وعرض بطاقات الطلبات للمدير
function renderAdminOrders(orders) {
  let container = document.getElementById("adminOrdersList");
  if (!container) return;
  
  if (!orders || orders.length === 0) {
    container.innerHTML = '<div class="loading">لا توجد طلبات واردة في الوقت الحالي.</div>';
    return;
  }

  container.innerHTML = orders.map((o) => {
    let parsedItems = [];
    try {
      // فحص أمان للوجبات: هل هي نص JSON أم مصفوفة جاهزة؟
      parsedItems = typeof o.items === 'string' ? JSON.parse(o.items) : (Array.isArray(o.items) ? o.items : []);
    } catch(e) {
      console.warn("فشل تحويل حقل الـ items لطلب معين:", o.id);
      parsedItems = []; // مصفوفة فارغة كخيار بديل لتفادي الـ Crash
    }

    // بناء كود الـ HTML الخاص بالوجبات داخل الطلب
    let itemsHtml = parsedItems.map(item => `
      <div class="item-row" style="display:flex; justify-content:space-between; margin-bottom:5px; border-bottom:1px dashed #444; padding-bottom:3px;">
        <span>🍔 ${item.name || 'وجبة'} ${item.selectedSize ? '(' + item.selectedSize + ')' : ''} × ${item.qty || 1}</span>
        <span style="color:#ff4d4d;">${((Number(item.price)||0) * (Number(item.qty)||0)).toLocaleString('en-US')} ل.س</span>
      </div>
    `).join('');

    // معالجة معرّف الطلب ليكون نظيفاً وقصيراً عند العرض
    let displayId = o.id ? String(o.id) : Date.now().toString();
    let shortId = displayId.length >= 6 ? displayId.slice(-6) : displayId;
    
    let customerName = o.customerName || o.customer_name || 'غير متوفر';
    let customerPhone = o.customerPhone || o.customer_phone || 'غير متوفر';
    let customerLocation = o.customerLocation || o.customer_location || 'غير متوفر';

    return `
      <div class="order-card" id="order-${displayId}" style="background:#222; border:1px solid #333; padding:15px; margin-bottom:15px; border-radius:8px;">
        <div class="order-header" style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #333; padding-bottom:5px;">
          <span class="order-id" style="font-weight:bold; color:#ff4d4d;">طلب #${shortId}</span>
          <span class="order-date" style="color:#aaa; font-size:12px;">📅 ${o.date || o.created_at || 'غير متوفر'}</span>
        </div>
        
        <div class="customer-info" style="font-size:14px; margin-bottom:10px; line-height:1.5;">
          <p style="margin:3px 0;"><strong>👤 الزبون:</strong> ${customerName}</p>
          <p style="margin:3px 0;"><strong>📞 الموبايل:</strong> <a href="tel:${customerPhone}" style="color:#ff4d4d; text-decoration:none;">${customerPhone}</a></p>
          <p style="margin:3px 0;"><strong>📍 العنوان:</strong> ${customerLocation}</p>
        </div>

        <div class="items-list" style="background:#1a1a1a; padding:10px; border-radius:5px; margin-bottom:10px;">
          <strong style="font-size:13px; color:#aaa; display:block; margin-bottom:5px;">🛒 تفاصيل الوجبات:</strong>
          ${itemsHtml}
        </div>

        <div class="order-footer" style="display:flex; justify-content:space-between; align-items:center;">
          <div class="total-price" style="font-weight:bold; color:#ff4d4d;">الإجمالي: ${(Number(o.total)||0).toLocaleString('en-US')} ل.س</div>
          <div>
            <label style="font-size:12px; color:#aaa; margin-left:5px;">الحالة:</label>
            <select class="status-select" onchange="updateOrderStatus('${displayId}', this.value)" style="background:#333; color:#fff; border:1px solid #444; padding:5px; border-radius:4px;">
              <option value="قيد المراجعة ⏳" ${o.status === 'قيد المراجعة ⏳' ? 'selected' : ''}>قيد المراجعة ⏳</option>
              <option value="جاري التجهيز 🔥" ${o.status === 'جاري التجهيز 🔥' ? 'selected' : ''}>جاري التجهيز 🔥</option>
              <option value="في طريق التوصيل 🛵" ${o.status === 'في طريق التوصيل 🛵' ? 'selected' : ''}>في طريق التوصيل 🛵</option>
              <option value="تم التوصيل ✅" ${o.status === 'تم التوصيل ✅' ? 'selected' : ''}>تم التوصيل ✅</option>
              <option value="ملغي ❌" ${o.status === 'ملغي ❌' ? 'selected' : ''}>ملغي ❌</option>
            </select>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// دالة لتحديث حالة الطلب وإرسالها لـ Netlify
function updateOrderStatus(orderId, newStatus) {
  fetch('/.netlify/functions/update-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId: orderId, newStatus: newStatus })
  })
  .then(response => {
    if (!response.ok) throw new Error("فشل تحديث الحالة.");
    return response.json();
  })
  .then(data => {
    alert("✅ تم تحديث حالة الطلب بنجاح في السيرفر وجوجل شيت!");
  })
  .catch(error => {
    console.error(error);
    alert("❌ حدث خطأ أثناء تحديث الحالة. يرجى مراجعة الـ Console.");
  });
}

// تشغيل جلب الطلبات بمجرد تحميل الصفحة تِلقائياً
window.onload = function() {
  fetchOrders();
};
