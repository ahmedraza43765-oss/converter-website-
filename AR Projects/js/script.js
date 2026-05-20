/* ========================================== */
/* ============= CURSOR TRACKING =========== */
/* ========================================== */
var dot = document.getElementById('cursorDot');
var ring = document.getElementById('cursorRing');
var mx = 0, my = 0, rx = 0, ry = 0;
var trC = ['rgba(229,57,53,.18)', 'rgba(255,82,82,.12)', 'rgba(255,138,128,.08)'];
var lastTrailTime = 0;

document.addEventListener('mousemove', function(e) {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    
    var now = Date.now();
    if (now - lastTrailTime < 50) return;
    lastTrailTime = now;
    
    var t = document.createElement('div');
    t.className = 'cursor-trail';
    t.style.left = mx + 'px';
    t.style.top = my + 'px';
    t.style.background = trC[Math.floor(Math.random() * trC.length)];
    document.body.appendChild(t);
    
    setTimeout(function() {
        t.style.opacity = '0';
        t.style.transform = 'scale(0)';
        setTimeout(function() { t.remove(); }, 900);
    }, 600);
});

(function animateRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
})();

/* ========================================== */
/* ============= CURSOR HOVER EFFECTS ====== */
/* ========================================== */
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('a,button,input,select,.quick-card,.feature-card,.faq-q,.article-card,.nav-logo,.back-top,.social-link,.contact-info-card')) {
        dot.classList.add('hover');
        ring.classList.add('hover');
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('a,button,input,select,.quick-card,.feature-card,.faq-q,.article-card,.nav-logo,.back-top,.social-link,.contact-info-card')) {
        dot.classList.remove('hover');
        ring.classList.remove('hover');
    }
});

document.addEventListener('mousedown', function() {
    dot.classList.add('click');
    ring.classList.add('click');
});

document.addEventListener('mouseup', function() {
    dot.classList.remove('click');
    ring.classList.remove('click');
});

/* ========================================== */
/* ============= RIPPLE EFFECT ============= */
/* ========================================== */
document.addEventListener('click', function(e) {
    var w = e.target.closest('.ripple-wrap');
    if (!w) return;
    
    var r = w.getBoundingClientRect();
    var rip = document.createElement('span');
    rip.classList.add('ripple');
    var s = Math.max(r.width, r.height);
    rip.style.width = rip.style.height = s + 'px';
    rip.style.left = (e.clientX - r.left - s / 2) + 'px';
    rip.style.top = (e.clientY - r.top - s / 2) + 'px';
    w.appendChild(rip);
    
    setTimeout(function() { rip.remove(); }, 700);
});

/* ========================================== */
/* ============= UNIT NAMES ================ */
/* ========================================== */
var UN = {
    in: 'Inches', ft: 'Feet', yd: 'Yards', mi: 'Miles',
    mm: 'Millimeters', m: 'Meters', km: 'Kilometers',
    sqin: 'Sq Inches', sqft: 'Sq Feet', sqyd: 'Sq Yards',
    acre: 'Acres', hectare: 'Hectares', sqmi: 'Sq Miles',
    sqkm: 'Sq Kilometers', sqm: 'Sq Meters',
    fl_oz: 'Fluid Ounces', gal: 'Gallons', L: 'Liters',
    mL: 'Milliliters', cu_ft: 'Cubic Feet', cu_yd: 'Cubic Yards',
    cu_m: 'Cubic Meters',
    oz: 'Ounces', lb: 'Pounds', g: 'Grams', kg: 'Kilograms',
    short_ton: 'Short Tons', metric_ton: 'Metric Tons',
    F: 'Fahrenheit (°F)', C: 'Celsius (°C)', K: 'Kelvin (K)',
    PKR: 'PKR (₨)', USD: 'USD ($)', EUR: 'EUR (€)', GBP: 'GBP (£)',
    SAR: 'SAR (﷼)', AED: 'AED (د.إ)', KWD: 'KWD (د.ك)',
    INR: 'INR (₹)', JPY: 'JPY (¥)', CAD: 'CAD (C$)',
    AUD: 'AUD (A$)', CNY: 'CNY (¥)', CHF: 'CHF (Fr)',
    TRY: 'TRY (₺)', THB: 'THB (฿)', KRW: 'KRW (₩)',
    MYR: 'MYR (RM)', SGD: 'SGD (S$)', RUB: 'RUB (₽)', ZAR: 'ZAR (R)'
};

