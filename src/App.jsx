import { useState, useRef, useEffect } from "react";
import MerchantCard from "./MerchantCard";

const CATS = [
  {id:"supermarket",ar:"سوبرماركت",icon:"🛒",color:"#00cc66"},
  {id:"restaurant",ar:"مطاعم",icon:"🍽️",color:"#ff6b35"},
  {id:"clothes_women",ar:"ملابس نسائية",icon:"👗",color:"#ff69b4"},
  {id:"clothes_men",ar:"ملابس رجال",icon:"👔",color:"#4a90d9"},
  {id:"clothes_kids",ar:"ملابس أطفال",icon:"👶",color:"#ffcc00"},
  {id:"tailoring",ar:"خياطة",icon:"🧵",color:"#e879f9"},
  {id:"accessories",ar:"أكسسوارات",icon:"💍",color:"#c084fc"},
  {id:"cosmetic",ar:"كوسميتيك",icon:"💄",color:"#f472b6"},
  {id:"beauty",ar:"صالونات",icon:"✂️",color:"#fb7185"},
  {id:"cakes",ar:"حلويات",icon:"🎂",color:"#fbbf24"},
  {id:"pharmacy",ar:"صيدليات",icon:"💊",color:"#34d399"},
  {id:"furniture",ar:"أفرشة",icon:"🛋️",color:"#fb923c"},
  {id:"wholesale",ar:"بيع بالجملة",icon:"📦",color:"#60a5fa"},
  {id:"phones",ar:"هواتف",icon:"📱",color:"#a78bfa"},
  {id:"doctor",ar:"أطباء",icon:"🩺",color:"#06b6d4"},
  {id:"realestate",ar:"عقارات",icon:"🏘️",color:"#f87171"},
  {id:"charity",ar:"جمعيات خيرية",icon:"🤲",color:"#10b981"},
  {id:"quran",ar:"مدارس قرآنية",icon:"📖",color:"#8b5cf6"},
];
const AREAS=["كل الأحياء","المركز"];
const SPECS=["all","طب عام","طب أطفال","طب الأسنان","أمراض النساء","قلب وأوعية","عيون","جلدية"];
const TIMES=["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"];
const EMOJIS=["📦","🛒","👗","👔","👶","💍","💄","💊","🛋️","📱","🌸","🧴","👟","🍝","🌻","🥛","🫒","🎂","🍕","🧵","✂️","🍔","💅","🧃","🎁"];
const GALLERY_EMOJIS=["📸","👗","💍","🎂","🍕","🧵","📱","💄","🛋️","👟","🍰","👜"];

