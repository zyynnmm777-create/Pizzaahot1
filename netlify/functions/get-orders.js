exports.handler = async (event) => {
  try {
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      throw new Error("Google Script URL is not defined in environment variables.");
    }

    const response = await fetch(scriptUrl);
    if (!response.ok) throw new Error("فشل في جلب البيانات من جدول البيانات.");
    
    const orders = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(orders)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

