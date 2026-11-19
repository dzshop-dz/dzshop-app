
import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export default function MerchantRegister() {
const [storeName, setStoreName] = useState("");
const [phone, setPhone] = useState("");
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");

const handleRegisterMerchant = async (e) => {
e.preventDefault();
setLoading(true);

try {
// 1. التحقق إذا كان رقم الهاتف مسجلاً مسبقاً
const q = query(collection(db, "merchants"), where("phone", "==", phone));
const querySnapshot = await getDocs(q);

if (!querySnapshot.empty) {
setMessage("⚠️ هذا الرقم مسجل مسبقاً كتاجر!");
setLoading(false);
return;
}

// 2. تسجيل التاجر مع حدود 10 منشورات واشتراك بـ 50 دج (50000 سنتيم / 500 دج)
await addDoc(collection(db, "merchants"), {
storeName,
phone,
postsCount: 0, // يبدأ بـ 0 منشورات
isSubscribed: false, // لم يسدد الاشتراك بعد
subscriptionPrice: "500 DA / الشهر", // سعر الاشتراك
createdAt: new Date()
});

setMessage("✅ تم تسجيل متجرك بنجاح! لديك 10 منشورات مجانية، ثم اشتراك بـ 50 ألف للشهر.");
} catch (error) {
console.error("خطأ في التسجيل: ", error);
setMessage("❌ حدث خطأ، يرجى المحاولة لاحقاً.");
}
setLoading(false);
};

return (
<div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px", background: "#fff", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
<h2>تسجيل متجر جديد في DzShop</h2>
<p style={{ fontSize: "14px", color: "#666" }}>انشر حتى 10 منتجات مجاناً، ثم استمتع بنشر غير محدود بـ 50 ألف فقط للشهر!</p>

<form onSubmit={handleRegisterMerchant}>
<div style={{ marginBottom: "15px" }}>
<label>اسم المحل / المتجر:</label>
<input 
type="text" 
value={storeName} 
onChange={(e) => setStoreName(e.target.value)} 
required 
style={{ width: "100%", padding: "8px", marginTop: "5px" }}
/>
</div>
<div style={{ marginBottom: "15px" }}>
<label>رقم الهاتف للتواصل والدفع:</label>
<input 
type="text" 
value={phone} 
onChange={(e) => setPhone(e.target.value)} 
required 
style={{ width: "100%", padding: "8px", marginTop: "5px" }}
/>
</div>
<button 
type="submit" 
disabled={loading}
style={{ width: "100%", background: "#ff9800", color: "#fff", padding: "10px", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer" }}
>
{loading ? "جاري التسجيل..." : "تسجيل المتجر"}
</button>
</form>
{message && <p style={{ marginTop: "15px", textAlign: "center", fontWeight: "bold", color: message.includes("✅") ? "green" : "red" }}>{message}</p>}
</div>
);
}