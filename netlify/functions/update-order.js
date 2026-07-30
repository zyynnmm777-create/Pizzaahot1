exports.handler = async (event) => {
  try {
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      throw new Error("Google Script URL is not defined in environment variables.");
    }

    const body = JSON.parse(event.body);
    
    // محاولة قراءة المعرف والحالة سواء أرسلتها لوحة التحكم بـ (orderId/newStatus) أو بأي صيغة أخرى
    const id = body.id || body.orderId;
    const status = body.status || body.newStatus;

    let payload = {};

    // 1. إذا كان الطلب يحتوي على معرف وحالة -> إذن هذا تحديث من لوحة الإدارة
    if (id && status) {
      payload = {
        action: "updateStatus",
        orderId: String(id),
        newStatus: status
      };
    } 
    // 2. إذا لم تتوفر الحالة -> إذن هذا طلب جديد قادم من زبون المتجر
    else {
      payload = {
        action: "addOrder",
        id: String(Date.now()), // توليد معرف رقمي نقي يعتمد على الوقت بالملي ثانية
        customerName: body.customer_name || body.customerName,
        customerPhone: body.customer_phone || body.customerPhone,
        customerLocation: body.customer_location || body.customerLocation,
        items: body.items, // النص الجاهز الذي قمنا بتحويله في الخطوة الأولى
        total: body.total
      };
    }

    // إرسال البيانات الموحدة إلى Google Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error("فشل الاتصال بـ سكريبت Google Sheets.");
    const result = await response.json();

    return {
      statusCode: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // لتفادي مشاكل الـ CORS أثناء التطوير
      },
      body: JSON.stringify({ success: true, result })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message })
    };
  }
};

