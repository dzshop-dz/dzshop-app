import React, { useState, useEffect } from "react";

const TRANSLATIONS = {
  ar: {
    appName: "متجر دي زد",
    ratingLabel: "تقييمك:",
    promotions: "التخفيضات",
    searchPlaceholder: "ابحث عن المتاجر أو المنتجات...",
    all: "الكل",
    supermarket: "سوبرماركت",
    restaurants: "مطاعم",
    clothes: "ملابس",
    barber: "حلاقة الرجال",
    addPlace: "+ أضف محلك",
    registerShopTitle: "تسجيل محلك",
    freeBanner: "أول 10 منشورات مجانية تماماً",
    shopName: "اسم المحل *",
    phone: "رقم الهاتف *",
    description: "وصف المحل",
    hours: "أوقات العمل (مثال: 09:00 - 21:00)",
    days: "أيام العمل (مثال: السبت - الخميس)",
    area: "المنطقة (عين فكرون، أم البواقي، عين البيضاء، عين مليلة)",
    offerText: "نص العرض الترويجي (اختياري)",
    saveShop: "حفظ وتسجيل المحل",
    call: "اتصال",
    orderDelivery: "طلب توصيل",
    postsTab: "المنشورات",
    discountsTab: "التخفيضات",
    reviewsTab: "التقييمات",
    noPosts: "لا توجد منشورات بعد — اضغطي + لإضافة منشور",
    noDiscounts: "لا توجد تخفيضات حالياً في هذا المحل",
    noReviews: "لا توجد تقييمات بعد",
    addPostBtn: "+ أضف منشور",
    addDiscountBtn: "+ أضف تخفيض",
    addPostTitle: "إضافة منشور جديد",
    uploadMediaHint: "اختاري حتى 10 صور أو فيديو من معرض الجهاز *",
    selectImages: "اختيار صور (حتى 10)",
    selectVideo: "اختيار فيديو",
    max10Alert: "يمكنكِ إضافة 10 صور كحد أقصى في المنشور الواحد.",
    postTitle: "عنوان المنشور / المنتج *",
    price: "السعر (دج) *",
    shortDesc: "وصف قصير",
    discountPercent: "نسبة التخفيض % (اختياري)",
    availableNow: "متوفر الآن",
    unavailable: "غير متوفر",
    freeCounter: "منشورات مجانية مستخدمة",
    publishPost: "نشر المنشور",
    limitReachedTitle: "انتهت الباقة المجانية (10 منشورات)",
    limitReachedDesc:
      "لقد نشرتِ 10 منشورات مجانية. للاستمرار في نشر المزيد من المنتجات والعروض، يرجى تفعيل الاشتراك الشهري للتجار.",
    activatePro: "تفعيل الاشتراك الشهري (1000 دج / شهر)",
    close: "إغلاق",
    rateShop: "أضيفي تقييمك للمحل",
    reviewComment: "اكتبي رأيك في المحل...",
    sendReview: "إرسال التقييم",
    back: "رجوع",
    da: "دج",
    off: "تخفيض",
    photosCount: "صور",
    videoBadge: "فيديو",
    deliveryMsg: "تم إرسال طلب التوصيل للمحل، سيتصل بكِ قريباً!",
    proActivated: "تم تفعيل الاشتراك بنجاح! يمكنكِ الآن النشر بلا حدود.",
    fillRequired: "يرجى ملء الحقول الإجبارية وإرفاق صورة أو فيديو.",
  },
  fr: {
    appName: "DZ Shop",
    ratingLabel: "Votre note :",
    promotions: "Promotions",
    searchPlaceholder: "Rechercher des boutiques ou produits...",
    all: "Tout",
    supermarket: "Supermarché",
    restaurants: "Restaurants",
    clothes: "Vêtements",
    barber: "Coiffure hommes",
    addPlace: "+ Ajouter votre lieu",
    registerShopTitle: "Inscrire votre boutique",
    freeBanner: "Les 10 premières publications sont gratuites",
    shopName: "Nom de la boutique *",
    phone: "Numéro de téléphone *",
    description: "Description de la boutique",
    hours: "Horaires (ex: 09:00 - 21:00)",
    days: "Jours d'ouverture (ex: Samedi - Jeudi)",
    area: "Ville / Quartier (Aïn Fakroun, OEB, Aïn Beïda, Aïn M'lila)",
    offerText: "Texte de l'offre (optionnel)",
    saveShop: "Enregistrer la boutique",
    call: "Appeler",
    orderDelivery: "Commander livraison",
    postsTab: "Publications",
    discountsTab: "Promotions",
    reviewsTab: "Avis",
    noPosts: "Aucune publication — cliquez sur + pour publier",
    noDiscounts: "Aucune promotion disponible pour le moment",
    noReviews: "Aucun avis pour le moment",
    addPostBtn: "+ Publier",
    addDiscountBtn: "+ Ajouter promo",
    addPostTitle: "Nouvelle publication",
    uploadMediaHint: "Choisissez jusqu'à 10 photos ou une vidéo *",
    selectImages: "Choisir des photos (max 10)",
    selectVideo: "Choisir une vidéo",
    max10Alert: "Maximum 10 photos par publication.",
    postTitle: "Titre du produit / publication *",
    price: "Prix (DA) *",
    shortDesc: "Description courte",
    discountPercent: "Réduction % (optionnel)",
    availableNow: "Disponible",
    unavailable: "Indisponible",
    freeCounter: "publications gratuites utilisées",
    publishPost: "Publier maintenant",
    limitReachedTitle: "Limite gratuite atteinte (10 publications)",
    limitReachedDesc:
      "Vous avez utilisé vos 10 publications gratuites. Passez à l'abonnement commerçant pour publier en illimité.",
    activatePro: "Activer l'abonnement (1000 DA / mois)",
    close: "Fermer",
    rateShop: "Noter cette boutique",
    reviewComment: "Votre avis sur la boutique...",
    sendReview: "Envoyer l'avis",
    back: "Retour",
    da: "DA",
    off: "Promo",
    photosCount: "photos",
    videoBadge: "Vidéo",
    deliveryMsg: "Demande de livraison envoyée à la boutique !",
    proActivated: "Abonnement activé ! Publications illimitées débloquées.",
    fillRequired: "Veuillez remplir les champs obligatoires et ajouter un média.",
  },
};

