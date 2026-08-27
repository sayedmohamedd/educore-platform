export const mediaService = {
  upload: async (formData: FormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/media`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
      body: formData,
    });

    const text = await response.text(); // اقرأ الـ Response كنص الأول
    let json;

    try {
      json = JSON.parse(text); // حاول تحوله لـ JSON
    } catch {
      throw new Error(`Server Error (${response.status}): ${text}`); // لو مش JSON، ارمي النص الحقيقي اللي راجع
    }

    if (!response.ok) {
      throw new Error(json?.message || "فشل رفع الملف، حاول مرة أخرى.");
    }

    return json.data;
  },
};