/* ========================================== */
/* ============= CONVERSION RATES ========== */
/* ========================================== */
var cR = {
    PKR: 1, USD: 0.003293, EUR: 0.003049, GBP: 0.002623,
    JPY: 0.4955, CAD: 0.004572, AUD: 0.005061, CNY: 0.02393,
    CHF: 0.002896, TRY: 0.1052, THB: 0.1128, KRW: 4.505,
    MYR: 0.01536, SGD: 0.004207, SAR: 0.01219, AED: 0.01207,
    KWD: 0.001158, INR: 0.2778, RUB: 0.3009, ZAR: 0.06160
};

/* ========================================== */
/* ============= CONVERSION MULTIPLIERS ==== */
/* ========================================== */
var lenM = { mm: 0.001, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 };
var areaS = { sqm: 1, sqft: 0.092903, sqin: 0.00064516, sqyd: 0.836127, acre: 4046.86, hectare: 10000, sqkm: 1000000, sqmi: 2589988.11 };
var volL = { mL: 0.001, L: 1, gal: 3.78541, fl_oz: 0.0295735, cu_ft: 28.3168, cu_yd: 764.555, cu_m: 1000 };
var massK = { g: 0.001, kg: 1, oz: 0.0283495, lb: 0.453592, short_ton: 907.185, metric_ton: 1000 };

/* ========================================== */
/* ============= UTILITY FUNCTIONS ======== */
/* ========================================== */
function fmt(n) {
    if (!isFinite(n)) return '—';
    if (n === 0) return '0';
    if (Math.abs(n) >= 0.001 && Math.abs(n) < 1e7) {
        return parseFloat(n.toFixed(6).toString());
    }
    return n.toExponential(4);
}

function showR(rI, fI, v, tU, fac, ft) {
    var r = document.getElementById(rI);
    var f = document.getElementById(fI);
    if (!r || !f) return;
    
    r.classList.remove('has-value');
    void r.offsetWidth;
    r.classList.add('has-value');
    r.innerHTML = '<div class="val">' + fmt(v) + '</div><div class="unit">' + (UN[tU] || tU) + '</div>';
    f.style.display = 'block';
    f.innerHTML = ft || ('Multiply by <span>' + fmt(fac) + '</span>');
}

/* ========================================== */
/* ============= LENGTH CONVERTER ========== */
/* ========================================== */
function convertLength() {
    var v = parseFloat(document.getElementById('lenFrom').value);
    var f = document.getElementById('lenFromUnit').value;
    var t = document.getElementById('lenToUnit').value;
    
    if (isNaN(v)) {
        document.getElementById('lenResult').innerHTML = '<div class="val">—</div><div class="unit">Enter a value</div>';
        document.getElementById('lenFormula').style.display = 'none';
        return;
    }
    
    var m = v * lenM[f];
    var fac = lenM[f] / lenM[t];
    var res = m / lenM[t];
    showR('lenResult', 'lenFormula', res, t, fac, v + ' ' + UN[f] + ' × ' + fmt(fac) + ' = <span>' + fmt(res) + ' ' + UN[t] + '</span>');
}

function swapLength() {
    swapU('lenFromUnit', 'lenToUnit', convertLength);
}