const FREE_POSTS_LIMIT = 10;

const INITIAL_SHOPS = [
  {
    id: "shop-1",
    name: "Ferial Créations",
    category: "clothes",
    phone: "0550000000",
    area: "عين فكرون - أم البواقي",
    hours: "09:00 - 20:00",
    days: "السبت - الخميس",
    description: "خياطة عصرية وتقليدية، أطقم أفرشة، وتفصيل حسب الطلب.",
    offerText: "تخفيض خاص على أطقم العرائس",
    isPro: false,
    posts: [],
    reviews: [],
  },
];

// تصغير الصورة تلقائياً قبل التخزين لتفادي امتلاء localStorage
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

function App() {
  const [lang, setLang] = useState("ar");
  const t = TRANSLATIONS[lang];
  const isRTL = lang === "ar";

  const [shops, setShops] = useState(() => {
    try {
      const saved = localStorage.getItem("dzshop_data_v2");
      return saved ? JSON.parse(saved) : INITIAL_SHOPS;
    } catch {
      return INITIAL_SHOPS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("dzshop_data_v2", JSON.stringify(shops));
    } catch {
      // تجاهل خطأ الامتلاء إذا كانت الفيديوهات كبيرة
    }
  }, [shops]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showOnlyPromos, setShowOnlyPromos] = useState(false);
  const [activeShopId, setActiveShopId] = useState(null);
  const [activeTab, setActiveTab] = useState("posts"); // posts | discounts | reviews

  // نافذة تسجيل محل
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [shopForm, setShopForm] = useState({
    name: "",
    phone: "",
    description: "",
    hours: "09:00 - 21:00",
    category: "supermarket",
    area: "عين فكرون",
    days: "السبت - الخميس",
    offerText: "",
  });

  // نافذة إضافة منشور
  const [showPostModal, setShowPostModal] = useState(false);
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [postForm, setPostForm] = useState({
    title: "",
    price: "",
    description: "",
    discount: "",
    available: true,
    mediaType: "image", // image | video
    images: [],
    videoUrl: "",
  });

  // معاينة معرض الصور في المنشور
  const [lightboxMedia, setLightboxMedia] = useState(null);

  // نموذج التقييم
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const activeShop = shops.find((s) => s.id === activeShopId) || null;

  const categories = [
    { id: "all", label: t.all },
    { id: "supermarket", label: t.supermarket },
    { id: "restaurants", label: t.restaurants },
    { id: "clothes", label: t.clothes },
    { id: "barber", label: t.barber },
  ];

  const filteredShops = shops.filter((shop) => {
    const matchesCat =
      selectedCategory === "all" || shop.category === selectedCategory;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      shop.name.toLowerCase().includes(q) ||
      shop.area.toLowerCase().includes(q) ||
      shop.posts.some((p) => p.title.toLowerCase().includes(q));
    const hasPromo =
      shop.posts.some((p) => Number(p.discount) > 0) || Boolean(shop.offerText);
    const matchesPromo = !showOnlyPromos || hasPromo;
    return matchesCat && matchesSearch && matchesPromo;
  });

  const handleRegisterShop = (e) => {
    e.preventDefault();
    if (!shopForm.name.trim() || !shopForm.phone.trim()) {
      alert(t.fillRequired);
      return;
    }
    const newShop = {
      id: "shop-" + Date.now(),
      ...shopForm,
      isPro: false,
      posts: [],
      reviews: [],
    };
    setShops([newShop, ...shops]);
    setShowRegisterModal(false);
    setActiveShopId(newShop.id);
    setActiveTab("posts");
    setShopForm({
      name: "",
      phone: "",
      description: "",
      hours: "09:00 - 21:00",
      category: "supermarket",
      area: "عين فكرون",
      days: "السبت - الخميس",
      offerText: "",
    });
  };

  const handleOpenAddPost = (forceDiscount = false) => {
    if (!activeShop) return;
    if (!activeShop.isPro && activeShop.posts.length >= FREE_POSTS_LIMIT) {
      setShowPaywallModal(true);
      return;
    }
    setPostForm({
      title: "",
      price: "",
      description: "",
      discount: forceDiscount ? "20" : "",
      available: true,
      mediaType: "image",
      images: [],
      videoUrl: "",
    });
    setShowPostModal(true);
  };

  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const remaining = 10 - postForm.images.length;
    if (files.length > remaining) {
      alert(t.max10Alert);
    }
    const allowed = files.slice(0, Math.max(0, remaining));
    const compressed = await Promise.all(allowed.map((f) => compressImage(f)));
    setPostForm((prev) => ({
      ...prev,
      mediaType: "image",
      videoUrl: "",
      images: [...prev.images, ...compressed].slice(0, 10),
    }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPostForm((prev) => ({
      ...prev,
      mediaType: "video",
      images: [],
      videoUrl: url,
    }));
  };

  const handlePublishPost = (e) => {
    e.preventDefault();
    if (!activeShop) return;
    const hasMedia =
      (postForm.mediaType === "image" && postForm.images.length > 0) ||
      (postForm.mediaType === "video" && postForm.videoUrl);

    if (!postForm.title.trim() || !postForm.price || !hasMedia) {
      alert(t.fillRequired);
      return;
    }

    const newPost = {
      id: "post-" + Date.now(),
      title: postForm.title.trim(),
      price: Number(postForm.price),
      description: postForm.description.trim(),
      discount: Number(postForm.discount) || 0,
      available: postForm.available,
      mediaType: postForm.mediaType,
      images: postForm.images,
      videoUrl: postForm.videoUrl,
      createdAt: new Date().toLocaleDateString(),
    };

    setShops((prev) =>
      prev.map((s) =>
        s.id === activeShop.id ? { ...s, posts: [newPost, ...s.posts] } : s
      )
    );
    setShowPostModal(false);
  };

  const handleActivatePro = () => {
    if (!activeShop) return;
    setShops((prev) =>
      prev.map((s) => (s.id === activeShop.id ? { ...s, isPro: true } : s))
    );
    setShowPaywallModal(false);
    alert(t.proActivated);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!activeShop || !reviewText.trim()) return;
    const newRev = {
      id: "rev-" + Date.now(),
      rating: reviewRating,
      text: reviewText.trim(),
    };
    setShops((prev) =>
      prev.map((s) =>
        s.id === activeShop.id ? { ...s, reviews: [newRev, ...s.reviews] } : s
      )
    );
    setReviewText("");
  };

  const discountPosts = activeShop
    ? activeShop.posts.filter((p) => Number(p.discount) > 0)
    : [];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} lang={lang} style={styles.app}>
      {/* الشريط العلوي */}
      <header style={styles.header}>
        <div style={styles.headerTop}>
          <div>
            <h1 style={styles.logo}>{t.appName}</h1>
            <span style={styles.subLogo}>
              {t.ratingLabel}{" "}
              {activeShop && activeShop.reviews.length > 0
                ? (
                    activeShop.reviews.reduce((a, b) => a + b.rating, 0) /
                    activeShop.reviews.length
                  ).toFixed(1)
                : "0"}{" "}
              ★
            </span>
          </div>

          <div style={styles.headerActions}>
            <button
              onClick={() => setShowOnlyPromos((v) => !v)}
              style={{
                ...styles.pillBtn,
                background: showOnlyPromos ? "#f59e0b" : "#1e293b",
                color: showOnlyPromos ? "#0f172a" : "#f8fafc",
              }}
            >
              {t.promotions}
            </button>

            <button
              onClick={() => setLang((prev) => (prev === "ar" ? "fr" : "ar"))}
              style={styles.langBtn}
              title="Change Language"
            >
              {lang === "ar" ? "FR" : "عربي"}
            </button>
          </div>
        </div>

        {/* شريط البحث والتصنيفات في الصفحة الرئيسية */}
        {!activeShop && (
          <>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              style={styles.searchInput}
            />

            <div style={styles.catsRow}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    ...styles.catChip,
                    background:
                      selectedCategory === cat.id ? "#f59e0b" : "#1e293b",
                    color: selectedCategory === cat.id ? "#0f172a" : "#e2e8f0",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </>
        )}
      </header>

      {/* المحتوى الرئيسي */}
      <main style={styles.main}>
        {!activeShop ? (
          <>
            <div style={styles.shopsGrid}>
              {filteredShops.map((shop) => {
                const cover = shop.posts.find((p) => p.images?.length > 0)
                  ?.images[0];
                return (
                  <div
                    key={shop.id}
                    onClick={() => {
                      setActiveShopId(shop.id);
                      setActiveTab("posts");
                    }}
                    style={styles.shopCard}
                  >
                    {cover ? (
                      <img src={cover} alt={shop.name} style={styles.shopCover} />
                    ) : (
                      <div style={styles.shopCoverPlaceholder}>{shop.name[0]}</div>
                    )}
                    <div style={styles.shopCardBody}>
                      <h3 style={styles.shopTitle}>{shop.name}</h3>
                      <p style={styles.shopMeta}>{shop.area}</p>
                      <p style={styles.shopDesc}>{shop.description}</p>
                      {shop.offerText && (
                        <span style={styles.offerBadge}>{shop.offerText}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowRegisterModal(true)}
              style={styles.fabBtn}
            >
              {t.addPlace}
            </button>
          </>
        ) : (
          /* صفحة تفاصيل المحل */
          <div style={styles.shopDetail}>
            <button
              onClick={() => setActiveShopId(null)}
              style={styles.backBtn}
            >
              {isRTL ? "→ " : "← "}
              {t.back}
            </button>

            <div style={styles.shopBanner}>
              <h2 style={styles.detailTitle}>{activeShop.name}</h2>
              <p style={styles.shopMeta}>
                {activeShop.area} • {activeShop.hours} ({activeShop.days})
              </p>
              <p style={styles.shopDesc}>{activeShop.description}</p>

              <div style={styles.contactRow}>
                <a href={`tel:${activeShop.phone}`} style={styles.callBtn}>
                  {t.call}: {activeShop.phone}
                </a>
                <button
                  onClick={() => alert(t.deliveryMsg)}
                  style={styles.deliveryBtn}
                >
                  {t.orderDelivery}
                </button>
              </div>
            </div>

            {/* التبويبات: المنشورات | التخفيضات | التقييمات */}
            <div style={styles.tabsRow}>
              <button
                onClick={() => setActiveTab("posts")}
                style={{
                  ...styles.tabBtn,
                  borderBottom:
                    activeTab === "posts"
                      ? "3px solid #f59e0b"
                      : "3px solid transparent",
                  color: activeTab === "posts" ? "#f59e0b" : "#cbd5e1",
                }}
              >
                {t.postsTab} ({activeShop.posts.length})
              </button>

              <button
                onClick={() => setActiveTab("discounts")}
                style={{
                  ...styles.tabBtn,
                  borderBottom:
                    activeTab === "discounts"
                      ? "3px solid #f59e0b"
                      : "3px solid transparent",
                  color: activeTab === "discounts" ? "#f59e0b" : "#cbd5e1",
                }}
              >
                {t.discountsTab} ({discountPosts.length})
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                style={{
                  ...styles.tabBtn,
                  borderBottom:
                    activeTab === "reviews"
                      ? "3px solid #f59e0b"
                      : "3px solid transparent",
                  color: activeTab === "reviews" ? "#f59e0b" : "#cbd5e1",
                }}
              >
                ★ ({activeShop.reviews.length})
              </button>
            </div>

            {/* محتوى تبويب المنشورات أو التخفيضات */}
            {(activeTab === "posts" || activeTab === "discounts") && (
              <div>
                <div style={styles.actionBar}>
                  <button
                    onClick={() => handleOpenAddPost(activeTab === "discounts")}
                    style={styles.primaryBtn}
                  >
                    {activeTab === "discounts" ? t.addDiscountBtn : t.addPostBtn}
                  </button>
                  <span style={styles.quotaText}>
                    {activeShop.isPro
                      ? "PRO ∞"
                      : `${activeShop.posts.length}/${FREE_POSTS_LIMIT} ${t.freeCounter}`}
                  </span>
                </div>

                {(activeTab === "posts" ? activeShop.posts : discountPosts)
                  .length === 0 ? (
                  <p style={styles.emptyText}>
                    {activeTab === "posts" ? t.noPosts : t.noDiscounts}
                  </p>
                ) : (
                  <div style={styles.postsGrid}>
                    {(activeTab === "posts"
                      ? activeShop.posts
                      : discountPosts
                    ).map((post) => {
                      const finalPrice =
                        post.discount > 0
                          ? Math.round(
                              post.price - (post.price * post.discount) / 100
                            )
                          : post.price;

                      return (
                        <div key={post.id} style={styles.postCard}>
                          <div style={styles.mediaBox}>
                            {post.mediaType === "video" && post.videoUrl ? (
                              <video
                                src={post.videoUrl}
                                controls
                                playsInline
                                style={styles.postMedia}
                              />
                            ) : (
                              <>
                                <img
                                  src={post.images[0]}
                                  alt={post.title}
                                  onClick={() =>
                                    setLightboxMedia(post.images)
                                  }
                                  style={styles.postMedia}
                                />
                                {post.images.length > 1 && (
                                  <button
                                    onClick={() =>
                                      setLightboxMedia(post.images)
                                    }
                                    style={styles.multiBadge}
                                  >
                                    +{post.images.length - 1} {t.photosCount}
                                  </button>
                                )}
                              </>
                            )}
                            {post.discount > 0 && (
                              <span style={styles.discountBadge}>
                                -{post.discount}%
                              </span>
                            )}
                          </div>

                          <div style={styles.postBody}>
                            <h4 style={styles.postTitle}>{post.title}</h4>
                            <p style={styles.postDesc}>{post.description}</p>
                            <div style={styles.priceRow}>
                              <span style={styles.finalPrice}>
                                {finalPrice} {t.da}
                              </span>
                              {post.discount > 0 && (
                                <span style={styles.oldPrice}>
                                  {post.price} {t.da}
                                </span>
                              )}
                            </div>
                            <span
                              style={{
                                ...styles.statusTag,
                                color: post.available ? "#34d399" : "#f87171",
                              }}
                            >
                              {post.available ? t.availableNow : t.unavailable}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* محتوى تبويب التقييمات */}
            {activeTab === "reviews" && (
              <div style={styles.reviewsBox}>
                <form onSubmit={handleAddReview} style={styles.reviewForm}>
                  <label style={styles.label}>{t.rateShop}</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    style={styles.input}
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {"★".repeat(n)} ({n}/5)
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder={t.reviewComment}
                    style={styles.input}
                  />
                  <button type="submit" style={styles.primaryBtn}>
                    {t.sendReview}
                  </button>
                </form>

                {activeShop.reviews.length === 0 ? (
                  <p style={styles.emptyText}>{t.noReviews}</p>
                ) : (
                  activeShop.reviews.map((r) => (
                    <div key={r.id} style={styles.reviewItem}>
                      <div style={{ color: "#fbbf24" }}>
                        {"★".repeat(r.rating)}
                      </div>
                      <p style={{ margin: "4px 0 0" }}>{r.text}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* نافذة تسجيل محل */}
      {showRegisterModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3>{t.registerShopTitle}</h3>
              <button
                onClick={() => setShowRegisterModal(false)}
                style={styles.closeBtn}
              >
                ✕
              </button>
            </div>
            <div style={styles.freeNotice}>{t.freeBanner}</div>
            <form onSubmit={handleRegisterShop} style={styles.form}>
              <input
                type="text"
                placeholder={t.shopName}
                value={shopForm.name}
                onChange={(e) =>
                  setShopForm({ ...shopForm, name: e.target.value })
                }
                style={styles.input}
                required
              />
              <input
                type="tel"
                placeholder={t.phone}
                value={shopForm.phone}
                onChange={(e) =>
                  setShopForm({ ...shopForm, phone: e.target.value })
                }
                style={styles.input}
                required
              />
              <input
                type="text"
                placeholder={t.description}
                value={shopForm.description}
                onChange={(e) =>
                  setShopForm({ ...shopForm, description: e.target.value })
                }
                style={styles.input}
              />
              <input
                type="text"
                placeholder={t.hours}
                value={shopForm.hours}
                onChange={(e) =>
                  setShopForm({ ...shopForm, hours: e.target.value })
                }
                style={styles.input}
              />
              <select
                value={shopForm.category}
                onChange={(e) =>
                  setShopForm({ ...shopForm, category: e.target.value })
                }
                style={styles.input}
              >
                <option value="supermarket">{t.supermarket}</option>
                <option value="restaurants">{t.restaurants}</option>
                <option value="clothes">{t.clothes}</option>
                <option value="barber">{t.barber}</option>
              </select>
              <input
                type="text"
                placeholder={t.area}
                value={shopForm.area}
                onChange={(e) =>
                  setShopForm({ ...shopForm, area: e.target.value })
                }
                style={styles.input}
              />
              <input
                type="text"
                placeholder={t.days}
                value={shopForm.days}
                onChange={(e) =>
                  setShopForm({ ...shopForm, days: e.target.value })
                }
                style={styles.input}
              />
              <input
                type="text"
                placeholder={t.offerText}
                value={shopForm.offerText}
                onChange={(e) =>
                  setShopForm({ ...shopForm, offerText: e.target.value })
                }
                style={styles.input}
              />
              <button type="submit" style={styles.primaryBtn}>
                {t.saveShop}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* نافذة إضافة منشور (حتى 10 صور أو فيديو) */}
      {showPostModal && activeShop && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3>{t.addPostTitle}</h3>
              <button
                onClick={() => setShowPostModal(false)}
                style={styles.closeBtn}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePublishPost} style={styles.form}>
              <p style={styles.hintText}>{t.uploadMediaHint}</p>

              <div style={styles.uploadButtonsRow}>
                <label style={styles.uploadLabel}>
                  {t.selectImages} ({postForm.images.length}/10)
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                    style={{ display: "none" }}
                  />
                </label>

                <label style={styles.uploadLabelAlt}>
                  {t.selectVideo}
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    style={{ display: "none" }}
                  />
                </label>
              </div>

              {/* معاينة الصور أو الفيديو المختار */}
              {postForm.mediaType === "image" && postForm.images.length > 0 && (
                <div style={styles.previewGrid}>
                  {postForm.images.map((src, idx) => (
                    <div key={idx} style={styles.previewItem}>
                      <img src={src} alt="" style={styles.previewThumb} />
                      <button
                        type="button"
                        onClick={() =>
                          setPostForm((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== idx),
                          }))
                        }
                        style={styles.removeThumbBtn}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {postForm.mediaType === "video" && postForm.videoUrl && (
                <video
                  src={postForm.videoUrl}
                  controls
                  style={styles.videoPreview}
                />
              )}

              <input
                type="text"
                placeholder={t.postTitle}
                value={postForm.title}
                onChange={(e) =>
                  setPostForm({ ...postForm, title: e.target.value })
                }
                style={styles.input}
                required
              />

              <input
                type="number"
                placeholder={t.price}
                value={postForm.price}
                onChange={(e) =>
                  setPostForm({ ...postForm, price: e.target.value })
                }
                style={styles.input}
                required
              />

              <input
                type="text"
                placeholder={t.shortDesc}
                value={postForm.description}
                onChange={(e) =>
                  setPostForm({ ...postForm, description: e.target.value })
                }
                style={styles.input}
              />

              <input
                type="number"
                min="0"
                max="99"
                placeholder={t.discountPercent}
                value={postForm.discount}
                onChange={(e) =>
                  setPostForm({ ...postForm, discount: e.target.value })
                }
                style={styles.input}
              />

              <label style={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={postForm.available}
                  onChange={(e) =>
                    setPostForm({ ...postForm, available: e.target.checked })
                  }
                />
                <span>{t.availableNow}</span>
              </label>

              <div style={styles.quotaFooter}>
                {activeShop.posts.length}/{FREE_POSTS_LIMIT} {t.freeCounter}
              </div>

              <button type="submit" style={styles.primaryBtn}>
                {t.publishPost}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* نافذة الدفع بعد تجاوز 10 منشورات */}
      {showPaywallModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={{ color: "#fbbf24" }}>{t.limitReachedTitle}</h3>
              <button
                onClick={() => setShowPaywallModal(false)}
                style={styles.closeBtn}
              >
                ✕
              </button>
            </div>
            <p style={{ lineHeight: 1.6, color: "#e2e8f0" }}>
              {t.limitReachedDesc}
            </p>
            <button onClick={handleActivatePro} style={styles.primaryBtn}>
              {t.activatePro}
            </button>
          </div>
        </div>
      )}

      {/* معرض عرض الصور المتعددة في المنشور الواحد */}
      {lightboxMedia && (
        <div
          onClick={() => setLightboxMedia(null)}
          style={styles.modalOverlay}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ ...styles.modal, maxWidth: 680 }}
          >
            <div style={styles.modalHeader}>
              <span>
                {lightboxMedia.length} {t.photosCount}
              </span>
              <button
                onClick={() => setLightboxMedia(null)}
                style={styles.closeBtn}
              >
                ✕
              </button>
            </div>
            <div style={styles.lightboxGrid}>
              {lightboxMedia.map((img, i) => (
                <img key={i} src={img} alt="" style={styles.lightboxImg} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#f8fafc",
    fontFamily: "system-ui, -apple-system, sans-serif",
    paddingBottom: 90,
  },
  header: {
    background: "#16213e",
    padding: "16px 20px",
    borderBottom: "1px solid #1e293b",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  logo: { margin: 0, fontSize: 22, color: "#f59e0b", fontWeight: 800 },
  subLogo: { fontSize: 13, color: "#fbbf24" },
  headerActions: { display: "flex", gap: 8, alignItems: "center" },
  pillBtn: {
    border: "none",
    borderRadius: 20,
    padding: "8px 14px",
    fontWeight: 700,
    cursor: "pointer",
  },
  langBtn: {
    background: "#f59e0b",
    color: "#0f172a",
    border: "none",
    borderRadius: 20,
    padding: "8px 14px",
    fontWeight: 800,
    cursor: "pointer",
  },
  searchInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid #334155",
    background: "#0f172a",
    color: "#f8fafc",
    marginBottom: 12,
    fontSize: 15,
  },
  catsRow: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 },
  catChip: {
    border: "none",
    borderRadius: 20,
    padding: "8px 16px",
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  main: { maxWidth: 960, margin: "0 auto", padding: 16 },
  shopsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 16,
  },
  shopCard: {
    background: "#1e293b",
    borderRadius: 16,
    overflow: "hidden",
    cursor: "pointer",
    border: "1px solid #334155",
  },
  shopCover: { width: "100%", height: 150, objectFit: "cover" },
  shopCoverPlaceholder: {
    width: "100%",
    height: 150,
    background: "linear-gradient(135deg, #1e3a8a, #f59e0b)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 42,
    fontWeight: 800,
  },
  shopCardBody: { padding: 14 },
  shopTitle: { margin: "0 0 4px", fontSize: 18 },
  shopMeta: { margin: "0 0 6px", fontSize: 13, color: "#94a3b8" },
  shopDesc: { margin: "0 0 8px", fontSize: 14, color: "#cbd5e1" },
  offerBadge: {
    display: "inline-block",
    background: "rgba(245,158,11,0.18)",
    color: "#fbbf24",
    padding: "4px 10px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 700,
  },
  fabBtn: {
    position: "fixed",
    bottom: 22,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#f59e0b",
    color: "#0f172a",
    border: "none",
    borderRadius: 30,
    padding: "14px 28px",
    fontSize: 16,
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
  },
  shopDetail: { display: "flex", flexDirection: "column", gap: 14 },
  backBtn: {
    alignSelf: "flex-start",
    background: "#1e293b",
    color: "#f8fafc",
    border: "none",
    borderRadius: 10,
    padding: "8px 14px",
    cursor: "pointer",
  },
  shopBanner: {
    background: "#1e293b",
    borderRadius: 16,
    padding: 18,
    border: "1px solid #334155",
  },
  detailTitle: { margin: "0 0 6px", color: "#f59e0b", fontSize: 22 },
  contactRow: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 },
  callBtn: {
    flex: 1,
    textAlign: "center",
    background: "#16a34a",
    color: "#fff",
    textDecoration: "none",
    padding: "12px",
    borderRadius: 12,
    fontWeight: 700,
  },
  deliveryBtn: {
    flex: 1,
    background: "#0284c7",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: 12,
    fontWeight: 700,
    cursor: "pointer",
  },
  tabsRow: {
    display: "flex",
    justifyContent: "space-around",
    borderBottom: "1px solid #334155",
  },
  tabBtn: {
    background: "transparent",
    border: "none",
    padding: "12px 16px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },
  actionBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  quotaText: { fontSize: 13, color: "#94a3b8", fontWeight: 700 },
  primaryBtn: {
    background: "#f59e0b",
    color: "#0f172a",
    border: "none",
    borderRadius: 12,
    padding: "12px 20px",
    fontWeight: 800,
    fontSize: 15,
    cursor: "pointer",
  },
  emptyText: { textAlign: "center", color: "#94a3b8", padding: "32px 0" },
  postsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 14,
  },
  postCard: {
    background: "#1e293b",
    borderRadius: 14,
    overflow: "hidden",
    border: "1px solid #334155",
  },
  mediaBox: { position: "relative", width: "100%", height: 190, background: "#020617" },
  postMedia: { width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" },
  multiBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    background: "rgba(15,23,42,0.85)",
    color: "#f8fafc",
    border: "1px solid #475569",
    borderRadius: 8,
    padding: "4px 8px",
    fontSize: 12,
    cursor: "pointer",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    background: "#ef4444",
    color: "#fff",
    borderRadius: 8,
    padding: "4px 8px",
    fontWeight: 800,
    fontSize: 12,
  },
  postBody: { padding: 12 },
  postTitle: { margin: "0 0 4px", fontSize: 16 },
  postDesc: { margin: "0 0 8px", fontSize: 13, color: "#94a3b8" },
  priceRow: { display: "flex", gap: 8, alignItems: "center", marginBottom: 6 },
  finalPrice: { fontWeight: 800, color: "#fbbf24", fontSize: 16 },
  oldPrice: {
    textDecoration: "line-through",
    color: "#64748b",
    fontSize: 13,
  },
  statusTag: { fontSize: 12, fontWeight: 700 },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(2,6,23,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    zIndex: 50,
  },
  modal: {
    background: "#16213e",
    borderRadius: 18,
    padding: 20,
    width: "100%",
    maxWidth: 460,
    maxHeight: "90vh",
    overflowY: "auto",
    border: "1px solid #334155",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#94a3b8",
    fontSize: 20,
    cursor: "pointer",
  },
  freeNotice: {
    background: "rgba(34,197,94,0.15)",
    color: "#4ade80",
    padding: "10px 12px",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 12,
    textAlign: "center",
  },
  form: { display: "flex", flexDirection: "column", gap: 10 },
  input: {
    padding: "11px 14px",
    borderRadius: 10,
    border: "1px solid #334155",
    background: "#0f172a",
    color: "#f8fafc",
    fontSize: 14,
  },
  hintText: { margin: 0, fontSize: 13, color: "#cbd5e1" },
  uploadButtonsRow: { display: "flex", gap: 8 },
  uploadLabel: {
    flex: 1,
    textAlign: "center",
    background: "#1e293b",
    border: "1px dashed #f59e0b",
    color: "#fbbf24",
    padding: "10px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13,
  },
  uploadLabelAlt: {
    flex: 1,
    textAlign: "center",
    background: "#1e293b",
    border: "1px dashed #38bdf8",
    color: "#38bdf8",
    padding: "10px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13,
  },
  previewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 6,
  },
  previewItem: { position: "relative", height: 56 },
  previewThumb: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 8,
  },
  removeThumbBtn: {
    position: "absolute",
    top: -4,
    right: -4,
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: 18,
    height: 18,
    fontSize: 10,
    cursor: "pointer",
  },
  videoPreview: { width: "100%", maxHeight: 180, borderRadius: 10 },
  checkboxRow: { display: "flex", gap: 8, alignItems: "center", fontSize: 14 },
  quotaFooter: { textAlign: "center", fontSize: 12, color: "#94a3b8" },
  reviewsBox: { display: "flex", flexDirection: "column", gap: 12 },
  reviewForm: { display: "flex", flexDirection: "column", gap: 8 },
  label: { fontSize: 14, fontWeight: 700 },
  reviewItem: {
    background: "#1e293b",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #334155",
  },
  lightboxGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: 10,
  },
  lightboxImg: { width: "100%", borderRadius: 10, objectFit: "cover" },
};

export default App;