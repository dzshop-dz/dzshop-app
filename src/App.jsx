import { useState, useRef, useEffect } from "react";
import MerchantCard from "./MerchantCard";

const CATS = [
  {id:"supermarket",ar:"سوبرماركت",fr:"Supermarché",icon:"🛒",color:"#00cc66"},
  {id:"restaurant",ar:"مطاعم",fr:"Restaurants",icon:"🍽️",color:"#ff6b35"},
  {id:"clothes_women",ar:"ملابس نسائية",fr:"Vêtements femmes",icon:"👗",color:"#ff69b4"},
  {id:"clothes_men",ar:"ملابس رجال",fr:"Vêtements hommes",icon:"👔",color:"#4a90d9"},
  {id:"clothes_kids",ar:"ملابس أطفال",fr:"Vêtements enfants",icon:"👶",color:"#ffcc00"},
  {id:"tailoring",ar:"خياطة",fr:"Couture",icon:"🧵",color:"#e879f9"},
  {id:"accessories",ar:"أكسسوارات",fr:"Accessoires",icon:"💍",color:"#c084fc"},
  {id:"cosmetic",ar:"كوسميتيك",fr:"Cosmétiques",icon:"💄",color:"#f472b6"},
  {id:"beauty",ar:"صالونات",fr:"Salons de beauté",icon:"✂️",color:"#fb7185"},
  {id:"cakes",ar:"حلويات",fr:"Pâtisseries",icon:"🎂",color:"#fbbf24"},
  {id:"pharmacy",ar:"صيدليات",fr:"Pharmacies",icon:"💊",color:"#34d399"},
  {id:"furniture",ar:"أفرشة",fr:"Literie & Meubles",icon:"🛋️",color:"#fb923c"},
  {id:"wholesale",ar:"بيع بالجملة",fr:"Vente en gros",icon:"📦",color:"#60a5fa"},
  {id:"phones",ar:"هواتف",fr:"Téléphones",icon:"📱",color:"#a78bfa"},
  {id:"doctor",ar:"أطباء",fr:"Médecins",icon:"🩺",color:"#06b6d4"},
  {id:"realestate",ar:"عقارات",fr:"Immobilier",icon:"🏘️",color:"#f87171"},
  {id:"charity",ar:"جمعيات خيرية",fr:"Associations",icon:"🤲",color:"#10b981"},
  {id:"quran",ar:"مدارس قرآنية",fr:"Écoles coraniques",icon:"📖",color:"#8b5cf6"},
];

const AREAS = [
  {ar:"كل الأحياء",fr:"Tous les quartiers"},
  {ar:"المركز",fr:"Centre-ville"},
];

const DAYS_OPTS = [
  {ar:"كل أيام الأسبوع",fr:"Tous les jours"},
  {ar:"السبت - الخميس",fr:"Samedi - Jeudi"},
  {ar:"السبت - الجمعة",fr:"Samedi - Vendredi"},
  {ar:"الإثنين - الجمعة",fr:"Lundi - Vendredi"},
];

const EMOJIS=["📦","🛒","👗","👔","👶","💍","💄","💊","🛋️","📱","🌸","🧴","👟","🍝","🌻","🥛","🫒","🎂","🍕","🧵","✂️","🍔","💅","🧃","🎁"];
const GALLERY_EMOJIS=["📸","👗","💍","🎂","🍕","🧵","📱","💄","🛋️","👟","🍰","👜"];

