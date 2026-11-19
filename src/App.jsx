import { useState, useRef, useEffect } from "react";

const FREE_POSTS_LIMIT = 10;

const CATS = [
  {id:"supermarket",ar:"سوبرماركت",fr:"Supermarché",icon:"🛒",color:"#00cc66"},
  {id:"restaurant",ar:"مطاعم",fr:"Restaurants",icon:"🍽️",color:"#ff6b35"},
  {id:"clothes_women",ar:"ملابس نسائية",fr:"Mode Femme",icon:"👗",color:"#ff69b4"},
  {id:"clothes_men",ar:"ملابس رجال",fr:"Mode Homme",icon:"👔",color:"#4a90d9"},
  {id:"clothes_kids",ar:"ملابس أطفال",fr:"Mode Enfant",icon:"👶",color:"#ffcc00"},
  {id:"tailoring",ar:"خياطة",fr:"Couture",icon:"🧵",color:"#e879f9"},
  {id:"accessories",ar:"أكسسوارات",fr:"Accessoires",icon:"💍",color:"#c084fc"},
  {id:"cosmetic",ar:"كوسميتيك",fr:"Cosmétique",icon:"💄",color:"#f472b6"},
  {id:"beauty",ar:"صالونات",fr:"Salons",icon:"✂️",color:"#fb7185"},
  {id:"cakes",ar:"حلويات",fr:"Pâtisserie",icon:"🎂",color:"#fbbf24"},
  {id:"pharmacy",ar:"صيدليات",fr:"Pharmacies",icon:"💊",color:"#34d399"},
  {id:"furniture",ar:"أفرشة",fr:"Mobilier",icon:"🛋️",color:"#fb923c"},
  {id:"wholesale",ar:"بيع بالجملة",fr:"Grossiste",icon:"📦",color:"#60a5fa"},
  {id:"phones",ar:"هواتف",fr:"Téléphones",icon:"📱",color:"#a78bfa"},
  {id:"doctor",ar:"أطباء",fr:"Médecins",icon:"🩺",color:"#06b6d4"},
  {id:"realestate",ar:"عقارات",fr:"Immobilier",icon:"🏘️",color:"#f87171"},
  {id:"charity",ar:"جمعيات خيرية",fr:"Associations",icon:"🤲",color:"#10b981"},
  {id:"quran",ar:"مدارس قرآنية",fr:"Écoles Coraniques",icon:"📖",color:"#8b5cf6"},
];

const SPECS=["all","طب عام","طب أطفال","طب الأسنان","أمراض النساء","قلب وأوعية","عيون","جلدية"];
const TIMES=["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"];

const UI = {
  ar: {
    back: "← رجوع",
    da: "دج",
    allAreas: "كل الأحياء",
    areaPh: "اكتب حيك / مدينتك / مكانك (مثال: عين فكرون، المركز) *",
    searchPh: "🔍 ابحث عن منتج، محل أو حي...",
    scanning: "🤖 جاري تحليل الصورة والبحث في المحلات...",
    photoSearchTitle: "البحث بالصورة",
    photoSearchSub: "المنتجات والمحلات المتوفرة",
    doctorTitle: "احجز موعد طبي",
    doctorSub: "طبيب",
    pharmaTitle: "صيدلية المناوبة",
    pharmaSub: "مفتوحة الآن",
    offers: "العروض",
    newToday: "الجديد اليوم",
    withDelivery: "مع توصيل",
    drivers: "الموصّلين",
    messages: "رسائلي",
    charity: "جمعيات خيرية",
    quran: "مدارس قرآنية",
    catsTitle: "🏪 الأقسام",
    haveShop: "🏪 عندك محل؟",
    first10Free: "أول 10 منشورات مجانية",
    registerNow: "سجّل الآن",
    statShops: "محل",
    statDoctors: "طبيب",
    statFavs: "مفضلة",
    statPts: "نقاط",
    navHome: "الرئيسية",
    navSearch: "بحث",
    navOffers: "عروض",
    navFav: "مفضلة",
    navProfile: "حسابي",
    shopsTab: "🏪 المحلات",
    postsTab: "📝 المنشورات",
    discountsTab: "🏷️ التخفيضات",
    savedTab: "🔖 المحفوظات",
    saveBtn: "حفظ",
    savedBtn: "محفوظ",
    likeBtn: "إعجاب",
    addPostBtn: "➕ أضف منشور",
    addDiscountBtn: "🏷️ أضف تخفيض",
    noPosts: "ما كاين منشور بعد",
    noDiscounts: "ما كاين تخفيضات حالياً",
    noSaved: "ما حفظتِ حتى منتج بعد — اضغطي على 🔖 لحفظ أي منتج يعجبكِ",
    available: "✓ متوفر",
    unavailable: "✗ نافد",
    call: "📞 اتصل",
    delivery: "🛵 توصيل",
    open: "● مفتوح",
    closed: "● مغلق",
    chatBtn: "💬 محادثة",
    askShop: "✉️ اسأل المحل",
    comments: "💬 تعليقات",
    addPostTitle: "➕ إضافة منشور",
    uploadPhotos: "📷 صور من المعرض (حتى 10)",
    uploadVideo: "🎥 فيديو من الجهاز",
    max10Msg: "يمكنكِ إضافة 10 صور كحد أقصى في المنشور الواحد.",
    postNamePh: "عنوان المنشور / المنتج *",
    pricePh: "السعر (دج) *",
    descPh: "وصف قصير",
    discountPh: "تخفيض % (اختياري)",
    availNow: "متوفر الآن؟",
    publishBtn: "نشر المنشور ✓",
    limitReachedBtn: "🔒 تفعيل الاشتراك (بعد 10 منشورات)",
    upgTitle: "ارقِ للباقة المدفوعة",
    upgSub: "وصلتِ لحد 10 منشورات مجانية",
    later: "لاحقاً",
    subscribeMonth: "1000 دج / شهر",
    subscribeYear: "أو 8000 دج / سنة",
  },
  fr: {
    back: "Retour →",
    da: "DA",
    allAreas: "Tous les lieux",
    areaPh: "Votre quartier / ville / lieu (ex: Aïn Fakroun, Centre) *",
    searchPh: "🔍 Rechercher produit, boutique ou quartier...",
    scanning: "🤖 Analyse de l'image et recherche...",
    photoSearchTitle: "Recherche par photo",
    photoSearchSub: "Produits et boutiques disponibles",
    doctorTitle: "Rendez-vous médical",
    doctorSub: "médecin(s)",
    pharmaTitle: "Pharmacie de garde",
    pharmaSub: "Ouverte",
    offers: "Promotions",
    newToday: "Nouveautés",
    withDelivery: "Livraison dispo",
    drivers: "Livreurs",
    messages: "Messages",
    charity: "Associations",
    quran: "Écoles Coraniques",
    catsTitle: "🏪 Catégories",
    haveShop: "🏪 Vous avez un commerce ?",
    first10Free: "10 premières publications gratuites",
    registerNow: "Inscrire",
    statShops: "Boutiques",
    statDoctors: "Médecins",
    statFavs: "Favoris",
    statPts: "Points",
    navHome: "Accueil",
    navSearch: "Recherche",
    navOffers: "Promos",
    navFav: "Favoris",
    navProfile: "Profil",
    shopsTab: "🏪 Boutiques",
    postsTab: "📝 Publications",
    discountsTab: "🏷️ Promotions",
    savedTab: "🔖 Enregistrés",
    saveBtn: "Enregistrer",
    savedBtn: "Enregistré",
    likeBtn: "J'aime",
    addPostBtn: "➕ Publier",
    addDiscountBtn: "🏷️ Ajouter promo",
    noPosts: "Aucune publication pour le moment",
    noDiscounts: "Aucune promotion disponible",
    noSaved: "Aucun produit enregistré — cliquez sur 🔖 pour sauvegarder",
    available: "✓ Disponible",
    unavailable: "✗ Épuisé",
    call: "📞 Appeler",
    delivery: "🛵 Livraison",
    open: "● Ouvert",
    closed: "● Fermé",
    chatBtn: "💬 Discuter",
    askShop: "✉️ Contacter",
    comments: "💬 Avis produit",
    addPostTitle: "➕ Nouvelle publication",
    uploadPhotos: "📷 Galerie photos (max 10)",
    uploadVideo: "🎥 Vidéo appareil",
    max10Msg: "Maximum 10 photos par publication.",
    postNamePh: "Titre de la publication / produit *",
    pricePh: "Prix (DA) *",
    descPh: "Description courte",
    discountPh: "Réduction % (optionnel)",
    availNow: "Disponible maintenant ?",
    publishBtn: "Publier ✓",
    limitReachedBtn: "🔒 Abonnement requis (après 10 posts)",
    upgTitle: "Passer à l'offre Pro",
    upgSub: "Vous avez atteint la limite de 10 publications gratuites",
    later: "Plus tard",
    subscribeMonth: "1000 DA / mois",
    subscribeYear: "ou 8000 DA / an",
  },
};

function compressImage(file, maxWidth = 800, quality = 0.78) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function renderMediaPreview(item, size = 50, onOpenGallery) {
  if (item?.mediaType === "video" && item?.videoUrl) {
    return (
      <video
        src={item.videoUrl}
        muted
        playsInline
        style={{width:size,height:size,objectFit:"cover",borderRadius:12,background:"#000"}}
      />
    );
  }
  const imgs = item?.images?.length ? item.images : (typeof item?.image === "string" && (item.image.startsWith("data:") || item.image.startsWith("http") || item.image.startsWith("blob:")) ? [item.image] : []);
  if (imgs.length > 0) {
    return (
      <div
        onClick={(e) => {
          if (onOpenGallery && imgs.length > 0) {
            e.stopPropagation();
            onOpenGallery(imgs);
          }
        }}
        style={{position:"relative",width:size,height:size,borderRadius:12,overflow:"hidden",cursor:onOpenGallery?"pointer":"default",flexShrink:0}}
      >
        <img src={imgs[0]} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} />
        {imgs.length > 1 && (
          <span style={{position:"absolute",bottom:2,left:2,background:"#000c",color:"#fff",fontSize:9,fontWeight:800,padding:"1px 4px",borderRadius:6}}>
            +{imgs.length - 1}
          </span>
        )}
      </div>
    );
  }
  return <span style={{fontSize:Math.round(size*0.58)}}>{item?.image || "📦"}</span>;
}

const G=(d,dir="rtl")=>({
  bg:d?"#0f0f1a":"#f0f4f8",bg2:d?"#1a1a2e":"#fff",bg3:d?"#16213e":"#e8edf5",
  card:d?"linear-gradient(135deg,#1a1a2e,#16213e)":"linear-gradient(135deg,#fff,#f0f4f8)",
  border:d?"#2a2a4a":"#dde3ed",text:d?"#fff":"#1a1a2e",t2:d?"#aaa":"#666",
  accent:"#f0a500",fn:"'Cairo',sans-serif",dir,
  sh:d?"0 4px 20px #00000044":"0 2px 12px #00000011",
});

