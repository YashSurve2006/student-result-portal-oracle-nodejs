/**
 * =====================================================
 * script.js – FINAL STABLE VERSION
 * =====================================================
 * ✔ UI animations
 * ✔ Input focus effects
 * ✔ Result fetch & render
 * ✔ Marks auto-calculation (preview)
 * ✔ Safe navigation redirects
 * ✔ DOES NOT break success/error messages
 *
 * ❌ NO submit button locking
 * ❌ NO premature URL cleanup
 * =====================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       1. PAGE FADE-IN ANIMATION
       ================================================= */
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.4s ease-in-out";
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 50);

    /* =================================================
       2. ENSURE BUTTONS ARE ENABLED (CRITICAL FIX)
       ================================================= */
    document.querySelectorAll("button").forEach(btn => {
        btn.disabled = false;
    });

    /* =================================================
       3. INPUT FOCUS UX (ALL PAGES)
       ================================================= */
    document.querySelectorAll("input, select").forEach(el => {
        el.addEventListener("focus", () => {
            el.style.borderColor = "#2563eb";
            el.style.boxShadow = "0 0 0 2px rgba(37,99,235,0.15)";
        });

        el.addEventListener("blur", () => {
            el.style.borderColor = "#d1d5db";
            el.style.boxShadow = "none";
        });
    });

    /* =================================================
       4. VIEW RESULT – FORM REDIRECT
       ================================================= */
    const resultForm = document.getElementById("resultForm");
    if (resultForm) {
        resultForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const roll = document.getElementById("rollInput").value;
            if (roll) {
                window.location.href = `/view-result.html?roll=${roll}`;
            }
        });
    }

    /* =================================================
       5. VIEW RESULT – FETCH & RENDER
       ================================================= */
    const urlParams = new URLSearchParams(window.location.search);
    const roll = urlParams.get("roll");

    if (roll && document.getElementById("resultCard")) {
        fetch(`/api/result/${roll}`)
            .then(res => res.json())
            .then(data => {

                if (data.error) {
                    alert("❌ Result not found");
                    return;
                }

                document.getElementById("resRoll").innerText = data.ROLL;
                document.getElementById("resName").innerText = data.NAME;
                document.getElementById("resClass").innerText = data.STUD_CLASS;

                document.getElementById("m1").innerText = data.M1;
                document.getElementById("m2").innerText = data.M2;
                document.getElementById("m3").innerText = data.M3;

                document.getElementById("total").innerText = data.TOTAL;
                document.getElementById("percent").innerText = data.PERCENT;
                document.getElementById("gr").innerText = data.GR;

                document.getElementById("resultCard").style.display = "block";
            })
            .catch(() => {
                alert("❌ Server error while fetching result");
            });
    }

    /* =================================================
       6. MARKS PAGE – AUTO CALCULATION (PREVIEW ONLY)
       ================================================= */
    const m1 = document.querySelector("input[name='m1']");
    const m2 = document.querySelector("input[name='m2']");
    const m3 = document.querySelector("input[name='m3']");

    const totalEl = document.getElementById("total");
    const percentEl = document.getElementById("percent");
    const gradeEl = document.getElementById("grade");

    function calculatePreview() {
        if (!m1 || !m2 || !m3) return;

        const v1 = Number(m1.value || 0);
        const v2 = Number(m2.value || 0);
        const v3 = Number(m3.value || 0);

        const total = v1 + v2 + v3;
        const percent = (total / 300 * 100).toFixed(2);

        if (totalEl) totalEl.innerText = total;
        if (percentEl) percentEl.innerText = percent;

        let grade = "F";
        if (percent >= 75) grade = "A";
        else if (percent >= 60) grade = "B";
        else if (percent >= 40) grade = "C";

        if (gradeEl) gradeEl.innerText = grade;
    }

    [m1, m2, m3].forEach(input => {
        if (input) input.addEventListener("input", calculatePreview);
    });

    /* =================================================
       7. RESET PREVIEW VALUES (MARKS PAGE)
       ================================================= */
    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("reset", () => {
            if (totalEl) totalEl.innerText = "0";
            if (percentEl) percentEl.innerText = "0";
            if (gradeEl) gradeEl.innerText = "-";
        });
    });

});