const T = {
  ar: {
    appName: "DzShop",
    points: "نقاطك",
    messages: "الرسائل",
    myMessages: "رسائلي",
    conversations: "محادثة",
    noConversations: "ما كاين محادثات بعد",
    openShopHint: "ادخلي لأي محل واضغطي \"💬 محادثة\"",
    youPrefix: "أنتِ: ",
    searchPlaceholder: "ابحث عن محل...",
    all: "الكل",
    registerShop: "+ تسجيل محلك",
    registerShopTitle: "تسجيل محلك",
    freeBanner: "✅ أول 10 منتجات ومعرض صور مجاني تماماً",
    shopNameReq: "اسم المحل *",
    phoneReq: "رقم الهاتف *",
    shopDesc: "وصف المحل",
    workHours: "أوقات العمل (09:00 - 21:00)",
    discountPct: "تخفيض %",
    offerText: "نص العرض",
    hasDeliveryQ: "عندك توصيل؟",
    yes: "✓ نعم",
    no: "لا",
    registerFreeBtn: "سجّل الآن مجاناً ✓",
    back: "← رجوع",
    chat: "💬 محادثة",
    discountBadge: "% تخفيض",
    openNow: "● مفتوح",
    closedNow: "● مغلق",
    requestDelivery: "طلب توصيل",
    fullAddressReq: "عنوانك الكامل *",
    sendDeliveryBtn: "إرسال طلب التوصيل",
    orderSent: "تم إرسال الطلب!",
    shopWillCall: "سيتصل بك قريباً",
    okBtn: "حسناً ✓",
    productsTab: "المنتجات",
    galleryTab: "المعرض",
    infoTab: "معلومات",
    noProducts: "ما كاين منتج — اضغطي ➕ أسفل الشاشة",
    available: "✓ متوفر",
    outOfStock: "✗ نافد",
    currency: "دج",
    commentsBtn: "تعليقات",
    askShopBtn: "اسأل المحل",
    askProductMsg: "السلام عليكم، نحب نسأل على:",
    addGalleryBanner: "أضف صورة جديدة لمعرض السلعة",
    noGallery: "ما كاين صور في المعرض حالياً 📷",
    addReviewBtn: "أضف تقييم (+10 نقاط)",
    beFirstReview: "كوني أول من يقيّم! 🌟",
    reviewCount: "تقييم",
    addReviewTitle: "أضف تقييم",
    namePlaceholder: "الاسم",
    commentPlaceholder: "تعليقك...",
    earnPtsHint: "ستكسبين +10 نقاط",
    sendBtn: "إرسال ✓",
    areaLabel: "📍 الحي",
    phoneLabel: "📞 الهاتف",
    hoursLabel: "⏰ أوقات العمل",
    daysLabel: "📅 أيام العمل",
    productsCountLabel: "📦 منتجات",
    galleryCountLabel: "📷 صور المعرض",
    deliveryLabel: "🛵 توصيل",
    openMaps: "🗺️ فتح في Google Maps",
    addProductFab: "➕ أضف منتج",
    addGalleryFab: "📷 أضف لمعرض",
    addProductTitle: "➕ إضافة منتج",
    prodNameReq: "اسم المنتج *",
    prodPriceReq: "السعر (دج) *",
    shortDesc: "وصف قصير",
    optDiscount: "تخفيض % (اختياري)",
    availableNowQ: "متوفر الآن؟",
    freeQuota: "منتجات مجانية",
    limitReached: "🔒 تجاوزت الحد المجاني",
    publishProduct: "نشر المنتج ✓",
    upgradeTitle: "ارقِ للباقة المدفوعة",
    upgradeDesc: "وصلتِ لحد 10 منتجات مجانية، للاستمرار في النشر يرجى تفعيل الاشتراك",
    upgF1: "منتجات ومعرض غير محدود",
    upgF2: "ظهور في الأول",
    upgF3: "شارة موثق",
    upgF4: "إحصائيات متقدمة",
    pricePerMonth: "500 دج / شهر",
    later: "لاحقاً",
    addPhotoTitle: "📷 إضافة صورة لمعرض السلعة",
    photoTitlePl: "عنوان الصورة أو الوصف (مثال: موديل جديد قندورة عصرية)",
    publishGallery: "نشر في المعرض ✓",
    commentsTitle: "💬 تعليقات:",
    noCommentsYet: "ما كاين تعليق بعد، كوني أول وحدة 💬",
    yourNameReq: "اسمك *",
    writeCommentPl: "اكتبي تعليقك...",
    sendCommentBtn: "إرسال التعليق ✓",
    welcomeChat: "مرحباً! كيف يمكنني مساعدتك؟",
    typeMessagePl: "اكتب رسالة...",
    reportSent: "تم إرسال البلاغ",
  },
  fr: {
    appName: "DzShop",
    points: "Vos points",
    messages: "Messages",
    myMessages: "Mes messages",
    conversations: "conversation(s)",
    noConversations: "Aucune conversation pour le moment",
    openShopHint: "Ouvrez une boutique et cliquez sur \"💬 Discussion\"",
    youPrefix: "Vous : ",
    searchPlaceholder: "Rechercher une boutique...",
    all: "Tout",
    registerShop: "+ Inscrire votre boutique",
    registerShopTitle: "Inscrire votre boutique",
    freeBanner: "✅ Les 10 premiers produits et la galerie sont gratuits",
    shopNameReq: "Nom de la boutique *",
    phoneReq: "Numéro de téléphone *",
    shopDesc: "Description de la boutique",
    workHours: "Horaires (09:00 - 21:00)",
    discountPct: "Réduction %",
    offerText: "Texte de l'offre",
    hasDeliveryQ: "Livraison disponible ?",
    yes: "✓ Oui",
    no: "Non",
    registerFreeBtn: "S'inscrire gratuitement ✓",
    back: "← Retour",
    chat: "💬 Discussion",
    discountBadge: "% de réduction",
    openNow: "● Ouvert",
    closedNow: "● Fermé",
    requestDelivery: "Commander la livraison",
    fullAddressReq: "Votre adresse complète *",
    sendDeliveryBtn: "Envoyer la demande",
    orderSent: "Demande envoyée !",
    shopWillCall: "La boutique vous contactera bientôt",
    okBtn: "D'accord ✓",
    productsTab: "Produits",
    galleryTab: "Galerie",
    infoTab: "Infos",
    noProducts: "Aucun produit — cliquez sur ➕ en bas",
    available: "✓ Disponible",
    outOfStock: "✗ Épuisé",
    currency: "DA",
    commentsBtn: "Avis",
    askShopBtn: "Demander",
    askProductMsg: "Bonjour, je voudrais des infos sur :",
    addGalleryBanner: "Ajouter une photo à la galerie",
    noGallery: "Aucune photo dans la galerie 📷",
    addReviewBtn: "Ajouter un avis (+10 pts)",
    beFirstReview: "Soyez le premier à noter ! 🌟",
    reviewCount: "avis",
    addReviewTitle: "Ajouter un avis",
    namePlaceholder: "Votre nom",
    commentPlaceholder: "Votre commentaire...",
    earnPtsHint: "Vous gagnerez +10 points",
    sendBtn: "Envoyer ✓",
    areaLabel: "📍 Quartier",
    phoneLabel: "📞 Téléphone",
    hoursLabel: "⏰ Horaires",
    daysLabel: "📅 Jours",
    productsCountLabel: "📦 Produits",
    galleryCountLabel: "📷 Photos galerie",
    deliveryLabel: "🛵 Livraison",
    openMaps: "🗺️ Ouvrir dans Google Maps",
    addProductFab: "➕ Produit",
    addGalleryFab: "📷 Galerie",
    addProductTitle: "➕ Ajouter un produit",
    prodNameReq: "Nom du produit *",
    prodPriceReq: "Prix (DA) *",
    shortDesc: "Courte description",
    optDiscount: "Réduction % (optionnel)",
    availableNowQ: "Disponible maintenant ?",
    freeQuota: "produits gratuits",
    limitReached: "🔒 Limite gratuite atteinte",
    publishProduct: "Publier le produit ✓",
    upgradeTitle: "Passer à l'offre Pro",
    upgradeDesc: "Vous avez atteint la limite de 10 produits gratuits. Activez l'abonnement pour continuer.",
    upgF1: "Produits et galerie illimités",
    upgF2: "Affichage en priorité",
    upgF3: "Badge vérifié",
    upgF4: "Statistiques avancées",
    pricePerMonth: "500 DA / mois",
    later: "Plus tard",
    addPhotoTitle: "📷 Ajouter une photo",
    photoTitlePl: "Titre ou description de la photo",
    publishGallery: "Publier dans la galerie ✓",
    commentsTitle: "💬 Commentaires :",
    noCommentsYet: "Aucun commentaire pour le moment 💬",
    yourNameReq: "Votre nom *",
    writeCommentPl: "Écrivez votre commentaire...",
    sendCommentBtn: "Envoyer ✓",
    welcomeChat: "Bonjour ! Comment puis-je vous aider ?",
    typeMessagePl: "Écrire un message...",
    reportSent: "Signalement envoyé",
  },
};

const INITIAL_SHOPS = [
  {
    id: 1,
    name: "محل أم البواقي العصري",
    nameFr: "Boutique Moderne Oum El Bouaghi",
    category: "clothes_women",
    phone: "0550000000",
    desc: "أحدث موديلات الملابس النسائية والخياطة العصرية",
    descFr: "Derniers modèles de vêtements pour femmes et couture moderne",
    hours: "09:00 - 21:00",
    days: "السبت - الخميس",
    hasDelivery: true,
    area: "المركز",
    discount: 10,
    offerText: "تخفيض افتتاحي",
    distance: "1.2 كم",
    rating: 4.8,
    verified: true,
    plan: "free",
    onDuty: false,
    products: [],
    gallery: [],
    reviews: [],
  },
];