const INITIAL_SHOPS = [
  {
    id: 1,
    name: "محل أم البواقي العصري",
    category: "clothes_women",
    phone: "0550000000",
    desc: "أحدث موديلات الملابس النسائية والخياطة العصرية",
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

function Modal({onClose,children,g}){
  return(
    <div style={{position:"fixed",inset:0,background:"#000b",zIndex:999,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{background:g.card,borderRadius:"24px 24px 0 0",padding:"24px 20px 44px",width:"100%",maxWidth:430,border:`1px solid ${g.border}`,direction:"rtl",fontFamily:g.fn,maxHeight:"92vh",overflowY:"auto",color:g.text}}>
        {children}
      </div>
    </div>
  );
}

function UpgModal({onClose,g}){
  return(
    <Modal onClose={onClose} g={g}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:48}}>💎</div>
        <div style={{fontSize:20,fontWeight:800,color:g.accent}}>ارقِ للباقة المدفوعة</div>
        <div style={{fontSize:13,color:g.t2,marginTop:4}}>وصلتِ لحد 10 منتجات مجانية، للاستمرار في النشر يرجى تفعيل الاشتراك</div>
      </div>
      {[["📦","منتجات ومعرض غير محدود"],["⭐","ظهور في الأول"],["✅","شارة موثق"],["📊","إحصائيات متقدمة"]].map(([ic,tx],k)=>(
        <div key={k} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${g.border}44`}}>
          <span style={{fontSize:20}}>{ic}</span><span style={{fontSize:14}}>{tx}</span>
          <span style={{marginRight:"auto",color:"#00ff88",fontSize:16}}>✓</span>
        </div>
      ))}
      <div style={{background:"linear-gradient(135deg,#f0a500,#e67e00)",borderRadius:16,padding:16,textAlign:"center",margin:"20px 0 12px"}}>
        <div style={{fontSize:24,fontWeight:900,color:"#fff"}}>500 دج / شهر</div>
      </div>
      <button onClick={onClose} style={{width:"100%",background:g.bg3,border:"none",borderRadius:14,padding:14,color:g.t2,fontSize:14,cursor:"pointer",fontFamily:g.fn}}>لاحقاً</button>
    </Modal>
  );
}

function AddProductModal({onClose,onAdd,count,g}){
  const[form,setF]=useState({name:"",price:"",desc:"",image:"📦",available:true,discount:0});
  const[showUp,setShowUp]=useState(false);
  const today=new Date().toDateString();
  return(<>
    {showUp&&<UpgModal onClose={()=>setShowUp(false)} g={g}/>}
    <Modal onClose={onClose} g={g}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontSize:17,fontWeight:800,color:g.accent}}>➕ إضافة منتج</div>
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
      {[["اسم المنتج *","name","text"],["السعر (دج) *","price","number"],["وصف قصير","desc","text"]].map(([pl,k,tp])=>(
        <input key={k} placeholder={pl} type={tp} value={form[k]} onChange={e=>setF({...form,[k]:e.target.value})}
          style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
      ))}
      <input placeholder="تخفيض % (اختياري)" type="number" value={form.discount||""} onChange={e=>setF({...form,discount:Number(e.target.value)})}
        style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:12,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px",background:g.bg3,borderRadius:12,marginBottom:14}}>
        <span style={{fontSize:14}}>متوفر الآن؟</span>
        <button onClick={()=>setF({...form,available:!form.available})}
          style={{background:form.available?"#00ff8822":"#ff444422",border:`1px solid ${form.available?"#00ff88":"#ff4444"}`,borderRadius:20,padding:"6px 18px",color:form.available?"#00ff88":"#ff4444",cursor:"pointer",fontFamily:g.fn,fontWeight:700}}>
          {form.available?"✓ متوفر":"✗ نافد"}
        </button>
      </div>
      <div style={{fontSize:12,color:g.t2,marginBottom:10,textAlign:"center"}}>{count}/10 منتجات مجانية</div>
      <button onClick={()=>{if(!form.name||!form.price)return;if(count>=10){setShowUp(true);return;}onAdd({...form,price:Number(form.price),id:Date.now(),status:"pending",addedDate:today});onClose();}}
        style={{width:"100%",background:count>=10?"#2a2a4a":"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
        {count>=10?"🔒 تجاوزت الحد المجاني":"نشر المنتج ✓"}
      </button>
    </Modal>
  </>);
}

function AddGalleryModal({onClose,onAddPhoto,g}){
  const[title,setTitle]=useState("");
  const[icon,setIcon]=useState("📸");
  return(
    <Modal onClose={onClose} g={g}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontSize:17,fontWeight:800,color:g.accent}}>📷 إضافة صورة لمعرض السلعة</div>
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
      <input placeholder="عنوان الصورة أو الوصف (مثال: موديل جديد قندورة عصرية)" value={title} onChange={e=>setTitle(e.target.value)}
        style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:16,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
      <button onClick={()=>{if(!title.trim())return;onAddPhoto({id:Date.now(),title:title.trim(),icon,date:new Date().toLocaleDateString("ar")});onClose();}}
        style={{width:"100%",background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
        نشر في المعرض ✓
      </button>
    </Modal>
  );
}

function RegShopModal({onClose,onReg,g}){
  const[f,setF]=useState({name:"",category:"supermarket",phone:"",desc:"",hours:"09:00 - 21:00",days:"السبت - الخميس",hasDelivery:false,area:"المركز",discount:0,offerText:""});
  const today=new Date().toDateString();
  const inp=(pl,k,tp="text")=>(
    <input key={k} placeholder={pl} type={tp} value={f[k]} onChange={e=>setF({...f,[k]:tp==="number"?Number(e.target.value):e.target.value})}
      style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
  );
  const sel=(k,opts)=>(
    <select value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})}
      style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:12,color:g.text,marginBottom:10,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}>
      {opts.map(o=>typeof o==="string"?<option key={o} value={o}>{o}</option>:<option key={o.id} value={o.id}>{o.icon} {o.ar}</option>)}
    </select>
  );
  return(
    <Modal onClose={onClose} g={g}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
        <div style={{fontSize:17,fontWeight:800,color:g.accent}}>🏪 تسجيل محلك</div>
        <button onClick={onClose} style={{background:g.bg3,border:"none",borderRadius:8,padding:"4px 10px",color:g.t2,cursor:"pointer",fontSize:16}}>✕</button>
      </div>
      <div style={{background:"#00ff8811",border:"1px solid #00ff8833",borderRadius:12,padding:10,marginBottom:14,fontSize:13,color:"#00ff88",textAlign:"center"}}>✅ أول 10 منتجات ومعرض صور مجاني تماماً</div>
      {inp("اسم المحل *","name")}
      {inp("رقم الهاتف *","phone")}
      {inp("وصف المحل","desc")}
      {inp("أوقات العمل (09:00 - 21:00)","hours")}
      {sel("category",CATS.filter(c=>c.id!=="doctor"&&c.id!=="realestate"))}
      {sel("area",AREAS.filter(a=>a!=="كل الأحياء"))}
      {sel("days",["كل أيام الأسبوع","السبت - الخميس","السبت - الجمعة","الإثنين - الجمعة"])}
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        {inp("تخفيض %","discount","number")}
        {inp("نص العرض","offerText")}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,padding:"12px",background:g.bg3,borderRadius:12}}>
        <span style={{fontSize:14}}>🛵 عندك توصيل؟</span>
        <button onClick={()=>setF({...f,hasDelivery:!f.hasDelivery})}
          style={{background:f.hasDelivery?"#00ff8822":"#2a2a4a",border:`1px solid ${f.hasDelivery?"#00ff88":g.border}`,borderRadius:20,padding:"6px 18px",color:f.hasDelivery?"#00ff88":g.t2,cursor:"pointer",fontFamily:g.fn,fontWeight:700}}>
          {f.hasDelivery?"✓ نعم":"لا"}
        </button>
      </div>
      <button onClick={()=>{if(!f.name||!f.phone)return;onReg({id:Date.now(),...f,distance:"—",rating:5,verified:false,plan:"free",onDuty:false,products:[],gallery:[],reviews:[],addedDate:today});onClose();}}
        style={{width:"100%",background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:14,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>
        سجّل الآن مجاناً ✓
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
        <div style={{fontSize:16,fontWeight:800,color:g.accent}}>💬 تعليقات: {prod.image} {prod.name}</div>
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
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:"rtl",display:"flex",flexDirection:"column"}}>
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
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:"rtl",maxWidth:430,margin:"0 auto"}}>
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

function ShopDetail({shop,onBack,onUpdate,onReport,g,favorites,toggleFav,onChat,addPts}){
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
  const addProd=p=>{const u=[...products,p];setProducts(u);onUpdate({...shop,products:u});};
  const addPhoto=ph=>{const u=[...gallery,ph];setGallery(u);onUpdate({...shop,gallery:u});};
  const addRev=r=>{const u=[...reviews,r];setReviews(u);onUpdate({...shop,reviews:u});};
  const addProdComment=(pid,c)=>{const u=products.map(p=>p.id===pid?{...p,comments:[...(p.comments||[]),c]}:p);setProducts(u);onUpdate({...shop,products:u});};
  const isOpen=()=>{try{const[sh,eh]=shop.hours.split(" - ").map(x=>parseInt(x));const h=new Date().getHours();return h>=sh&&h<eh;}catch{return true;}};
  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:"rtl"}}>
      {showAdd&&<AddProductModal onClose={()=>setShowAdd(false)} onAdd={addProd} count={products.length} g={g}/>}
      {showGalAdd&&<AddGalleryModal onClose={()=>setShowGalAdd(false)} onAddPhoto={addPhoto} g={g}/>}
      {showRev&&<RevModal onClose={()=>setShowRev(false)} onSubmit={addRev} g={g} addPts={addPts}/>}
      {showDeliv&&<DelivModal shop={shop} onClose={()=>setShowDeliv(false)} g={g}/>}
      {commProd&&products.find(x=>x.id===commProd)&&<ProdCommentsModal prod={products.find(x=>x.id===commProd)} onClose={()=>setCommProd(null)} onAdd={addProdComment} g={g}/>}
      
      <div style={{background:`linear-gradient(160deg,${cat?.color}44,${g.bg2})`,padding:"16px 16px 0",borderBottom:`1px solid ${g.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <button onClick={onBack} style={{background:"none",border:"none",color:g.accent,fontSize:16,cursor:"pointer",fontFamily:g.fn}}>← رجوع</button>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button onClick={()=>toggleFav(shop.id)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer"}}>{isFav?"❤️":"🤍"}</button>
            <button onClick={()=>{navigator.share?.({title:shop.name});addPts(5);}} style={{background:"none",border:"none",fontSize:22,cursor:"pointer"}}>📤</button>
            <button onClick={()=>onChat(shop)} style={{background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:20,padding:"6px 14px",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>💬 محادثة</button>
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
              {shop.discount>0&&<span style={{background:"#ff6b3522",color:"#ff6b35",fontSize:11,padding:"2px 8px",borderRadius:10,fontWeight:700}}>{shop.discount}% تخفيض</span>}
            </div>
            {shop.desc&&<div style={{color:g.t2,fontSize:13,marginTop:3}}>{shop.desc}</div>}
            <div style={{display:"flex",gap:10,marginTop:6,flexWrap:"wrap",alignItems:"center"}}>
              <span style={{fontSize:12,color:g.t2}}>📍 {shop.area||"—"}</span>
              <span style={{fontSize:13,color:g.accent,fontWeight:700}}>⭐ {avg}</span>
              <span style={{fontSize:12,background:isOpen()?"#00ff8822":"#ff444422",color:isOpen()?"#00ff88":"#ff4444",padding:"2px 8px",borderRadius:10}}>{isOpen()?"● مفتوح":"● مغلق"}</span>
            </div>
          </div>
        </div>
        
        <div style={{marginBottom:10}}>
          <MerchantCard merchantName={shop.name} merchantPhone={shop.phone} />
        </div>

        {shop.hasDelivery&&<button onClick={()=>setShowDeliv(true)} style={{width:"100%",background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:14,padding:"11px",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:g.fn,marginBottom:10}}>🛵 طلب توصيل</button>}

        <div style={{display:"flex",borderTop:`1px solid ${g.border}`}}>
          {[["products",`🛍️ المنتجات (${approved.length})`],["gallery",`📷 المعرض (${gallery.length})`],["reviews",`⭐ (${reviews.length})`],["info","ℹ️"]].map(([id,lbl])=>(
            <button key={id} onClick={()=>setTab(id)}
              style={{flex:1,background:"none",border:"none",color:tab===id?g.accent:g.t2,fontSize:12,padding:"11px 4px",cursor:"pointer",fontFamily:g.fn,fontWeight:700,borderBottom:tab===id?`2px solid ${g.accent}`:"2px solid transparent"}}>
              {lbl}
            </button>
          ))}
        </div>
      </div>
      <div style={{padding:"14px 14px 100px"}}>
        {tab==="products"&&(approved.length===0?
          <div style={{textAlign:"center",padding:"50px 20px",color:g.t2}}><div style={{fontSize:48,marginBottom:12}}>📦</div><div>ما كاين منتج — اضغطي ➕ أسفل الشاشة</div></div>
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
                  {p.discount>0?Math.round(p.price*(1-p.discount/100)).toLocaleString():p.price?.toLocaleString()} دج
                </div>
              </div>
            </div>
            <div style={{background:p.available?"#00ff8822":"#ff444422",color:p.available?"#00ff88":"#ff4444",padding:"5px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>
              {p.available?"✓ متوفر":"✗ نافد"}
            </div>
           </div>
           <div style={{display:"flex",gap:8,marginTop:12,paddingTop:10,borderTop:`1px solid ${g.border}44`}}>
             <button onClick={()=>setCommProd(p.id)} style={{flex:1,background:g.bg3,border:"none",borderRadius:12,padding:"8px",color:g.text,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>💬 تعليقات ({(p.comments||[]).length})</button>
             <button onClick={()=>onChat(shop,`السلام عليكم، نحب نسأل على: ${p.name}`)} style={{flex:1,background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:12,padding:"8px",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:g.fn}}>✉️ اسأل المحل</button>
           </div>
          </div>
        )))}

        {tab==="gallery"&&(<>
          <button onClick={()=>setShowGalAdd(true)}
            style={{width:"100%",background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:12,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:g.fn,marginBottom:14}}>
            📷 أضف صورة جديدة لمعرض السلعة
          </button>
          {gallery.length===0?<div style={{textAlign:"center",padding:"40px",color:g.t2}}>ما كاين صور في المعرض حالياً 📷</div>:
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
            <div style={{color:g.t2,fontSize:13}}>{reviews.length} تقييم</div>
          </div>
          <button onClick={()=>setShowRev(true)}
            style={{width:"100%",background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:14,padding:12,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:g.fn,marginBottom:14}}>
            ⭐ أضف تقييم (+10 نقاط)
          </button>
          {reviews.length===0?<div style={{textAlign:"center",padding:"30px",color:g.t2}}>كوني أول من يقيّم! 🌟</div>:reviews.map(r=>(
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
            {[["📍 الحي",shop.area||"—"],["📞 الهاتف",shop.phone],["⏰ أوقات العمل",shop.hours],["📅 أيام العمل",shop.days],["📦 منتجات",`${approved.length}`],["📷 صور المعرض",`${gallery.length}`],["🛵 توصيل",shop.hasDelivery?"✓ نعم":"✗ لا"]].map(([l,v],i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${g.border}44`}}>
                <span style={{color:g.t2,fontSize:14}}>{l}</span>
                <span style={{fontWeight:700,fontSize:14}}>{v}</span>
              </div>
            ))}
            <a href={`https://maps.google.com/?q=${encodeURIComponent(shop.name+" أم البواقي")}`} target="_blank" rel="noreferrer"
              style={{display:"block",marginTop:14,background:"linear-gradient(135deg,#34d399,#059669)",borderRadius:14,padding:"11px",color:"#fff",fontSize:14,fontWeight:700,textAlign:"center",textDecoration:"none"}}>
              🗺️ فتح في Google Maps
            </a>
          </div>
        )}
      </div>

      <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",display:"flex",gap:8,width:"calc(100% - 40px)",maxWidth:360,zIndex:10}}>
        <button onClick={()=>setShowAdd(true)}
          style={{flex:1,background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:18,padding:"12px 10px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:g.fn,boxShadow:"0 4px 20px #f0a50066"}}>
          ➕ أضف منتج
        </button>
        <button onClick={()=>setShowGalAdd(true)}
          style={{flex:1,background:"linear-gradient(135deg,#06b6d4,#0284c7)",border:"none",borderRadius:18,padding:"12px 10px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:g.fn,boxShadow:"0 4px 20px #06b6d466"}}>
          📷 أضف لمعرض
        </button>
      </div>
    </div>
  );
}

function App(){
  const[dark,setDark]=useState(true);
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
          onSend={(t)=>sendMsg(chatTarget.shop.id,t)}
          onBack={()=>setChatTarget(null)}
          g={g}
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
          onReport={()=>alert("تم إرسال البلاغ")}
          g={g}
          favorites={favorites}
          toggleFav={toggleFav}
          onChat={openChat}
          addPts={(n)=>setPts(p=>p+n)}
        />
      </div>
    );
  }

  const filtered=shops.filter(s=>{
    const mCat=catFilter==="all"||s.category===catFilter;
    const mQ=!search.trim()||s.name.toLowerCase().includes(search.trim().toLowerCase());
    return mCat&&mQ;
  });

  return(
    <div style={{minHeight:"100vh",background:g.bg,color:g.text,fontFamily:g.fn,direction:"rtl",maxWidth:430,margin:"0 auto",paddingBottom:90}}>
      {showReg&&<RegShopModal onClose={()=>setShowReg(false)} onReg={(sh)=>setShops(prev=>[sh,...prev])} g={g}/>}
      <div style={{background:g.card,padding:"16px",borderBottom:`1px solid ${g.border}`,position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div>
            <div style={{fontSize:20,fontWeight:900,color:g.accent}}>DzShop</div>
            <div style={{fontSize:12,color:g.t2}}>نقاطك: {pts} ⭐</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setShowMsgs(true)} style={{background:g.bg3,border:"none",borderRadius:12,padding:"8px 12px",color:g.text,cursor:"pointer",fontFamily:g.fn,fontSize:13}}>💬 الرسائل</button>
            <button onClick={()=>setDark(d=>!d)} style={{background:g.bg3,border:"none",borderRadius:12,padding:"8px 12px",color:g.text,cursor:"pointer",fontSize:14}}>{dark?"☀️":"🌙"}</button>
          </div>
        </div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث عن محل..."
          style={{width:"100%",background:g.bg,border:`1px solid ${g.border}`,borderRadius:12,padding:"10px 14px",color:g.text,fontFamily:g.fn,fontSize:14,boxSizing:"border-box"}}/>
      </div>

      <div style={{display:"flex",gap:8,overflowX:"auto",padding:"12px 16px"}}>
        <button onClick={()=>setCatFilter("all")}
          style={{background:catFilter==="all"?g.accent:g.bg3,color:catFilter==="all"?"#fff":g.text,border:"none",borderRadius:14,padding:"6px 14px",cursor:"pointer",fontFamily:g.fn,fontSize:12,fontWeight:700,flexShrink:0}}>
          الكل
        </button>
        {CATS.map(c=>(
          <button key={c.id} onClick={()=>setCatFilter(c.id)}
            style={{background:catFilter===c.id?g.accent:g.bg3,color:catFilter===c.id?"#fff":g.text,border:"none",borderRadius:14,padding:"6px 12px",cursor:"pointer",fontFamily:g.fn,fontSize:12,fontWeight:700,flexShrink:0}}>
            {c.icon} {c.ar}
          </button>
        ))}
      </div>

      <div style={{padding:"4px 16px"}}>
        {filtered.map(sh=>{
          const cat=CATS.find(c=>c.id===sh.category);
          return(
            <div key={sh.id} onClick={()=>setSelectedShopId(sh.id)}
              style={{background:g.card,borderRadius:16,padding:14,marginBottom:12,border:`1px solid ${g.border}`,boxShadow:g.sh,cursor:"pointer",display:"flex",gap:12,alignItems:"center"}}>
              <div style={{background:`${cat?.color}22`,borderRadius:14,width:52,height:52,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>
                {cat?.icon||"🏪"}
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:800,fontSize:15}}>{sh.name}</div>
                <div style={{color:g.t2,fontSize:12,marginTop:2}}>{cat?.ar} • {sh.area||"—"}</div>
              </div>
              <div style={{color:g.accent,fontWeight:700,fontSize:13}}>⭐ {sh.rating||5}</div>
            </div>
          );
        })}
      </div>

      <button onClick={()=>setShowReg(true)}
        style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#f0a500,#e67e00)",border:"none",borderRadius:18,padding:"12px 24px",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:g.fn,boxShadow:"0 4px 20px #f0a50066"}}>
        + تسجيل محلك
      </button>
    </div>
  );
}

export default App;