/* ========================================== */
/* ============= AREA CONVERTER =========== */
/* ========================================== */
function convertArea() {
    var v = parseFloat(document.getElementById('areaFrom').value);
    var f = document.getElementById('areaFromUnit').value;
    var t = document.getElementById('areaToUnit').value;
    
    if (isNaN(v)) {
        document.getElementById('areaResult').innerHTML = '<div class="val">—</div><div class="unit">Enter a value</div>';
        document.getElementById('areaFormula').style.display = 'none';
        return;
    }
    
    var s = v * areaS[f];
    var fac = areaS[f] / areaS[t];
    var res = s / areaS[t];
    showR('areaResult', 'areaFormula', res, t, fac, v + ' ' + UN[f] + ' × ' + fmt(fac) + ' = <span>' + fmt(res) + ' ' + UN[t] + '</span>');
}

function swapArea() {
    swapU('areaFromUnit', 'areaToUnit', convertArea);
}

/* ========================================== */
/* ============= VOLUME CONVERTER ========= */
/* ========================================== */
function convertVolume() {
    var v = parseFloat(document.getElementById('volFrom').value);
    var f = document.getElementById('volFromUnit').value;
    var t = document.getElementById('volToUnit').value;
    
    if (isNaN(v)) {
        document.getElementById('volResult').innerHTML = '<div class="val">—</div><div class="unit">Enter a value</div>';
        document.getElementById('volFormula').style.display = 'none';
        return;
    }
    
    var l = v * volL[f];
    var fac = volL[f] / volL[t];
    var res = l / volL[t];
    showR('volResult', 'volFormula', res, t, fac, v + ' ' + UN[f] + ' × ' + fmt(fac) + ' = <span>' + fmt(res) + ' ' + UN[t] + '</span>');
}

function swapVolume() {
    swapU('volFromUnit', 'volToUnit', convertVolume);
}

/* ========================================== */
/* ============= MASS CONVERTER =========== */
/* ========================================== */
function convertMass() {
    var v = parseFloat(document.getElementById('massFrom').value);
    var f = document.getElementById('massFromUnit').value;
    var t = document.getElementById('massToUnit').value;
    
    if (isNaN(v)) {
        document.getElementById('massResult').innerHTML = '<div class="val">—</div><div class="unit">Enter a value</div>';
        document.getElementById('massFormula').style.display = 'none';
        return;
    }
    
    var k = v * massK[f];
    var fac = massK[f] / massK[t];
    var res = k / massK[t];
    showR('massResult', 'massFormula', res, t, fac, v + ' ' + UN[f] + ' × ' + fmt(fac) + ' = <span>' + fmt(res) + ' ' + UN[t] + '</span>');
}

function swapMass() {
    swapU('massFromUnit', 'massToUnit', convertMass);
}

/* ========================================== */
/* ============= TEMPERATURE CONVERTER ==== */
/* ========================================== */
function convertTemp() {
    var v = parseFloat(document.getElementById('tempFrom').value);
    var f = document.getElementById('tempFromUnit').value;
    var t = document.getElementById('tempToUnit').value;
    
    if (isNaN(v)) {
        document.getElementById('tempResult').innerHTML = '<div class="val">—</div><div class="unit">Enter a value</div>';
        document.getElementById('tempFormula').style.display = 'none';
        return;
    }
    
    var c = f === 'C' ? v : f === 'F' ? (v - 32) * 5 / 9 : v - 273.15;
    var res = t === 'C' ? c : t === 'F' ? c * 9 / 5 + 32 : c + 273.15;
    var fs = t === 'C' ? fmt(res) + ' °C' : t === 'F' ? fmt(res) + ' °F' : fmt(res) + ' K';
    var ft = v + '°' + f + ' = <span>' + fs + '</span>';
    
    var r = document.getElementById('tempResult');
    var fm = document.getElementById('tempFormula');
    r.classList.remove('has-value');
    void r.offsetWidth;
    r.classList.add('has-value');
    r.innerHTML = '<div class="val">' + fmt(res) + '</div><div class="unit">' + (UN[t] || t) + '</div>';
    fm.style.display = 'block';
    fm.innerHTML = ft;
}

function swapTemp() {
    swapU('tempFromUnit', 'tempToUnit', convertTemp);
}