function Modal({onClose,children,g}){
  return(
    <div style={{position:"fixed",inset:0,background:"#000b",zIndex:999,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{background:g.card,borderRadius:"24px 24px 0 0",padding:"24px 20px 44px",width:"100%",maxWidth:430,border:`1px solid ${g.border}`,direction:g.dir,fontFamily:g.fn,maxHeight:"92vh",overflowY:"auto",color:g.text}}>
        {children}
      </div>
    </div>
  );
}

function UpgModal({onClose,onSubscribe,g,lang="ar"}){
  const u=UI[lang]||UI.ar;
  return(
    <Modal onClose={onClose} g={g}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:48}}>💎</div>
        <div style={{fontSize:20,fontWeight:800,color:g.accent}}>{u.upgTitle}</div>
        <div style={{fontSize:13,color:g.t2,marginTop:4}}>{u.upgSub}</div>
      </div>
      {[["📦",lang==="fr"?"Publications illimitées":"منشورات غير محدودة"],["⭐",lang==="fr"?"Mise en avant":"ظهور في الأول"],["✅",lang==="fr"?"Badge vérifié":"شارة موثق"],["📊",lang==="fr"?"Statistiques":"إحصائيات"],["🔔",lang==="fr"?"Alertes promos":"إشعارات ترويجية"]].map(([ic,tx],k)=>(
        <div key={k} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${g.border}44`}}>
          <span style={{fontSize:20}}>{ic}</span><span style={{fontSize:14}}>{tx}</span>
          <span style={{marginInlineStart:"auto",color:"#00ff88",fontSize:16}}>✓</span>
        </div>
      ))}
      <div onClick={onSubscribe} style={{background:"linear-gradient(135deg,#f0a500,#e67e00)",borderRadius:16,padding:16,textAlign:"center",margin:"20px 0 12px",cursor:"pointer"}}>
        <div style={{fontSize:24,fontWeight:900,color:"#fff"}}>{u.subscribeMonth}</div>
        <div style={{fontSize:12,color:"#fff9"}}>{u.subscribeYear}</div>
      </div>
      <button onClick={onClose} style={{width:"100%",background:g.bg3,border:"none",borderRadius:14,padding:14,color:g.t2,fontSize:14,cursor:"pointer",fontFamily:g.fn}}>{u.later}</button>
    </Modal>
  );
}

function AddProductModal({onClose,onAdd,onSubscribePro,isPro,count,defaultDiscount=0,g,lang="ar"}){
  const u=UI[lang]||UI.ar;
  const[form,setF]=useState({
    name:"",
    price:"",
    desc:"",
    image:"📦",
    mediaType:"image",
    images:[],
    videoUrl:"",
    available:true,
    discount:defaultDiscount||0,
  });
  const[showUp,setShowUp]=useState(false);
  const today=new Date().toDateString();

  const handlePhotos=async(e)=>{
    const files=Array.from(e.target.files||[]);
    if(!files.length)return;
    const rem=10-form.images.length;
    if(files.length>rem)alert(u.max10Msg);
    const chosen=files.slice(0,Math.max(0,rem));
    const compressed=await Promise.all(chosen.map(f=>compressImage(f)));
    setF(prev=>({
      ...prev,
      mediaType:"image",
      videoUrl:"",
      images:[...prev.images,...compressed].slice(0,10),
      image:[...prev.images,...compressed][0]||prev.image,
    }));
  };

  const handleVideo=(e)=>{
    const file=e.target.files?.[0];
    if(!file)return;
    const url=URL.createObjectURL(file);
    setF(prev=>({...prev,mediaType:"video",images:[],videoUrl:url,image:"🎥"}));
  };

  const hasMedia=(form.mediaType==="video"&&Boolean(form.videoUrl))||(form.mediaType==="image"&&form.images.length>0);

  return(<>
    {showUp&&<UpgModal onClose={()=>setShowUp(false)} onSubscribe={()=>{onSubscribePro?.();setShowUp(false);}} g={g} lang={lang}/>}
    <Modal onClose={onClose} g={g}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontSize:17,fontWeight:800,color:g.accent}}>{u.addPostTitle}</div>
        <button onClick={onClose} style={{background:g.bg3,border:"none",borderRadius:8,padding:"4px 10px",color:g.t2,cursor:"pointer",fontSize:16}}>✕</button>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:10}}>
        <label style={{flex:1,background:g.bg3,border:`1px dashed ${g.accent}`,borderRadius:12,padding:"10px 8px",textAlign:"center",fontSize:12,fontWeight:700,color:g.accent,cursor:"pointer"}}>
          {u.uploadPhotos} ({form.images.length}/10)
          <input type="file" accept="image/*" multiple onChange={handlePhotos} style={{display:"none"}}/>
        </label>
        <label style={{flex:1,background:g.bg3,border:"1px dashed #06b6d4",borderRadius:12,padding:"10px 8px",textAlign:"center",fontSize:12,fontWeight:700,color:"#06b6d4",cursor:"pointer"}}>
          {u.uploadVideo}
          <input type="file" accept="video/*" onChange={handleVideo} style={{display:"none"}}/>
        </label>
      </div>

      {form.mediaType==="image"&&form.images.length>0&&(
        <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:12,paddingBottom:4}}>
          {form.images.map((src,idx)=>(
            <div key={idx} style={{position:"relative",flexShrink:0}}>
              <img src={src} alt="" style={{width:56,height:56,objectFit:"cover",borderRadius:10}}/>
              <button type="button" onClick={()=>setF(prev=>({...prev,images:prev.images.filter((_,i)=>i!==idx)}))}
                style={{position:"absolute",top:-4,right:-4,background:"#ff4444",color:"#fff",border:"none",borderRadius:"50%",width:18,height:18,fontSize:10,cursor:"pointer"}}>✕</button>
            </div>
          ))}
        </div>
      )}

      {form.mediaType==="video"&&form.videoUrl&&(
        <video src={form.videoUrl} controls playsInline style={{width:"100%",maxHeight:150,borderRadius:12,marginBottom:12}}/>
      )}

      {[[u.postNamePh,"name","text"],[u.pricePh,"price","number"],[u.descPh,"desc","text"]].map(([pl,k,tp])=>(
        <input key={k} placeholder={pl} type={tp} value={form[k]} onChange={e=>setF({...form,[k]:e.target.value})}
          style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
      ))}

      <input placeholder={u.discountPh} type="number" value={form.discount||""} onChange={e=>setF({...form,discount:Number(e.target.value)})}
        style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:12,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px",background:g.bg3,borderRadius:12,marginBottom:14}}>
        <span style={{fontSize:14}}>{u.availNow}</span>
        <button type="button" onClick={()=>setF({...form,available:!form.available})}
          style={{background:form.available?"#00ff8822":"#ff444422",border:`1px solid ${form.available?"#00ff88":"#ff4444"}`,borderRadius:20,padding:"6px 18px",color:form.available?"#00ff88":"#ff4444",cursor:"pointer",fontFamily:g.fn,fontWeight:700}}>
          {form.available?u.available:u.unavailable}
        </button>
      </div>

      <div style={{fontSize:12,color:g.t2,marginBottom:10,textAlign:"center"}}>
        {isPro ? "PRO ∞" : `${count}/${FREE_POSTS_LIMIT} ${u.first10Free}`}
      </div>

      <button onClick={()=>{
        if(!isPro && count>=FREE_POSTS_LIMIT){setShowUp(true);return;}
        if(!form.name||!form.price||!hasMedia)return;
        onAdd({...form,price:Number(form.price),id:Date.now(),status:"approved",addedDate:today,likes:0});
        onClose();
      }}
        style={{width:"100%",background:(!isPro&&count>=FREE_POSTS_LIMIT)?"#2a2a4a":"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
        {(!isPro&&count>=FREE_POSTS_LIMIT)?u.limitReachedBtn:u.publishBtn}
      </button>
    </Modal>
  </>);
}

function RegShopModal({onClose,onReg,g,lang="ar"}){
  const u=UI[lang]||UI.ar;
  const[f,setF]=useState({name:"",category:"supermarket",phone:"",desc:"",hours:"09:00 - 21:00",days:"السبت - الخميس",hasDelivery:false,area:"",discount:0,offerText:""});
  const today=new Date().toDateString();
  const inp=(pl,k,tp="text")=>(
    <input key={k} placeholder={pl} type={tp} value={f[k]} onChange={e=>setF({...f,[k]:tp==="number"?Number(e.target.value):e.target.value})}
      style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
  );
  const sel=(k,opts)=>(
    <select value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})}
      style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}>
      {opts.map(o=>typeof o==="string"?<option key={o} value={o}>{o}</option>:<option key={o.id} value={o.id}>{o.icon} {lang==="fr"?o.fr:o.ar}</option>)}
    </select>
  );
  return(
    <Modal onClose={onClose} g={g}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
        <div style={{fontSize:17,fontWeight:800,color:g.accent}}>{lang==="fr"?"🏪 Inscrire votre boutique":"🏪 تسجيل محلك"}</div>
        <button onClick={onClose} style={{background:g.bg3,border:"none",borderRadius:8,padding:"4px 10px",color:g.t2,cursor:"pointer",fontSize:16}}>✕</button>
      </div>
      <div style={{background:"#00ff8811",border:"1px solid #00ff8833",borderRadius:12,padding:10,marginBottom:14,fontSize:13,color:"#00ff88",textAlign:"center"}}>✅ {u.first10Free}</div>
      {inp(lang==="fr"?"Nom de la boutique *":"اسم المحل *","name")}
      {inp(lang==="fr"?"Téléphone *":"رقم الهاتف *","phone")}
      {inp(u.areaPh,"area")}
      {inp(lang==="fr"?"Description":"وصف المحل","desc")}
      {inp("09:00 - 21:00","hours")}
      {sel("category",CATS.filter(c=>c.id!=="doctor"&&c.id!=="realestate"))}
      {sel("days",lang==="fr"?["Tous les jours","Samedi - Jeudi","Samedi - Vendredi","Lundi - Vendredi"]:["كل أيام الأسبوع","السبت - الخميس","السبت - الجمعة","الإثنين - الجمعة"])}
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        {inp(lang==="fr"?"Remise %":"تخفيض %","discount","number")}
        {inp(lang==="fr"?"Texte offre":"نص العرض","offerText")}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,padding:"12px",background:g.bg3,borderRadius:12}}>
        <span style={{fontSize:14}}>{lang==="fr"?"🛵 Livraison disponible ?":"🛵 عندك توصيل؟"}</span>
        <button onClick={()=>setF({...f,hasDelivery:!f.hasDelivery})}
          style={{background:f.hasDelivery?"#00ff8822":"#2a2a4a",border:`1px solid ${f.hasDelivery?"#00ff88":g.border}`,borderRadius:20,padding:"6px 18px",color:f.hasDelivery?"#00ff88":g.t2,cursor:"pointer",fontFamily:g.fn,fontWeight:700}}>
          {f.hasDelivery?(lang==="fr"?"✓ Oui":"✓ نعم"):(lang==="fr"?"Non":"لا")}
        </button>
      </div>
      <button onClick={()=>{if(!f.name.trim()||!f.phone.trim()||!f.area.trim())return;onReg({id:Date.now(),...f,name:f.name.trim(),area:f.area.trim(),distance:"—",rating:5,verified:false,plan:"free",onDuty:false,products:[],reviews:[],addedDate:today});onClose();}}
        style={{width:"100%",background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
        {lang==="fr"?"S'inscrire gratuitement ✓":"سجّل الآن مجاناً ✓"}
      </button>
    </Modal>
  );
}

function RevModal({onClose,onSubmit,g,addPts}){
  const[stars,setSt]=useState(5);
  const[comment,setCm]=useState("");
  const[name,setNm]=useState("");
  return(
    <Modal onClose={onClose} g={g}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
        <div style={{fontSize:17,fontWeight:800,color:g.accent}}>⭐ أضف تقييم</div>
        <button onClick={onClose} style={{background:g.bg3,border:"none",borderRadius:8,padding:"4px 10px",color:g.t2,cursor:"pointer",fontSize:16}}>✕</button>
      </div>
      <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:14}}>
        {[1,2,3,4,5].map(s=><button key={s} onClick={()=>setSt(s)} style={{background:"none",border:"none",fontSize:32,cursor:"pointer",filter:s<=stars?"none":"grayscale(1)"}}>⭐</button>)}
      </div>
      {[["الاسم",name,setNm],["تعليقك...",comment,setCm]].map(([pl,v,sv],i)=>(
        <input key={i} placeholder={pl} value={v} onChange={e=>sv(e.target.value)}
          style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
      ))}
      <div style={{background:"#f0a50011",borderRadius:10,padding:8,fontSize:12,color:g.accent,marginBottom:14,textAlign:"center"}}>🏆 ستكسبين +10 نقاط</div>
      <button onClick={()=>{if(!name)return;onSubmit({id:Date.now(),stars,comment,name,date:new Date().toLocaleDateString("ar")});addPts(10);onClose();}}
        style={{width:"100%",background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
        إرسال ✓
      </button>
    </Modal>
  );
}

function ProdCommentsModal({prod,onClose,onAdd,g}){
  const[name,setName]=useState("");
  const[text,setText]=useState("");
  const list=prod.comments||[];
  const inp={width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"};
  const send=()=>{
    if(!name.trim()||!text.trim())return;
    onAdd(prod.id,{id:Date.now(),name:name.trim(),text:text.trim(),date:new Date().toLocaleDateString("ar")});
    setText("");
  };
  return(
    <Modal onClose={onClose} g={g}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
        <div style={{fontSize:16,fontWeight:800,color:g.accent}}>💬 تعليقات: {prod.name}</div>
        <button onClick={onClose} style={{background:g.bg3,border:"none",borderRadius:8,padding:"4px 10px",color:g.t2,cursor:"pointer",fontSize:16}}>✕</button>
      </div>
      <div style={{maxHeight:"38vh",overflowY:"auto",marginBottom:12}}>
        {list.length===0?<div style={{textAlign:"center",padding:"24px",color:g.t2,fontSize:14}}>ما كاين تعليق بعد، كوني أول وحدة 💬</div>:list.map(c=>(
          <div key={c.id} style={{background:g.bg3,borderRadius:14,padding:12,marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontWeight:700,fontSize:13}}>{c.name}</span>
              <span style={{color:g.t2,fontSize:11}}>{c.date}</span>
            </div>
            <div style={{fontSize:14}}>{c.text}</div>
          </div>
        ))}
      </div>
      <input placeholder="اسمك *" value={name} onChange={e=>setName(e.target.value)} style={inp}/>
      <input placeholder="اكتبي تعليقك..." value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} style={inp}/>
      <button onClick={send} style={{width:"100%",background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>إرسال التعليق ✓</button>
    </Modal>
  );
}

function ChatScreen({shop,msgs,initial,onSend,onBack,g}){
  const[inp,setInp]=useState(initial||"");
  const btm=useRef(null);
  const cat=CATS.find(c=>c.id===shop.category);
  const all=[{id:0,from:"shop",text:"مرحباً! كيف يمكنني مساعدتك؟"},...msgs];
  useEffect(()=>{btm.current?.scrollIntoView({behavior:"smooth"});},[msgs]);
  const send=()=>{
    if(!inp.trim())return;
    onSend(inp.trim());
    setInp("");
  };
  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir,display:"flex",flexDirection:"column"}}>
      <div style={{background:g.card,padding:"14px 16px",borderBottom:`1px solid ${g.border}`,display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:10}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:20,cursor:"pointer"}}>←</button>
        <div style={{background:`${cat?.color}22`,borderRadius:12,width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{cat?.icon}</div>
        <div><div style={{fontWeight:800,fontSize:15}}>{shop.name}</div><div style={{color:g.t2,fontSize:12}}>📞 {shop.phone}</div></div>
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
        <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="اكتب رسالة..."
          style={{flex:1,background:g.bg,border:`1px solid ${g.border}`,borderRadius:22,padding:"10px 16px",color:g.text,fontFamily:g.fn,fontSize:14,outline:"none"}}/>
        <button onClick={send} style={{background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:"50%",width:44,height:44,color:"#fff",fontSize:18,cursor:"pointer",flexShrink:0}}>↑</button>
      </div>
    </div>
  );
}

function MessagesScreen({onBack,shops,chats,onOpen,g}){
  const rows=shops.filter(sh=>(chats[sh.id]||[]).length>0)
    .sort((x,y)=>chats[y.id][chats[y.id].length-1].id-chats[x.id][chats[x.id].length-1].id);
  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir,maxWidth:430,margin:"0 auto"}}>
      <div style={{background:`linear-gradient(160deg,#f0a50033,${g.bg2})`,padding:"16px",borderBottom:`1px solid ${g.border}`}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:16,cursor:"pointer",fontFamily:g.fn}}>← رجوع</button>
        <div style={{fontSize:20,fontWeight:800,marginTop:8}}>💬 رسائلي</div>
        <div style={{color:g.t2,fontSize:13,marginTop:2}}>{rows.length} محادثة</div>
      </div>
      <div style={{padding:"14px 14px 100px"}}>
        {rows.length===0?(
          <div style={{textAlign:"center",padding:"60px 20px",color:g.t2}}>
            <div style={{fontSize:56,marginBottom:12}}>💬</div>
            <div style={{fontSize:16}}>ما كاين محادثات بعد</div>
            <div style={{fontSize:13,marginTop:8}}>ادخلي لأي محل واضغطي "💬 محادثة"</div>
          </div>
        ):rows.map(sh=>{
          const cat=CATS.find(c=>c.id===sh.category);
          const last=chats[sh.id][chats[sh.id].length-1];
          return(
            <div key={sh.id} onClick={()=>onOpen(sh)} style={{background:g.card,borderRadius:16,padding:14,marginBottom:10,border:`1px solid ${g.border}`,display:"flex",gap:12,alignItems:"center",cursor:"pointer"}}>
              <div style={{background:`${cat?.color}22`,borderRadius:12,width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{cat?.icon}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:800,fontSize:14}}>{sh.name}</div>
                <div style={{color:g.t2,fontSize:12,marginTop:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{last.from==="user"?"أنتِ: ":""}{last.text}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DelivModal({shop,onClose,g}){
  const[addr,setAddr]=useState("");
  const[done,setDone]=useState(false);
  if(done)return(
    <div style={{position:"fixed",inset:0,background:"#000b",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:g.card,borderRadius:24,padding:32,textAlign:"center",maxWidth:300,width:"100%",border:`1px solid ${g.border}`}}>
        <div style={{fontSize:64,marginBottom:16}}>🛵</div>
        <div style={{fontSize:20,fontWeight:800,color:"#00ff88",marginBottom:8}}>تم إرسال الطلب!</div>
        <div style={{color:g.t2,fontSize:14,marginBottom:20}}>سيتصل بك {shop.name} قريباً</div>
        <button onClick={onClose} style={{background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:"12px 32px",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>حسناً ✓</button>
      </div>
    </div>
  );
  return(
    <Modal onClose={onClose} g={g}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
        <div style={{fontSize:17,fontWeight:800,color:g.accent}}>🛵 طلب توصيل</div>
        <button onClick={onClose} style={{background:g.bg3,border:"none",borderRadius:8,padding:"4px 10px",color:g.t2,cursor:"pointer",fontSize:16}}>✕</button>
      </div>
      <div style={{background:g.bg3,borderRadius:14,padding:14,marginBottom:14,display:"flex",gap:10,alignItems:"center"}}>
        <span style={{fontSize:22}}>🏪</span>
        <div><div style={{fontWeight:700}}>{shop.name}</div><div style={{color:g.t2,fontSize:12}}>📞 {shop.phone}</div></div>
      </div>
      <input placeholder="عنوانك الكامل *" value={addr} onChange={e=>setAddr(e.target.value)}
        style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:16,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
      <button onClick={()=>{if(!addr)return;setDone(true);}}
        style={{width:"100%",background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
        🛵 إرسال طلب التوصيل
      </button>
    </Modal>
  );
}

function ShopDetail({shop,onBack,onUpdate,onReport,g,favorites,toggleFav,likedProducts,toggleLikeProduct,savedProducts,toggleSaveProduct,onChat,addPts,lang="ar"}){
  const u=UI[lang]||UI.ar;
  const cat=CATS.find(c=>c.id===shop.category);
  const[products,setProducts]=useState(shop.products||[]);
  const[reviews,setReviews]=useState(shop.reviews||[]);
  const[showAdd,setShowAdd]=useState(false);
  const[defaultDisc,setDefaultDisc]=useState(0);
  const[showRev,setShowRev]=useState(false);
  const[showDeliv,setShowDeliv]=useState(false);
  const[tab,setTab]=useState("products");
  const[reported,setReported]=useState(false);
  const[commProd,setCommProd]=useState(null);
  const[galleryImgs,setGalleryImgs]=useState(null);
  const isFav=favorites.includes(shop.id);
  const avg=reviews.length?(reviews.reduce((a,r)=>a+r.stars,0)/reviews.length).toFixed(1):shop.rating;
  const approved=products.filter(p=>!p.status||p.status==="approved");
  const discountedList=approved.filter(p=>Number(p.discount)>0);
  const addProd=p=>{const uList=[...products,p];setProducts(uList);onUpdate({...shop,products:uList});};
  const subscribePro=()=>{onUpdate({...shop,plan:"premium"});};
  const addRev=r=>{const uList=[...reviews,r];setReviews(uList);onUpdate({...shop,reviews:uList});};
  const addProdComment=(pid,c)=>{const uList=products.map(p=>p.id===pid?{...p,comments:[...(p.comments||[]),c]}:p);setProducts(uList);onUpdate({...shop,products:uList});};
  const isOpen=()=>{try{const[sh,eh]=shop.hours.split(" - ").map(x=>parseInt(x));const h=new Date().getHours();return h>=sh&&h<eh;}catch{return true;}};

  const renderPostCard=(p)=>{
    const isLiked=likedProducts.includes(p.id);
    const isSaved=savedProducts.includes(p.id);
    const likeCount=(p.likes||0)+(isLiked?1:0);
    return(
      <div key={p.id} style={{background:g.card,borderRadius:16,padding:14,marginBottom:10,border:`1px solid ${g.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{background:g.bg,borderRadius:12,width:56,height:56,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",flexShrink:0}}>
              {renderMediaPreview(p,56,(imgs)=>setGalleryImgs(imgs))}
              {p.discount>0&&<div style={{position:"absolute",top:-4,right:-4,background:"#ff6b35",color:"#fff",fontSize:9,fontWeight:700,borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center"}}>-{p.discount}%</div>}
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:14}}>{p.name}</div>
              {p.desc&&<div style={{color:g.t2,fontSize:11,marginTop:1}}>{p.desc}</div>}
              <div style={{color:g.accent,fontSize:16,fontWeight:800,marginTop:3}}>
                {p.discount>0?Math.round(p.price*(1-p.discount/100)).toLocaleString():p.price?.toLocaleString()} {u.da}
              </div>
            </div>
          </div>
          <div style={{background:p.available?"#00ff8822":"#ff444422",color:p.available?"#00ff88":"#ff4444",padding:"5px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>
            {p.available?u.available:u.unavailable}
          </div>
        </div>
        {p.mediaType==="video"&&p.videoUrl&&(
          <video src={p.videoUrl} controls playsInline style={{width:"100%",maxHeight:200,borderRadius:12,marginTop:10}}/>
        )}
        <div style={{display:"flex",gap:6,marginTop:12,paddingTop:10,borderTop:`1px solid ${g.border}44`,flexWrap:"wrap"}}>
          <button onClick={()=>toggleLikeProduct(p.id)} style={{background:isLiked?"#ff444422":g.bg3,border:isLiked?"1px solid #ff4444":"none",borderRadius:12,padding:"8px 10px",color:isLiked?"#ff4444":g.text,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
            {isLiked?"❤️":"🤍"} {likeCount}
          </button>
          <button onClick={()=>toggleSaveProduct(p.id)} style={{background:isSaved?"#f0a50022":g.bg3,border:isSaved?"1px solid #f0a500":"none",borderRadius:12,padding:"8px 10px",color:isSaved?g.accent:g.text,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
            🔖 {isSaved?u.savedBtn:u.saveBtn}
          </button>
          <button onClick={()=>setCommProd(p.id)} style={{flex:1,background:g.bg3,border:"none",borderRadius:12,padding:"8px",color:g.text,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>💬 ({(p.comments||[]).length})</button>
          <button onClick={()=>onChat(shop,`السلام عليكم، نحب نسأل على: ${p.name}`)} style={{flex:1,background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:12,padding:"8px",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>{u.askShop}</button>
        </div>
      </div>
    );
  };

  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir}}>
      {showAdd&&<AddProductModal onClose={()=>setShowAdd(false)} onAdd={addProd} onSubscribePro={subscribePro} isPro={shop.plan==="premium"} count={products.length} defaultDiscount={defaultDisc} g={g} lang={lang}/>}
      {showRev&&<RevModal onClose={()=>setShowRev(false)} onSubmit={addRev} g={g} addPts={addPts}/>}
      {showDeliv&&<DelivModal shop={shop} onClose={()=>setShowDeliv(false)} g={g}/>}
      {commProd&&products.find(x=>x.id===commProd)&&<ProdCommentsModal prod={products.find(x=>x.id===commProd)} onClose={()=>setCommProd(null)} onAdd={addProdComment} g={g}/>}
      {galleryImgs&&(
        <div onClick={()=>setGalleryImgs(null)} style={{position:"fixed",inset:0,background:"#000d",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div onClick={e=>e.stopPropagation()} style={{background:g.card,borderRadius:20,padding:16,maxWidth:420,width:"100%",maxHeight:"85vh",overflowY:"auto",border:`1px solid ${g.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
              <span style={{fontWeight:800}}>📷 ({galleryImgs.length})</span>
              <button onClick={()=>setGalleryImgs(null)} style={{background:g.bg3,border:"none",borderRadius:8,padding:"4px 10px",color:g.t2,cursor:"pointer"}}>✕</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {galleryImgs.map((src,idx)=><img key={idx} src={src} alt="" style={{width:"100%",height:140,objectFit:"cover",borderRadius:12}}/>)}
            </div>
          </div>
        </div>
      )}

      <div style={{background:`linear-gradient(160deg,${cat?.color}44,${g.bg2})`,padding:"16px 16px 0",borderBottom:`1px solid ${g.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:16,cursor:"pointer",fontFamily:g.fn}}>{u.back}</button>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button onClick={()=>toggleFav(shop.id)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer"}}>{isFav?"❤️":"🤍"}</button>
            <button onClick={()=>{navigator.share?.({title:shop.name});addPts(5);}} style={{background:"none",border:"none",fontSize:22,cursor:"pointer"}}>📤</button>
            <button onClick={()=>onChat(shop)} style={{background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:20,padding:"6px 14px",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>{u.chatBtn}</button>
            <button onClick={()=>{if(!reported){setReported(true);onReport(shop.id);}}} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:reported?"#ff4444":"inherit"}}>{reported?"⚑":"🚩"}</button>
          </div>
        </div>
        <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:12}}>
          <div style={{background:`${cat?.color}22`,borderRadius:18,width:62,height:62,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0,border:`2px solid ${cat?.color}55`}}>{cat?.icon}</div>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
              <span style={{fontSize:18,fontWeight:800}}>{shop.name}</span>
              {shop.verified&&<span style={{color:"#00ff88"}}>✅</span>}
              {shop.hasDelivery&&<span style={{background:"#06b6d422",color:"#06b6d4",fontSize:11,padding:"2px 8px",borderRadius:10,fontWeight:700}}>🛵</span>}
              {shop.discount>0&&<span style={{background:"#ff6b3522",color:"#ff6b35",fontSize:11,padding:"2px 8px",borderRadius:10,fontWeight:700}}>{shop.discount}%</span>}
            </div>
            {shop.desc&&<div style={{color:g.t2,fontSize:13,marginTop:3}}>{shop.desc}</div>}
            <div style={{display:"flex",gap:10,marginTop:6,flexWrap:"wrap",alignItems:"center"}}>
              <span style={{fontSize:12,color:g.t2}}>📍 {shop.area||"—"}</span>
              <span style={{fontSize:13,color:g.accent,fontWeight:700}}>⭐ {avg}</span>
              <span style={{fontSize:12,background:isOpen()?"#00ff8822":"#ff444422",color:isOpen()?"#00ff88":"#ff4444",padding:"2px 8px",borderRadius:10}}>{isOpen()?u.open:u.closed}</span>
            </div>
          </div>
        </div>
        <div style={{background:g.bg,borderRadius:12,padding:"8px 14px",marginBottom:10,display:"flex",justifyContent:"space-between"}}>
          <span style={{fontSize:12,color:g.t2}}>⏰ {shop.hours}</span>
          <span style={{fontSize:12,color:g.t2}}>📅 {shop.days}</span>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          <a href={`tel:${shop.phone}`} style={{flex:1,background:"linear-gradient(135deg,#f0a500,#e67e00)",borderRadius:14,padding:"11px",color:"#fff",fontSize:14,fontWeight:700,textAlign:"center",textDecoration:"none"}}>{u.call}</a>
          {shop.hasDelivery&&<button onClick={()=>setShowDeliv(true)} style={{flex:1,background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:14,padding:"11px",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>{u.delivery}</button>}
        </div>
        <div style={{display:"flex",borderTop:`1px solid ${g.border}`}}>
          {[
            ["products",`${u.postsTab} (${approved.length})`],
            ["discounts",`${u.discountsTab} (${discountedList.length})`],
            ["reviews",`★ (${reviews.length})`],
          ].map(([id,lbl])=>(
            <button key={id} onClick={()=>setTab(id)}
              style={{flex:1,background:"none",border:"none",color:tab===id?g.accent:g.t2,fontSize:12,padding:"11px 6px",cursor:"pointer",fontFamily:g.fn,fontWeight:700,borderBottom:tab===id?`2px solid ${g.accent}`:"2px solid transparent"}}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:"14px 14px 100px"}}>
        {tab==="products"&&(approved.length===0?
          <div style={{textAlign:"center",padding:"50px 20px",color:g.t2}}><div style={{fontSize:48,marginBottom:12}}>📝</div><div>{u.noPosts}</div></div>
        :approved.map(renderPostCard))}

        {tab==="discounts"&&(<>
          <button onClick={()=>{setDefaultDisc(20);setShowAdd(true);}}
            style={{width:"100%",background:"linear-gradient(135deg,#ff6b35,#f0a500)",border:"none",borderRadius:14,padding:"11px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:g.fn,marginBottom:12}}>
            {u.addDiscountBtn}
          </button>
          {discountedList.length===0?
            <div style={{textAlign:"center",padding:"40px 20px",color:g.t2}}><div style={{fontSize:44,marginBottom:10}}>🏷️</div><div>{u.noDiscounts}</div></div>
          :discountedList.map(renderPostCard)}
        </>)}

        {tab==="reviews"&&(<>
          <div style={{background:g.card,borderRadius:16,padding:16,marginBottom:14,border:`1px solid ${g.border}`,textAlign:"center"}}>
            <div style={{fontSize:44,fontWeight:900,color:g.accent}}>{avg}</div>
            <div style={{fontSize:22}}>{"⭐".repeat(Math.round(Number(avg)))}</div>
            <div style={{color:g.t2,fontSize:13}}>{reviews.length}</div>
          </div>
          <button onClick={()=>setShowRev(true)}
            style={{width:"100%",background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:12,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:g.fn,marginBottom:14}}>
            ⭐ (+10)
          </button>
          {reviews.map(r=>(
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
      </div>

      <button onClick={()=>{setDefaultDisc(0);setShowAdd(true);}}
        style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:20,padding:"13px 26px",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn,boxShadow:"0 4px 20px #f0a50066",width:"calc(100% - 80px)",maxWidth:280}}>
        {u.addPostBtn}
      </button>
    </div>
  );
}

function CatScreen({catId,onBack,shops,onSelect,g,favorites,toggleFav,likedProducts,toggleLikeProduct,savedProducts,toggleSaveProduct,onChat,lang="ar"}){
  const u=UI[lang]||UI.ar;
  const cat=CATS.find(c=>c.id===catId);
  const[area,setArea]=useState("ALL");
  const[fDeliv,setFDeliv]=useState(false);
  const[catTab,setCatTab]=useState("posts"); // posts | discounts | shops
  const[galleryImgs,setGalleryImgs]=useState(null);

  const catShops=shops.filter(s=>s.category===catId);
  const dynamicAreas=Array.from(new Set(catShops.map(s=>(s.area||"").trim()).filter(Boolean)));

  let list=catShops;
  if(area!=="ALL")list=list.filter(s=>(s.area||"").trim()===area);
  if(fDeliv)list=list.filter(s=>s.hasDelivery);

  const allCatPosts=list.flatMap(sh=>
    (sh.products||[])
      .filter(p=>!p.status||p.status==="approved")
      .map(p=>({...p,shop:sh}))
  );
  const discountedCatPosts=allCatPosts.filter(p=>Number(p.discount)>0);

  const renderCategoryPost=(p)=>{
    const isLiked=likedProducts.includes(p.id);
    const isSaved=savedProducts.includes(p.id);
    const likeCount=(p.likes||0)+(isLiked?1:0);
    return(
      <div key={p.id} style={{background:g.card,borderRadius:18,padding:14,marginBottom:12,border:`1px solid ${g.border}`,boxShadow:g.sh}}>
        <div onClick={()=>onSelect(p.shop)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,cursor:"pointer"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:18}}>{cat?.icon}</span>
            <div>
              <div style={{fontWeight:800,fontSize:13}}>{p.shop.name}</div>
              <div style={{fontSize:11,color:g.t2}}>📍 {p.shop.area||"—"}</div>
            </div>
          </div>
          <span style={{fontSize:11,color:g.accent,fontWeight:700}}>{lang==="fr"?"Voir boutique ›":"زيارة المحل ‹"}</span>
        </div>

        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <div style={{background:g.bg,borderRadius:14,width:68,height:68,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",flexShrink:0}}>
            {renderMediaPreview(p,68,(imgs)=>setGalleryImgs(imgs))}
            {p.discount>0&&<div style={{position:"absolute",top:-4,right:-4,background:"#ff6b35",color:"#fff",fontSize:10,fontWeight:800,borderRadius:10,padding:"2px 6px"}}>-{p.discount}%</div>}
          </div>
          <div style={{flex:1}}>
            <div style={{fontWeight:800,fontSize:15}}>{p.name}</div>
            {p.desc&&<div style={{color:g.t2,fontSize:12,marginTop:2}}>{p.desc}</div>}
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
              <span style={{color:g.accent,fontSize:16,fontWeight:900}}>
                {p.discount>0?Math.round(p.price*(1-p.discount/100)).toLocaleString():p.price?.toLocaleString()} {u.da}
              </span>
              {p.discount>0&&<span style={{textDecoration:"line-through",color:g.t2,fontSize:12}}>{p.price?.toLocaleString()} {u.da}</span>}
            </div>
          </div>
        </div>

        {p.mediaType==="video"&&p.videoUrl&&(
          <video src={p.videoUrl} controls playsInline style={{width:"100%",maxHeight:200,borderRadius:12,marginTop:10}}/>
        )}

        <div style={{display:"flex",gap:8,marginTop:12,paddingTop:10,borderTop:`1px solid ${g.border}44`}}>
          <button onClick={()=>toggleLikeProduct(p.id)} style={{background:isLiked?"#ff444422":g.bg3,border:isLiked?"1px solid #ff4444":"none",borderRadius:12,padding:"8px 12px",color:isLiked?"#ff4444":g.text,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
            {isLiked?"❤️":"🤍"} {likeCount}
          </button>
          <button onClick={()=>toggleSaveProduct(p.id)} style={{background:isSaved?"#f0a50022":g.bg3,border:isSaved?"1px solid #f0a500":"none",borderRadius:12,padding:"8px 12px",color:isSaved?g.accent:g.text,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
            🔖 {isSaved?u.savedBtn:u.saveBtn}
          </button>
          <button onClick={()=>onChat(p.shop,`السلام عليكم، نحب نسأل على: ${p.name}`)} style={{flex:1,background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:12,padding:"8px",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
            {u.askShop}
          </button>
        </div>
      </div>
    );
  };

  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir}}>
      {galleryImgs&&(
        <div onClick={()=>setGalleryImgs(null)} style={{position:"fixed",inset:0,background:"#000d",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div onClick={e=>e.stopPropagation()} style={{background:g.card,borderRadius:20,padding:16,maxWidth:420,width:"100%",maxHeight:"85vh",overflowY:"auto",border:`1px solid ${g.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
              <span style={{fontWeight:800}}>📷 ({galleryImgs.length})</span>
              <button onClick={()=>setGalleryImgs(null)} style={{background:g.bg3,border:"none",borderRadius:8,padding:"4px 10px",color:g.t2,cursor:"pointer"}}>✕</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {galleryImgs.map((src,idx)=><img key={idx} src={src} alt="" style={{width:"100%",height:140,objectFit:"cover",borderRadius:12}}/>)}
            </div>
          </div>
        </div>
      )}

      <div style={{background:`linear-gradient(160deg,${cat?.color}44,${g.bg2})`,padding:"16px 16px 0",borderBottom:`1px solid ${g.border}`}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:16,cursor:"pointer",fontFamily:g.fn}}>{u.back}</button>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}>
          <div style={{fontSize:20,fontWeight:800}}>{cat?.icon} {lang==="fr"?cat?.fr:cat?.ar}</div>
          <button onClick={()=>setFDeliv(!fDeliv)}
            style={{background:fDeliv?"linear-gradient(135deg,#06b6d4,#0284c7)":g.bg3,border:"none",borderRadius:20,padding:"6px 12px",color:fDeliv?"#fff":g.t2,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
            {u.delivery}
          </button>
        </div>
        <div style={{display:"flex",gap:6,overflowX:"auto",padding:"10px 0 10px",scrollbarWidth:"none"}}>
          <button onClick={()=>setArea("ALL")}
            style={{background:area==="ALL"?`linear-gradient(135deg,${cat?.color},${cat?.color}aa)`:g.bg3,border:"none",borderRadius:20,padding:"6px 12px",color:g.text,fontSize:11,cursor:"pointer",whiteSpace:"nowrap",fontFamily:g.fn,fontWeight:area==="ALL"?700:400}}>
            {u.allAreas}
          </button>
          {dynamicAreas.map(a=>(
            <button key={a} onClick={()=>setArea(a)}
              style={{background:area===a?`linear-gradient(135deg,${cat?.color},${cat?.color}aa)`:g.bg3,border:"none",borderRadius:20,padding:"6px 12px",color:g.text,fontSize:11,cursor:"pointer",whiteSpace:"nowrap",fontFamily:g.fn,fontWeight:area===a?700:400}}>
              📍 {a}
            </button>
          ))}
        </div>

        {/* تبويبات القسم: المنشورات | التخفيضات | المحلات */}
        <div style={{display:"flex",borderTop:`1px solid ${g.border}`}}>
          {[
            ["posts",`${u.postsTab} (${allCatPosts.length})`],
            ["discounts",`${u.discountsTab} (${discountedCatPosts.length})`],
            ["shops",`${u.shopsTab} (${list.length})`],
          ].map(([id,lbl])=>(
            <button key={id} onClick={()=>setCatTab(id)}
              style={{flex:1,background:"none",border:"none",color:catTab===id?g.accent:g.t2,fontSize:12,padding:"11px 4px",cursor:"pointer",fontFamily:g.fn,fontWeight:700,borderBottom:catTab===id?`2px solid ${g.accent}`:"2px solid transparent"}}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:"14px 14px 40px"}}>
        {catTab==="posts"&&(
          allCatPosts.length===0
            ? <div style={{textAlign:"center",padding:"60px 20px",color:g.t2}}><div style={{fontSize:52,marginBottom:12}}>📝</div><div>{u.noPosts}</div></div>
            : allCatPosts.map(renderCategoryPost)
        )}

        {catTab==="discounts"&&(
          discountedCatPosts.length===0
            ? <div style={{textAlign:"center",padding:"60px 20px",color:g.t2}}><div style={{fontSize:52,marginBottom:12}}>🏷️</div><div>{u.noDiscounts}</div></div>
            : discountedCatPosts.map(renderCategoryPost)
        )}

        {catTab==="shops"&&(
          list.length===0
            ? <div style={{textAlign:"center",padding:"60px 20px",color:g.t2}}><div style={{fontSize:56,marginBottom:12}}>{cat?.icon}</div><div style={{fontSize:16}}>{lang==="fr"?"Aucune boutique ici":"ما كاين محل بعد"}</div></div>
            : list.map(shop=>(
              <div key={shop.id} onClick={()=>onSelect(shop)}
                style={{background:g.card,borderRadius:18,padding:14,marginBottom:12,border:`1px solid ${shop.plan==="premium"?"#f0a50033":g.border}`,cursor:"pointer",boxShadow:g.sh}}>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <div style={{background:`${cat?.color}22`,borderRadius:14,width:52,height:52,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{cat?.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontWeight:800}}>{shop.name}</span>
                      {shop.verified&&<span style={{color:"#00ff88",fontSize:12}}>✅</span>}
                      {shop.hasDelivery&&<span style={{fontSize:11,color:"#06b6d4"}}>🛵</span>}
                    </div>
                    <div style={{color:g.t2,fontSize:12,marginTop:2}}>📍 {shop.area||"—"} • ⭐ {shop.reviews?.length?(shop.reviews.reduce((a,r)=>a+r.stars,0)/shop.reviews.length).toFixed(1):shop.rating}</div>
                    <div style={{fontSize:11,color:g.t2,marginTop:2}}>⏰ {shop.hours} • {shop.products.filter(p=>!p.status||p.status==="approved").length}</div>
                  </div>
                  <button onClick={e=>{e.stopPropagation();toggleFav(shop.id);}} style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>{favorites.includes(shop.id)?"❤️":"🤍"}</button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

function DoctorScreen({onBack,doctors,onAdd,g}){
  const[showReg,setShowReg]=useState(false);
  const[df,setDf]=useState({name:"",specialty:"طب عام",phone:"",area:"",hours:"08:00-16:00",days:"السبت-الخميس",price:1000});
  const[sel,setSel]=useState(null);
  const[bk,setBk]=useState({name:"",phone:"",date:"",time:""});
  const[done,setDone]=useState(false);
  const[filter,setFilter]=useState("all");
  const filtered=filter==="all"?doctors:doctors.filter(d=>d.specialty===filter);

  if(done&&sel)return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{fontSize:72,marginBottom:16}}>✅</div>
      <div style={{fontSize:22,fontWeight:800,color:"#00ff88",marginBottom:16}}>تم الحجز!</div>
      <button onClick={()=>{setDone(false);setSel(null);setBk({name:"",phone:"",date:"",time:""});}} style={{marginTop:20,background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:"12px 32px",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>حجز آخر</button>
      <button onClick={onBack} style={{marginTop:10,background:g.bg3,border:"none",borderRadius:14,padding:"12px 32px",color:g.t2,fontSize:14,cursor:"pointer",fontFamily:g.fn}}>← رجوع</button>
    </div>
  );

  if(sel)return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir}}>
      <div style={{background:`linear-gradient(160deg,#06b6d444,${g.bg2})`,padding:"16px",borderBottom:`1px solid ${g.border}`}}>
        <button onClick={()=>setSel(null)} style={{background:"none",border:"none",color:g.accent,fontSize:16,cursor:"pointer",fontFamily:g.fn}}>← رجوع</button>
        <div style={{fontSize:18,fontWeight:800,marginTop:8}}>📅 احجز موعد — {sel.name}</div>
      </div>
      <div style={{padding:"14px 14px 40px"}}>
        {[["الاسم *","name","text"],["الهاتف *","phone","text"]].map(([pl,k,tp])=>(
          <input key={k} placeholder={pl} type={tp} value={bk[k]} onChange={e=>setBk({...bk,[k]:e.target.value})}
            style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
        ))}
        <input type="date" value={bk.date} onChange={e=>setBk({...bk,date:e.target.value})}
          style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:12,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:14}}>
          {TIMES.map(tm=>(
            <button key={tm} onClick={()=>setBk({...bk,time:tm})}
              style={{background:bk.time===tm?"linear-gradient(135deg,#f0a500,#e67e00)":g.bg3,border:"none",borderRadius:10,padding:"10px 4px",color:g.text,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
              {tm}
            </button>
          ))}
        </div>
        <button onClick={()=>{if(!bk.name||!bk.phone||!bk.date||!bk.time)return;setDone(true);}}
          style={{width:"100%",background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
          تأكيد الحجز ✓
        </button>
      </div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir}}>
      {showReg&&(
        <Modal onClose={()=>setShowReg(false)} g={g}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <div style={{fontSize:17,fontWeight:800,color:"#06b6d4"}}>🩺 تسجيل طبيب</div>
            <button onClick={()=>setShowReg(false)} style={{background:g.bg3,border:"none",borderRadius:8,padding:"4px 10px",color:g.t2,cursor:"pointer",fontSize:16}}>✕</button>
          </div>
          {[["الاسم *","name","text"],["الهاتف *","phone","text"],["الحي / العنوان *","area","text"],["سعر الكشف","price","number"],["أوقات العمل","hours","text"]].map(([pl,k,tp])=>(
            <input key={k} placeholder={pl} type={tp} value={df[k]} onChange={e=>setDf({...df,[k]:e.target.value})}
              style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
          ))}
          <select value={df.specialty} onChange={e=>setDf({...df,specialty:e.target.value})}
            style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:14,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}>
            {SPECS.filter(s=>s!=="all").map(s=><option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={()=>{if(!df.name||!df.phone)return;onAdd({id:Date.now(),...df,price:Number(df.price)||1000,distance:"—",rating:5,available:true,image:"👨‍⚕️",reviews:[]});setShowReg(false);}}
            style={{width:"100%",background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
            تأكيد ✓
          </button>
        </Modal>
      )}
      <div style={{background:`linear-gradient(160deg,#06b6d444,${g.bg2})`,padding:"16px 16px 0",borderBottom:`1px solid ${g.border}`}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:16,cursor:"pointer",fontFamily:g.fn}}>← رجوع</button>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8,marginBottom:4}}>
          <div style={{fontSize:20,fontWeight:800}}>🩺 الأطباء</div>
          <button onClick={()=>setShowReg(true)} style={{background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:12,padding:"7px 14px",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>+ سجّل</button>
        </div>
        <div style={{display:"flex",gap:8,overflowX:"auto",padding:"8px 0 14px",scrollbarWidth:"none"}}>
          {SPECS.map(sp=>(
            <button key={sp} onClick={()=>setFilter(sp)}
              style={{background:filter===sp?"linear-gradient(135deg,#06b6d4,#0284c7)":g.bg3,border:"none",borderRadius:20,padding:"6px 12px",color:g.text,fontSize:11,cursor:"pointer",whiteSpace:"nowrap",fontFamily:g.fn,fontWeight:filter===sp?700:400}}>
              {sp==="all"?"الكل":sp}
            </button>
          ))}
        </div>
      </div>
      <div style={{padding:"14px 14px 40px"}}>
        {filtered.map(doc=>(
          <div key={doc.id} style={{background:g.card,borderRadius:18,padding:16,marginBottom:14,border:`1px solid ${g.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontWeight:800}}>{doc.name}</div>
                <div style={{color:"#06b6d4",fontSize:13}}>{doc.specialty} • {doc.price.toLocaleString()} دج</div>
                {doc.area&&<div style={{color:g.t2,fontSize:12}}>📍 {doc.area}</div>}
              </div>
              <button onClick={()=>setSel(doc)} style={{background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:12,padding:"8px 14px",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>احجز موعد</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PharmaScreen({onBack,shops,toggleDuty,g}){
  const pharmacies=shops.filter(s=>s.category==="pharmacy");
  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir}}>
      <div style={{background:`linear-gradient(160deg,#34d39944,${g.bg2})`,padding:"16px",borderBottom:`1px solid ${g.border}`}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:16,cursor:"pointer",fontFamily:g.fn}}>← رجوع</button>
        <div style={{fontSize:20,fontWeight:800,marginTop:8}}>🚨 صيدلية المناوبة</div>
      </div>
      <div style={{padding:"14px 14px 40px"}}>
        {pharmacies.map(p=>(
          <div key={p.id} style={{background:g.card,borderRadius:16,padding:14,marginBottom:10,border:`1px solid ${p.onDuty?"#34d39944":g.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontWeight:700}}>{p.name}</div><div style={{color:g.t2,fontSize:12}}>📍 {p.area||"—"} • ⏰ {p.hours}</div></div>
            <button onClick={()=>toggleDuty(p.id)} style={{background:p.onDuty?"#34d39922":g.bg3,border:`1px solid ${p.onDuty?"#34d399":g.border}`,borderRadius:10,padding:"6px 12px",color:p.onDuty?"#34d399":g.t2,fontSize:12,cursor:"pointer",fontFamily:g.fn,fontWeight:700}}>
              {p.onDuty?"✓ مناوبة":"تفعيل"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function REScreen({onBack,g}){
  const[listings,setListings]=useState([]);
  const[showAdd,setShowAdd]=useState(false);
  const[f,setF]=useState({title:"",price:"",area:"",location:"",type:"بيع",contact:""});
  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir}}>
      {showAdd&&(
        <Modal onClose={()=>setShowAdd(false)} g={g}>
          <div style={{fontSize:17,fontWeight:800,color:"#f87171",marginBottom:12}}>🏘️ نشر إعلان</div>
          {[["العنوان *","title"],["السعر (دج) *","price"],["الحي / المكان *","location"],["رقم الاتصال *","contact"]].map(([pl,k])=>(
            <input key={k} placeholder={pl} value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})}
              style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
          ))}
          <button onClick={()=>{if(!f.title||!f.price||!f.contact)return;setListings([{id:Date.now(),...f},...listings]);setShowAdd(false);}}
            style={{width:"100%",background:"linear-gradient(135deg,#f87171,#ef4444)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
            نشر ✓
          </button>
        </Modal>
      )}
      <div style={{background:`linear-gradient(160deg,#f8717133,${g.bg2})`,padding:"16px",borderBottom:`1px solid ${g.border}`}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:16,cursor:"pointer",fontFamily:g.fn}}>← رجوع</button>
        <div style={{fontSize:20,fontWeight:800,marginTop:8}}>🏘️ العقارات</div>
      </div>
      <div style={{padding:"14px 14px 100px"}}>
        {listings.map(r=>(
          <div key={r.id} style={{background:g.card,borderRadius:16,padding:14,marginBottom:12,border:`1px solid ${g.border}`}}>
            <div style={{fontWeight:800}}>{r.title}</div>
            {r.location&&<div style={{color:g.t2,fontSize:12,marginTop:2}}>📍 {r.location}</div>}
            <div style={{color:g.accent,fontWeight:800,marginTop:4}}>{Number(r.price).toLocaleString()} دج</div>
          </div>
        ))}
      </div>
      <button onClick={()=>setShowAdd(true)} style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#f87171,#ef4444)",border:"none",borderRadius:20,padding:"13px 26px",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
        ➕ انشر إعلانك
      </button>
    </div>
  );
}

function OffersScreen({onBack,shops,g,lang="ar"}){
  const u=UI[lang]||UI.ar;
  const offers=shops.filter(s=>s.discount>0||s.products.some(p=>Number(p.discount)>0));
  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir}}>
      <div style={{background:`linear-gradient(135deg,#ff6b3533,${g.bg2})`,padding:"16px",borderBottom:`1px solid ${g.border}`}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:16,cursor:"pointer",fontFamily:g.fn}}>{u.back}</button>
        <div style={{fontSize:20,fontWeight:800,marginTop:8}}>{u.offers} ({offers.length})</div>
      </div>
      <div style={{padding:"14px 14px 40px"}}>
        {offers.map(shop=>(
          <div key={shop.id} style={{background:g.card,borderRadius:18,padding:16,marginBottom:12,border:"1px solid #ff6b3544"}}>
            <div style={{fontWeight:800}}>{shop.name}</div>
            <div style={{color:g.t2,fontSize:13,marginTop:4}}>📍 {shop.area} • {shop.offerText||`${shop.discount}%`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewScreen({onBack,shops,onSelect,g}){
  const today=new Date().toDateString();
  const newS=shops.filter(s=>s.addedDate===today);
  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir}}>
      <div style={{background:`linear-gradient(135deg,#00ff8833,${g.bg2})`,padding:"16px",borderBottom:`1px solid ${g.border}`}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:16,cursor:"pointer",fontFamily:g.fn}}>← رجوع</button>
        <div style={{fontSize:20,fontWeight:800,marginTop:8}}>🆕 الجديد اليوم</div>
      </div>
      <div style={{padding:"14px 14px 40px"}}>
        {newS.map(s=>(
          <div key={s.id} onClick={()=>onSelect(s)} style={{background:g.card,borderRadius:16,padding:14,marginBottom:12,border:"1px solid #00ff8833",cursor:"pointer"}}>
            <div style={{fontWeight:800}}>{s.name}</div>
            {s.area&&<div style={{color:g.t2,fontSize:12}}>📍 {s.area}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function FavScreen({onBack,shops,favorites,savedProducts,toggleSaveProduct,onSelect,g,toggleFav,lang="ar"}){
  const u=UI[lang]||UI.ar;
  const[favTab,setFavTab]=useState("saved"); // saved | shops
  const favShops=shops.filter(s=>favorites.includes(s.id));
  const savedItems=shops.flatMap(s=>
    (s.products||[])
      .filter(p=>savedProducts.includes(p.id))
      .map(p=>({...p,shop:s}))
  );

  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir}}>
      <div style={{background:g.card,padding:"16px 16px 0",borderBottom:`1px solid ${g.border}`}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:16,cursor:"pointer",fontFamily:g.fn}}>{u.back}</button>
        <div style={{fontSize:20,fontWeight:800,marginTop:8}}>❤️ {u.navFav}</div>
        <div style={{display:"flex",marginTop:10}}>
          {[
            ["saved",`${u.savedTab} (${savedItems.length})`],
            ["shops",`${u.shopsTab} (${favShops.length})`],
          ].map(([id,lbl])=>(
            <button key={id} onClick={()=>setFavTab(id)}
              style={{flex:1,background:"none",border:"none",color:favTab===id?g.accent:g.t2,fontSize:13,padding:"11px",cursor:"pointer",fontFamily:g.fn,fontWeight:700,borderBottom:favTab===id?`2px solid ${g.accent}`:"2px solid transparent"}}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:"14px 14px 40px"}}>
        {favTab==="saved"&&(
          savedItems.length===0
            ? <div style={{textAlign:"center",padding:"50px 20px",color:g.t2}}><div style={{fontSize:48,marginBottom:12}}>🔖</div><div>{u.noSaved}</div></div>
            : savedItems.map(p=>(
              <div key={p.id} style={{background:g.card,borderRadius:16,padding:14,marginBottom:12,border:`1px solid ${g.border}`,display:"flex",gap:12,alignItems:"center"}}>
                {renderMediaPreview(p,54)}
                <div onClick={()=>onSelect(p.shop)} style={{flex:1,cursor:"pointer"}}>
                  <div style={{fontWeight:800,fontSize:14}}>{p.name}</div>
                  <div style={{fontSize:12,color:g.t2}}>{p.shop.name} • 📍 {p.shop.area}</div>
                  <div style={{fontSize:15,fontWeight:800,color:g.accent,marginTop:3}}>{p.price?.toLocaleString()} {u.da}</div>
                </div>
                <button onClick={()=>toggleSaveProduct(p.id)} style={{background:"#f0a50022",border:"1px solid #f0a500",borderRadius:10,padding:"6px 10px",color:g.accent,fontSize:12,fontWeight:700,cursor:"pointer"}}>🔖</button>
              </div>
            ))
        )}

        {favTab==="shops"&&(
          favShops.map(shop=>(
            <div key={shop.id} style={{background:g.card,borderRadius:18,padding:14,marginBottom:12,border:`1px solid ${g.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div onClick={()=>onSelect(shop)} style={{flex:1,cursor:"pointer",fontWeight:800}}>{shop.name}</div>
              <button onClick={()=>toggleFav(shop.id)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer"}}>❤️</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function AdminScreen({onBack,shops,onApprove,onReject,reports,g}){
  const pending=shops.flatMap(s=>s.products.filter(p=>p.status==="pending").map(p=>({...p,shopName:s.name,shopId:s.id})));
  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir}}>
      <div style={{background:"linear-gradient(135deg,#7c3aed,#6d28d9)",padding:"16px",borderBottom:`1px solid ${g.border}`}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:"#fff",fontSize:16,cursor:"pointer",fontFamily:g.fn}}>← رجوع</button>
        <div style={{fontSize:20,fontWeight:800,marginTop:8,color:"#fff"}}>🛡️ لوحة التحكم ({pending.length})</div>
      </div>
      <div style={{padding:"14px 14px 40px"}}>
        {pending.map(p=>(
          <div key={p.id} style={{background:g.card,borderRadius:16,padding:14,marginBottom:12,border:`1px solid ${g.border}`}}>
            <div style={{fontWeight:700}}>{p.name} — {p.shopName}</div>
            <div style={{display:"flex",gap:8,marginTop:10}}>
              <button onClick={()=>onApprove(p.shopId,p.id)} style={{flex:1,background:"#00cc66",border:"none",borderRadius:12,padding:10,color:"#fff",fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>✓ قبول</button>
              <button onClick={()=>onReject(p.shopId,p.id)} style={{flex:1,background:"#ff4444",border:"none",borderRadius:12,padding:10,color:"#fff",fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>✕ رفض</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen({onBack,shops,favorites,savedProducts,points,g}){
  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir}}>
      <div style={{background:g.card,padding:"16px",borderBottom:`1px solid ${g.border}`}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:16,cursor:"pointer",fontFamily:g.fn}}>← رجوع</button>
        <div style={{fontSize:20,fontWeight:800,marginTop:8}}>👤 حسابي • 🏆 {points}</div>
      </div>
      <div style={{padding:"16px"}}>
        <div style={{background:g.card,borderRadius:16,padding:16,border:`1px solid ${g.border}`}}>
          <div>🏪 {shops.length}</div>
          <div style={{marginTop:8}}>❤️ {favorites.length}</div>
          <div style={{marginTop:8}}>🔖 {savedProducts.length}</div>
        </div>
      </div>
    </div>
  );
}

function SettingsScreen({onBack,dark,setDark,lang,setLang,g,onDelete}){
  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir}}>
      <div style={{background:g.card,padding:"16px",borderBottom:`1px solid ${g.border}`}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:16,cursor:"pointer",fontFamily:g.fn}}>{UI[lang]?.back||"← رجوع"}</button>
        <div style={{fontSize:20,fontWeight:800,marginTop:8}}>⚙️ {lang==="fr"?"Paramètres":"الإعدادات"}</div>
      </div>
      <div style={{padding:"16px"}}>
        <div style={{background:g.card,borderRadius:16,padding:16,marginBottom:14,border:`1px solid ${g.border}`}}>
          <div style={{fontSize:14,fontWeight:800,marginBottom:12,color:g.accent}}>🌐 {lang==="fr"?"Langue":"اللغة"}</div>
          <div style={{display:"flex",gap:8}}>
            {[["ar","🇩🇿 العربية"],["fr","🇫🇷 Français"]].map(([l,lbl])=>(
              <button key={l} onClick={()=>setLang(l)} style={{flex:1,background:lang===l?"linear-gradient(135deg,#f0a500,#e67e00)":g.bg3,border:"none",borderRadius:12,padding:12,color:lang===l?"#fff":g.t2,cursor:"pointer",fontFamily:g.fn,fontSize:14,fontWeight:lang===l?700:400}}>{lbl}</button>
            ))}
          </div>
        </div>
        <div style={{background:g.card,borderRadius:16,padding:16,marginBottom:14,border:`1px solid ${g.border}`}}>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setDark(true)} style={{flex:1,background:dark?"#f0a500":g.bg3,border:"none",borderRadius:12,padding:12,color:dark?"#fff":g.t2,cursor:"pointer",fontFamily:g.fn}}>🌙</button>
            <button onClick={()=>setDark(false)} style={{flex:1,background:!dark?"#f0a500":g.bg3,border:"none",borderRadius:12,padding:12,color:!dark?"#fff":g.t2,cursor:"pointer",fontFamily:g.fn}}>☀️</button>
          </div>
        </div>
        <button onClick={onDelete} style={{width:"100%",background:"#ff444422",border:"1px solid #ff4444",borderRadius:14,padding:14,color:"#ff4444",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>🗑️ {lang==="fr"?"Réinitialiser":"حذف البيانات"}</button>
      </div>
    </div>
  );
}

function CharityScreen({onBack,g}){
  const[orgs,setOrgs]=useState([]);
  const[showAdd,setShowAdd]=useState(false);
  const[f,setF]=useState({name:"",phone:"",area:"",desc:""});
  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir}}>
      {showAdd&&(
        <Modal onClose={()=>setShowAdd(false)} g={g}>
          <div style={{fontSize:17,fontWeight:800,color:"#10b981",marginBottom:12}}>🤲 تسجيل جمعية</div>
          {[["اسم الجمعية *","name"],["رقم الهاتف *","phone"],["الحي / المكان *","area"],["وصف النشاط","desc"]].map(([pl,k])=>(
            <input key={k} placeholder={pl} value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})}
              style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
          ))}
          <button onClick={()=>{if(!f.name||!f.phone)return;setOrgs([{id:Date.now(),...f},...orgs]);setShowAdd(false);}}
            style={{width:"100%",background:"linear-gradient(135deg,#10b981,#059669)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
            تسجيل ✓
          </button>
        </Modal>
      )}
      <div style={{background:g.card,padding:"16px",borderBottom:`1px solid ${g.border}`}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:16,cursor:"pointer",fontFamily:g.fn}}>← رجوع</button>
        <div style={{fontSize:20,fontWeight:800,marginTop:8}}>🤲 الجمعيات الخيرية ({orgs.length})</div>
      </div>
      <div style={{padding:"14px 14px 100px"}}>
        {orgs.map(o=>(
          <div key={o.id} style={{background:g.card,borderRadius:16,padding:14,marginBottom:12,border:`1px solid ${g.border}`}}>
            <div style={{fontWeight:800}}>{o.name}</div>
            <div style={{color:g.t2,fontSize:12}}>📍 {o.area} • 📞 {o.phone}</div>
          </div>
        ))}
      </div>
      <button onClick={()=>setShowAdd(true)} style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#10b981,#059669)",border:"none",borderRadius:20,padding:"13px 26px",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
        🤲 سجّل جمعية
      </button>
    </div>
  );
}

function DeliveryScreen({onBack,drivers,onAdd,onToggle,g}){
  const empty={name:"",phone:"",vehicle:"🛵",areasText:"",areas:[],price:200,hours:"08:00 - 22:00"};
  const[showAdd,setShowAdd]=useState(false);
  const[f,setF]=useState(empty);
  const[areaFilter,setAreaFilter]=useState("ALL");
  const allAreas=Array.from(new Set(drivers.flatMap(d=>d.areas||[]).filter(Boolean)));
  const list=areaFilter==="ALL"?drivers:drivers.filter(d=>(d.areas||[]).includes(areaFilter));
  const inp={width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"};

  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir,maxWidth:430,margin:"0 auto"}}>
      {showAdd&&(
        <Modal onClose={()=>setShowAdd(false)} g={g}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <div style={{fontSize:17,fontWeight:800,color:"#06b6d4"}}>🛵 سجّل كموصّل</div>
            <button onClick={()=>setShowAdd(false)} style={{background:g.bg3,border:"none",borderRadius:8,padding:"4px 10px",color:g.t2,cursor:"pointer",fontSize:16}}>✕</button>
          </div>
          <input placeholder="الاسم *" value={f.name} onChange={e=>setF({...f,name:e.target.value})} style={inp}/>
          <input placeholder="رقم الهاتف *" type="tel" value={f.phone} onChange={e=>setF({...f,phone:e.target.value})} style={inp}/>
          <input
            placeholder="الأحياء أو المدن لي توصل فيها (مثال: عين فكرون، المركز) *"
            value={f.areasText}
            onChange={e=>{
              const val=e.target.value;
              const parsed=val.split(/[,،]/).map(x=>x.trim()).filter(Boolean);
              setF({...f,areasText:val,areas:parsed});
            }}
            style={inp}
          />
          <input placeholder="السعر (دج)" type="number" value={f.price} onChange={e=>setF({...f,price:e.target.value})} style={inp}/>
          <button onClick={()=>{
            if(!f.name.trim()||!f.phone.trim()||f.areas.length===0)return;
            onAdd({id:Date.now(),...f,name:f.name.trim(),price:Number(f.price)||0,available:true});
            setShowAdd(false);setF(empty);
          }} style={{width:"100%",background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
            تسجيل ✓
          </button>
        </Modal>
      )}
      <div style={{background:g.card,padding:"16px",borderBottom:`1px solid ${g.border}`}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:16,cursor:"pointer",fontFamily:g.fn}}>← رجوع</button>
        <div style={{fontSize:20,fontWeight:800,marginTop:8}}>🛵 الموصّلين ({drivers.length})</div>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingTop:10}}>
          <button onClick={()=>setAreaFilter("ALL")} style={{background:areaFilter==="ALL"?"#06b6d4":g.bg3,border:"none",borderRadius:20,padding:"5px 12px",color:g.text,fontSize:11,cursor:"pointer",fontFamily:g.fn}}>كل الأحياء</button>
          {allAreas.map(a=>(
            <button key={a} onClick={()=>setAreaFilter(a)} style={{background:areaFilter===a?"#06b6d4":g.bg3,border:"none",borderRadius:20,padding:"5px 12px",color:g.text,fontSize:11,cursor:"pointer",fontFamily:g.fn}}>📍 {a}</button>
          ))}
        </div>
      </div>
      <div style={{padding:"14px 14px 100px"}}>
        {list.map(d=>(
          <div key={d.id} style={{background:g.card,borderRadius:16,padding:14,marginBottom:12,border:`1px solid ${g.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontWeight:800}}>{d.name} • {d.price} دج</div>
              <div style={{color:g.t2,fontSize:12}}>📍 {(d.areas||[]).join("، ")} • 📞 {d.phone}</div>
            </div>
            <button onClick={()=>onToggle(d.id)} style={{background:d.available?"#00cc6622":"#ff444422",border:"none",borderRadius:14,padding:"6px 10px",color:d.available?"#00cc66":"#ff4444",fontSize:11,fontWeight:700,cursor:"pointer"}}>
              {d.available?"🟢 متاح":"🔴 مشغول"}
            </button>
          </div>
        ))}
      </div>
      <button onClick={()=>setShowAdd(true)} style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:20,padding:"13px 26px",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
        🛵 سجّل كموصّل
      </button>
    </div>
  );
}

function QuranScreen({onBack,g}){
  const[schools,setSchools]=useState([]);
  const[showAdd,setShowAdd]=useState(false);
  const[f,setF]=useState({name:"",phone:"",area:"",teacher:""});
  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir}}>
      {showAdd&&(
        <Modal onClose={()=>setShowAdd(false)} g={g}>
          <div style={{fontSize:17,fontWeight:800,color:"#8b5cf6",marginBottom:12}}>📖 تسجيل مدرسة قرآنية</div>
          {[["اسم المدرسة *","name"],["رقم الهاتف *","phone"],["الحي / المكان *","area"],["اسم المعلم","teacher"]].map(([pl,k])=>(
            <input key={k} placeholder={pl} value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})}
              style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
          ))}
          <button onClick={()=>{if(!f.name||!f.phone)return;setSchools([{id:Date.now(),...f},...schools]);setShowAdd(false);}}
            style={{width:"100%",background:"linear-gradient(135deg,#8b5cf6,#7c3aed)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
            تسجيل ✓
          </button>
        </Modal>
      )}
      <div style={{background:g.card,padding:"16px",borderBottom:`1px solid ${g.border}`}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:16,cursor:"pointer",fontFamily:g.fn}}>← رجوع</button>
        <div style={{fontSize:20,fontWeight:800,marginTop:8}}>📖 المدارس القرآنية ({schools.length})</div>
      </div>
      <div style={{padding:"14px 14px 100px"}}>
        {schools.map(s=>(
          <div key={s.id} style={{background:g.card,borderRadius:16,padding:14,marginBottom:12,border:`1px solid ${g.border}`}}>
            <div style={{fontWeight:800}}>{s.name}</div>
            <div style={{color:g.t2,fontSize:12}}>📍 {s.area} • 📞 {s.phone}</div>
          </div>
        ))}
      </div>
      <button onClick={()=>setShowAdd(true)} style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#8b5cf6,#7c3aed)",border:"none",borderRadius:20,padding:"13px 26px",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
        📖 سجّل مدرسة
      </button>
    </div>
  );
}

export default function DzShop(){
  const[dark,setDark]=useState(true);
  const[lang,setLang]=useState("ar");
  const dir=lang==="fr"?"ltr":"rtl";
  const u=UI[lang]||UI.ar;
  const g=G(dark,dir);

  const[screen,setScreen]=useState("home");
  const[selCat,setSelCat]=useState(null);
  const[selShop,setSelShop]=useState(null);
  const[chatShop,setChatShop]=useState(null);
  const[chatInit,setChatInit]=useState("");
  const[chats,setChats]=useState({});
  const[searchQ,setSearchQ]=useState("");
  const[scanning,setScanning]=useState(false);
  const[scanPreview,setScanPreview]=useState("");
  const scanInputRef=useRef(null);

  const[showReg,setShowReg]=useState(false);
  const[showNotifs,setShowNotifs]=useState(false);
  const[shops,setShops]=useState([]);
  const[doctors,setDoctors]=useState([]);
  const[drivers,setDrivers]=useState([]);
  const[favorites,setFavorites]=useState([]);
  const[likedProducts,setLikedProducts]=useState([]);
  const[savedProducts,setSavedProducts]=useState([]);
  const[reports,setReports]=useState([]);
  const[points,setPoints]=useState(0);

  const NOTIFS=[
    {icon:"🔔",title:lang==="fr"?"Bienvenue sur DzShop !":"مرحباً في DzShop!",body:lang==="fr"?"Inscrivez votre boutique avec votre propre quartier":"سجّلي محلك واكتبي مكانك وحيك بنفسك",time:lang==="fr"?"Maintenant":"الآن"},
    {icon:"🏥",title:lang==="fr"?"Rappel":"تذكير",body:lang==="fr"?"Prenez rendez-vous médical directement":"احجزي موعد طبي مباشرة",time:lang==="fr"?"Aujourd'hui":"اليوم"},
  ];

  const sendChat=(sid,text)=>{
    const tId=Date.now();
    setChats(c=>({...c,[sid]:[...(c[sid]||[]),{id:tId,from:"user",text}]}));
    setTimeout(()=>setChats(c=>({...c,[sid]:[...(c[sid]||[]),{id:Date.now(),from:"shop",text:"شكراً! سنرد قريباً 🙏"}]})),1000);
  };
  const toggleFav=id=>setFavorites(p=>p.includes(id)?p.filter(f=>f!==id):[...p,id]);
  const toggleLikeProduct=id=>setLikedProducts(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const toggleSaveProduct=id=>setSavedProducts(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const addReport=id=>setReports(p=>[...p,id]);
  const addPts=n=>setPoints(p=>p+n);
  const updShop=uShop=>{setShops(s=>s.map(sh=>sh.id===uShop.id?uShop:sh));if(selShop?.id===uShop.id)setSelShop(uShop);};
  const approveP=(sid,pid)=>setShops(s=>s.map(sh=>sh.id===sid?{...sh,products:sh.products.map(p=>p.id===pid?{...p,status:"approved"}:p)}:sh));
  const rejectP=(sid,pid)=>setShops(s=>s.map(sh=>sh.id===sid?{...sh,products:sh.products.filter(p=>p.id!==pid)}:sh));

  const handleImageScan=(e)=>{
    const file=e.target.files?.[0];
    if(!file)return;
    const url=URL.createObjectURL(file);
    setScanPreview(url);
    setScanning(true);
    const cleanName=file.name.replace(/\.[^/.]+$/,"").replace(/[-_]/g," ").trim();
    setTimeout(()=>{
      setScanning(false);
      setSearchQ(cleanName && !/^(img|dsc|photo|screenshot|image|\d+)/i.test(cleanName) ? cleanName : "");
      setScreen("search");
    },1200);
  };

  const qLower=searchQ.trim().toLowerCase();
  const hasPhotoFilter=Boolean(scanPreview)&&!qLower;
  const srch=shops.filter(s=>{
    const shopHasMediaPosts=s.products.some(p=>(!p.status||p.status==="approved")&&(p.images?.length>0||p.videoUrl));
    if(hasPhotoFilter) return shopHasMediaPosts || s.products.some(p=>!p.status||p.status==="approved");
    return (
      s.name.toLowerCase().includes(qLower) ||
      (s.area||"").toLowerCase().includes(qLower) ||
      s.products.some(p=>p.name.toLowerCase().includes(qLower)&&(!p.status||p.status==="approved"))
    );
  });
  const pendCnt=shops.reduce((a,s)=>a+s.products.filter(p=>p.status==="pending").length,0);

  if(chatShop)return <ChatScreen key={chatShop.id} shop={chatShop} msgs={chats[chatShop.id]||[]} initial={chatInit} onSend={txt=>sendChat(chatShop.id,txt)} onBack={()=>{setChatShop(null);setChatInit("");}} g={g}/>;
  if(selShop)return <ShopDetail shop={selShop} onBack={()=>setSelShop(null)} onUpdate={updShop} onReport={addReport} g={g} favorites={favorites} toggleFav={toggleFav} likedProducts={likedProducts} toggleLikeProduct={toggleLikeProduct} savedProducts={savedProducts} toggleSaveProduct={toggleSaveProduct} onChat={(s,txt)=>{setChatInit(txt||"");setChatShop(s);}} addPts={addPts} lang={lang}/>;
  if(screen==="messages")return <MessagesScreen onBack={()=>setScreen("home")} shops={shops} chats={chats} onOpen={sh=>{setChatInit("");setChatShop(sh);}} g={g}/>;
  if(screen==="realestate")return <REScreen onBack={()=>setScreen("home")} g={g}/>;
  if(screen==="doctor")return <DoctorScreen onBack={()=>setScreen("home")} doctors={doctors} onAdd={d=>setDoctors([...doctors,d])} g={g}/>;
  if(screen==="pharmacy")return <PharmaScreen onBack={()=>setScreen("home")} shops={shops} toggleDuty={id=>setShops(s=>s.map(sh=>sh.id===id?{...sh,onDuty:!sh.onDuty}:sh))} g={g}/>;
  if(screen==="charity")return <CharityScreen onBack={()=>setScreen("home")} g={g}/>;
  if(screen==="delivery")return <DeliveryScreen onBack={()=>setScreen("home")} drivers={drivers} onAdd={d=>setDrivers([d,...drivers])} onToggle={id=>setDrivers(ds=>ds.map(x=>x.id===id?{...x,available:!x.available}:x))} g={g}/>;
  if(screen==="quran")return <QuranScreen onBack={()=>setScreen("home")} g={g}/>;
  if(screen==="category"&&selCat)return <CatScreen catId={selCat} onBack={()=>{setScreen("home");setSelCat(null);}} shops={shops} onSelect={s=>setSelShop(s)} g={g} favorites={favorites} toggleFav={toggleFav} likedProducts={likedProducts} toggleLikeProduct={toggleLikeProduct} savedProducts={savedProducts} toggleSaveProduct={toggleSaveProduct} onChat={(s,txt)=>{setChatInit(txt||"");setChatShop(s);}} lang={lang}/>;
  if(screen==="settings")return <SettingsScreen onBack={()=>setScreen("home")} dark={dark} setDark={setDark} lang={lang} setLang={setLang} g={g} onDelete={()=>{setShops([]);setDoctors([]);setDrivers([]);setChats({});setSavedProducts([]);setLikedProducts([]);setScanPreview("");setScreen("home");}}/>;
  if(screen==="admin")return <AdminScreen onBack={()=>setScreen("home")} shops={shops} onApprove={approveP} onReject={rejectP} reports={reports} g={g}/>;
  if(screen==="favorites")return <FavScreen onBack={()=>setScreen("home")} shops={shops} favorites={favorites} savedProducts={savedProducts} toggleSaveProduct={toggleSaveProduct} onSelect={s=>setSelShop(s)} g={g} toggleFav={toggleFav} lang={lang}/>;
  if(screen==="offers")return <OffersScreen onBack={()=>setScreen("home")} shops={shops} g={g} lang={lang}/>;
  if(screen==="new")return <NewScreen onBack={()=>setScreen("home")} shops={shops} onSelect={s=>setSelShop(s)} g={g}/>;
  if(screen==="profile")return <ProfileScreen onBack={()=>setScreen("home")} shops={shops} favorites={favorites} savedProducts={savedProducts} points={points} g={g}/>;

  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:g.dir,maxWidth:430,margin:"0 auto",transition:"all 0.3s"}}>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>
      {showReg&&<RegShopModal onClose={()=>setShowReg(false)} onReg={s=>{setShops([...shops,s]);setShowReg(false);}} g={g} lang={lang}/>}

      {showNotifs&&(
        <div style={{position:"fixed",inset:0,background:"#000b",zIndex:998,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div style={{background:g.card,borderRadius:"24px 24px 0 0",padding:"24px 20px 44px",width:"100%",maxWidth:430,border:`1px solid ${g.border}`,direction:g.dir,fontFamily:g.fn,color:g.text,maxHeight:"65vh",overflowY:"auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
              <div style={{fontSize:17,fontWeight:800}}>🔔</div>
              <button onClick={()=>setShowNotifs(false)} style={{background:g.bg3,border:"none",borderRadius:8,padding:"4px 10px",color:g.t2,cursor:"pointer",fontSize:16}}>✕</button>
            </div>
            {NOTIFS.map((n,i)=>(
              <div key={i} style={{background:g.bg3,borderRadius:14,padding:14,marginBottom:10,display:"flex",gap:12}}>
                <div style={{fontSize:26,flexShrink:0}}>{n.icon}</div>
                <div><div style={{fontWeight:700,fontSize:14}}>{n.title}</div><div style={{color:g.t2,fontSize:13,marginTop:3}}>{n.body}</div><div style={{color:g.t2,fontSize:11,marginTop:4}}>{n.time}</div></div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{background:g.card,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${g.border}`,position:"sticky",top:0,zIndex:100,boxShadow:g.sh}}>
        <div onClick={()=>setScreen("profile")} style={{cursor:"pointer"}}>
          <div style={{fontSize:20,fontWeight:900,background:"linear-gradient(135deg,#f0a500,#ff6b35)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>DzShop 🛍️</div>
          <div style={{fontSize:11,color:g.t2}}>📍 {u.allAreas}</div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <button onClick={()=>setLang(l=>l==="ar"?"fr":"ar")} style={{background:g.bg3,border:`1px solid ${g.border}`,borderRadius:12,padding:"4px 8px",color:g.accent,fontSize:11,fontWeight:800,cursor:"pointer",fontFamily:g.fn}}>
            {lang==="ar"?"FR":"عربي"}
          </button>
          {points>0&&<div style={{background:"linear-gradient(135deg,#f0a500,#e67e00)",borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700,color:"#fff"}}>🏆 {points}</div>}
          <button onClick={()=>setDark(!dark)} style={{background:"none",border:"none",fontSize:18,cursor:"pointer"}}>{dark?"☀️":"🌙"}</button>
          <button onClick={()=>setShowNotifs(true)} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",position:"relative"}}>
            🔔<div style={{position:"absolute",top:-2,right:-2,background:"#ff4444",borderRadius:"50%",width:8,height:8}}/>
          </button>
          {pendCnt>0&&<button onClick={()=>setScreen("admin")} style={{background:"linear-gradient(135deg,#7c3aed,#6d28d9)",border:"none",borderRadius:20,padding:"4px 10px",color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>🛡️ {pendCnt}</button>}
          <button onClick={()=>setScreen("settings")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>⚙️</button>
        </div>
      </div>

      <div style={{padding:"10px 14px",background:g.bg2,borderBottom:`1px solid ${g.border}`}}>
        <div style={{display:"flex",gap:8}}>
          <input placeholder={u.searchPh} value={searchQ}
            onChange={e=>{setSearchQ(e.target.value);setScreen(e.target.value||scanPreview?"search":"home");}}
            style={{flex:1,background:g.bg,border:`1px solid ${g.border}`,borderRadius:14,padding:"10px 16px",color:g.text,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
          <input
            ref={scanInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageScan}
            style={{display:"none"}}
          />
          <button type="button" onClick={()=>scanInputRef.current?.click()} style={{background:scanning?"linear-gradient(135deg,#00ff88,#00cc66)":"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:"0 16px",color:"#fff",fontSize:20,cursor:"pointer"}}>
            {scanning?"⏳":"📷"}
          </button>
        </div>
        {scanning&&<div style={{background:"#00ff8811",border:"1px solid #00ff8833",borderRadius:10,padding:8,textAlign:"center",fontSize:13,color:"#00ff88",marginTop:8}}>{u.scanning}</div>}
      </div>

      {screen==="home"&&(
        <div style={{padding:"14px 14px 100px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
            <button onClick={()=>setScreen("doctor")} style={{background:"linear-gradient(135deg,#06b6d422,#0284c722)",border:"1px solid #06b6d444",borderRadius:16,padding:"12px",color:g.text,cursor:"pointer",fontFamily:g.fn,display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:24}}>🩺</span>
              <div style={{textAlign:lang==="fr"?"left":"right"}}><div style={{fontSize:13,fontWeight:800}}>{u.doctorTitle}</div><div style={{fontSize:11,color:g.t2,marginTop:1}}>{doctors.length} {u.doctorSub}</div></div>
            </button>
            <button onClick={()=>setScreen("pharmacy")} style={{background:"linear-gradient(135deg,#34d39922,#05966922)",border:"1px solid #34d39944",borderRadius:16,padding:"12px",color:g.text,cursor:"pointer",fontFamily:g.fn,display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:24}}>🚨</span>
              <div style={{textAlign:lang==="fr"?"left":"right"}}><div style={{fontSize:13,fontWeight:800}}>{u.pharmaTitle}</div><div style={{fontSize:11,color:g.t2,marginTop:1}}>{u.pharmaSub}</div></div>
            </button>
          </div>

          <div style={{display:"flex",gap:8,marginBottom:16,overflowX:"auto",scrollbarWidth:"none"}}>
            {[
              {icon:"🏷️",label:u.offers,action:()=>setScreen("offers"),c:"#ff6b35"},
              {icon:"🆕",label:u.newToday,action:()=>setScreen("new"),c:"#00ff88"},
              {icon:"🛵",label:u.withDelivery,action:()=>{setSelCat("restaurant");setScreen("category");},c:"#06b6d4"},
              {icon:"🏍️",label:u.drivers,action:()=>setScreen("delivery"),c:"#0ea5e9"},
              {icon:"💬",label:u.messages,action:()=>setScreen("messages"),c:"#f0a500"},
              {icon:"🤲",label:u.charity,action:()=>setScreen("charity"),c:"#10b981"},
              {icon:"📖",label:u.quran,action:()=>setScreen("quran"),c:"#8b5cf6"},
            ].map((item,i)=>(
              <button key={i} onClick={item.action}
                style={{background:`${item.c}22`,border:`1px solid ${item.c}44`,borderRadius:14,padding:"8px 12px",color:g.text,cursor:"pointer",fontFamily:g.fn,display:"flex",alignItems:"center",gap:6,whiteSpace:"nowrap",flexShrink:0}}>
                <span style={{fontSize:16}}>{item.icon}</span>
                <span style={{fontSize:11,fontWeight:700}}>{item.label}</span>
              </button>
            ))}
          </div>

          <div style={{fontSize:14,fontWeight:800,marginBottom:12}}>{u.catsTitle}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"14px 8px",marginBottom:18}}>
            {CATS.map(cat=>(
              <div key={cat.id} onClick={()=>{
                if(cat.id==="realestate"){setScreen("realestate");return;}
                if(cat.id==="doctor"){setScreen("doctor");return;}
                if(cat.id==="charity"){setScreen("charity");return;}
                if(cat.id==="quran"){setScreen("quran");return;}
                setSelCat(cat.id);setScreen("category");
              }} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,cursor:"pointer"}}>
                <div style={{width:62,height:62,borderRadius:"50%",background:`linear-gradient(135deg,${cat.color}33,${cat.color}11)`,border:`2px solid ${cat.color}66`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,boxShadow:`0 3px 10px ${cat.color}22`}}>
                  {cat.icon}
                </div>
                <div style={{fontSize:9,color:g.t2,textAlign:"center",lineHeight:1.3,fontWeight:600,maxWidth:62}}>{lang==="fr"?cat.fr:cat.ar}</div>
              </div>
            ))}
          </div>

          <div style={{background:"linear-gradient(135deg,#f0a50018,#ff6b3518)",border:"1px solid #f0a50033",borderRadius:18,padding:14,marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontWeight:800,fontSize:14}}>{u.haveShop}</div>
              <div style={{color:g.t2,fontSize:11,marginTop:2}}>{u.first10Free}</div>
            </div>
            <button onClick={()=>setShowReg(true)} style={{background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:12,padding:"8px 14px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
              {u.registerNow}
            </button>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8}}>
            {[{l:u.statShops,v:shops.length,ic:"🏪",c:g.accent},{l:u.statDoctors,v:doctors.length,ic:"🩺",c:"#06b6d4"},{l:u.statFavs,v:favorites.length+savedProducts.length,ic:"❤️",c:"#f472b6"},{l:u.statPts,v:points,ic:"🏆",c:"#fbbf24"}].map((s,i)=>(
              <div key={i} style={{background:g.card,borderRadius:12,padding:"10px 4px",textAlign:"center",border:`1px solid ${g.border}`}}>
                <div style={{fontSize:18}}>{s.ic}</div>
                <div style={{fontSize:17,fontWeight:800,color:s.c}}>{s.v}</div>
                <div style={{fontSize:9,color:g.t2}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {screen==="search"&&(
        <div style={{padding:"14px 14px 100px"}}>
          {scanPreview&&(
            <div style={{display:"flex",alignItems:"center",gap:10,background:g.card,padding:10,borderRadius:14,marginBottom:12,border:`1px solid ${g.border}`}}>
              <img src={scanPreview} alt="" style={{width:52,height:52,objectFit:"cover",borderRadius:10}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700}}>{u.photoSearchTitle}</div>
                <div style={{fontSize:11,color:g.t2}}>{u.photoSearchSub}</div>
              </div>
              <button onClick={()=>{setScanPreview("");setSearchQ("");}} style={{background:g.bg3,border:"none",borderRadius:8,padding:"4px 8px",color:g.t2,cursor:"pointer"}}>✕</button>
            </div>
          )}
          <div style={{fontSize:13,color:g.t2,marginBottom:12}}>"{searchQ}" — {srch.length}</div>
          {srch.map(shop=>{
            const cat=CATS.find(c=>c.id===shop.category);
            const matched=shop.products.filter(p=>{
              const ok=!p.status||p.status==="approved";
              if(!ok)return false;
              if(!qLower)return true;
              return p.name.toLowerCase().includes(qLower);
            });
            return(
              <div key={shop.id} onClick={()=>setSelShop(shop)}
                style={{background:g.card,borderRadius:18,padding:14,marginBottom:12,border:`1px solid ${g.border}`,cursor:"pointer",boxShadow:g.sh}}>
                <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:matched.length>0?10:0}}>
                  <div style={{background:`${cat?.color}22`,borderRadius:12,width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{cat?.icon}</div>
                  <div style={{flex:1}}><div style={{fontWeight:800}}>{shop.name}</div><div style={{color:g.t2,fontSize:12}}>{lang==="fr"?cat?.fr:cat?.ar} • 📍 {shop.area||"—"}</div></div>
                </div>
                {matched.map(p=>(
                  <div key={p.id} style={{background:g.bg,borderRadius:10,padding:"8px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:6}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      {renderMediaPreview(p,28)}
                      <span style={{fontSize:14}}>{p.name}</span>
                    </div>
                    <span style={{color:g.accent,fontWeight:700,fontSize:13}}>{p.price?.toLocaleString()} {u.da}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:g.card,borderTop:`1px solid ${g.border}`,padding:"8px 0 14px",display:"flex",justifyContent:"space-around",boxShadow:g.sh}}>
        {[
          {icon:"🏠",label:u.navHome,action:()=>{setScreen("home");setSelCat(null);setSearchQ("");setScanPreview("");}},
          {icon:"🔍",label:u.navSearch,action:()=>setScreen("search")},
          {icon:"🏷️",label:u.navOffers,action:()=>setScreen("offers")},
          {icon:"❤️",label:u.navFav,action:()=>setScreen("favorites")},
          {icon:"👤",label:u.navProfile,action:()=>setScreen("profile")},
        ].map((nav,i)=>(
          <button key={i} onClick={nav.action}
            style={{background:"none",border:"none",color:g.t2,fontSize:10,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,fontFamily:g.fn,minWidth:46}}>
            <span style={{fontSize:20}}>{nav.icon}</span>
            {nav.label}
          </button>
        ))}
      </div>
    </div>
  );
}