const G=(d)=>({
  bg:d?"#0f0f1a":"#f0f4f8",bg2:d?"#1a1a2e":"#fff",bg3:d?"#16213e":"#e8edf5",
  card:d?"linear-gradient(135deg,#1a1a2e,#16213e)":"linear-gradient(135deg,#fff,#f0a5000d)",
  border:d?"#2a2a4a":"#dde3ed",text:d?"#fff":"#1a1a2e",t2:d?"#aaa":"#666",
  accent:"#f0a500",fn:"'Cairo',sans-serif",sh:d?"0 4px 20px #00000044":"0 2px 12px #00000011",
});

function Modal({onClose,children,g,lang}){
  return(
    <div style={{position:"fixed",inset:0,background:"#000b",zIndex:999,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{background:g.card,borderRadius:"24px 24px 0 0",padding:"24px 20px 44px",width:"100%",maxWidth:430,border:`1px solid ${g.border}`,direction:lang==="ar"?"rtl":"ltr",fontFamily:g.fn,maxHeight:"92vh",overflowY:"auto",color:g.text}}>
        {children}
      </div>
    </div>
  );
}

function UpgModal({onClose,g,t,lang}){
  return(
    <Modal onClose={onClose} g={g} lang={lang}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:48}}>💎</div>
        <div style={{fontSize:20,fontWeight:800,color:g.accent}}>{t.upgradeTitle}</div>
        <div style={{fontSize:13,color:g.t2,marginTop:4}}>{t.upgradeDesc}</div>
      </div>
      {[["📦",t.upgF1],["⭐",t.upgF2],["✅",t.upgF3],["📊",t.upgF4]].map(([ic,tx],k)=>(
        <div key={k} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${g.border}44`}}>
          <span style={{fontSize:20}}>{ic}</span><span style={{fontSize:14}}>{tx}</span>
          <span style={{marginInlineStart:"auto",color:"#00ff88",fontSize:16}}>✓</span>
        </div>
      ))}
      <div style={{background:"linear-gradient(135deg,#f0a500,#e67e00)",borderRadius:16,padding:16,textAlign:"center",margin:"20px 0 12px"}}>
        <div style={{fontSize:24,fontWeight:900,color:"#fff"}}>{t.pricePerMonth}</div>
      </div>
      <button onClick={onClose} style={{width:"100%",background:g.bg3,border:"none",borderRadius:14,padding:14,color:g.t2,fontSize:14,cursor:"pointer",fontFamily:g.fn}}>{t.later}</button>
    </Modal>
  );
}

function AddProductModal({onClose,onAdd,count,g,t,lang}){
  const[form,setF]=useState({name:"",price:"",desc:"",image:"📦",available:true,discount:0});
  const[showUp,setShowUp]=useState(false);
  const today=new Date().toDateString();
  return(<>
    {showUp&&<UpgModal onClose={()=>setShowUp(false)} g={g} t={t} lang={lang}/>}
    <Modal onClose={onClose} g={g} lang={lang}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontSize:17,fontWeight:800,color:g.accent}}>{t.addProductTitle}</div>
        <button onClick={onClose} style={{background:g.bg3,border:"none",borderRadius:8,padding:"4px 10px",color:g.t2,cursor:"pointer",fontSize:16}}>✕</button>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
        {EMOJIS.map(e=>(
          <button key={e} onClick={()=>setF({...form,image:e})}
            style={{background:form.image===e?"#f0a50033":g.bg3,border:form.image===e?"2px solid #f0a500":"2px solid transparent",borderRadius:10,padding:"5px 7px",fontSize:20,cursor:"pointer"}}>
            {e}
          </button>
        ))}
      </div>
      {[[t.prodNameReq,"name","text"],[t.prodPriceReq,"price","number"],[t.shortDesc,"desc","text"]].map(([pl,k,tp])=>(
        <input key={k} placeholder={pl} type={tp} value={form[k]} onChange={e=>setF({...form,[k]:e.target.value})}
          style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
      ))}
      <input placeholder={t.optDiscount} type="number" value={form.discount||""} onChange={e=>setF({...form,discount:Number(e.target.value)})}
        style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:12,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px",background:g.bg3,borderRadius:12,marginBottom:14}}>
        <span style={{fontSize:14}}>{t.availableNowQ}</span>
        <button onClick={()=>setF({...form,available:!form.available})}
          style={{background:form.available?"#00ff8822":"#ff444422",border:`1px solid ${form.available?"#00ff88":"#ff4444"}`,borderRadius:20,padding:"6px 18px",color:form.available?"#00ff88":"#ff4444",cursor:"pointer",fontFamily:g.fn,fontWeight:700}}>
          {form.available?t.available:t.outOfStock}
        </button>
      </div>
      <div style={{fontSize:12,color:g.t2,marginBottom:10,textAlign:"center"}}>{count}/10 {t.freeQuota}</div>
      <button onClick={()=>{if(!form.name||!form.price)return;if(count>=10){setShowUp(true);return;}onAdd({...form,price:Number(form.price),id:Date.now(),status:"approved",addedDate:today});onClose();}}
        style={{width:"100%",background:count>=10?"#2a2a4a":"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
        {count>=10?t.limitReached:t.publishProduct}
      </button>
    </Modal>
  </>);
}

function AddGalleryModal({onClose,onAddPhoto,g,t,lang}){
  const[title,setTitle]=useState("");
  const[icon,setIcon]=useState("📸");
  return(
    <Modal onClose={onClose} g={g} lang={lang}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontSize:17,fontWeight:800,color:g.accent}}>{t.addPhotoTitle}</div>
        <button onClick={onClose} style={{background:g.bg3,border:"none",borderRadius:8,padding:"4px 10px",color:g.t2,cursor:"pointer",fontSize:16}}>✕</button>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
        {GALLERY_EMOJIS.map(e=>(
          <button key={e} onClick={()=>setIcon(e)}
            style={{background:icon===e?"#f0a50033":g.bg3,border:icon===e?"2px solid #f0a500":"2px solid transparent",borderRadius:10,padding:"5px 7px",fontSize:22,cursor:"pointer"}}>
            {e}
          </button>
        ))}
      </div>
      <input placeholder={t.photoTitlePl} value={title} onChange={e=>setTitle(e.target.value)}
        style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:16,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
      <button onClick={()=>{if(!title.trim())return;onAddPhoto({id:Date.now(),title:title.trim(),icon,date:new Date().toLocaleDateString(lang==="ar"?"ar":"fr")});onClose();}}
        style={{width:"100%",background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
        {t.publishGallery}
      </button>
    </Modal>
  );
}

function RegShopModal({onClose,onReg,g,t,lang}){
  const[f,setF]=useState({name:"",category:"supermarket",phone:"",desc:"",hours:"09:00 - 21:00",days:"السبت - الخميس",hasDelivery:false,area:"المركز",discount:0,offerText:""});
  const today=new Date().toDateString();
  const inp=(pl,k,tp="text")=>(
    <input key={k} placeholder={pl} type={tp} value={f[k]} onChange={e=>setF({...f,[k]:tp==="number"?Number(e.target.value):e.target.value})}
      style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
  );
  return(
    <Modal onClose={onClose} g={g} lang={lang}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
        <div style={{fontSize:17,fontWeight:800,color:g.accent}}>🏪 {t.registerShopTitle}</div>
        <button onClick={onClose} style={{background:g.bg3,border:"none",borderRadius:8,padding:"4px 10px",color:g.t2,cursor:"pointer",fontSize:16}}>✕</button>
      </div>
      <div style={{background:"#00ff8811",border:"1px solid #00ff8833",borderRadius:12,padding:10,marginBottom:14,fontSize:13,color:"#00ff88",textAlign:"center"}}>{t.freeBanner}</div>
      {inp(t.shopNameReq,"name")}
      {inp(t.phoneReq,"phone")}
      {inp(t.shopDesc,"desc")}
      {inp(t.workHours,"hours")}
      <select value={f.category} onChange={e=>setF({...f,category:e.target.value})}
        style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}>
        {CATS.filter(c=>c.id!=="doctor"&&c.id!=="realestate").map(o=>(
          <option key={o.id} value={o.id}>{o.icon} {lang==="ar"?o.ar:o.fr}</option>
        ))}
      </select>
      <select value={f.area} onChange={e=>setF({...f,area:e.target.value})}
        style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}>
        {AREAS.slice(1).map(a=>(
          <option key={a.ar} value={a.ar}>{lang==="ar"?a.ar:a.fr}</option>
        ))}
      </select>
      <select value={f.days} onChange={e=>setF({...f,days:e.target.value})}
        style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}>
        {DAYS_OPTS.map(d=>(
          <option key={d.ar} value={d.ar}>{lang==="ar"?d.ar:d.fr}</option>
        ))}
      </select>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        {inp(t.discountPct,"discount","number")}
        {inp(t.offerText,"offerText")}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,padding:"12px",background:g.bg3,borderRadius:12}}>
        <span style={{fontSize:14}}>🛵 {t.hasDeliveryQ}</span>
        <button onClick={()=>setF({...f,hasDelivery:!f.hasDelivery})}
          style={{background:f.hasDelivery?"#00ff8822":"#2a2a4a",border:`1px solid ${f.hasDelivery?"#00ff88":g.border}`,borderRadius:20,padding:"6px 18px",color:f.hasDelivery?"#00ff88":g.t2,cursor:"pointer",fontFamily:g.fn,fontWeight:700}}>
          {f.hasDelivery?t.yes:t.no}
        </button>
      </div>
      <button onClick={()=>{if(!f.name||!f.phone)return;onReg({id:Date.now(),...f,distance:"—",rating:5,verified:false,plan:"free",onDuty:false,products:[],gallery:[],reviews:[],addedDate:today});onClose();}}
        style={{width:"100%",background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
        {t.registerFreeBtn}
      </button>
    </Modal>
  );
}

function RevModal({onClose,onSubmit,g,addPts,t,lang}){
  const[stars,setSt]=useState(5);
  const[comment,setCm]=useState("");
  const[name,setNm]=useState("");
  return(
    <Modal onClose={onClose} g={g} lang={lang}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
        <div style={{fontSize:17,fontWeight:800,color:g.accent}}>⭐ {t.addReviewTitle}</div>
        <button onClick={onClose} style={{background:g.bg3,border:"none",borderRadius:8,padding:"4px 10px",color:g.t2,cursor:"pointer",fontSize:16}}>✕</button>
      </div>
      <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:14}}>
        {[1,2,3,4,5].map(s=><button key={s} onClick={()=>setSt(s)} style={{background:"none",border:"none",fontSize:32,cursor:"pointer",filter:s<=stars?"none":"grayscale(1)"}}>⭐</button>)}
      </div>
      {[[t.namePlaceholder,name,setNm],[t.commentPlaceholder,comment,setCm]].map(([pl,v,sv],i)=>(
        <input key={i} placeholder={pl} value={v} onChange={e=>sv(e.target.value)}
          style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
      ))}
      <div style={{background:"#f0a50011",borderRadius:10,padding:8,fontSize:12,color:g.accent,marginBottom:14,textAlign:"center"}}>🏆 {t.earnPtsHint}</div>
      <button onClick={()=>{if(!name)return;onSubmit({id:Date.now(),stars,comment,name,date:new Date().toLocaleDateString(lang==="ar"?"ar":"fr")});addPts(10);onClose();}}
        style={{width:"100%",background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
        {t.sendBtn}
      </button>
    </Modal>
  );
}

function ProdCommentsModal({prod,onClose,onAdd,g,t,lang}){
  const[name,setName]=useState("");
  const[text,setText]=useState("");
  const list=prod.comments||[];
  const inp={width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"};
  const send=()=>{
    if(!name.trim()||!text.trim())return;
    onAdd(prod.id,{id:Date.now(),name:name.trim(),text:text.trim(),date:new Date().toLocaleDateString(lang==="ar"?"ar":"fr")});
    setText("");
  };
  return(
    <Modal onClose={onClose} g={g} lang={lang}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
        <div style={{fontSize:16,fontWeight:800,color:g.accent}}>{t.commentsTitle} {prod.image} {prod.name}</div>
        <button onClick={onClose} style={{background:g.bg3,border:"none",borderRadius:8,padding:"4px 10px",color:g.t2,cursor:"pointer",fontSize:16}}>✕</button>
      </div>
      <div style={{maxHeight:"38vh",overflowY:"auto",marginBottom:12}}>
        {list.length===0?<div style={{textAlign:"center",padding:"24px",color:g.t2,fontSize:14}}>{t.noCommentsYet}</div>:list.map(c=>(
          <div key={c.id} style={{background:g.bg3,borderRadius:14,padding:12,marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontWeight:700,fontSize:13}}>{c.name}</span>
              <span style={{color:g.t2,fontSize:11}}>{c.date}</span>
            </div>
            <div style={{fontSize:14}}>{c.text}</div>
          </div>
        ))}
      </div>
      <input placeholder={t.yourNameReq} value={name} onChange={e=>setName(e.target.value)} style={inp}/>
      <input placeholder={t.writeCommentPl} value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} style={inp}/>
      <button onClick={send} style={{width:"100%",background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>{t.sendCommentBtn}</button>
    </Modal>
  );
}

function ChatScreen({shop,msgs,initial,onSend,onBack,g,t,lang}){
  const[inp,setInp]=useState(initial||"");
  const btm=useRef(null);
  const cat=CATS.find(c=>c.id===shop.category);
  const shopName=lang==="fr"&&shop.nameFr?shop.nameFr:shop.name;
  const all=[{id:0,from:"shop",text:t.welcomeChat},...msgs];
  useEffect(()=>{btm.current?.scrollIntoView({behavior:"smooth"});},[msgs]);
  const send=()=>{
    if(!inp.trim())return;
    onSend(inp.trim());
    setInp("");
  };
  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:lang==="ar"?"rtl":"ltr",display:"flex",flexDirection:"column"}}>
      <div style={{background:g.card,padding:"14px 16px",borderBottom:`1px solid ${g.border}`,display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:10}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:20,cursor:"pointer"}}>←</button>
        <div style={{background:`${cat?.color}22`,borderRadius:12,width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{cat?.icon}</div>
        <div><div style={{fontWeight:800,fontSize:15}}>{shopName}</div><div style={{color:g.t2,fontSize:12}}>📞 {shop.phone}</div></div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"14px 16px",paddingBottom:80}}>
        {all.map(m=>(
          <div key={m.id} style={{display:"flex",justifyContent:m.from==="user"?"flex-start":"flex-end",marginBottom:12}}>
            <div style={{background:m.from==="user"?"linear-gradient(135deg,#f0a500,#e67e00)":g.bg3,borderRadius:m.from==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",padding:"10px 14px",maxWidth:"75%"}}>
              <div style={{fontSize:14,color:m.from==="user"?"#fff":g.text}}>{m.text}</div>
            </div>
          </div>
        ))}
        <div ref={btm}/>
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:g.card,borderTop:`1px solid ${g.border}`,padding:"10px 16px",display:"flex",gap:8}}>
        <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder={t.typeMessagePl}
          style={{flex:1,background:g.bg,border:`1px solid ${g.border}`,borderRadius:22,padding:"10px 16px",color:g.text,fontFamily:g.fn,fontSize:14,outline:"none"}}/>
        <button onClick={send} style={{background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:"50%",width:44,height:44,color:"#fff",fontSize:18,cursor:"pointer",flexShrink:0}}>↑</button>
      </div>
    </div>
  );
}

function MessagesScreen({onBack,shops,chats,onOpen,g,t,lang}){
  const rows=shops.filter(sh=>(chats[sh.id]||[]).length>0)
    .sort((x,y)=>chats[y.id][chats[y.id].length-1].id-chats[x.id][chats[x.id].length-1].id);
  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:lang==="ar"?"rtl":"ltr",maxWidth:430,margin:"0 auto"}}>
      <div style={{background:`linear-gradient(160deg,#f0a50033,${g.bg2})`,padding:"16px",borderBottom:`1px solid ${g.border}`}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:16,cursor:"pointer",fontFamily:g.fn}}>{t.back}</button>
        <div style={{fontSize:20,fontWeight:800,marginTop:8}}>💬 {t.myMessages}</div>
        <div style={{color:g.t2,fontSize:13,marginTop:2}}>{rows.length} {t.conversations}</div>
      </div>
      <div style={{padding:"14px 14px 100px"}}>
        {rows.length===0?(
          <div style={{textAlign:"center",padding:"60px 20px",color:g.t2}}>
            <div style={{fontSize:56,marginBottom:12}}>💬</div>
            <div style={{fontSize:16}}>{t.noConversations}</div>
            <div style={{fontSize:13,marginTop:8}}>{t.openShopHint}</div>
          </div>
        ):rows.map(sh=>{
          const cat=CATS.find(c=>c.id===sh.category);
          const last=chats[sh.id][chats[sh.id].length-1];
          const shopName=lang==="fr"&&sh.nameFr?sh.nameFr:sh.name;
          return(
            <div key={sh.id} onClick={()=>onOpen(sh)} style={{background:g.card,borderRadius:16,padding:14,marginBottom:10,border:`1px solid ${g.border}`,display:"flex",gap:12,alignItems:"center",cursor:"pointer"}}>
              <div style={{background:`${cat?.color}22`,borderRadius:12,width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{cat?.icon}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:800,fontSize:14}}>{shopName}</div>
                <div style={{color:g.t2,fontSize:12,marginTop:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{last.from==="user"?t.youPrefix:""}{last.text}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DelivModal({shop,onClose,g,t,lang}){
  const[addr,setAddr]=useState("");
  const[done,setDone]=useState(false);
  const shopName=lang==="fr"&&shop.nameFr?shop.nameFr:shop.name;
  if(done)return(
    <div style={{position:"fixed",inset:0,background:"#000b",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:g.card,borderRadius:24,padding:32,textAlign:"center",maxWidth:300,width:"100%",border:`1px solid ${g.border}`,direction:lang==="ar"?"rtl":"ltr"}}>
        <div style={{fontSize:64,marginBottom:16}}>🛵</div>
        <div style={{fontSize:20,fontWeight:800,color:"#00ff88",marginBottom:8}}>{t.orderSent}</div>
        <div style={{color:g.t2,fontSize:14,marginBottom:20}}>{t.shopWillCall} ({shopName})</div>
        <button onClick={onClose} style={{background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:"12px 32px",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>{t.okBtn}</button>
      </div>
    </div>
  );
  return(
    <Modal onClose={onClose} g={g} lang={lang}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
        <div style={{fontSize:17,fontWeight:800,color:g.accent}}>🛵 {t.requestDelivery}</div>
        <button onClick={onClose} style={{background:g.bg3,border:"none",borderRadius:8,padding:"4px 10px",color:g.t2,cursor:"pointer",fontSize:16}}>✕</button>
      </div>
      <div style={{background:g.bg3,borderRadius:14,padding:14,marginBottom:14,display:"flex",gap:10,alignItems:"center"}}>
        <span style={{fontSize:22}}>🏪</span>
        <div><div style={{fontWeight:700}}>{shopName}</div><div style={{color:g.t2,fontSize:12}}>📞 {shop.phone}</div></div>
      </div>
      <input placeholder={t.fullAddressReq} value={addr} onChange={e=>setAddr(e.target.value)}
        style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:16,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
      <button onClick={()=>{if(!addr)return;setDone(true);}}
        style={{width:"100%",background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
        🛵 {t.sendDeliveryBtn}
      </button>
    </Modal>
  );
}

function ShopDetail({shop,onBack,onUpdate,onReport,g,favorites,toggleFav,onChat,addPts,t,lang}){
  const cat=CATS.find(c=>c.id===shop.category);
  const[products,setProducts]=useState(shop.products||[]);
  const[gallery,setGallery]=useState(shop.gallery||[]);
  const[reviews,setReviews]=useState(shop.reviews||[]);
  const[showAdd,setShowAdd]=useState(false);
  const[showGalAdd,setShowGalAdd]=useState(false);
  const[showRev,setShowRev]=useState(false);
  const[showDeliv,setShowDeliv]=useState(false);
  const[tab,setTab]=useState("products");
  const[reported,setReported]=useState(false);
  const[commProd,setCommProd]=useState(null);
  const isFav=favorites.includes(shop.id);
  const avg=reviews.length?(reviews.reduce((a,r)=>a+r.stars,0)/reviews.length).toFixed(1):shop.rating;
  const approved=products.filter(p=>!p.status||p.status==="approved");
  const shopName=lang==="fr"&&shop.nameFr?shop.nameFr:shop.name;
  const shopDesc=lang==="fr"&&shop.descFr?shop.descFr:shop.desc;
  const areaObj=AREAS.find(a=>a.ar===shop.area);
  const areaLabel=areaObj?(lang==="ar"?areaObj.ar:areaObj.fr):(shop.area||"—");
  const daysObj=DAYS_OPTS.find(d=>d.ar===shop.days);
  const daysLabel=daysObj?(lang==="ar"?daysObj.ar:daysObj.fr):shop.days;

  const addProd=p=>{const u=[...products,p];setProducts(u);onUpdate({...shop,products:u});};
  const addPhoto=ph=>{const u=[...gallery,ph];setGallery(u);onUpdate({...shop,gallery:u});};
  const addRev=r=>{const u=[...reviews,r];setReviews(u);onUpdate({...shop,reviews:u});};
  const addProdComment=(pid,c)=>{const u=products.map(p=>p.id===pid?{...p,comments:[...(p.comments||[]),c]}:p);setProducts(u);onUpdate({...shop,products:u});};
  const isOpen=()=>{try{const[sh,eh]=shop.hours.split(" - ").map(x=>parseInt(x));const h=new Date().getHours();return h>=sh&&h<eh;}catch{return true;}};
  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:lang==="ar"?"rtl":"ltr"}}>
      {showAdd&&<AddProductModal onClose={()=>setShowAdd(false)} onAdd={addProd} count={products.length} g={g} t={t} lang={lang}/>}
      {showGalAdd&&<AddGalleryModal onClose={()=>setShowGalAdd(false)} onAddPhoto={addPhoto} g={g} t={t} lang={lang}/>}
      {showRev&&<RevModal onClose={()=>setShowRev(false)} onSubmit={addRev} g={g} addPts={addPts} t={t} lang={lang}/>}
      {showDeliv&&<DelivModal shop={shop} onClose={()=>setShowDeliv(false)} g={g} t={t} lang={lang}/>}
      {commProd&&products.find(x=>x.id===commProd)&&<ProdCommentsModal prod={products.find(x=>x.id===commProd)} onClose={()=>setCommProd(null)} onAdd={addProdComment} g={g} t={t} lang={lang}/>}
      
      <div style={{background:`linear-gradient(160deg,${cat?.color}44,${g.bg2})`,padding:"16px 16px 0",borderBottom:`1px solid ${g.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:16,cursor:"pointer",fontFamily:g.fn}}>{t.back}</button>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button onClick={()=>toggleFav(shop.id)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer"}}>{isFav?"❤️":"🤍"}</button>
            <button onClick={()=>{navigator.share?.({title:shopName});addPts(5);}} style={{background:"none",border:"none",fontSize:22,cursor:"pointer"}}>📤</button>
            <button onClick={()=>onChat(shop)} style={{background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:20,padding:"6px 14px",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>{t.chat}</button>
            <button onClick={()=>{if(!reported){setReported(true);onReport(shop.id);}}} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:reported?"#ff4444":"inherit"}}>{reported?"⚑":"🚩"}</button>
          </div>
        </div>
        <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:12}}>
          <div style={{background:`${cat?.color}22`,borderRadius:18,width:62,height:62,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0,border:`2px solid ${cat?.color}55`}}>{cat?.icon}</div>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
              <span style={{fontSize:18,fontWeight:800}}>{shopName}</span>
              {shop.verified&&<span style={{color:"#00ff88"}}>✅</span>}
              {shop.hasDelivery&&<span style={{background:"#06b6d422",color:"#06b6d4",fontSize:11,padding:"2px 8px",borderRadius:10,fontWeight:700}}>🛵</span>}
              {shop.discount>0&&<span style={{background:"#ff6b3522",color:"#ff6b35",fontSize:11,padding:"2px 8px",borderRadius:10,fontWeight:700}}>{shop.discount}{t.discountBadge}</span>}
            </div>
            {shopDesc&&<div style={{color:g.t2,fontSize:13,marginTop:3}}>{shopDesc}</div>}
            <div style={{display:"flex",gap:10,marginTop:6,flexWrap:"wrap",alignItems:"center"}}>
              <span style={{fontSize:12,color:g.t2}}>📍 {areaLabel}</span>
              <span style={{fontSize:13,color:g.accent,fontWeight:700}}>⭐ {avg}</span>
              <span style={{fontSize:12,background:isOpen()?"#00ff8822":"#ff444422",color:isOpen()?"#00ff88":"#ff4444",padding:"2px 8px",borderRadius:10}}>{isOpen()?t.openNow:t.closedNow}</span>
            </div>
          </div>
        </div>
        
        <div style={{marginBottom:10}}>
          <MerchantCard merchantName={shopName} merchantPhone={shop.phone} />
        </div>

        {shop.hasDelivery&&<button onClick={()=>setShowDeliv(true)} style={{width:"100%",background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:14,padding:"11px",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:g.fn,marginBottom:10}}>🛵 {t.requestDelivery}</button>}

        <div style={{display:"flex",borderTop:`1px solid ${g.border}`}}>
          {[["products",`🛍️ ${t.productsTab} (${approved.length})`],["gallery",`📷 ${t.galleryTab} (${gallery.length})`],["reviews",`⭐ (${reviews.length})`],["info","ℹ️"]].map(([id,lbl])=>(
            <button key={id} onClick={()=>setTab(id)}
              style={{flex:1,background:"none",border:"none",color:tab===id?g.accent:g.t2,fontSize:12,padding:"11px 4px",cursor:"pointer",fontFamily:g.fn,fontWeight:700,borderBottom:tab===id?`2px solid ${g.accent}`:"2px solid transparent"}}>
              {lbl}
            </button>
          ))}
        </div>
      </div>
      <div style={{padding:"14px 14px 100px"}}>
        {tab==="products"&&(approved.length===0?
          <div style={{textAlign:"center",padding:"50px 20px",color:g.t2}}><div style={{fontSize:48,marginBottom:12}}>📦</div><div>{t.noProducts}</div></div>
        :approved.map(p=>(
          <div key={p.id} style={{background:g.card,borderRadius:16,padding:14,marginBottom:10,border:`1px solid ${g.border}`}}>
           <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{fontSize:30,background:g.bg,borderRadius:12,width:50,height:50,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                {p.image}
                {p.discount>0&&<div style={{position:"absolute",top:-4,right:-4,background:"#ff6b35",color:"#fff",fontSize:9,fontWeight:700,borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center"}}>-{p.discount}%</div>}
              </div>
              <div>
                <div style={{fontWeight:700,fontSize:14}}>{p.name}</div>
                {p.desc&&<div style={{color:g.t2,fontSize:11,marginTop:1}}>{p.desc}</div>}
                <div style={{color:g.accent,fontSize:16,fontWeight:800,marginTop:3}}>
                  {p.discount>0?Math.round(p.price*(1-p.discount/100)).toLocaleString():p.price?.toLocaleString()} {t.currency}
                </div>
              </div>
            </div>
            <div style={{background:p.available?"#00ff8822":"#ff444422",color:p.available?"#00ff88":"#ff4444",padding:"5px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>
              {p.available?t.available:t.outOfStock}
            </div>
           </div>
           <div style={{display:"flex",gap:8,marginTop:12,paddingTop:10,borderTop:`1px solid ${g.border}44`}}>
             <button onClick={()=>setCommProd(p.id)} style={{flex:1,background:g.bg3,border:"none",borderRadius:12,padding:"8px",color:g.text,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>💬 {t.commentsBtn} ({(p.comments||[]).length})</button>
             <button onClick={()=>onChat(shop,`${t.askProductMsg} ${p.name}`)} style={{flex:1,background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:12,padding:"8px",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>✉️ {t.askShopBtn}</button>
           </div>
          </div>
        )))}

        {tab==="gallery"&&(<>
          <button onClick={()=>setShowGalAdd(true)}
            style={{width:"100%",background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:12,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:g.fn,marginBottom:14}}>
            📷 {t.addGalleryBanner}
          </button>
          {gallery.length===0?<div style={{textAlign:"center",padding:"40px",color:g.t2}}>{t.noGallery}</div>:
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {gallery.map(ph=>(
                <div key={ph.id} style={{background:g.card,borderRadius:16,padding:14,border:`1px solid ${g.border}`,textAlign:"center"}}>
                  <div style={{fontSize:48,marginBottom:8}}>{ph.icon}</div>
                  <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>{ph.title}</div>
                  <div style={{color:g.t2,fontSize:10}}>{ph.date}</div>
                </div>
              ))}
            </div>
          }
        </>)}

        {tab==="reviews"&&(<>
          <div style={{background:g.card,borderRadius:16,padding:16,marginBottom:14,border:`1px solid ${g.border}`,textAlign:"center"}}>
            <div style={{fontSize:44,fontWeight:900,color:g.accent}}>{avg}</div>
            <div style={{fontSize:22}}>{"⭐".repeat(Math.round(Number(avg)))}</div>
            <div style={{color:g.t2,fontSize:13}}>{reviews.length} {t.reviewCount}</div>
          </div>
          <button onClick={()=>setShowRev(true)}
            style={{width:"100%",background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:12,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:g.fn,marginBottom:14}}>
            ⭐ {t.addReviewBtn}
          </button>
          {reviews.length===0?<div style={{textAlign:"center",padding:"30px",color:g.t2}}>{t.beFirstReview}</div>:reviews.map(r=>(
            <div key={r.id} style={{background:g.card,borderRadius:14,padding:14,marginBottom:10,border:`1px solid ${g.border}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{fontWeight:700}}>{r.name}</span>
                <span style={{color:g.t2,fontSize:12}}>{r.date}</span>
              </div>
              <div style={{marginBottom:4}}>{"⭐".repeat(r.stars)}</div>
              {r.comment&&<div style={{color:g.t2,fontSize:14}}>{r.comment}</div>}
            </div>
          ))}
        </>)}

        {tab==="info"&&(
          <div style={{background:g.card,borderRadius:16,padding:18,border:`1px solid ${g.border}`}}>
            {[[t.areaLabel,areaLabel],[t.phoneLabel,shop.phone],[t.hoursLabel,shop.hours],[t.daysLabel,daysLabel],[t.productsCountLabel,`${approved.length}`],[t.galleryCountLabel,`${gallery.length}`],[t.deliveryLabel,shop.hasDelivery?t.yes:t.no]].map(([l,v],i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${g.border}44`}}>
                <span style={{color:g.t2,fontSize:14}}>{l}</span>
                <span style={{fontWeight:700,fontSize:14}}>{v}</span>
              </div>
            ))}
            <a href={`https://maps.google.com/?q=${encodeURIComponent(shop.name+" أم البواقي")}`} target="_blank" rel="noreferrer"
              style={{display:"block",marginTop:14,background:"linear-gradient(135deg,#34d399,#059669)",borderRadius:14,padding:"11px",color:"#fff",fontSize:14,fontWeight:700,textAlign:"center",textDecoration:"none"}}>
              {t.openMaps}
            </a>
          </div>
        )}
      </div>

      <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",display:"flex",gap:8,width:"calc(100% - 40px)",maxWidth:360,zIndex:10}}>
        <button onClick={()=>setShowAdd(true)}
          style={{flex:1,background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:18,padding:"12px 10px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:g.fn,boxShadow:"0 4px 20px #f0a50066"}}>
          {t.addProductFab}
        </button>
        <button onClick={()=>setShowGalAdd(true)}
          style={{flex:1,background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:18,padding:"12px 10px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:g.fn,boxShadow:"0 4px 20px #06b6d466"}}>
          {t.addGalleryFab}
        </button>
      </div>
    </div>
  );
}

function App(){
  const[dark,setDark]=useState(true);
  const[lang,setLang]=useState("ar");
  const[shops,setShops]=useState(INITIAL_SHOPS);
  const[selectedShopId,setSelectedShopId]=useState(null);
  const[showReg,setShowReg]=useState(false);
  const[showMsgs,setShowMsgs]=useState(false);
  const[chatTarget,setChatTarget]=useState(null);
  const[chats,setChats]=useState({});
  const[favorites,setFavorites]=useState([]);
  const[pts,setPts]=useState(0);
  const[search,setSearch]=useState("");
  const[catFilter,setCatFilter]=useState("all");

  const g=G(dark);
  const t=T[lang];
  const selectedShop=shops.find(s=>s.id===selectedShopId)||null;

  const updateShop=(updated)=>setShops(prev=>prev.map(s=>s.id===updated.id?updated:s));
  const toggleFav=(id)=>setFavorites(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  const openChat=(shop,initial="")=>setChatTarget({shop,initial});
  const sendMsg=(shopId,text)=>setChats(prev=>({...prev,[shopId]:[...(prev[shopId]||[]),{id:Date.now(),from:"user",text}]}));

  if(chatTarget){
    return(
      <div style={{maxWidth:430,margin:"0 auto"}}>
        <ChatScreen
          shop={chatTarget.shop}
          msgs={chats[chatTarget.shop.id]||[]}
          initial={chatTarget.initial}
          onSend={(txt)=>sendMsg(chatTarget.shop.id,txt)}
          onBack={()=>setChatTarget(null)}
          g={g}
          t={t}
          lang={lang}
        />
      </div>
    );
  }

  if(showMsgs){
    return(
      <MessagesScreen
        onBack={()=>setShowMsgs(false)}
        shops={shops}
        chats={chats}
        onOpen={(sh)=>{setShowMsgs(false);openChat(sh);}}
        g={g}
        t={t}
        lang={lang}
      />
    );
  }

  if(selectedShop){
    return(
      <div style={{maxWidth:430,margin:"0 auto"}}>
        <ShopDetail
          shop={selectedShop}
          onBack={()=>setSelectedShopId(null)}
          onUpdate={updateShop}
          onReport={()=>alert(t.reportSent)}
          g={g}
          favorites={favorites}
          toggleFav={toggleFav}
          onChat={openChat}
          addPts={(n)=>setPts(p=>p+n)}
          t={t}
          lang={lang}
        />
      </div>
    );
  }

  const filtered=shops.filter(s=>{
    const mCat=catFilter==="all"||s.category===catFilter;
    const q=search.trim().toLowerCase();
    const mQ=!q||s.name.toLowerCase().includes(q)||(s.nameFr&&s.nameFr.toLowerCase().includes(q));
    return mCat&&mQ;
  });

  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:lang==="ar"?"rtl":"ltr",maxWidth:430,margin:"0 auto",paddingBottom:90}}>
      {showReg&&<RegShopModal onClose={()=>setShowReg(false)} onReg={(sh)=>setShops(prev=>[sh,...prev])} g={g} t={t} lang={lang}/>}
      <div style={{background:g.card,padding:"16px",borderBottom:`1px solid ${g.border}`,position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div>
            <div style={{fontSize:20,fontWeight:900,color:g.accent}}>{t.appName}</div>
            <div style={{fontSize:12,color:g.t2}}>{t.points}: {pts} ⭐</div>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <button onClick={()=>setLang(l=>l==="ar"?"fr":"ar")} style={{background:g.bg3,border:`1px solid ${g.border}`,borderRadius:12,padding:"8px 10px",color:g.accent,cursor:"pointer",fontFamily:g.fn,fontSize:12,fontWeight:800}}>
              {lang==="ar"?"FR":"عربي"}
            </button>
            <button onClick={()=>setShowMsgs(true)} style={{background:g.bg3,border:"none",borderRadius:12,padding:"8px 12px",color:g.text,cursor:"pointer",fontFamily:g.fn,fontSize:13}}>💬 {t.messages}</button>
            <button onClick={()=>setDark(d=>!d)} style={{background:g.bg3,border:"none",borderRadius:12,padding:"8px 12px",color:g.text,cursor:"pointer",fontSize:14}}>{dark?"☀️":"🌙"}</button>
          </div>
        </div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.searchPlaceholder}
          style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:"10px 14px",color:g.text,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
      </div>

      <div style={{display:"flex",gap:8,overflowX:"auto",padding:"12px 16px"}}>
        <button onClick={()=>setCatFilter("all")}
          style={{background:catFilter==="all"?g.accent:g.bg3,color:catFilter==="all"?"#fff":g.text,border:"none",borderRadius:14,padding:"6px 14px",cursor:"pointer",fontFamily:g.fn,fontSize:12,fontWeight:700,flexShrink:0}}>
          {t.all}
        </button>
        {CATS.map(c=>(
          <button key={c.id} onClick={()=>setCatFilter(c.id)}
            style={{background:catFilter===c.id?g.accent:g.bg3,color:catFilter===c.id?"#fff":g.text,border:"none",borderRadius:14,padding:"6px 12px",cursor:"pointer",fontFamily:g.fn,fontSize:12,fontWeight:700,flexShrink:0}}>
            {c.icon} {lang==="ar"?c.ar:c.fr}
          </button>
        ))}
      </div>

      <div style={{padding:"4px 16px"}}>
        {filtered.map(sh=>{
          const cat=CATS.find(c=>c.id===sh.category);
          const areaObj=AREAS.find(a=>a.ar===sh.area);
          const areaTxt=areaObj?(lang==="ar"?areaObj.ar:areaObj.fr):(sh.area||"—");
          return(
            <div key={sh.id} onClick={()=>setSelectedShopId(sh.id)}
              style={{background:g.card,borderRadius:16,padding:14,marginBottom:12,border:`1px solid ${g.border}`,boxShadow:g.sh,cursor:"pointer",display:"flex",gap:12,alignItems:"center"}}>
              <div style={{background:`${cat?.color}22`,borderRadius:14,width:52,height:52,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>
                {cat?.icon||"🏪"}
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:800,fontSize:15}}>{lang==="fr"&&sh.nameFr?sh.nameFr:sh.name}</div>
                <div style={{color:g.t2,fontSize:12,marginTop:2}}>{lang==="ar"?cat?.ar:cat?.fr} • {areaTxt}</div>
              </div>
              <div style={{color:g.accent,fontWeight:700,fontSize:13}}>⭐ {sh.rating||5}</div>
            </div>
          );
        })}
      </div>

      <button onClick={()=>setShowReg(true)}
        style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:18,padding:"12px 24px",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:g.fn,boxShadow:"0 4px 20px #f0a50066"}}>
        {t.registerShop}
      </button>
    </div>
  );
}

export default App;