/* ========================================== */
/* ============= CURRENCY CONVERTER ======= */
/* ========================================== */
function convertCurrency() {
    var v = parseFloat(document.getElementById('currFrom').value);
    var f = document.getElementById('currFromUnit').value;
    var t = document.getElementById('currToUnit').value;
    
    if (isNaN(v)) {
        document.getElementById('currResult').innerHTML = '<div class="val">—</div><div class="unit">Enter an amount</div>';
        document.getElementById('currFormula').style.display = 'none';
        document.getElementById('rateDisplay').textContent = '—';
        document.getElementById('rateEquation').textContent = '';
        return;
    }
    
    var rate = (cR[t] || 1) / (cR[f] || 1);
    var res = v * rate;
    var r = document.getElementById('currResult');
    var fm = document.getElementById('currFormula');
    
    r.classList.remove('has-value');
    void r.offsetWidth;
    r.classList.add('has-value');
    r.innerHTML = '<div class="val">' + fmt(res) + '</div><div class="unit">' + (UN[t] || t) + '</div>';
    fm.style.display = 'block';
    fm.innerHTML = v + ' ' + (UN[f] || f) + ' × ' + fmt(rate) + ' = <span>' + fmt(res) + ' ' + (UN[t] || t) + '</span>';
    
    document.getElementById('rateDisplay').textContent = fmt(rate);
    document.getElementById('rateEquation').textContent = '1 ' + f + ' = ' + fmt(rate) + ' ' + t;
}

function swapCurrency() {
    swapU('currFromUnit', 'currToUnit', convertCurrency);
}

/* ========================================== */
/* ============= SWAP UNITS ================ */
/* ========================================== */
function swapU(a, b, cb) {
    var elA = document.getElementById(a);
    var elB = document.getElementById(b);
    var tmp = elA.value;
    elA.value = elB.value;
    elB.value = tmp;
    cb();
}

/* ========================================== */
/* ============= NAVIGATION ================ */
/* ========================================== */
function toggleDropdown() {
    var d = document.getElementById('convDropdown');
    if (!d) return;
    var o = d.classList.toggle('open');
    var a = d.querySelector('button .iconify');
    if (a) a.style.transform = o ? 'rotate(180deg)' : 'rotate(0deg)';
}

document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-dropdown')) {
        document.getElementById('convDropdown').classList.remove('open');
        var a = document.querySelector('.nav-dropdown button .iconify');
        if (a) a.style.transform = 'rotate(0deg)';
    }
});

function toggleMobile() {
    document.getElementById('hamburger').classList.toggle('active');
    document.getElementById('mobileMenu').classList.toggle('show');
}

function closeMobile() {
    document.getElementById('hamburger').classList.remove('active');
    document.getElementById('mobileMenu').classList.remove('show');
}

/* ========================================== */
/* ============= SCROLL EFFECTS =========== */
/* ========================================== */
window.addEventListener('scroll', function() {
    document.getElementById('backTop').classList.toggle('show', window.scrollY > 400);
});

function initScroll() {
    var els = document.querySelectorAll('.scroll-anim:not(.visible)');
    var obs = new IntersectionObserver(function(es) {
        es.forEach(function(e) {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.08 });
    
    els.forEach(function(e) {
        obs.observe(e);
    });
}

initScroll();

/* ========================================== */
/* ============= FAQ TOGGLE ================ */
/* ========================================== */
function toggleFaq(el) {
    var i = el.parentElement;
    var w = i.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function(x) {
        x.classList.remove('open');
    });
    if (!w) i.classList.add('open');
}

/* ========================================== */
/* ============= CONTACT FORM ============== */
/* ========================================== */
function submitContact(e) {
    e.preventDefault();
    document.getElementById('contactForm').reset();
    showToast('Message sent successfully!');
}

/* ========================================== */
/* ============= TOAST NOTIFICATION ======= */
/* ========================================== */
function showToast(m) {
    var t = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = m;
    t.classList.add('show');
    setTimeout(function() {
        t.classList.remove('show');
    }, 3000);
}
