(() => {
  "use strict";
  const STORE_KEY = "a2_store_management_v1";
  const defaultState = {
    settings: { name: "فروشگاه اصلی", owner: "مدیر فروشگاه", firstName: "", lastName: "", currency: "افغانی", phone: "", address: "" },
    products: [], customers: [], suppliers: [], sales: [], purchases: []
  };
  let state = loadState();
  let currentView = "dashboard";
  let modalType = "product";
  let toastTimer;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const root = $("#viewRoot");
  const currency = () => state.settings.currency || "افغانی";
  const money = value => new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 2 }).format(Number(value) || 0) + " " + currency();
  const number = value => new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 2 }).format(Number(value) || 0);
  const today = () => new Date().toISOString().slice(0, 10);
  const uid = prefix => prefix + "-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      if (saved && typeof saved === "object") return { ...structuredClone(defaultState), ...saved, settings: { ...defaultState.settings, ...(saved.settings || {}) } };
    } catch (error) { console.warn("A2 local data could not be read.", error); }
    return structuredClone(defaultState);
  }
  function persist() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); return true; }
    catch (error) { showToast("ذخیره‌سازی مرورگر انجام نشد؛ فضای ذخیره‌سازی را بررسی کنید."); return false; }
  }
  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
  }
  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
  }
  function sum(items, field) { return items.reduce((total, item) => total + (Number(item[field]) || 0), 0); }
  function productStock(productId) {
    const product = state.products.find(item => item.id === productId);
    return product ? Number(product.stock) || 0 : 0;
  }
  function labelFor(view) {
    return ({ dashboard:"داشبورد", products:"کالاها و خدمات", inventory:"انبار و موجودی", sales:"فروش و فاکتورها", purchases:"خرید از تأمین‌کنندگان", customers:"مشتریان", suppliers:"تأمین‌کنندگان", reports:"گزارش‌ها", settings:"تنظیمات فروشگاه" })[view] || "داشبورد";
  }
  function setView(view) {
    currentView = view;
    $$$(".nav-item").forEach(button => button.classList.toggle("active", button.dataset.view === view));
    $("#breadcrumbTitle").textContent = labelFor(view);
    $("#pageTitle").textContent = view === "dashboard" ? "داشبورد مدیریتی" : labelFor(view);
    $("#pageSubtitle").textContent = ({
      dashboard:"نمایی روشن از وضعیت فروشگاه و فعالیت‌های روزانه شما.",
      products:"فهرست کالاها، قیمت‌ها و مشخصات پایه را مدیریت کنید.",
      inventory:"موجودی فعلی و کالاهای نیازمند تأمین را بررسی کنید.",
      sales:"فروش را ثبت کنید و فاکتورهای ایجادشده را پیگیری کنید.",
      purchases:"خریدهای ورودی را ثبت و موجودی کالاها را به‌روزرسانی کنید.",
      customers:"اطلاعات مشتریان را در یک فهرست منظم نگهداری کنید.",
      suppliers:"اطلاعات تأمین‌کنندگان و راه‌های تماس را مدیریت کنید.",
      reports:"خلاصه‌ای از فعالیت‌های ثبت‌شده در فروشگاه مشاهده کنید.",
      settings:"اطلاعات پایه و واحد پول فروشگاه را تنظیم کنید."
    })[view];
    $("#primaryAction").textContent = ({dashboard:"＋ ثبت کالای جدید",products:"＋ ثبت کالای جدید",inventory:"＋ ثبت کالای جدید",sales:"＋ ثبت فروش",purchases:"＋ ثبت خرید",customers:"＋ مشتری جدید",suppliers:"＋ تأمین‌کننده جدید",reports:"⇩ دریافت گزارش",settings:"ذخیره تنظیمات"})[view] || "＋ افزودن";
    $("#primaryAction").style.display = view === "reports" ? "none" : "inline-flex";
    render();
    $("#sidebar").classList.remove("open");
  }
  function iconSvg(symbol) {
    const paths = {"↗":'<path d="M4 17 10 11l4 4 6-8"/><path d="M14 7h6v6"/>',"▤":'<path d="M4 5h16v15H4zM8 9h8M8 13h8M8 17h5"/>',"▥":'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',"!":'<path d="M12 3 22 21H2z"/><path d="M12 9v5m0 3h.01"/>',"↙":'<path d="M5 5v14h14M5 19 19 5"/>',"♙":'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',"◈":'<path d="m12 2 9 10-9 10L3 12z"/><path d="M12 7v10M8 12h8"/>',"＋":'<path d="M12 5v14M5 12h14"/>'};
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (paths[symbol] || paths["▤"]) + '</svg>';
  }
  function statCard(title, value, icon, note, tone = "") {
    return '<article class="stat-card"><div class="stat-top"><span>' + title + '</span><span class="stat-icon ' + tone + '">' + iconSvg(icon) + '</span></div><div class="stat-value">' + value + '</div><div class="stat-foot">' + note + '</div></article>';
  }
  function productRows(products) {
    if (!products.length) return '<tr><td colspan="6"><div class="empty-state"><div style="font-size:26px">▤</div><strong>هنوز کالایی ثبت نشده است</strong><p>برای شروع، اولین کالای واقعی فروشگاه را ثبت کنید.</p></div></td></tr>';
    return products.map(product => {
      const stock = Number(product.stock) || 0;
      const status = stock <= 0 ? ["out", "ناموجود"] : stock <= (Number(product.minStock) || 5) ? ["low", "رو به اتمام"] : ["good", "موجود"];
      return '<tr><td><div class="product-cell"><span class="product-thumb"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5z"/><path d="m4.5 7.8 7.5 4.3 7.5-4.3M12 12v9"/></svg></span><span class="product-name"><strong>' + esc(product.name) + '</strong><small>' + esc(product.sku || "بدون کد") + '</small></span></div></td><td>' + esc(product.category || "عمومی") + '</td><td>' + money(product.price) + '</td><td>' + number(stock) + ' ' + esc(product.unit || "عدد") + '</td><td><span class="status ' + status[0] + '">' + status[1] + '</span></td><td><button class="text-link" data-edit-product="' + esc(product.id) + '">ویرایش</button></td></tr>';
    }).join("");
  }
  function tablePanel(title, subtitle, headers, body, search = true, action = "") {
    return '<section class="table-panel"><div class="table-header"><div><h2>' + title + '</h2><p>' + subtitle + '</p></div><div class="table-tools">' + (search ? '<label class="search-box"><span>⌕</span><input id="tableSearch" type="search" placeholder="جست‌وجو در فهرست..." aria-label="جست‌وجو در فهرست"></label>' : '') + action + '</div></div><div class="table-scroll"><table><thead><tr>' + headers.map(h => '<th>' + h + '</th>').join("") + '</tr></thead><tbody id="tableBody">' + body + '</tbody></table></div><div class="table-footer"><span>' + number(headers.length ? (body.match(/<tr>/g) || []).length : 0) + ' ردیف قابل نمایش</span><span>فهرست اطلاعات ثبت‌شده</span></div></section>';
  }
  function dashboard() {
    const revenue = sum(state.sales, "total");
    const cost = sum(state.sales, "cost");
    const stockValue = state.products.reduce((t, p) => t + (Number(p.stock) || 0) * (Number(p.cost) || 0), 0);
    const low = state.products.filter(p => (Number(p.stock) || 0) <= (Number(p.minStock) || 5)).length;
    const latest = [...state.products].slice(-5).reverse();
    const bars = [0,1,2,3,4,5,6].map((offset, index) => {
      const day = new Date(); day.setDate(day.getDate() - (6 - offset));
      const key = day.toISOString().slice(0,10);
      const value = sum(state.sales.filter(s => s.date === key), "total");
      return { label: new Intl.DateTimeFormat("fa-IR", { weekday:"short" }).format(day), value, index };
    });
    const max = Math.max(...bars.map(b => b.value), 1);
    const chart = state.sales.length ? '<div class="chart-wrap"><div class="chart-bars">' + bars.map(b => '<div class="chart-group"><div class="chart-bar primary" style="height:' + Math.max(4, b.value / max * 100) + '%" title="' + esc(money(b.value)) + '"></div><span class="chart-label">' + b.label + '</span></div>').join("") + '</div></div><p class="chart-note">مبالغ بر اساس فروش‌های ثبت‌شده در ۷ روز اخیر؛ روزهای بدون فروش صفر نمایش داده می‌شوند.</p>' : '<div class="empty-state"><div style="font-size:28px">▥</div><strong>گزارش فروش هنوز آماده نیست</strong><p>پس از ثبت فروش واقعی، نمودار این بخش به‌روزرسانی می‌شود.</p></div>';
    return '<div class="stats-grid">' +
      statCard("فروش ثبت‌شده", money(revenue), "↗", '<span class="positive">' + number(state.sales.length) + ' فاکتور</span> · مجموع تمام فروش‌ها') +
      statCard("تعداد کالاها", number(state.products.length), "▤", "کالاهای ثبت‌شده در فهرست", "blue") +
      statCard("ارزش بهای موجودی", money(stockValue), "▥", "بر اساس بهای خرید و موجودی", "gold") +
      statCard("نیاز به بررسی موجودی", number(low), "!", "کالاهای کم‌موجود یا ناموجود", "rose") +
      '</div><div class="dashboard-grid"><section class="panel"><div class="panel-heading"><div><h2>روند فروش</h2><p>عملکرد هفت روز اخیر</p></div><span class="chart-legend"><span><i class="legend-dot"></i>فروش</span></span></div>' + chart + '</section><section class="panel"><div class="panel-heading"><div><h2>دسترسی سریع</h2><p>عملیات پرکاربرد فروشگاه</p></div></div><div class="quick-list">' +
      '<button class="quick-item" data-quick="products"><span class="quick-symbol">＋</span><span class="quick-copy"><strong>افزودن کالای جدید</strong><small>ثبت نام، قیمت و موجودی اولیه</small></span><span class="quick-arrow">←</span></button>' +
      '<button class="quick-item" data-quick="sales"><span class="quick-symbol">↗</span><span class="quick-copy"><strong>ثبت فروش</strong><small>صدور فاکتور و کسر موجودی</small></span><span class="quick-arrow">←</span></button>' +
      '<button class="quick-item" data-quick="customers"><span class="quick-symbol">♙</span><span class="quick-copy"><strong>ثبت مشتری</strong><small>ساخت فهرست مشتریان</small></span><span class="quick-arrow">←</span></button>' +
      '</div></section></div>' +
      tablePanel("کالاهای اخیر", "آخرین کالاهای اضافه‌شده به فهرست", ["کالا","دسته‌بندی","قیمت فروش","موجودی","وضعیت","عملیات"], productRows(latest), false, '<button class="button button-secondary" data-quick="products">مشاهده همه</button>');
  }
  function productsView() {
    const body = productRows(state.products);
    return '<div class="filter-row" style="margin-bottom:14px"><span class="filter-chip active">همه کالاها · ' + number(state.products.length) + '</span><span class="filter-chip">کم‌موجود · ' + number(state.products.filter(p => Number(p.stock) <= Number(p.minStock || 5)).length) + '</span></div>' +
      tablePanel("فهرست کالاها", "مدیریت اطلاعات کالا و قیمت فروش", ["کالا","دسته‌بندی","قیمت فروش","موجودی","وضعیت","عملیات"], body, true, '<button class="button button-primary" data-open-form="product">＋ کالای جدید</button>');
  }
  function inventoryView() {
    const body = state.products.length ? state.products.map(p => {
      const qty = Number(p.stock) || 0, min = Number(p.minStock) || 5;
      const status = qty <= 0 ? ["out","ناموجود"] : qty <= min ? ["low","نیاز به تأمین"] : ["good","موجود"];
      return '<tr><td><div class="product-name"><strong>' + esc(p.name) + '</strong><small>' + esc(p.sku || "بدون کد") + '</small></div></td><td>' + number(qty) + ' ' + esc(p.unit || "عدد") + '</td><td>' + number(min) + '</td><td>' + money(qty * (Number(p.cost) || 0)) + '</td><td><span class="status ' + status[0] + '">' + status[1] + '</span></td></tr>';
    }).join("") : '<tr><td colspan="5"><div class="empty-state"><strong>موجودی برای نمایش وجود ندارد</strong><p>ابتدا کالاهای واقعی فروشگاه را ثبت کنید.</p></div></td></tr>';
    return tablePanel("وضعیت انبار", "موجودی فعلی، حداقل موجودی و بهای تمام‌شده", ["نام کالا","موجودی فعلی","حداقل موجودی","ارزش موجودی","وضعیت"], body);
  }
  function genericRows(items, kind) {
    if (!items.length) return '<tr><td colspan="5"><div class="empty-state"><strong>اطلاعاتی ثبت نشده است</strong><p>از دکمه افزودن برای ثبت اولین مورد استفاده کنید.</p></div></td></tr>';
    if (kind === "customers" || kind === "suppliers") return items.map(x => '<tr><td><strong>' + esc(x.name) + '</strong></td><td>' + esc(x.phone || "—") + '</td><td>' + esc(x.email || "—") + '</td><td>' + esc(x.note || "—") + '</td><td><button class="text-link" data-delete="' + kind + ':' + esc(x.id) + '">حذف</button></td></tr>').join("");
    if (kind === "sales" || kind === "purchases") return items.slice().reverse().map(x => '<tr><td><strong>' + esc(x.invoice) + '</strong></td><td>' + esc(x.date) + '</td><td>' + esc(x.party || "مشتری نقدی") + '</td><td>' + money(x.total) + '</td><td><span class="status good">ثبت‌شده</span></td></tr>').join("");
    return "";
  }
  function standardList(kind) {
    const configs = {
      customers:{title:"فهرست مشتریان",sub:"اطلاعات تماس مشتریان",headers:["نام مشتری","تلفن","ایمیل","یادداشت","عملیات"],items:state.customers},
      suppliers:{title:"فهرست تأمین‌کنندگان",sub:"اطلاعات شرکت‌ها و فروشندگان کالا",headers:["نام تأمین‌کننده","تلفن","ایمیل","یادداشت","عملیات"],items:state.suppliers},
      sales:{title:"فاکتورهای فروش",sub:"سوابق فروش ثبت‌شده در این دستگاه",headers:["شماره فاکتور","تاریخ","مشتری","مبلغ کل","وضعیت"],items:state.sales},
      purchases:{title:"سوابق خرید",sub:"خریدهای ثبت‌شده و تأثیر آن‌ها بر موجودی",headers:["شماره سند","تاریخ","تأمین‌کننده","مبلغ کل","وضعیت"],items:state.purchases}
    };
    const c = configs[kind];
    return '<div class="stats-grid" style="grid-template-columns:repeat(2,minmax(0,1fr))">' + statCard(c.title, number(c.items.length), kind === "sales" ? "↗" : kind === "purchases" ? "↙" : "♙", "تعداد ثبت‌شده") + statCard("جمع مبلغ", money(sum(c.items,"total")), "◈", "بر اساس اطلاعات ذخیره‌شده", "blue") + '</div>' +
      tablePanel(c.title,c.sub,c.headers,genericRows(c.items,kind),true,'<button class="button button-primary" data-open-form="' + (kind === "sales" || kind === "purchases" ? kind.slice(0,-1) : kind.slice(0,-1)) + '">＋ ثبت مورد جدید</button>');
  }
  function reportsView() {
    const salesTotal = sum(state.sales,"total"), salesCost = sum(state.sales,"cost");
    const stockValue = state.products.reduce((t,p) => t + (Number(p.stock)||0)*(Number(p.cost)||0),0);
    return '<div class="report-summary"><div class="report-box"><small>مجموع فروش ثبت‌شده</small><strong>' + money(salesTotal) + '</strong></div><div class="report-box"><small>سود ناخالص تخمینی فروش</small><strong>' + money(salesTotal-salesCost) + '</strong></div><div class="report-box"><small>ارزش بهای موجودی فعلی</small><strong>' + money(stockValue) + '</strong></div></div>' +
      '<section class="panel"><div class="panel-heading"><div><h2>گزارش وضعیت سامانه</h2><p>این گزارش فقط داده‌های واردشده در این مرورگر را محاسبه می‌کند.</p></div></div><div class="table-scroll"><table><tbody>' +
      [['تعداد کالاها',state.products.length],['تعداد مشتریان',state.customers.length],['تعداد تأمین‌کنندگان',state.suppliers.length],['تعداد فاکتورهای فروش',state.sales.length],['تعداد اسناد خرید',state.purchases.length]].map(r=>'<tr><td>'+r[0]+'</td><td><strong>'+number(r[1])+'</strong></td></tr>').join("") +
      '</tbody></table></div><p class="chart-note">توجه: سود نمایش‌داده‌شده مقدماتی است و هزینه‌های جانبی، مالیات، تخفیف‌های پیچیده و مرجوعی‌ها را در نظر نمی‌گیرد.</p></section>';
  }
  function settingsView() {
    return '<section class="panel settings-form"><div class="panel-heading"><div><h2>مشخصات فروشگاه</h2><p>این اطلاعات برای شخصی‌سازی فضای کاری استفاده می‌شوند.</p></div></div><form id="settingsForm">' +
      field("نام فروشگاه","name",state.settings.name,"text",true) + field("نام مدیر","owner",state.settings.owner) +
      field("واحد پول","currency",state.settings.currency,"select",true,[{value:"افغانی",label:"افغانی (AFN)"},{value:"تومان",label:"تومان"},{value:"ریال",label:"ریال ایران (IRR)"},{value:"دلار",label:"دلار آمریکا (USD)"},{value:"یورو",label:"یورو (EUR)"}]) +
      field("شماره تماس","phone",state.settings.phone) + field("نشانی فروشگاه","address",state.settings.address,"text",false,null,true) +
      '<button class="button button-primary" type="submit">ذخیره تنظیمات</button></form><p class="chart-note">در این نسخه اطلاعات فقط در فضای ذخیره‌سازی همین مرورگر قرار می‌گیرند و هنوز به سرور یا حساب کاربری متصل نیستند.</p></section>';
  }
  function field(label,name,value="",type="text",required=false,options=null,full=false) {
    let control = "";
    if (type === "select") control = '<select name="' + name + '"' + (required?' required':'') + '>' + options.map(o=>'<option value="'+esc(o.value)+'" '+(o.value===value?'selected':'')+'>'+esc(o.label)+'</option>').join("") + '</select>';
    else if (type === "textarea") control = '<textarea name="' + name + '" '+(required?'required':'')+'>'+esc(value)+'</textarea>';
    else control = '<input name="' + name + '" type="' + type + '" value="' + esc(value) + '" '+(required?'required':'')+' />';
    return '<div class="field '+(full?'full':'')+'"><label>' + label + (required?' *':'') + '</label>' + control + '</div>';
  }
  function render() {
    const views = { dashboard, products:productsView, inventory:inventoryView, sales:()=>standardList("sales"), purchases:()=>standardList("purchases"), customers:()=>standardList("customers"), suppliers:()=>standardList("suppliers"), reports:reportsView, settings:settingsView };
    root.innerHTML = (views[currentView] || dashboard)();
    const search = $("#tableSearch");
    if (search) search.addEventListener("input", () => {
      const query = search.value.trim().toLocaleLowerCase();
      $$("#tableBody tr").forEach(row => row.hidden = !row.textContent.toLocaleLowerCase().includes(query));
    });
    bindRenderedActions();
    if (currentView === "settings") $("#settingsForm").addEventListener("submit", saveSettings);
  }
  function bindRenderedActions() {
    $$("[data-quick]").forEach(button => button.addEventListener("click", () => {
      const target = button.dataset.quick;
      if (target === "products") openForm("product");
      else if (target === "sales") openForm("sale");
      else setView(target);
    }));
    $$("[data-open-form]").forEach(button => button.addEventListener("click", () => openForm(button.dataset.openForm)));
    $$("[data-edit-product]").forEach(button => button.addEventListener("click", () => openForm("product", button.dataset.editProduct)));
    $$("[data-delete]").forEach(button => button.addEventListener("click", () => {
      const [kind,id] = button.dataset.delete.split(":");
      if (!confirm("این مورد حذف شود؟")) return;
      state[kind] = state[kind].filter(item => item.id !== id); persist(); render(); showToast("مورد حذف شد.");
    }));
  }
  function formDefinition(type, existing = {}) {
    const defs = {
      product:{title:existing.id?"ویرایش کالا":"ثبت کالای جدید", fields:[
        ["name","نام کالا","text",true,"مثلاً برنج درجه یک"],["sku","کد کالا / بارکد","text",false,"اختیاری"],["category","دسته‌بندی","text",false,"مثلاً مواد غذایی"],["unit","واحد شمارش","select",true,[{value:"عدد",label:"عدد"},{value:"کیلوگرم",label:"کیلوگرم"},{value:"گرم",label:"گرم"},{value:"لیتر",label:"لیتر"},{value:"بسته",label:"بسته"},{value:"کارتن",label:"کارتن"},{value:"متر",label:"متر"}]],["cost","بهای خرید","number",true,"0"],["price","قیمت فروش","number",true,"0"],["stock","موجودی اولیه","number",true,"0"],["minStock","حداقل موجودی","number",false,"5"]
      ]},
      customer:{title:"ثبت مشتری جدید",fields:[["name","نام مشتری","text",true,"نام کامل"],["phone","شماره تماس","tel",false,"شماره تلفن"],["email","ایمیل","email",false,""],["note","یادداشت","textarea",false,"یادداشت اختیاری"]]},
      supplier:{title:"ثبت تأمین‌کننده جدید",fields:[["name","نام تأمین‌کننده","text",true,"نام شخص یا شرکت"],["phone","شماره تماس","tel",false,"شماره تلفن"],["email","ایمیل","email",false,""],["note","یادداشت","textarea",false,"یادداشت اختیاری"]]},
      sale:{title:"ثبت فروش جدید",fields:[["productId","انتخاب کالا","select",true, state.products.map(p=>({value:p.id,label:p.name+" — موجودی: "+p.stock}))],["quantity","تعداد فروش","number",true,"1"],["customerId","مشتری","select",false,[{value:"",label:"مشتری نقدی / بدون انتخاب"},...state.customers.map(c=>({value:c.id,label:c.name}))]],["date","تاریخ","date",true,today()]]},
      purchase:{title:"ثبت خرید جدید",fields:[["productId","انتخاب کالا","select",true,state.products.map(p=>({value:p.id,label:p.name}))],["quantity","تعداد خرید","number",true,"1"],["unitCost","بهای خرید هر واحد","number",true,"0"],["supplierId","تأمین‌کننده","select",false,[{value:"",label:"بدون انتخاب"},...state.suppliers.map(s=>({value:s.id,label:s.name}))]],["date","تاریخ","date",true,today()]]}
    };
    return defs[type] || defs.product;
  }
  function openForm(type, id = null) {
    if (type === "products") type = "product";
    if (type === "customers") type = "customer";
    if (type === "suppliers") type = "supplier";
    if (type === "sales") type = "sale";
    if (type === "purchases") type = "purchase";
    const collection = ({product:"products",customer:"customers",supplier:"suppliers"})[type];
    const existing = id && collection ? state[collection].find(item => item.id === id) : {};
    if ((type === "sale" || type === "purchase") && !state.products.length) { showToast("ابتدا یک کالا ثبت کنید."); setView("products"); return; }
    modalType = type;
    const def = formDefinition(type, existing || {});
    $("#modalTitle").textContent = def.title;
    $("#formError").textContent = "";
    $("#formFields").innerHTML = def.fields.map(([name,label,kind,required,placeholder]) => {
      let control;
      const value = existing?.[name] ?? (name === "date" ? today() : name === "unit" ? "عدد" : "");
      if (kind === "select") {
        const opts = placeholder || [];
        control = '<select name="' + name + '"' + (required?' required':'') + '><option value="">انتخاب کنید</option>' + opts.map(o=>'<option value="'+esc(o.value)+'" '+(String(o.value)===String(value)?'selected':'')+'>'+esc(o.label)+'</option>').join("") + '</select>';
      } else if (kind === "textarea") control = '<textarea name="'+name+'" placeholder="'+esc(placeholder||"")+'">'+esc(value)+'</textarea>';
      else control = '<input name="'+name+'" type="'+kind+'" '+(required?'required':'')+' '+(kind==="number"?'min="0" step="any"':'')+' value="'+esc(value)+'" placeholder="'+(kind==="number"?"0":esc(placeholder||""))+'" />';
      return '<div class="field '+(kind==="textarea"?'full':'')+'"><label>'+label+(required?' *':'')+'</label>'+control+'</div>';
    }).join("");
    $("#entityForm").dataset.editId = id || "";
    $("#modalBackdrop").hidden = false;
    document.body.style.overflow = "hidden";
    const first = $("#formFields input, #formFields select");
    if (first) first.focus();
  }
  function closeForm() { $("#modalBackdrop").hidden = true; document.body.style.overflow = ""; }
  function handleFormSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = Object.fromEntries(form.entries());
    const editId = event.currentTarget.dataset.editId;
    const collection = ({product:"products",customer:"customers",supplier:"suppliers"})[modalType];
    if (collection) {
      const record = { ...(editId ? state[collection].find(x=>x.id===editId) : {}), ...data, id:editId || uid(modalType.toUpperCase()) };
      if (modalType === "product") {
        for (const key of ["cost","price","stock","minStock"]) record[key] = Math.max(0, Number(data[key]) || 0);
        if (editId) {
          const old = state.products.find(p=>p.id===editId);
          if (old && Number(old.stock) !== record.stock) record.stock = Number(old.stock);
        }
      }
      if (modalType === "product" && state.products.some(p=>p.sku && record.sku && p.sku.toLowerCase()===record.sku.toLowerCase() && p.id!==record.id)) { $("#formError").textContent="این کد کالا قبلاً ثبت شده است."; return; }
      if (editId) state[collection] = state[collection].map(x=>x.id===editId?record:x); else state[collection].push(record);
      persist(); closeForm(); render(); showToast(editId?"اطلاعات با موفقیت به‌روزرسانی شد.":"اطلاعات با موفقیت ثبت شد."); return;
    }
    if (modalType === "sale") {
      const product = state.products.find(p=>p.id===data.productId), quantity = Number(data.quantity);
      if (!product || !Number.isFinite(quantity) || quantity <= 0) { $("#formError").textContent="کالا و تعداد معتبر را انتخاب کنید."; return; }
      if (quantity > Number(product.stock)) { $("#formError").textContent="موجودی کافی نیست. موجودی فعلی: "+number(product.stock); return; }
      const total = quantity * Number(product.price);
      state.sales.push({id:uid("SALE"),invoice:"S-"+String(state.sales.length+1).padStart(5,"0"),date:data.date||today(),productId:product.id,productName:product.name,quantity,total,cost:quantity*Number(product.cost),party:(state.customers.find(c=>c.id===data.customerId)||{}).name||"مشتری نقدی"});
      product.stock = Number(product.stock)-quantity;
      persist(); closeForm(); setView("sales"); showToast("فروش ثبت و موجودی کالا به‌روزرسانی شد."); return;
    }
    if (modalType === "purchase") {
      const product = state.products.find(p=>p.id===data.productId), quantity = Number(data.quantity), unitCost = Number(data.unitCost);
      if (!product || !Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(unitCost) || unitCost < 0) { $("#formError").textContent="کالا، تعداد و بهای خرید را بررسی کنید."; return; }
      const total = quantity*unitCost;
      state.purchases.push({id:uid("PUR"),invoice:"P-"+String(state.purchases.length+1).padStart(5,"0"),date:data.date||today(),productId:product.id,productName:product.name,quantity,total,cost:total,party:(state.suppliers.find(s=>s.id===data.supplierId)||{}).name||"بدون تأمین‌کننده"});
      product.stock = Number(product.stock)+quantity;
      product.cost = unitCost;
      persist(); closeForm(); setView("purchases"); showToast("خرید ثبت و موجودی کالا به‌روزرسانی شد."); return;
    }
  }
  function saveSettings(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    state.settings = { ...state.settings, ...data };
    persist();
    $(".workspace span:nth-child(2)").textContent = state.settings.name || "فروشگاه اصلی";
    $(".profile-copy strong").textContent = state.settings.owner || "مدیر فروشگاه";
    showToast("تنظیمات فروشگاه ذخیره شد.");
  }
  function exportData() {
    const payload = { exportedAt:new Date().toISOString(), application:"A2 Store Management", ...state };
    const blob = new Blob(["\ufeff",JSON.stringify(payload,null,2)],{type:"application/json;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download="A2-store-backup-"+today()+".json"; a.click();
    URL.revokeObjectURL(url); showToast("نسخه پشتیبان JSON آماده شد.");
  }
  function init() {
    $("#todayLabel").textContent = new Intl.DateTimeFormat("fa-IR",{dateStyle:"full"}).format(new Date());
    // Prefill registration details from the existing local store settings without touching inventory or transactions.
    $("#regStoreName").value = state.settings.name || "";
    $("#regFirstName").value = state.settings.firstName || (state.settings.owner && state.settings.owner !== "مدیر فروشگاه" ? state.settings.owner.split(" ")[0] : "");
    $("#regLastName").value = state.settings.lastName || (state.settings.owner && state.settings.owner !== "مدیر فروشگاه" ? state.settings.owner.split(" ").slice(1).join(" ") : "");
    $("#regPhone").value = state.settings.phone || "";
    $("#regCurrency").value = state.settings.currency || "افغانی";
    $("#registrationForm").addEventListener("submit", event => {
      event.preventDefault();
      if (!event.currentTarget.reportValidity()) return;
      const profile = Object.fromEntries(new FormData(event.currentTarget).entries());
      const fullName = [profile.firstName.trim(), profile.lastName.trim()].filter(Boolean).join(" ");
      state.settings = { ...state.settings, name: profile.storeName.trim(), firstName: profile.firstName.trim(), lastName: profile.lastName.trim(), owner: fullName, phone: profile.phone.trim(), currency: profile.currency };
      if (!persist()) return;
      $(".workspace span:nth-child(2)").textContent = state.settings.name || "فروشگاه اصلی";
      $(".profile-copy strong").textContent = state.settings.owner || "مدیر فروشگاه";
      $("#entryScreen").hidden = true;
      document.body.classList.add("app-ready");
      $("#modeStatusText").textContent = "استفاده رایگان · ذخیره روی دستگاه";
      showToast("مشخصات فروشگاه ذخیره شد؛ اطلاعات در همین دستگاه نگهداری می‌شود.");
    });
    $("#onlineEntryButton").addEventListener("click", () => {
      $("#onlineInfo").hidden = false;
      $("#onlineInfo").scrollIntoView({behavior:"smooth", block:"nearest"});
    });
    $("#changeEntryMode").addEventListener("click", () => {
      document.body.classList.remove("app-ready");
      $("#entryScreen").hidden = false;
      $("#onlineInfo").hidden = true;
    });
    $("#entityForm").addEventListener("submit", handleFormSubmit);
    $("#closeModal").addEventListener("click",closeForm);
    $("#cancelModal").addEventListener("click",closeForm);
    $("#modalBackdrop").addEventListener("click",e=>{if(e.target===$("#modalBackdrop"))closeForm();});
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#modalBackdrop").hidden)closeForm();});
    $$(".nav-item").forEach(button=>button.addEventListener("click",()=>{
      setView(button.dataset.view);
      if (button.dataset.action === "new-sale") openForm("sale");
    }));
    $("#primaryAction").addEventListener("click",()=> {
      if (currentView==="settings") { $("#settingsForm")?.requestSubmit(); return; }
      if (currentView==="reports") { exportData(); return; }
      const types={dashboard:"product",products:"product",inventory:"product",sales:"sale",purchases:"purchase",customers:"customer",suppliers:"supplier"};
      openForm(types[currentView]||"product");
    });
    $("#dashboardShortcut").addEventListener("click",()=>setView("dashboard"));
    $("#saleShortcut").addEventListener("click",()=>{setView("sales");openForm("sale");});
    $("#exportButton").addEventListener("click",exportData);
    $("#menuToggle").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
    $("#helpButton").addEventListener("click",()=>showToast("حالت رایگان: اطلاعات روی همین دستگاه است. پیش از پاک‌کردن داده‌های مرورگر، نسخه پشتیبان بگیرید."));
    setView("dashboard");
  }
  init();
})();