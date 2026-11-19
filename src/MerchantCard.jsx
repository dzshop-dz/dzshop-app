import React from "react";

export default function MerchantCard(props) {
  const merchantName = props.merchantName;
  const merchantPhone = props.merchantPhone;
  const cleanPhone = merchantPhone ? merchantPhone.replace(/^0/, "") : "";
  
  const callUrl = "tel:" + merchantPhone;
  const whatsappUrl = "https://wa.me/+213" + cleanPhone + "?text=سلام، راني شفت منتجك في DzShop ومهتم بيه";

  return (
    <div style={{ background: "#fff", padding: "15px", borderRadius: "10px", marginBottom: "15px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
      <h3>{merchantName}</h3>
      <p style={{ color: "#666" }}>الهاتف: {merchantPhone}</p>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        
        <a href={callUrl} style={{ flex: 1, background: "#4CAF50", color: "#fff", padding: "8px", textAlign: "center", borderRadius: "5px", textDecoration: "none", fontWeight: "bold" }}>
          📞 اتصال
        </a>

        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: "#25D366", color: "#fff", padding: "8px", textAlign: "center", borderRadius: "5px", textDecoration: "none", fontWeight: "bold" }}>
          💬 واتساب
        </a>

      </div>
    </div>
  );
}